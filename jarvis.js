'use strict';
const adapterName = require('./io-package.json').common.name;
const utils = require('@iobroker/adapter-core'); // Get common adapter utils
const _crypto = require('crypto');
const _got = require('got');
const _fs = require('fs');
const _path = require('path');
const _schedule = require('node-schedule');


/*
 * internal libraries
 */
const Library = require('./lib/library.js');


/*
 * variables initiation
 */
let adapter;
let library;
let unloaded;
let notification = '';

let NOTIFICATIONS = [];
let SETTINGS = {};
let CLIENTS = [];
let BACKUPS = {
	'styles': {},
	'settings': {},
	'layout': {},
	'devices': {}
};

const BACKUP_STATES = [
	{ 'state': 'devices' },
	{ 'state': 'layout' },
	{ 'state': 'settings',},
	{ 'state': 'css', 'id': 'styles' }
];

/*
 * allSettled polyfill
 * @see https://medium.com/trabe/using-promise-allsettled-now-e1767d43e480
 */
if (!Promise.allSettled) {
	Promise.allSettled = promises =>
		Promise.all(
			promises.map((promise, i) =>
				promise
					.then(value => ({
						status: "fulfilled",
						value,
					}))
					.catch(reason => ({
						status: "rejected",
						reason,
					}))
			)
		);
}

/*
 * ADAPTER
 *
 */
