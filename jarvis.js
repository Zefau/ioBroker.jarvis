'use strict';
const adapterName = require('./io-package.json').common.name;
const utils = require('@iobroker/adapter-core'); // Get common adapter utils


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


/*
 * ADAPTER
 *
 */
function startAdapter(options)
{
	options = options || {};
	adapter = new utils.Adapter({ ...options, name: adapterName });
	
	/*
	 * ADAPTER READY
	 *
	 */
	adapter.on('ready', function()
	{
		unloaded = false;
		library = new Library(adapter);
		
		// Check Node.js Version
		let version = parseInt(process.version.substr(1, process.version.indexOf('.')-1));
		if (version <= 6) {
			return library.terminate('This Adapter is not compatible with your Node.js Version ' + process.version + ' (must be >= Node.js v7).', true);
		}
		
		// detect socket port
		const portDetection = new Promise(resolve => {
			adapter.getForeignObject('system.adapter.socketio.0', (err, obj) => {
		
				// no socket.io adapter installed
				if (obj === null) {
					adapter.getForeignObject('system.adapter.web.0', (err, obj) => {
						resolve({
							'port': obj.native.port || 8082,
							'secure': obj.native.secure !== undefined ? obj.native.secure : false,
						});
					});
				}

				// socket.io
				else {
					resolve({
						'port': obj.native.port || 8084,
						'secure': obj.native.secure !== undefined ? obj.native.secure : false,
					});
				}
			});
		});
		
		// write port to config
		portDetection.then(config => {
			adapter.log.debug('Socket port detected: ' + config.port);
			
			if (adapter.config.socketPort !== config.port || adapter.config.socketSecure !== config.secure) {
				adapter.getForeignObject('system.adapter.' + adapter.namespace, (err, obj) => {
					obj.native['socketPort'] = config.port;
					obj.native['socketSecure'] = config.secure;
					
					adapter.setForeignObject(obj._id, obj);
				});
			}
		});
	
		// all ok
		library.set(Library.CONNECTION, true);
		
		// listen for new notifications to add
		adapter.getState('notifications', (err, state) => {
			NOTIFICATIONS = (state && state.val && JSON.parse(state.val)) || [];
		});
		
		adapter.subscribeStates('addNotification');
	});

	/*
	 * STATE CHANGE
	 *
	 */
	adapter.on('stateChange', function(id, state)
	{
		adapter.log.debug('State ' + id + ' has changed: ' + JSON.stringify(state));
		adapter.setState(id, '');
		
		if (id.indexOf('.addNotification') > -1 && state && state.val) {
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
	 * ADAPTER UNLOAD
	 *
	 */
	adapter.on('unload', function(callback)
	{
		try
		{
			adapter.log.info('Adapter stopped und unloaded.');
			
			unloaded = true;
			library.resetStates();
			
			callback();
		}
		catch(e)
		{
			callback();
		}
	});

	return adapter;
};


/*
 * COMPACT MODE
 * If started as allInOne/compact mode => return function to create instance
 *
 */
if (module && module.parent)
	module.exports = startAdapter;
else
	startAdapter(); // or start the instance directly
