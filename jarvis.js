'use strict';
const adapterName = require('./io-package.json').common.name;
const utils = require('@iobroker/adapter-core'); // Get common adapter utils
const _crypto = require('crypto');
const _got = require('got');
const _fs = require('fs');


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
let NOTIFICATIONS = [];
let SETTINGS = {};
let BACKUPS = {
	'settings': {},
	'layout': {},
	'devices': {}
};


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
		['devices', 'layout', 'settings'].forEach(id => {
			adapter.readFile('jarvis', '_BACKUP_' + id.toUpperCase() + '.json', null, (err, contents) => {
				
				// trigger initial backup
				if (err) {
					adapter.getState(id, (err, state) => !err && state && state.val && backup(id, state.val));
				}
				
				// load recent backups
				else if (contents) {
					BACKUPS[id] = JSON.parse(contents);
				}
			});
		});
		
		// detect socket port
		const portDetection = new Promise(resolve => {
			adapter.getObjectView('system', 'instance', { 'startkey': 'system.adapter.socketio.', 'endkey': 'system.adapter.socketio.999' }, (err, instances) => {
				const obj = (instances && instances.rows && instances.rows[0] && instances.rows[0].value) || null;
				
				// no socket.io adapter installed
				if (obj === null) {
					adapter.getForeignObject('system.adapter.web.0', (err, obj) => {
						resolve({
							'port': (obj && obj.native && obj.native.port) || 8082,
							'secure': obj && obj.native && obj.native.secure !== undefined ? obj.native.secure : false,
						});
					});
				}

				// socket.io
				else {
					resolve({
						'port': (obj && obj.native && obj.native.port) || 8084,
						'secure': obj && obj.native && obj.native.secure !== undefined ? obj.native.secure : false,
					});
				}
			});
		});
		
		// write port to config
		portDetection.then(config => {
			adapter.log.info('Socket port detected: ' + config.port);
			
			if (adapter.config.socketPort !== config.port || adapter.config.socketSecure !== config.secure) {
				adapter.getForeignObject('system.adapter.' + adapter.namespace, (err, obj) => {
					
					if (err || !obj || !obj.native) {
						return library.terminate('Error system.adapter.' + adapter.namespace + ' not found!');
					}
					
					obj.native['socketPort'] = config.port;
					obj.native['socketSecure'] = config.secure;
					adapter.setForeignObject(obj._id, obj);
				});
			}
		});
	
		// all ok
		library.set(Library.CONNECTION, true);
		
		// create additional states and subscribe
		library.set({ 'node': 'info.data', 'role': 'json', 'description': 'Data transfer to jarvis' }, '');
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
				
				writeSettingsToStates(SETTINGS);
				adapter.setState('settings', JSON.stringify(SETTINGS), () => adapter.subscribeStates('settings*'));
			}
		});
		
		// listen for new notifications to add
		adapter.getState('notifications', (err, state) => {
			NOTIFICATIONS = (state && state.val && JSON.parse(state.val)) || [];
		});
		
		adapter.subscribeStates('addNotification');
		adapter.subscribeStates('devices');
		adapter.subscribeStates('layout');
	});

	/*
	 * STATE CHANGE
	 *
	 */
	adapter.on('stateChange', function(id, state) {
		//adapter.log.debug('State ' + id + ' has changed: ' + JSON.stringify(state));
		
		if (state === undefined || state === null || state.ack === true || state.val === undefined || state.val === null) {
			return;
		}
		
		// LOG
		if (id.indexOf('.info.log') > -1 && state.val !== '') {
			
			try {
				const log = JSON.parse(state.val);
				adapter.log[log.criticality || 'debug'](log.message);
			}
			catch(err) {}
		}
		
		// BACKUP
		if (id.substr(id.lastIndexOf('.')) === '.devices' || id.substr(id.lastIndexOf('.')) === '.layout' || id.substr(id.lastIndexOf('.')) === '.settings') {
			backup(id.substr(id.lastIndexOf('.')+1), state.val);
		}
		
		// SETTINGS
		if (id.substr(-9) === '.settings') {
			writeSettingsToStates(JSON.parse(state.val) || {});
		}
		
		// SETTING
		if (id.indexOf('.settings.') > -1) {
			const setting = id.substr(id.lastIndexOf('.settings.')+10);
			
			// update settings
			SETTINGS[setting] = state && state.val && state.val.indexOf('{') > -1 && state.val.indexOf('}') > -1 ? JSON.parse(state.val) : state.val;
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
		
		// NOTIFICATIONS
		if (id.indexOf('.addNotification') > -1 && state.val) {
			adapter.setState(id, '');
			let notification = {};
			
			// try to parse object
			try {
				notification = JSON.parse(state.val);
			}
			catch(err) {
				
				// not an object, so handle a string
				if (state.val.length < 15) {
					notification.title = state.val;
				}
				else {
					notification.content = state.val;
				}
			}
			
			// assemble notification
			notification = {
				title: '',
				content: '',
				timestamp: new Date().getTime(),
				priority: 'normal', // low, normal, high, critical,
				unread: true, // true, false
				...notification
			}
			
			NOTIFICATIONS.push(notification);
			adapter.setState('notifications', JSON.stringify(NOTIFICATIONS));
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
			
			adapter.setState('info.data', JSON.stringify({ 'data': encrypt(options.str, options.secretKey), token }));
		}
		
		// decrypt
		else if (msg.command === '_decrypt' && msg.message) {
			const options = JSON.parse(msg.message);
			const token = options.token;
			
			adapter.setState('info.data', JSON.stringify({ 'data': decrypt(options.hash, options.secretKey), token }));
		}
		
		// get file
		else if (msg.command === '_readFile' && msg.message) {
			const options = JSON.parse(msg.message);
			const token = options.token;
			
			readFile(options.file, (err, data) => {
				
				if (err) {
					adapter.setState('info.data', JSON.stringify({ 'error': { 'message': err.message }, token }));
				}
				else {
					adapter.setState('info.data', JSON.stringify({ 'data': data, token }));
				}
			});
		}
		
		// get backups
		else if (msg.command === '_backups' && msg.message) {
			library.msg(msg.from, msg.command, BACKUPS[msg.message.id], msg.callback);
		}
		
		// restore
		else if (msg.command === '_restore' && msg.message && msg.message.id && msg.message.date) {
			restore(msg.message.id, msg.message.date);
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
						adapter.setState('info.data', JSON.stringify({ 'data': res.body || '', token }));
					})
					.catch(err => {
						//adapter.log.error(err.message);
						adapter.setState('info.data', JSON.stringify({ 'error': { 'message': err.message }, token }));
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
function restore(id, date) {
	adapter.log.info('Restore ' + id + ' from ' + date + '..');
	adapter.setState(id, BACKUPS[id][date]);
}

/**
 *
 *
 */
function backup(id, data) {
	
	// add to backup
	const date = new Date();
	const key = date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).substr(-2) + '-' + ('0' + date.getDate()).substr(-2) + '_' + ('0' + date.getHours()).substr(-2) + '-' + ('0' + date.getMinutes()).substr(-2) + '-' + ('0' + date.getSeconds()).substr(-2);
	BACKUPS[id][key] = data;
	
	// delete old entries
	adapter.config.keepBackupEntries = (adapter.config.keepBackupEntries || 25)-1;
	const entries = Object.keys(BACKUPS[id]);
	
	if (entries.length > adapter.config.keepBackupEntries) {
		entries.reverse().forEach((key, i) => {
			if (i > adapter.config.keepBackupEntries) {
				delete BACKUPS[id][key];
			}
		});
	}
	
	// save backup
	adapter.log.info('Backup ' + id + '..');
	adapter.writeFile('jarvis', '_BACKUP_' + id.toUpperCase() + '.json', JSON.stringify(BACKUPS[id], null, 3));
}

/**
 *
 *
 */
function writeSettingsToStates(s) {
	
	for (let setting in s) {
		s[setting] = typeof s[setting] === 'object' ? JSON.stringify(s[setting]) : s[setting];
		
		library.set({
			'node': 'settings.' + setting,
			'description': 'Modify setting ' + setting,
			'role': 'config',
			'type': typeof s[setting],
			'write': true,
			'read': true
			
		}, s[setting]);
	}
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
