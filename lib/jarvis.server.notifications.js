const { v4: _uuid } = require('uuid');

module.exports = {
	/**
	 *
	 */
	loadNotifications() {
		return new Promise((resolve, reject) => {
			this.adapter.getState('notifications', (err, state) => {
				try {
					this.notifications = (state && state.val && JSON.parse(state.val)) || [];
					resolve();
				}
				catch (error) {
					adapter.log.error('Error initially loading notifications: ' + error.message);
					reject(error.message);
				}
			});
		});
	},
	
	/**
	 *
	 */
	handleNotification(stateId, state) {
		if (state.ack === true && stateId.indexOf('.addNotification') !== -1 && state && state.val) {
			this.adapter.setState(stateId, '', true);
			this.addNotification(stateId, state);
		}
		
		else if (stateId.indexOf('.notifications') !== -1) {
			this.updateNotifications(stateId, state);
		}
	},
	
	/**
	 *
	 */
	addNotification(stateId, state) {
		try {
			// parse notification
			const notification = state.val.indexOf('{') > -1 && state.val.indexOf('}') > -1 ? JSON.parse(state.val) : { 'title': state.val };
			notification.message = notification.message.replace(/(\r\n|\r|\n)/g, '<br />');
			
			// add further information
			notification.id = _uuid();
			notification.ts = notification.ts || Date.now();
			
			if (notification.devices) {
				notification.devices = Array.isArray(notification.devices) ? notification.devices : [ notification.devices ];
			}
			
			// add to list of all notifications
			if (notification.state !== 'delete') {
				const maxEntries = SETTINGS.maxNotifications || 1000;
				
				NOTIFICATIONS.push(notification);
				adapter.setState('notifications', JSON.stringify(NOTIFICATIONS.slice(-(maxEntries + 1))), true);
			}
			
			/*
			// emit notification to clients (or add to list of unread notifications if client is not reachable)
			CLIENTS.forEach(client => {
				const clientId = client.id;
				
				// either emit to all devices or only to specific ones
				if (!notification.devices || notification.devices.includes(clientId)) {
					
					// get connection state
					adapter.getState(client.path + '.connected', (err, state) => {
						// is connected
						if (!err && state && state.val === true) {
							adapter.log.debug('Client with ID ' + clientId + ' online. Notification delivered.');
							server.send(clientId, 'notification', 'newNotification', notification);
						}
						
						// not connected, thus, save for later
						else {
							client.unreadNotifications = client.unreadNotifications || [];
							client.unreadNotifications.push(notification);
							adapter.log.debug('Client with ID ' + clientId + ' not online, thus saving notification for later (' + client.unreadNotifications.length + ' saved).');
						}
					});
				}
			});
			*/
		}
		catch(error) {
			this.adapter.log.error('Error adding notification: ' + error.message);
		}
	},
	
	/**
	 *
	 */
	updateNotifications(stateId, state) {
		try {
			this.notifications = (state && state.val && JSON.parse(state.val)) || [];
			
			
			
			
			
			
			
			
			// emit notifications
			CLIENTS.forEach(client => {
				// get connection state
				adapter.getState(client.path + '.connected', (err, state) => {
					
					// is connected
					if (!err && state && state.val === true) {
						adapter.log.debug('Client with ID ' + clientId + ' online. List of notifications updated.');
						server.send('notifications', 'allNotifications', JSON.stringify(NOTIFICATIONS));
					}
				});
			}
		}
		catch (error) {
			this.adapter.log.error('Error setting notifications: ' + error.message);
		}
	}
};
