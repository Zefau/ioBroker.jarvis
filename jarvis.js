'use strict';
const adapterName = require('./io-package.json').common.name;
const utils = require('@iobroker/adapter-core'); // Get common adapter utils


/*
 * internal libraries
 */
const Library = require(__dirname + '/lib/library.js');


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
 * If started as allInOne/compact mode => returnfunction to create instance
 *
 */
if (module && module.parent)
	module.exports = startAdapter;
else
	startAdapter(); // or start the instance directly
