'use strict';
const adapterName = require('./io-package.json').common.name;
const utils = require('@iobroker/adapter-core'); // Get common adapter utils
const _crypto = require('crypto');
const _got = require('got');
const _fs = require('fs');
const _path = require('path');
const { v4: _uuid } = require('uuid');
const _platform = require('platform');

/*
 * internal libraries
 */
const Library = require('./lib/library.js');
const ioWebSocket = require('./lib/websocket.io.js');


/*
 * variables initiation
 */
let adapter;
let library;
let socket;
let unloaded;

let notification = '';
let NotificationTimer = null;

let NOTIFICATIONS = [];

let SETTINGS = {};
let CLIENTS = {};
let BACKUPS = {
	'styles': {},
	'settings': {},
	'layout': {},
	'widgets': {},
	'devices': {}
};

const BACKUP_STATES = [
	{ 'state': 'devices' },
	{ 'state': 'layout' },
	{ 'state': 'widgets' },
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
					_fs.mkdirSync(dir, { 'recursive': true });
				}

				// trigger initial backup
				if (err) {
					adapter.log.info('No Backup found for ' + s.id + ', thus backing up initially.');
					adapter.getState(s.state, (err, state) => !err && state && state.val && backup(s, state.val));
				}
				
				// load recent backups
				else if (contents) {
					adapter.log.info('Found Backups for ' + s.id + '.');
					
					try {
						BACKUPS[s.id] = JSON.parse(contents);
					}
					catch(err) {
						adapter.log.error('Error loading recent backups (' + s.id + '): ' + err.message);
					}
				}
			});
		});
		
		// detect and write web port to config
		let configPromises = [];
		const defaultSocketPort = 8400 + adapter.instance;
		
		configPromises.push(new Promise(resolve => {
			adapter.getForeignObject('system.adapter.web.0', (err, obj) => {
				
				const config = {
					'webPort': (obj && obj.native && obj.native.port) || 8082,
					'socketSecure': obj && obj.native && obj.native.secure !== undefined ? obj.native.secure : false
				}
				
				const certificates = {
					'certPublic': obj && obj.native && obj.native.certPublic !== undefined ? obj.native.certPublic : '',
					'certPrivate': obj && obj.native && obj.native.certPrivate !== undefined ? obj.native.certPrivate : '',
					'certChained': obj && obj.native && obj.native.certChained !== undefined ? obj.native.certChained : '',
				}
				
				// write config to jarvis
				if (
						(adapter.config.certPublic !== certificates.certPublic || adapter.config.certPrivate !== certificates.certPrivate || adapter.config.certChained !== certificates.certChained) ||
						(adapter.config.autoDetect === true && (adapter.config.webPort !== config.webPort || adapter.config.socketPort !== defaultSocketPort || adapter.config.socketSecure !== config.socketSecure))
					) {
					
					adapter.getForeignObject('system.adapter.' + adapter.namespace, (err, obj) => {
						
						if (err || !obj || !obj.native) {
							return library.terminate('Error system.adapter.' + adapter.namespace + ' not found!');
						}
						
						adapter.log.debug('Remember certificates...');
						obj.native = {
							...obj.native,
							...certificates
						}
						
						if (adapter.config.autoDetect === true) {
							adapter.log.debug('Write default config to jarvis...');
							
							obj.native = {
								...obj.native,
								...config,
								'socketPort': defaultSocketPort
							}
						}
						
						adapter.setForeignObject(obj._id, obj);
					});
				}
				
				resolve(config);
			});
		}));
		
		// get certificates
		if (adapter.config.certPublic && adapter.config.certPrivate) {
			configPromises.push(new Promise(resolve => {
				adapter.getCertificates(adapter.config.certPublic, adapter.config.certPrivate, adapter.config.certChained, (err, certificates, leConfig) => {
					resolve(certificates);
				});
			}));
		}
		
		// open web socket
		Promise.all(configPromises)
			.then(res => {
				const certificates = adapter.config.socketSecure && res[1] ? res[1] : null;
				const port = adapter.config.autoDetect === true ? defaultSocketPort : (adapter.config.socketPort || defaultSocketPort);
				
				// open socket
				socket = new ioWebSocket(adapter, { port, certificates });
				
				// listen for new clients
				socket.on('CLIENT_NEW', client => {
					CLIENTS[client.id] = CLIENTS[client.id] || {
						'path': 'jarvis.' + adapter.instance + '.clients.' + client.id,
						'unreadNotifications': []
					}
				});
				
				// listen for client list
				socket.on('CLIENT_LIST', clients => {
					adapter.setState('clients.connected', JSON.stringify(clients), true);
				});
			})
			.catch(error => adapter.log.error(error.message || error));
		
		// all ok
		library.set(Library.CONNECTION, true);
		
		// write settings to states
		adapter.getState('settings', (err, state) => {
			
			if (!err && state && state.val) {
				SETTINGS = JSON.parse(state.val) || {};
				
				// random token
				SETTINGS.token = SETTINGS.token || _crypto.randomBytes(16).toString('hex');
				
				// usage data option
				SETTINGS.sendUsageData = adapter.config.sendUsageData !== undefined ? adapter.config.sendUsageData : true;
				
				adapter.setState('settings', JSON.stringify(SETTINGS), true);
				writeSettingsToStates(SETTINGS, () => adapter.subscribeStates('settings*'));
			}
		});
		
		// initially load notifications
		adapter.getState('notifications', (err, state) => {
			NOTIFICATIONS = (state && state.val && JSON.parse(state.val)) || [];
		});
		
		// initially load available clients
		adapter.getDevices((err, clients) => { // [{"type":"device","common":{"name":"::ffff:192.168.178.50"},"native":{},"from":"system.adapter.jarvis.0","user":"system.user.admin","ts":1621149128890,"_id":"jarvis.0.clients.ffff192-168-178-50","acl":{"object":1636,"owner":"system.user.admin","ownerGroup":"system.group.administrator"}}]
			
			clients.forEach(client => {
				const clientId = client._id.substr(client._id.lastIndexOf('.')+1);
				
				adapter.getState(client._id + '.newNotifications', (err, state) => {
					CLIENTS[clientId] = {
						'path': client._id,
						'unreadNotifications': []
					}
				});
			});
		});
	});

	/*
	 * STATE CHANGE
	 *
	 */
	adapter.on('stateChange', function(id, state) {
		
		// SKIP ON INVALID STATE
		if (state === undefined || state === null || state.val === undefined || state.val === null) {
			return;
		}
		
		// CLIENT CONNECTION STATE
		if (id.startsWith('jarvis.') && id.indexOf('.clients.') > -1 && id.endsWith('.connected') && state && state.val === true) {
			const [ , , , clientId,] = id.split('.');
			
			// push unread notifications
			if (CLIENTS[clientId].unreadNotifications && CLIENTS[clientId].unreadNotifications.length > 0 && socket.sockets[clientId]) {
				socket.sockets[clientId].emit('notification', CLIENTS[clientId].unreadNotifications);
				CLIENTS[clientId].unreadNotifications = [];
			}
		}
		
		// PARSE USER AGENT
		if (id.startsWith('jarvis.') && id.indexOf('.clients.') > -1 && id.endsWith('.userAgent') && state && state.val) {
			const [ , , , clientId,] = id.split('.');
			const platform = _platform.parse(state.val);
			adapter.setState(id.substr(0, id.lastIndexOf('.')) + '.userBrowser', JSON.stringify(platform), true);
		}
		
		// SKIP ON ACK
		if (state.ack === true) {
			return;
		}
		
		// NOTIFICATIONS
		if (id.indexOf('.notifications') > -1) {
			NOTIFICATIONS = (state && state.val && JSON.parse(state.val)) || [];
		}
		
		// ADD NOTIFICATION
		if (id.indexOf('.addNotification') > -1 && state && state.val) {
			adapter.setState('addNotification', '', true);
			
			try {
				// parse notification
				notification = state.val.indexOf('{') > -1 && state.val.indexOf('}') > -1 ? JSON.parse(state.val) : { 'title': state.val };
				
				if (Array.isArray(notification) && notification.length === 1) {
					notification = notification[0];
				}
				else if (Array.isArray(notification) && notification.length > 1) {
					notification = notification[0];
					adapter.log.warn('Only single notification allowed for newly added notifications. Took first one and dropped the rest.');
				}
				
				// add further information
				notification.id = _uuid();
				notification.ts = notification.ts || Date.now();
				
				if (notification.devices) {
					notification.devices = Array.isArray(notification.devices) ? notification.devices : [ notification.devices ];
				}
				
				// add to list of all notifications
				NOTIFICATIONS.push(notification);
				adapter.setState('notifications', JSON.stringify(NOTIFICATIONS), true);
				
				// emit notification to clients (or add to list of unread notifications if client is not reachable)
				for (let clientId in CLIENTS) {
					
					// either emit to all devices or only to specific ones
					if (!notification.devices || notification.devices.includes(clientId)) {
						
						// get connection state
						adapter.getState(CLIENTS[clientId].path + '.connected', (err, state) => {
							
							// is connected
							if (!err && state && state.val === true && socket.sockets[clientId]) {
								socket.sockets[clientId].emit('notification', notification);
							}
							
							// not connected, thus, save for later
							else {
								CLIENTS[clientId].unreadNotifications.push(notification);
							}
						});
					}
				}
			}
			catch(err) {
				adapter.log.error(err.message);
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
			adapter.setState('settings', JSON.stringify(SETTINGS), true);
			
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
		
		// get backups
		if (msg.command === '_backups' && msg.message) {
			library.msg(msg.from, msg.command, BACKUPS[msg.message.id], msg.callback);
		}
		
		// restore
		else if (msg.command === '_restore' && msg.message && msg.message.id && msg.message.state && msg.message.date) {
			restore(msg.message.id, msg.message.state, msg.message.date);
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
function emitNotification() {
	
}


/**
 *
 *
 */
function restore(id, state, date) {
	adapter.log.info('Restore ' + id + ' from ' + date + '..');
	adapter.setState(state, BACKUPS[id][date], true);
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
