const _crypto = require('crypto');
const _fs = require('fs');
const _got = require('got');
const _app = require('express')();
const _http = require('http');
const _https = require('https');
const { Server } = require('socket.io');
const EventEmitter = require('events');
const _ip = require('ip');

/**
 *
 *
 * @see https://github.com/ioBroker/ioBroker.js-controller/blob/master/lib/adapter.js
 */
class ioWebSocket extends EventEmitter {
	
	constructor(adapter = null, options = {}) {
		super();
		
		if (!adapter) {
			throw new Error('No adapter instance passed to WebSocket constructor!');
		}
		
		this.adapter = adapter;
		this.options = options || {};
		
		// set defaults
		this.options.port = options.port || 8400;
		this.options.certificates = options.certificates || null;
		
		// connect
		this.server = null;
		this.wss = null;
		this.clients = {};
		this.connect();
		
		// subscribe to all states
		this.adapter.subscribeForeignStates('*');
	}
	
	/**
	 *
	 */
	eventFromClient(msg) {
		
		// disconnect
		if (msg.event === 'disconnect') {
			delete this.clients[msg.clientId];
		}
	}
	
	/**
	 *
	 */
	connect() {
		
		// open secure server (via https)
		if (this.options.certificates !== null) {
			this.server = _https.createServer({
				...this.options.certificates,
				'requestCert': false,
				'rejectUnauthorized': false
				
			}, _app);
		}
		
		// open server (via http)
		else {
			this.server = _http.createServer(_app);
		}
		
		// open socket
		const serverIp = _ip.address();
		this.wss = new Server(this.server, {
			...this.options,
			'path': '/jarvis-socket/',
			'cors': {
				'origin': (origin, fn) => {
					
					// allow all ports from same host (or development host)
					if (origin.indexOf('localhost') > -1 || origin.indexOf('127.0.0.1') > -1 || origin.indexOf(serverIp) > -1) {
						return fn(null, origin);
					}
					
					return fn('Error Invalid domain');
				}
			}
		});
		
		// ws client connected
		this.wss.on('connection', socket => {
			
			// create client
			const client = {
				...socket.request.headers,
				'ip': socket.conn.remoteAddress,
				'id': socket.conn.remoteAddress.replace(/\./g, '-').replace(/\:/g, '')
			}
			
			// add client to list of clients
			this.clients[client.id] = {
				...client,
				'socket': new ioWebSocketClient(this.adapter, { ...client, socket }, msg => this.eventFromClient(msg))
			}
			
			// emit event
			this.emit('client', client);
			this.adapter.log.info('Client with IP ' + client.ip + ' connected');
		});
		
		// listen for connections
		this.server.listen(this.options.port, () => {
			this.adapter.log.info('WebSocket opening on port ' + this.options.port + (this.options.certificates !== null ? ' using https' : ' using http') + '...');
		});
	}
}


/**
 *
 *
 */
class ioWebSocketClient {
	
	constructor(adapter, client, parentMessage) {
		this._adapter = adapter;
		this._parentMessage = parentMessage;
		this._adapter.log.debug('Websocket-Handler for client initialized');
		
		this._client = client;
		this._socket = client.socket;
		this._isAlive = Date.now();
		
		// create states
		this._adapter.setObject('clients.' + this._client.id, { 'type': 'device', 'common': { 'name': this._client.ip }, 'native': {} }, () => this.updateStates());
		this.emit('_clientId', this._client.id);
		
		// ping pong
		this._socket.on('ping', () => this.heartbeat());
		
		// listen for messages from clients
		this._socket.on('message', message => {
			this.handleMessage(message);
			//this.updateStates();
		});
		
		// client disconnected
		this._socket.on('disconnect', reason => this.disconnect(reason));
		
		// listen for states changes
		this._subscribeStates = {};
		this._subscribeHistory = [];
		this._adapter.on('stateChange', (stateId, state) => this.handleStateChange(stateId, state));
		
		
		setInterval(() => {
			
			// disconnect due to timeout
			if (this._isAlive < (Date.now() - (60 * 1000))) {
				this.disconnect('Client timeout');
			}
			
			// update history states
			this._subscribeHistory.forEach(({ messageId, stateId, options }) => {
				this.getHistory(messageId, stateId, options);
			});
			
		}, 5 * 60 * 60 * 1000);
	}
	
	/**
	 *
	 */
	disconnect(reason) {
		this._isAlive = 0;
		this._adapter.log.debug(reason);
		this._adapter.setState('clients.' + this._client.id + '.connected', false, true);
		
		this._parentMessage({
			'clientId': this._client.id,
			'event': 'disconnect'
		});
	}
	