function startAdapter(options) {
	options = options || {};
	adapter = new utils.Adapter({ ...options, name: adapterName });
	
	/*
	 * ADAPTER READY
	 *
	 */
	adapter.on('ready', function() {
		unloaded = false;
		library = new Library(adapter);
		
		// Check Node.js Version
		let version = parseInt(process.version.substr(1, process.version.indexOf('.')-1));
		if (version <= 6) {
			return library.terminate('This Adapter is not compatible with your Node.js Version ' + process.version + ' (must be >= Node.js v7).', true);
		}
		
		// create backup object
		BACKUP_STATES.forEach(s => {
			s.id = s.id || s.state;
			
			const file = _path.join(__dirname, '..', '..', 'iobroker-data', 'jarvis', adapter.instance.toString(), '_BACKUP_' + s.id.toUpperCase() + '.json');
			_fs.readFile(file, (err, contents) => {
				
				// create dir
				const dir = _path.dirname(file);
				if (!_fs.existsSync(dir)){
					_fs.mkdirSync(dir, { recursive: true });
				}

				// trigger initial backup
				if (err) {
					adapter.log.info('No Backup found for ' + s.id + ', thus backing up initially.');
					adapter.getState(s.state, (err, state) => !err && state && state.val && backup(s, state.val));
				}
				
				// load recent backups
				else if (contents) {
					adapter.log.info('Found Backups for ' + s.id + '.');
					BACKUPS[s.id] = JSON.parse(contents);
				}
			});
		});
		
		// detect socket port
		const portDetection = new Promise(resolve => {
			adapter.getObjectView('system', 'instance', { 'startkey': 'system.adapter.socketio.', 'endkey': 'system.adapter.socketio.999' }, (err, instances) => {
				const obj = (instances && instances.rows && instances.rows[0] && instances.rows[0].value) || null;
				let res = {}
				
				// socket.io
				if (obj !== null) {
					res = {
						'socket': (obj && obj.native && obj.native.port) || 8084,
						'secure': obj && obj.native && obj.native.secure !== undefined ? obj.native.secure : false,
					}
				}
				
				// detect web port and - if no socket.io adapter is installed - socket port
				adapter.getForeignObject('system.adapter.web.0', (err, obj) => {
					resolve({
						'web': (obj && obj.native && obj.native.port) || 8082,
						'socket': (obj && obj.native && obj.native.port) || 8082,
						'secure': obj && obj.native && obj.native.secure !== undefined ? obj.native.secure : false,
						...res
					});
				});
			});
		});
		
		// write port to config
		portDetection.then(config => {
			adapter.log.info('Socket port detected: ' + config.socket);
			
			if (adapter.config.autoDetect === true && (adapter.config.webPort !== config.web || adapter.config.socketPort !== config.socket || adapter.config.socketSecure !== config.secure)) {
				adapter.getForeignObject('system.adapter.' + adapter.namespace, (err, obj) => {
					
					if (err || !obj || !obj.native) {
						return library.terminate('Error system.adapter.' + adapter.namespace + ' not found!');
					}
					
					obj.native['webPort'] = config.web;
					obj.native['socketPort'] = config.socket;
					obj.native['socketSecure'] = config.secure;
					adapter.setForeignObject(obj._id, obj);
				});
			}
		});
	
		// all ok
		library.set(Library.CONNECTION, true);
		
		// create additional states and subscribe
		library.set({ 'node': 'info.data', 'role': 'json', 'description': 'Data transfer to jarvis' }, '');
		//adapter.subscribeStates('info.data');
		
		library.set({ 'node': 'info.log', 'role': 'text', 'description': 'Log Handler' }, '');
		adapter.subscribeStates('info.log');
		
		// write settings to states
		adapter.getState('settings', (err, state) => {
			
			if (!err && state && state.val) {
				SETTINGS = JSON.parse(state.val) || {};
				
				// random token
				SETTINGS.token = SETTINGS.token || _crypto.randomBytes(16).toString('hex');
				
				// usage data option
				SETTINGS.sendUsageData = adapter.config.sendUsageData !== undefined ? adapter.config.sendUsageData : true;
				
				adapter.setState('settings', JSON.stringify(SETTINGS));
				writeSettingsToStates(SETTINGS, () => adapter.subscribeStates('settings*'));
			}
		});
		
		// get clients
		adapter.getState('info.connected', (err, state) => {
			
			try {
				CLIENTS = JSON.parse(state.val);
			}
			catch(err) {}
		});
		
		// listen for new notifications to add
		adapter.getState('addNotification', (err, state) => {
			notification = (state && state.val && JSON.parse(state.val)) || '';
		});
		
		adapter.getState('notifications', (err, state) => {
			NOTIFICATIONS = (state && state.val && JSON.parse(state.val)) || [];
		});
		
		adapter.subscribeStates('addNotification');
		
		// BACKUP
		adapter.subscribeStates('devices');
		adapter.subscribeStates('layout');
		adapter.subscribeStates('css');
		
		// EVENTS
		_schedule.scheduleJob('0 0 0 * * *', () => {
			adapter.setState('info.data', JSON.stringify({ 'event': 'time:midnight' }), true);
		});
	});

	/*
	 * STATE CHANGE
	 *
	 */
	adapter.on('stateChange', function(id, state) {
		//adapter.log.info('State ' + id + ' has changed: ' + JSON.stringify(state));
		
		if (state === undefined || state === null || state.ack === true || state.val === undefined || state.val === null) {
			return;
		}
		
		/*
		// DATA TRANSFER
		if (id.indexOf('.info.data') > -1 && state.val !== '') {
			
			try {
				const message = JSON.parse(state.val);
				
				// CLIENT CONNECTED
				if (message['client.connected']) {
					adapter.log.info('Client connected: ' + message['client.connected']);
					
					if (CLIENTS.indexOf(message['client.connected']) === -1) {
						CLIENTS.push(message['client.connected']);
					}
				}
				
				// CLIENT DISCONNECTED
				else if (message['client.disonnected']) {
					adapter.log.info('Client disconnected: ' + message['client.disconnected']);
					
					const findClient = CLIENTS.indexOf(message['client.disconnected']);
					if (findClient > -1) {
						CLIENTS.splice(1, findClient);
					}
				}
			}
			catch(err) {}
		}*/
		
		// LOG
		if (id.indexOf('.info.log') > -1 && state.val !== '') {
			
			try {
				const log = JSON.parse(state.val);
				adapter.log[log.criticality || 'debug'](log.message);
			}
			catch(err) {}
		}
		
		// NOTIFICATION
		if (id.indexOf('.addNotification') > -1) {
			let oldNotification = notification;
			
			// add notification only if jarvis didn't do that job (because it was closed)
			// this means that the notification which was entered before (and will be overwritten due to a new notification) will be added
			try {
				notification = JSON.parse(state.val);
				//adapter.log.info(JSON.stringify(oldNotification));
				//adapter.log.info(JSON.stringify(notification));
				
				if (oldNotification !== '' && notification !== '') {
					NOTIFICATIONS.push(oldNotification);
					adapter.setState('notifications', JSON.stringify(NOTIFICATIONS));
				}
				else if (oldNotification !== '' && notification === '') {
					oldNotification = '';
				}
			}
			catch(err) {
				notification = '';
			}
		}
		
		// BACKUP
		const foundIndex = BACKUP_STATES.findIndex(s => s.state === id.substr(id.lastIndexOf('.')+1));
		if (foundIndex > -1) {
			backup(BACKUP_STATES[foundIndex], state.val);
		}
		
		// SETTINGS
		if (id.substr(-9) === '.settings') {
			writeSettingsToStates(JSON.parse(state.val) || {});
		}
		
		// SETTING
		if (id.indexOf('.settings.') > -1) {
			const setting = id.substr(id.lastIndexOf('.settings.')+10);
			
			// update settings
			SETTINGS[setting] = state && state.val && state.val.toString().indexOf('{') > -1 && state.val.toString().indexOf('}') > -1 ? JSON.parse(state.val) : state.val;
			adapter.setState('settings', JSON.stringify(SETTINGS));
			
			// update adapter config
			if (adapter.config[setting] !== undefined) {
				
				adapter.getForeignObject('system.adapter.' + adapter.namespace, (err, obj) => {
					
					if (err || !obj || !obj.native) {
						return library.terminate('Error system.adapter.' + adapter.namespace + ' not found!');
					}
					
					obj.native[setting] = state.val;
					adapter.setForeignObject(obj._id, obj);
				});
			}
		}
	});
	
	/*
	 * MESSAGE
	 *
	 */
	adapter.on('message', function(msg) {
		
		// encrypt
		if (msg.command === '_encrypt' && msg.message) {
			const options = JSON.parse(msg.message);
			const token = options.token;
			
			adapter.setState('info.data', JSON.stringify({ 'data': encrypt(options.str, options.secretKey), token }), true);
		}
		
		// decrypt
		else if (msg.command === '_decrypt' && msg.message) {
			const options = JSON.parse(msg.message);
			const token = options.token;
			
			adapter.setState('info.data', JSON.stringify({ 'data': decrypt(options.hash, options.secretKey), token }), true);
		}
		
		// get file
		else if (msg.command === '_readFile' && msg.message) {
			const options = JSON.parse(msg.message);
			const token = options.token;
			
			readFile(options.file, (err, data) => {
				
				if (err) {
					adapter.setState('info.data', JSON.stringify({ 'error': { 'message': err.message }, token }), true);
				}
				else {
					adapter.setState('info.data', JSON.stringify({ 'data': data, token }), true);
				}
			});
		}
		
		// get backups
		else if (msg.command === '_backups' && msg.message) {
			library.msg(msg.from, msg.command, BACKUPS[msg.message.id], msg.callback);
		}
		
		// restore
		else if (msg.command === '_restore' && msg.message && msg.message.id && msg.message.state && msg.message.date) {
			restore(msg.message.id, msg.message.state, msg.message.date);
		}
		
		// request
		else if (msg.command === '_request' && msg.message) {
			
			try {
				const options = JSON.parse(msg.message);
				const token = options.token;
				delete options.token;
				
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
						adapter.setState('info.data', JSON.stringify({ 'data': res.body || '', token }), true);
					})
					.catch(err => {
						//adapter.log.error(err.message);
						adapter.setState('info.data', JSON.stringify({ 'error': { 'message': err.message }, token }), true);
					});
			}
			catch(err) {
				adapter.log.warn(err.message);
			}
		}
	});
	
	/*
	 * ADAPTER UNLOAD
	 *
	 */
	adapter.on('unload', function(callback) {
		
		try {
			adapter.log.info('Adapter stopped und unloaded.');
			
			unloaded = true;
			library.resetStates();
			
			callback();
		}
		catch(e) {
			callback();
		}
	});

	return adapter;
}

