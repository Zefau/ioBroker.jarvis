const _crypto = require('crypto');
const _fs = require('fs');
const _got = require('got');
const _app = require('express')();
const _http = require('http');
const _https = require('https');
const { Server } = require('socket.io');
const EventEmitter = require('events');
const _ip = require('ip');
const _uuid = require('uuid').v5;
const _hash = require('object-hash');
const _semver = require('semver');

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
		
		this._adapter = adapter;
		this._options = options || {};
		
		// set defaults
		this._options.port = options.port || 8400;
		this._options.certificates = options.certificates || null;
		
		// connect
		this.server = null;
		this.wss = null;
		this.clients = {};
		this.sockets = {};
		this.connect();
		
		// cache
		this.cache = {}
		
		// subscribe to all states
		this._adapter.subscribeForeignStates('*');
		
		// subscribe to adapter instances (polling)
		this.getAdapterInstances();
		this.updateAdapterInstances();
		
		// get adapter updates initially
		this._adapter.getForeignState('admin.0.info.updatesJson', (err, state) => {
			
			if (!err && state) {
				try {
					this.cache['AdapterUpdates'] = JSON.parse(state.val);
				}
				catch (error) {
					delete this.cache['AdapterUpdates'];
				}
				
				this.getAdapterInstances();
			}
		});
		
		// listen for adapter update
		this._adapter.on('stateChange', (stateId, state) => {
			
			// admin.0.info.updatesJson
			if (stateId === 'admin.0.info.updatesJson' && state) {
				try {
					this.cache['AdapterUpdates'] = JSON.parse(state.val);
				}
				catch (error) {
					delete this.cache['AdapterUpdates'];
				}
			}
		});
	}
	
	/**
	 *
	 */
	getAdapterInstances() {
		this.cache['AdapterInstances'] = this.cache['AdapterInstances'] || {
			'hash': null,
			'data': {}
		}
		
		this._adapter.getObjectView('system', 'instance', { 'startkey': 'system.adapter.', 'endkey': 'system.adapter.\u9999' }, (err, res) => {
			const instances = {};
			
			if (!err && res && res.rows) {
				res.rows.forEach(async instance => {
					const id = instance.id.replace('system.adapter.', '');
					instances[id] = {
						...instance.value.common,
						'_id': instance.id,
						id
					}
					
					// add alive & connected state
					const alive = await this._adapter.getForeignStateAsync(instance._id + '.alive');
					const connectedToHost = await this._adapter.getForeignStateAsync(instance._id + '.connected');
					const connectedToInstance = await this._adapter.getForeignStateAsync(id + '.info.connection');
					
					instances[id].alive = alive ? alive.val : null;
					instances[id].connectedToHost = connectedToHost ? connectedToHost.val : null;
					instances[id].connectedToInstance = connectedToInstance ? connectedToInstance.val : null;
					
					// add update status
					const availableVersion = (this.cache['AdapterUpdates'] && this.cache['AdapterUpdates'][instances[id].name] && this.cache['AdapterUpdates'][instances[id].name].availableVersion) || instances[id].version;
					instances[id].update = _semver.gt(availableVersion, instances[id].version) === true ? availableVersion : null;
					
					// delete unnecessary stuff
					delete instances[id].docs;
					delete instances[id].desc;
					delete instances[id].news;
					delete instances[id].titleLang;
				});
				
				// sort
				const instancesSorted = Object.keys(instances).sort().reduce(
						(obj, key) => { 
							obj[key] = instances[key]; 
							return obj;
						}, 
						{}
					);
				
				// compare hash
				const hash = _hash(instancesSorted);
				
				if (this.cache['AdapterInstances'].hash !== hash) {
					this._adapter.log.debug('Push update of instances..');
					
					// update cache
					this.cache['AdapterInstances'] = {
						hash,
						'data': instancesSorted
					}
					
					// announce to clients
					for (const clientId in this.sockets) {
						if (this.sockets[clientId]._subscribeOthers && this.sockets[clientId]._subscribeOthers['AdapterInstances']) {
							this.sockets[clientId]._subscribeOthers['AdapterInstances'].forEach(messageId => {
								this.sockets[clientId].emit(messageId, instancesSorted);
							});
						}
					}
				}
			}
		});
	}
	
	updateAdapterInstances() {
		this.intervalInstancesRefresh = setInterval(() => {
			this.getAdapterInstances();
			
		}, 30 * 1000);
	}
	
	/**
	 *
	 */
	eventFromClient(msg) {
		const clientId = msg.clientId;
		
		// disconnect
		if (msg.event === 'disconnect') {
			delete this.clients[clientId];
			delete this.sockets[clientId];
			this.emit('CLIENT_LIST', this.clients);
		}
		
		// getAdapterInstances
		if (msg.event === 'getAdapterInstances') {
			if (this.sockets[clientId]._subscribeOthers && this.sockets[clientId]._subscribeOthers['AdapterInstances']) {
				this.sockets[clientId]._subscribeOthers['AdapterInstances'].forEach(messageId => {
					this.sockets[clientId].emit(messageId, this.cache['AdapterInstances'].data);
				});
			}
		}
	}
	
	/**
	 *
	 */
	connect() {
		const serverIp = _ip.address();
		this._adapter.log.debug('Connection: ioBroker IP detected with ' + serverIp);
  
		// open secure server (via https)
		if (this._options.certificates !== null) {
			this._adapter.log.debug('Connection: Using secure HTTPS-Server');
			this.server = _https.createServer({
				...this._options.certificates,
				'requestCert': false,
				'rejectUnauthorized': false
				
			}, _app);
		}
		
		// open server (via http)
		else {
			this._adapter.log.debug('Connection: Using non-secure HTTP-Server');
			this.server = _http.createServer(_app);
		}
		
		// open socket
		this.wss = new Server(this.server, {
			...this._options,
			'path': '/jarvis-socket/',
			'cors': {
				'origin': (origin, fn) => {
					
					// allow all ports from same host (or development host)
					if (origin.indexOf('localhost') > -1 || origin.indexOf('127.0.0.1') > -1 || origin.indexOf(serverIp) > -1) {
						this._adapter.log.debug('Connection: Origin detected with ' + origin + ' (allowed)');
						return fn(null, origin);
					}
					else {
						this._adapter.log.debug('Connection: Origin detected with ' + origin + ' (rejected)');
					}
					
					return fn('Access from domain not allowed');
				}
			}
		});
		
		// ws client connected
		this.wss.on('connection', socket => {
			const clientId = _uuid(socket.conn.remoteAddress.replace(/\./g, '-').replace(/\:/g, '') + '-' + socket.request.headers['user-agent'], 'd03b9915-564d-491e-a0e0-7ef4af0a52d1');
			
			// create client
			this.clients[clientId] = {
				//...socket.request.headers,
				'user-agent': socket.request.headers['user-agent'],
				'ip': socket.conn.remoteAddress,
				'id': clientId
			}
			
			// add client to list of sockets
			this.sockets[clientId] = new ioWebSocketClient(this._adapter, { ...this.clients[clientId], socket }, msg => this.eventFromClient(msg));
			
			// emit event
			this.emit('CLIENT_NEW', this.clients[clientId]);
			this.emit('CLIENT_LIST', this.clients);
			this._adapter.log.info('Client with IP ' + this.clients[clientId].ip + ' connected');
		});
		
		// listen for connections
		this.server.listen(this._options.port, () => {
			this._adapter.log.info('Connection: WebSocket opened on port ' + this._options.port + (this._options.certificates !== null ? ' using https' : ' using http') + '...');
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
		this._subscribeOthers = {};
		this._subscribeStates = {};
		this._subscribeHistory = {};
		this._adapter.on('stateChange', (stateId, state) => this.handleStateChange(stateId, state));
		
		// disconnect due to timeout
		this.intervalClientTimeout = setInterval(() => {
			if (this._isAlive && this._isAlive < (Date.now() - (30 * 1000))) {
				this.disconnect('Client timeout');
			}
			
		}, 60 * 1000);
		
		// update history states
		this.intervalHistoryRefresh = setInterval(() => {
			for (const subscriptionKey in this._subscribeHistory) {
				const { messageId, stateId, options } = this._subscribeHistory[subscriptionKey];
				this.getHistory(messageId, subscriptionKey, stateId, options);
			}
			
		}, 5 * 60 * 1000);
	}
	
	/**
	 *
	 */
	disconnect(reason) {
		this._isAlive = 0;
		this._adapter.log.debug('Client with IP ' + this._client.ip + ' disconnected: ' + reason);
		this._adapter.setState('clients.' + this._client.id + '.connected', false, true);
		
		clearInterval(this.intervalClientTimeout);
		clearInterval(this.intervalHistoryRefresh);
		
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
			'userBrowser': {
				'name': 'Client Browser Information',
				'role': 'text',
				'type': 'json',
				'value': ''
			},
			'lastSeen': {
				'name': 'Client Last Seen',
				'role': 'value.time',
				'type': 'number',
				'value': Date.now()
			}
		}
		
		// status states
		Object.keys(states).forEach(stateId => {
			const state = 'clients.' + this._client.id + '.' + stateId;
			const { role, type, value, initial, subscribe } = states[stateId];
			
			this._adapter.setObjectNotExists(state, { 'type': 'state', 'common': { role, type }, 'native': {} }, (err, obj) => {
				
				// set initial value
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
			this._adapter.log.debug(message);
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
	getConfig(messageId) {
		this.emit(messageId, { 'config': this._adapter.config });
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
					this._adapter.log.warn(err.message);
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
	setState(messageId, stateId, value, ack) {
		this._adapter.setForeignState(stateId, value, ack || false, err => {
			this.emit(messageId, { err });
		});
	}
	
	/**
	 *
	 */
	getAdapterInstances() {
		this._parentMessage({
			'clientId': this._client.id,
			'event': 'getAdapterInstances'
		});
	}
	
	/**
	 *
	 */
	subscribeAdapterInstances(messageId) {
		this._subscribeOthers['AdapterInstances'] = this._subscribeOthers['AdapterInstances'] || [];
		
		if (this._subscribeOthers['AdapterInstances'].indexOf(messageId) === -1) {
			this._subscribeOthers['AdapterInstances'].push(messageId);
			this.getAdapterInstances();
		}
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
	unsubscribe(messageId, type, subscriptionKey, stateId) {
		this._adapter.log.debug('unsubscribe (' + stateId + '): ' + subscriptionKey + ' | ' + type);
		
		if (type === 'history' && subscriptionKey && this._subscribeHistory[subscriptionKey]) {
			delete this._subscribeHistory[subscriptionKey];
			this.emit(messageId, { subscriptionKey, type, stateId, 'err': null });
		}
		else if (type === 'state' && stateId && this.subscribeState[stateId]) {
			delete this.subscribeState[stateId];
			this.emit(messageId, { subscriptionKey, type, stateId, 'err': null });
		}
		else {
			this.emit(messageId, { subscriptionKey, stateId, 'err': 'Not found' });
		}
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
	subscribeHistory(messageId, subscriptionKey, stateId, options) {
		this._adapter.log.debug('subscribeHistory (' + stateId + '): ' + subscriptionKey + ' | ' + JSON.stringify(options));
		
		// first subscription
		if (!this._subscribeHistory[subscriptionKey]) {
			this._subscribeHistory[subscriptionKey] = { subscriptionKey, messageId, stateId, options };
			this.getHistory(messageId, subscriptionKey, stateId, { ...options, 'force': true });
		}
		
		// already subscribed, send cache
		else {
			this.emit(messageId, {
				subscriptionKey,
				'err': null,
				'hash': this._subscribeHistory[subscriptionKey].hash,
				'history': this._subscribeHistory[subscriptionKey].history
			});
		}
	}
	
	/**
	 *
	 */
	getHistory(messageId, subscriptionKey, stateId, options = {}) {
		this._adapter.log.debug('getHistory (' + stateId + '): ' + subscriptionKey + ' | ' + JSON.stringify(options));
		
		options.start = options.start || (Date.now() - options.review);
		this._adapter.getHistory(stateId, options, (err, history) => {
			if (!err && history) {
				const hash = history.length; // _hash(history);
				
				if (this._subscribeHistory[subscriptionKey] && (options.force === true || hash !== this._subscribeHistory[subscriptionKey].hash)) {
					this._adapter.log.debug('getHistory (' + stateId + '): Update');

					this._subscribeHistory[subscriptionKey].history = history;
					this._subscribeHistory[subscriptionKey].hash = hash;
					
					this.emit(messageId, { subscriptionKey, err, hash, history });
				}
			}
			else {
				this.emit(messageId, { subscriptionKey, err, 'hash': null, 'history': [] });
			}
		});
	}
}

module.exports = ioWebSocket;
