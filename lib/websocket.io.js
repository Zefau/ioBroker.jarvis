const _crypto = require('crypto');
const _fs = require('fs');
const _path = require('path');
const _got = require('got');
const { Server } = require('socket.io');
const EventEmitter = require('events');
const _ip = require('ip');
const _uuid = require('uuid').v5;
const _hash = require('object-hash');
const _semver = require('semver');
const _os = require('os');

/**
 *
 *
 * @see https://github.com/ioBroker/ioBroker.js-controller/blob/master/packages/adapter/lib/adapter/adapter.js
 */
class ioWebSocket extends EventEmitter {
	
	constructor(adapter = null, options = {}) {
		super();
		
		if (!adapter) {
			throw new Error('No adapter instance passed to WebSocket constructor!');
		}
		
		this._adapter = adapter;
		this._options = options || {};
		
		if (this._options.user && this._options.user.indexOf('system.user.') === -1) {
			this._options.user = 'system.user.' + this._options.user;
		}
		
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
		this._adapter.requireLog(true);
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
		
		// listen for adapter changes
		/*
		this._adapter.on('objectChange', (objectId, object) => {
			this._adapter.log.warn(objectId);
			
			// adapter
			if (objectId.startsWith('system.adapter.')) {
				this.getAdapterInstances();
			}
		});
		*/
		
		// listen for adapter or script updates
		this._adapter.on('stateChange', (stateId, state) => {
			
			// scripts
			if (stateId.startsWith('javascript.0.scriptEnabled.') && state.ack === true) {
				this.getScriptStatuses();
			}
			
			// admin.0.info.updatesJson
			else if (stateId === 'admin.0.info.updatesJson' && state) {
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
	getScriptStatuses() {
		this.cache['ScriptStatuses'] = this.cache['ScriptStatuses'] || {
			'hash': null,
			'data': {}
		}
		
		this._adapter.getObjectView('system', 'script', null, (err, res) => {
			const scripts = {};
			
			res.rows = res.rows || [];
			res.rows.forEach(script => {
				const id = script.id.replace('script.js.', '');
				const parentId = id.substr(0, id.lastIndexOf('.'));
				const rootId = id.substr(0, id.indexOf('.'));
				
				// prepare script
				script = script.value;
				script.disabled = !script.enabled;
				delete script.common.source;
				
				// add script to list
				scripts[parentId] = scripts[parentId] || { 'id': parentId, 'children': [] };
				scripts[parentId].children.push({
					...script.common,
					'created': script.ts,
					id
				});
				
				// sort
				scripts[parentId].children.sort((a, b) => a.id.toLowerCase() === b.id.toLowerCase() ? 0 : (a.id.toLowerCase() > b.id.toLowerCase() ? 1 : -1));
			});
			
			// nest structure
			let root = {}
			Object.keys(scripts).sort().reverse().forEach(key => {
				const isRoot = key.indexOf('.') === -1;
				
				if (isRoot) {
					root = {
						[key]: scripts[key],
						...root
					}
				}
				else {
					const parentId = key.substr(0, key.lastIndexOf('.'));
					scripts[parentId].children = [].concat(scripts[key], scripts[parentId].children);
				}
			});
			
			// cache
			const hash = _hash(root);
			
			if (this.cache['ScriptStatuses'].hash !== hash) {
				this._adapter.log.debug('Push update of scripts..');
				
				// update cache
				this.cache['ScriptStatuses'] = {
					hash,
					'data': root
				}
				
				// announce to clients
				for (const clientId in this.sockets) {
					if (this.sockets[clientId]._subscribeOthers && this.sockets[clientId]._subscribeOthers['ScriptStatuses']) {
						this.sockets[clientId]._subscribeOthers['ScriptStatuses'].forEach(messageId => {
							this.sockets[clientId].emit(messageId, root);
						});
					}
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
				
				// cache
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
			this.getScriptStatuses();
			
		}, 60 * 1000);
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
		
		// getAdapterInstances or getScriptStatuses
		if (msg.event === 'getAdapterInstances' || msg.event === 'getScriptStatuses') {
			const key = msg.event.replace('get', '');
			
			if (this.sockets[clientId]._subscribeOthers && this.sockets[clientId]._subscribeOthers[key] && this.cache[key]) {
				this.sockets[clientId]._subscribeOthers[key].forEach(messageId => {
					this.sockets[clientId].emit(messageId, this.cache[key].data);
				});
			}
		}
	}
	
	/**
	 *
	 */
	connect() {
		const serverIp = _ip.address();
		const serverHost = _os.hostname();
		this._adapter.log.debug('Connection: ioBroker host detected with ' + serverHost + ' (IP: ' + serverIp + ')');
		
		const _app = (req, res) => {
			res.writeHead(501);
			res.end('This is the jarvis socket.io port!');
		}
		
		// create secure server (via https)
		// @see https://nodejs.org/api/tls.html#tls_tls_createserver_options_secureconnectionlistener
		if (this._options.certificates !== null) {
			const options = {
				...this._options.certificates,
				//'requestCert': false, // requestCert <boolean> If true the server will request a certificate from clients that connect and attempt to verify that certificate. Default: false.
				//'rejectUnauthorized': false, // rejectUnauthorized <boolean> If not false the server will reject any connection which is not authorized with the list of supplied CAs. This option only has an effect if requestCert is true. Default: true.
				'allowHTTP1': true
			}
			
			//this.server = _https.createServer(options, _app);
			this.server = require('http2').createSecureServer(options, _app);
			this._adapter.log.debug('Connection: Using secure HTTPS-Server'); // with options: ' + JSON.stringify(options)
		}
		
		// create server (via http)
		else {
			this.server = require('http').createServer(_app);
			this._adapter.log.debug('Connection: Using non-secure HTTP-Server');
		}
		
		// create socket
		let whitelist = this._adapter.config.hostWhitelist ? this._adapter.config.hostWhitelist.replace(/, /g, ',').split(',') : [];
		whitelist = whitelist.concat([ 'localhost', '127.0.0.1', serverIp, serverHost ]);
		
		this._adapter.log.debug('Connection: Using options: ' + JSON.stringify(this._options.connection || {}));
		this.wss = new Server({
			'path': '/jarvis-socket/',
			
			'allowEIO3': true,
			'pingInterval': 120000,
			'pingTimeout': 30000,
			...this._options.connection || {},
			
			'cors': {
				'origin': (origin, fn) => {
					origin = origin || '(direct access to the port)';
					this._adapter.log.debug('Connection: Origin detected with ' + origin + '...');
					const allowed = !this._options.hostAllow || this._options.hostAllow === 'all' || (this._options.hostAllow === 'list' && origin && whitelist.some(entry => origin.indexOf(entry) > -1));
					
					// allow all ports from same host (or development host)
					if (allowed) {
						this._adapter.log.debug('Connection: Origin detected with ' + origin + ' (allowed due to ' + (this._options.hostAllow || 'all') + ')');
						return fn(null, origin);
					}
					
					this._adapter.log.debug('Connection: Origin detected with ' + origin + ' (rejected, not in ' + whitelist.join(', ') + ')');
					return fn('Access from domain not allowed');
				}
			}
		});
		
		// attach server to socket
		this.wss.attach(this.server);
		
		// ws error
		this.wss.on('error', error => {
			this._adapter.log.error(error.message);
			this._adapter.log.debug(JSON.stringify(error));
		});
		
		// ws client connected
		this.wss.on('connection', socket => {
			this._adapter.log.info('Client connecting...');
			const clientId = _uuid(socket.conn.remoteAddress.replace(/\./g, '-').replace(/\:/g, '') + '-' + socket.request.headers['user-agent'], 'd03b9915-564d-491e-a0e0-7ef4af0a52d1');
			
			// create client
			this.clients[clientId] = {
				//...socket.request.headers,
				'user-agent': socket.request.headers['user-agent'],
				'ip': socket.conn.remoteAddress,
				'id': clientId
			}
			
			// add client to list of sockets
			this.sockets[clientId] = new ioWebSocketClient(this._adapter, this._options, { ...this.clients[clientId], socket }, msg => this.eventFromClient(msg));
			
			// emit event
			this.emit('CLIENT_NEW', this.clients[clientId]);
			this.emit('CLIENT_LIST', this.clients);
			this._adapter.log.info('Client with IP ' + this.clients[clientId].ip + ' connected');
		});
		
		// listen for connections
		this.server.listen(this._options.port, '0.0.0.0', () => {
			this._adapter.log.info('Connection: WebSocket opened on port ' + this.server.address().port + (this._options.certificates !== null ? ' using https' : ' using http') + '...');
		});
	}
}


/**
 *
 *
 */
class ioWebSocketClient {
	
	constructor(adapter, options, client, parentMessage) {
		this._adapter = adapter;
		this._options = options;
		
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
		this._adapter.on('log', obj => this.handleLogChange(obj));
		
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
			
		}, 2 * 60 * 1000);
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
				if ((obj && initial) || value !== undefined) {
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
	handleLogChange(log) {
		this.emit('_log', log);
	}
	
	/**
	 *
	 */
	handleStateChange(stateId, state) {
		
		// subscribed state
		if (this._subscribeStates && this._subscribeStates[stateId] && Array.isArray(this._subscribeStates[stateId])) {
			this._subscribeStates[stateId].forEach(messageId => this.emit(messageId, state && state.ack !== undefined && state.ts !== undefined && state.from !== undefined ? { state } : { 'err': new Error(stateId + ' is not a valid state') }));
		}
		
		// focus / set tab id
		else if (stateId.endsWith('.setTabId') && state && state.val) {
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
		catch (error) {
			this._adapter.log.warn(error.message || error);
			this._adapter.log.debug(message);
		}
	}
	
	/**
	 *
	 */
	emit(messageId, data = {}, key = 'message') {
		this._adapter.log.silly('Send message with ID ' + messageId);
		
		// socket.io will detroy error object, so the following is required
		if (data.err) {
			data.err = {
				'name': data.err.name,
				'message': data.err.message,
				'stack': data.err.stack
			}
		}
		else if (data.err === null) {
			data.err = '_isNull';
		}
		
		this._socket.emit(key, { messageId, data });
	}
	
	/**
	 *
	 */
	log(messageId, criticality, args) {
		const message = args.map(arg => {
			return typeof arg === 'object' ? JSON.stringify(arg) : arg;
		});
		
		this._adapter.log[criticality || 'info'](message.join(', '));
		this.emit(messageId);
	}
	
	/**
	 *
	 */
	getLogs(messageId, date = 'current') {
		const log = this._adapter.systemConfig.log.transport.file1;
		const file = _path.resolve(this._adapter.systemConfig.dataDir + '../' + log.filename + '.' + date + '' + log.fileext);
		
		_fs.readFile(file, 'utf-8', (err, logs) => {
			if (err) {
				this.emit(messageId, { err });
				return;
			}
			
			// parse log file
			const splitter = logs.substr(0, 4);
			logs = logs.split('\n' + splitter);
			logs = logs.map((log, i) => {
				log = i ? (splitter + log) : log;
				const findFrom = log.indexOf(': ') + 2;
				const from = log.substr(findFrom).indexOf('host') === -1 ? log.substr(findFrom, log.indexOf(' (') - findFrom) : log.substr(findFrom, log.indexOf(' ', findFrom) - findFrom);
				const ts = new Date(log.substr(0, 23)).getTime();
				const severity = [ 'silly', 'debug', 'info', 'warn', 'error' ].find(s => log.indexOf(s) !== -1);
				const message = log.substr(findFrom).replace(/(?:\r\n|\r|\n)/g, ' ');
				
				return { from, ts, severity, message }
			});
			
			logs = logs.reverse();
			this.emit(messageId, { 'err': null, logs });
		});
	}
	
	/**
	 *
	 */
	getConfig(messageId) {
		this.emit(messageId, { 'config': this._adapter.config });
	}
	
	/**0
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
	sign(messageId, data, privateKey, algorithm = 'RSA-SHA512') {
		data = typeof data !== 'string' ? JSON.stringify(data) : data;
		let err = null;
		let signature = null;
		
		try {
			const sign = crypto.createSign(algorithm);
			sign.update(data);
			signature = sign.sign(privateKey, 'base64');
		}
		catch (error) {
			this._adapter.log.warn(error.message);
			err = error;
		}
		
		this.emit(messageId, { err, data, privateKey, signature, algorithm, verification });
	}
	
	/**
	 *
	 */
	verify(messageId, data, signature, publicKey, algorithm = 'RSA-SHA512') {
		data = typeof data !== 'string' ? JSON.stringify(data) : data;
		let err = null;
		let verification = false;
		
		try {
			verification = _crypto.verify(algorithm, Buffer.from(data), publicKey, Buffer.from(signature, 'base64'));
		}
		catch (error) {
			this._adapter.log.warn(error.message);
			err = error;
		}
		
		this.emit(messageId, { err, data, publicKey, signature, algorithm, verification });
	}
	
	/**
	 *
	 */
	encrypt(messageId, str, secretKey, algorithm = 'AES-256-CTR') {
		let err = null;
		let encrypted = null;
		
		try {
			const iv = _crypto.randomBytes(16).toString('hex').substr(0,16);
			const cipher = _crypto.createCipheriv(algorithm, _crypto.createHash('sha256').update(secretKey).digest('hex').substr(0,32), iv);
			encrypted = Buffer.from(iv).toString('base64').substr(0,24) + ':' + cipher.update((typeof str === 'object' ? JSON.stringify(str) : str), 'utf8', 'base64') + cipher.final('base64');
		}
		catch (error) {
			this._adapter.log.warn(error.message);
			err = error;
		}
		
		this.emit(messageId, { err, str, encrypted });
	}
	
	/**
	 *
	 */
	decrypt(messageId, hash, secretKey, algorithm = 'AES-256-CTR') {
		let err = null;
		let decrypted = null;
		
		try {
			const [ iv, cipher ] = hash.split(':');
			const decipher = _crypto.createDecipheriv(algorithm, _crypto.createHash('sha256').update(secretKey).digest('hex').substr(0,32), Buffer.from(iv, 'base64'));
			decrypted = Buffer.concat([decipher.update(Buffer.from(cipher, 'base64')), decipher.final()]).toString();
		}
		catch (error) {
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
		catch (err) {
			this.emit(messageId, { err });
			this._adapter.log.warn(err.message);
		}
	}
	
	/**
	 *
	 */
	setAdapter(messageId, instanceId, state, ack) {
		instanceId = 'system.adapter.' + instanceId;
		
		this._adapter.getForeignObject(instanceId, (err, obj) => {
			if (err || !obj) {
				this.emit(messageId, { err });
				return;
			}
			
			obj.common.enabled = state;
			
			this._adapter.setForeignObject(instanceId, obj, err => {
				this.getAdapterInstances();
				this.emit(messageId, { err });
			});
		});
	}
	
	/**
	 *
	 */
	setScript(messageId, id, state, ack) {
		this.setState(messageId, 'javascript.0.scriptEnabled.' + id, state, ack);
	}
	
	/**
	 *
	 */
	setState(messageId, stateId, value, ack, cb = null) {
		this._adapter.setForeignState(stateId, value, ack || false, { 'user': this._options.user }, err => {
			this.emit(messageId, { err });
			cb && cb();
		});
	}
	
	/**
	 *
	 */
	getSpecial(key) {
		this._parentMessage({
			'clientId': this._client.id,
			'event': 'get' + key
		});
	}
	
	/**
	 *
	 */
	subscribeSpecial(messageId, key) {
		this._subscribeOthers[key] = this._subscribeOthers[key] || [];
		
		if (this._subscribeOthers[key].indexOf(messageId) === -1) {
			this._subscribeOthers[key].push(messageId);
			this.getSpecial(key);
		}
	}
	
	/**
	 *
	 */
	getObject(messageId, objectId) {
		//this._adapter.getForeignObject(objectId, null, null, { 'user': this._options.user }, (err, object) => {
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
				//this._adapter.getForeignObjects(pattern || '*', type, null, { 'user': this._options.user }, (err, objects) => resolve({ err, objects }));
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
		//this._adapter.getObjectView(design, search, params, { 'user': this._options.user }, (err, res) => {
		this._adapter.getObjectView(design, search, params, (err, res) => {
			this.emit(messageId, { err, 'objects': (res && res.rows) || [] });
		});
	}
	
	/**
	 *
	 */
	getState(messageId, stateId) {
		this._adapter.getForeignState(stateId, { 'user': this._options.user }, (err, state) => {
			//state = { ...state || {}, 'id': stateId }
			
			if (!err && (!state || (state && state.ack === undefined && state.ts === undefined && state.from === undefined))) {
				err = new Error(stateId + ' is not a valid state');
			}
			
			this.emit(messageId, { err, state });
		});
	}
	
	/**
	 *
	 */
	getStates(messageId, pattern) {
		this._adapter.getForeignStates(pattern, { 'user': this._options.user }, (err, states) => {
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
		}
		
		this.getState(messageId, stateId);
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
		
		// default options
		options.start = options.start || (Date.now() - options.review);
		options.end = options.end || Date.now();
		options.instance = options.instance || 'history.0';
		
		// verify that history adapter is alive / connected
		Promise.allSettled([
			this._adapter.getForeignStateAsync('system.adapter.' + options.instance + '.alive'),
			this._adapter.getForeignStateAsync('system.adapter.' + options.instance + '.connected')
		])
			.then(instances => {
				const reachable = !instances.some(instance => instance.status !== 'fulfilled' || (!instance.value || (instance.value && instance.value.val !== true)));
				
				if (!reachable) {
					throw new Error(options.instance + ' not reachable');
				}
				
				return reachable;
			})
			.then(() => {
				this._adapter.getHistory(stateId, options, (err, history) => {
					if (!err && history) {
						const hash = history.length; // _hash(history);
						
						if (this._subscribeHistory[subscriptionKey] && (options.force === true || hash !== this._subscribeHistory[subscriptionKey].hash)) {
							this._adapter.log.debug('getHistory (' + stateId + '): Update');

							this._subscribeHistory[subscriptionKey].history = history;
							this._subscribeHistory[subscriptionKey].hash = hash;
							
							this.emit(messageId, { subscriptionKey, err, hash, history });
						}
						else {
							this.emit(messageId, { subscriptionKey, err, hash, 'history': null, 'noUpdate': true });
						}
					}
					else {
						this.emit(messageId, { subscriptionKey, err, 'hash': null, 'history': null });
					}
				});
			})
			.catch(err => {
				this.emit(messageId, { subscriptionKey, err, 'hash': null, 'history': null });
			});
	}
	
	/**
	 *
	 */
	getSystemInformation(messageId) {
		this.emit(messageId, {
			'hostname': _os.hostname(),
			'architecture': _os.arch(), // possible values are 'arm', 'arm64', 'ia32', 'mips', 'mipsel', 'ppc', 'ppc64', 's390', 's390x', 'x32', and 'x64'
			//'cpus': _os.cpus(),
			'platform': _os.platform(),
			'release': _os.release(),
			//'version': _os.version()
		});
	}
}

module.exports = ioWebSocket;