	/**
	 *
	 */
	updateStates() {
		
		const states = {
			'connected': {
				'name': 'Indicates client connection',
				'role': 'indicator.connected',
				'type': 'boolean',
				'value': true
			},
			'ip': {
				'name': 'Client IP',
				'role': 'info.ip',
				'type': 'string',
				'value': this._client.ip
			},
			'userAgent': {
				'name': 'Client User Agent',
				'role': 'text',
				'type': 'string',
				'value': this._client['user-agent']
			},
			'lastSeen': {
				'name': 'Client Last Seen',
				'role': 'value.time',
				'type': 'number',
				'value': Date.now()
			},
			'newNotifications': {
				'name': 'Client Unread Notifications',
				'role': 'json',
				'type': 'string',
				'initial': '[]'
			}
		}
		
		// status states
		Object.keys(states).forEach(stateId => {
			const state = 'clients.' + this._client.id + '.' + stateId;
			const { role, type, value, initial } = states[stateId];
			
			this._adapter.setObjectNotExists(state, { 'type': 'state', 'common': { role, type }, 'native': {} }, (err, obj) => {
				
				if ((obj && initial) || value) {
					this._adapter.setState(state, value, true);
				}
			});
		});
		
		// tab state
		const tabState = 'clients.' + this._client.id + '.setTabId';
		this._adapter.setObjectNotExists(tabState, { 'type': 'state', 'common': { 'role': 'text', 'type': 'string', 'write': true }, 'native': {} }, () => {
			//this._adapter.subscribeStates(tabState);
		});
	}
	
	/**
	 *
	 */
	heartbeat() {
		this._socket.emit('pong');
		this._isAlive = Date.now();
		this.updateStates();
	}
	
	/**
	 *
	 */
	handleStateChange(stateId, state) {
		
		// subscribed state
		if (this._subscribeStates && this._subscribeStates[stateId] && Array.isArray(this._subscribeStates[stateId])) {
			state = { ...state || {}, 'id': stateId }
			this._subscribeStates[stateId].forEach(messageId => this.emit(messageId, { state }));
		}
		
		// focus / set tab id
		else if (stateId.endsWith('.setTabId') && state.val) {
			this._adapter.setState(stateId, '', true);
			this.emit('_setTabId', state.val);
		}
	}
	
	/**
	 *
	 */
	handleMessage(message) {
		
		try {
			const parsedMessage = JSON.parse(message);
			let { messageId, command, params = [] } = parsedMessage;
			params = Array.isArray(params) ? params : [params];
			
			command && this[command](messageId, ...params);
		}
		catch(err) {
			this._adapter.log.warn(err.message || err);
		}
	}
	
	/**
	 *
	 */
	emit(messageId, data, key = 'message') {
		this._adapter.log.silly('Send message with ID ' + messageId);
		this._socket.emit(key, JSON.stringify({ messageId, data }));
	}
	
	/**
	 *
	 */
	readFile(messageId, file) {
		
		_fs.readFile(file, 'utf8', (err, data) => {
			this.emit(messageId, { err, data });
		});
	}
	
	/**
	 *
	 */
	encrypt(messageId, str, secretKey, algorithm = 'AES-256-CBC') {
		let err = null;
		let encrypted = null;
		
		try {
			const iv = _crypto.randomBytes(16).toString('hex').substr(0,16);
			const cipher = _crypto.createCipheriv(algorithm, _crypto.createHash('sha256').update(secretKey).digest('hex').substr(0,32), iv);
			encrypted = Buffer.from(iv).toString('base64').substr(0,24) + cipher.update((typeof str === 'object' ? JSON.stringify(str) : str), 'utf8', 'base64') + cipher.final('base64');
		}
		catch(error) {
			this._adapter.log.warn(error.message);
			err = error;
		}
		
		this.emit(messageId, { err, str, encrypted });
	}
	
	/**
	 *
	 */
	decrypt(messageId, hash, secretKey, algorithm = 'AES-256-CBC') {
		let err = null;
		let decrypted = null;
		
		try {
			const decipher = _crypto.createDecipheriv(algorithm, _crypto.createHash('sha256').update(secretKey).digest('hex').substr(0,32), Buffer.from(hash.substr(0,24), 'base64'));
			decrypted = Buffer.concat([decipher.update(Buffer.from(hash.substr(24), 'base64')), decipher.final()]).toString();
		}
		catch(error) {
			this._adapter.log.warn(error.message);
			err = error;
		}
		
		this.emit(messageId, { err, hash, decrypted });
	}
	
