const crypto = require('crypto');

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
					this.adapter.log.error('Error initially loading notifications: ' + error.message);
					reject(error.message);
				}
			});
		});
	},
	
	/**
	 *
	 */
	handleNotification(stateId, state) {
		if (stateId && stateId.endsWith('.addNotification') && state && state.val) {
			this.adapter.setState('addNotification', '', true);
			this.addNotification(state.val);
		}
		else if (stateId && stateId.endsWith('.notifications')) {
			try {
				this.notifications = JSON.parse(state ? state.val : '[]');
			}
			catch (error) {
				this.adapter.log.warn(error.message);
			}
		}
	},
	
	/**
	 *
	 */
	addNotification(data) {
		try {
			// parse notification
			const notification = data.indexOf('{') > -1 && data.indexOf('}') > -1 ? JSON.parse(data) : { 'title': data };
			notification.message = notification.message ? notification.message.replace(/(\r\n|\r|\n)/g, '<br />') : undefined;
			
			// add further information
			notification.id = crypto.randomUUID();
			notification.ts = notification.ts || Date.now();
			
			if (notification.devices) {
				notification.devices = Array.isArray(notification.devices) ? notification.devices : [ notification.devices ];
			}
			
			// add to list of all notifications
			if (notification.state !== 'delete') {
				const maxEntries = this.settings.maxNotifications || 500;
				
				this.notifications.push(notification);
				this.adapter.setState('notifications', JSON.stringify(this.notifications.slice(-(maxEntries + 1))), true);
			}
			
			// emit notification to clients (or add to list of unread notifications if client is not reachable)
			const clients = notification.devices || Object.keys(this.clients);
			clients.forEach(clientId => {
				const client = this.clients[clientId];
				
				// get connection state
				this.adapter.getState('clients.' + client.ns + '.connected', (err, state) => {
					// is connected
					if (!err && state && state.val === true) {
						this.adapter.log.debug('Client with ID ' + clientId + ' online. Notification delivered.');
						this.send({ clientId }, 'notification', notification); // credentials / clientId, action, data = {}, messageId, key = 'message'
					}
					
					// not connected, thus, save for later
					else {
						client.unreadNotifications.push(notification);
						this.adapter.log.debug('Client with ID ' + clientId + ' not online, thus saving notification for later (' + client.unreadNotifications.length + ' saved).');
					}
				});
			});
		}
		catch (error) {
			this.adapter.log.error('Error adding notification: ' + error.message);
		}
	}
};