/**
 *
 *
 */
function readFile(file, cb) {
	
	_fs.readFile(file, 'utf8', (err, data) => {
		if (err) {
			cb(err);
			return;
		}
		
		cb(null, data);
	});
}

/**
 *
 *
 */
function encrypt(str, secretKey, algorithm = 'AES-256-CBC') {
	
	try {
		const iv = _crypto.randomBytes(16).toString('hex').substr(0,16);
		const cipher = _crypto.createCipheriv(algorithm, _crypto.createHash('sha256').update(secretKey).digest('hex').substr(0,32), iv);
		const encrypted = Buffer.from(iv).toString('base64').substr(0,24) + cipher.update((typeof str === 'object' ? JSON.stringify(str) : str), 'utf8', 'base64') + cipher.final('base64');
		return encrypted;
	}
	catch(err) {
		return str;
	}
}

/**
 *
 *
 */
function decrypt(hash, secretKey, algorithm = 'AES-256-CBC') {
	
	try {
		const decipher = _crypto.createDecipheriv(algorithm, _crypto.createHash('sha256').update(secretKey).digest('hex').substr(0,32), Buffer.from(hash.substr(0,24), 'base64'));
		const decrypted = Buffer.concat([decipher.update(Buffer.from(hash.substr(24), 'base64')), decipher.final()]);
		return decrypted.toString();
	}
	catch(err) {
		return hash;
	}
}