	/**
	 *
	 */
	request(messageId, options) {
		try {
			// encrypt
			if (options._encrypt && options.body.data) {
				options.body.data = encrypt(options.body.data, 'KutTGsNQ8HCX$hrT9Ua5beRSs2BLVeQq');
				delete options._encrypt;
			}
			
			// map body
			if (options.json === true && options.body) {
				options.json = options.body;
				delete options.body;
			}
			
			// request
			_got(options)
				.then(res => {
					this.emit(messageId, {
						'_options': options,
						'data': res.body || ''
					});
				})
				.catch(err => {
					this.emit(messageId, { err });
				});
		}
		catch(err) {
			this.emit(messageId, { err });
			this._adapter.log.warn(err.message);
		}
	}
	
	/**
	 *
	 */
	setState(messageId, stateId, value) {
		this._adapter.setForeignState(stateId, value, err => {
			this.emit(messageId, { err });
		});
	}
	
	/**
	 *
	 */
	getAdapterInstances(messageId, adapter = null) {
		
		this._adapter.getObjectView('system', 'instance', { 'startkey': 'system.adapter.' + (adapter ? adapter + '.' : ''), 'endkey': 'system.adapter.' + (adapter ? adapter + '.999' : 'zzz') }, (err, res) => {
			this.emit(messageId, { err, 'instances': res.rows || null });
		});
	}
	
	/**
	 *
	 */
	getObject(messageId, objectId) {
		this._adapter.getForeignObject(objectId, (err, object) => {
			object = { ...object || {}, 'id': objectId }
			this.emit(messageId, { err, object });
		});
		
	}
	
	/**
	 *
	 */
	getObjects(messageId, pattern) {
		
		// get devices, channels and states
		let promises = [];
		['device', 'channel', 'state'].forEach(type => {
			promises.push(new Promise(resolve => {
				this._adapter.getForeignObjects(pattern || '*', type, (err, objects) => resolve({ err, objects }));
			}));
		});
		
		// 
		let err = null;
		let objects = {};
		Promise.all(promises).then(result => {
			result.forEach(res => {
				err = err || res.err;
				objects = { ...objects, ...res.objects }
			});
			
			Object.keys(objects).forEach(objectId => {
				
				// adapter roots are missing, thus create
				const rootObjectId = objectId.substr(0, objectId.indexOf('.', objectId.indexOf('.')+1));
				if (rootObjectId && !objects[rootObjectId]) {
					objects[rootObjectId] = {
						'_id': rootObjectId,
						'type': 'adapter'
					}
				}
				
				// remove system.adapter or invalid object ids
				if (objectId.indexOf('system.adapter') > -1 || objectId.indexOf('system.host') > -1 || objectId.indexOf('.') === -1) {
					delete objects[objectId];
				}
			});
			
			this.emit(messageId, { err, objects });
		});
	}
	
	/**
	 *
	 */
	getObjectView(messageId, design, search, params, cb) {
		this._adapter.getObjectView(design, search, params, (err, res) => {
			this.emit(messageId, { err, 'objects': (res && res.rows) || [] });
		});
	}
	
	/**
	 *
	 */
	getState(messageId, stateId) {
		this._adapter.getForeignState(stateId, (err, state) => {
			state = { ...state || {}, 'id': stateId }
			this.emit(messageId, { err, state });
		});
	}
	
	/**
	 *
	 */
	getStates(messageId, pattern) {
		this._adapter.getForeignStates(pattern, (err, states) => {
			this.emit(messageId, { err, states });
		});
	}
	
	/**
	 *
	 */
	subscribeState(messageId, stateId) {
		this._subscribeStates[stateId] = this._subscribeStates[stateId] || [];
		
		if (this._subscribeStates[stateId].indexOf(messageId) === -1) {
			this._subscribeStates[stateId].push(messageId);
			this.getState(messageId, stateId);
		}
	}
	
	/**
	 *
	 */
	subscribeHistory(messageId, stateId, options) {
		this._subscribeHistory.push({ messageId, stateId, options });
		this.getHistory(messageId, stateId, options);
	}
	
	/**
	 *
	 */
	getHistory(messageId, stateId, options = {}) {
		this._adapter.getHistory(stateId, options, (err, history) => {
			this.emit(messageId, { err, history });
		});
	}
}

module.exports = ioWebSocket;