/**
 *
 *
 */
function restore(id, state, date) {
	adapter.log.info('Restore ' + id + ' from ' + date + '..');
	adapter.setState(state, BACKUPS[id][date]);
}

/**
 *
 *
 */
function backup(s, data) {
	s.id = s.id || s.state;
	
	// add to backup
	const date = new Date();
	const key = date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).substr(-2) + '-' + ('0' + date.getDate()).substr(-2) + '_' + ('0' + date.getHours()).substr(-2) + '-' + ('0' + date.getMinutes()).substr(-2) + '-' + ('0' + date.getSeconds()).substr(-2);
	BACKUPS[s.id][key] = data;
	
	// delete old entries
	adapter.config.keepBackupEntries = (adapter.config.keepBackupEntries || 25)-1;
	const entries = Object.keys(BACKUPS[s.id]);
	
	if (entries.length > adapter.config.keepBackupEntries) {
		entries.reverse().forEach((key, i) => {
			if (i > adapter.config.keepBackupEntries) {
				delete BACKUPS[s.id][key];
			}
		});
	}
	
	// save backup
	adapter.log.info('Backup ' + s.id + '..');
	
	const file = _path.join(__dirname, '..', '..', 'iobroker-data', 'jarvis', adapter.instance.toString(), '_BACKUP_' + s.id.toUpperCase() + '.json');
	_fs.writeFile(file, JSON.stringify(BACKUPS[s.id], null, 3), err => err && adapter.log.error(err));
}

/**
 *
 *
 */
function writeSettingsToStates(s, cb = null) {
	
	let promises = [];
	
	for (let setting in s) {
		let val = typeof s[setting] === 'object' ? JSON.stringify(s[setting]) : s[setting];
		
		promises.push(new Promise((resolve, reject) => {
			
			library.set({
				'node': 'settings.' + setting,
				'description': 'Modify setting ' + setting,
				'role': 'config',
				'type': typeof val,
				'write': true,
				'read': true
				
			}, val, { 'callback': (err, res) => err ? reject(err) : resolve(res) });
		}));
	}
	
	Promise.allSettled(promises).then(res => cb && cb());
}

/*
 * COMPACT MODE
 * If started as allInOne/compact mode => return function to create instance
 *
 */
if (module && module.parent)
	module.exports = startAdapter;
else
	startAdapter(); // or start the instance directly
