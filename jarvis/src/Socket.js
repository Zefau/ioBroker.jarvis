import EventEmitter from 'events';
import io from 'socket.io-client';


/**
 * Class for Socket.io conncetion handling.
 *
 * @description This is based on an implementation @GermanBluefox (https://github.com/GermanBluefox), see https://github.com/ioBroker/adapter-react/blob/master/src/Connection.js
 *				Only required functions are taken from source class. Major change is that all events are emitted, so proper error handling is possible in the App.
 *
 *
 * @param	{String}		url
 * @param	{Object}		options
 * @return	{Socket}
 * @see https://github.com/ioBroker/adapter-react/blob/master/src/Connection.js
 *
 */
export default class Socket extends EventEmitter {
	
	constructor(url = null, options = {}) {
		super();
		
		// socket connection
		this.socket = io(url, { timeout: 10000, ...options, query: 'ws=true' });
		this.statesSubscribes = {}; // subscribed states
		
		/*
		 * API events
		 * @see https://github.com/socketio/socket.io-client/blob/HEAD/docs/API.md#socket
		 *
		 */
		// connect
		this.socket.on('connect', () => this.emit('connect'));
		
		// reconnect: Fired upon a successful reconnection.
		this.socket.on('reconnect', attempts => this.emit('reconnect', attempts));
		
		// reconnect_error: Fired upon a reconnection attempt error.
		this.socket.on('reconnect_error', error => this.emit('error', { 'type': 'reconnect', 'event': 'reconnect_error', 'message': error.message }));
		
		// reconnect_failed: Fired upon a reconnection attempt error.
		this.socket.on('reconnect_failed', () => this.emit('error', { 'type': 'reconnect', 'event': 'reconnect_failed', 'message': 'Reconnection failed!' }));
		
		// discconect
		this.socket.on('disconnect', reason => this.emit('disconnect', reason));
		
		// connect_error
		this.socket.on('connect_error', error => this.emit('error', { 'type': 'connect', 'event': 'connect_error', 'message': error.message }));
		
		// connect_timeout
		this.socket.on('connect_timeout', () => this.emit('error', { 'type': 'connect', 'event': 'connect_timeout', 'message': 'Connect ran into timeout!' }));
		
		// error
		this.socket.on('error', error => this.emit('error', { 'type': 'error', 'event': 'error', 'message': error.message }));
		
		/*
		 * ioBroker events
		 *
		 */
		this.socket.on('stateChange', (id, state) => setTimeout(() => this.stateChange(id, state), 0));
	}
	
	/**
	 * Subscribes to a state by setting a callback.
	 *
	 */
	subscribeState(id, cb) {
		
		if (!this.statesSubscribes[id]) {
			let reg = id
				.replace(/\./g, '\\.')
				.replace(/\*/g, '.*')
				.replace(/\(/g, '\\(')
				.replace(/\)/g, '\\)')
				.replace(/\+/g, '\\+')
				.replace(/\[/g, '\\[');

			if (reg.indexOf('*') === -1) {
				reg += '$';
			}
			
			this.statesSubscribes[id] = { reg: new RegExp(reg), cbs: [cb] };
			
			if (this.socket.connected) {
				this.socket.emit('subscribe', id);
			}
		}
		else {
			this.statesSubscribes[id].cbs.indexOf(cb) === -1 && this.statesSubscribes[id].cbs.push(cb);
		}
	}
	
	/**
	 * Fires pre-registered callbacks (via subscribeState) upon state change.
	 *
	 */
	stateChange(id, state) {
		
		id = id ? id.replace(/[\s'"]/g, '_') : '';
		for (const task in this.statesSubscribes) {
			if (this.statesSubscribes.hasOwnProperty(task) && this.statesSubscribes[task].reg.test(id)) {
				this.statesSubscribes[task].cbs.forEach(cb => cb(id, state));
			}
		}
	}
	
	/**
	 * Gets a state.
	 *
	 */
	getState(id, cb) {
		
		if (!cb) {
			return new Promise((resolve, reject) => this.getState(id, (err, state) => err ? reject(err) : resolve(state)));
		} else {
			this.socket.emit('getState', id, cb);
		}
	}
	
	/**
	 * Gets the state history.
	 *
	 */
	getStateHistory(id, options, cb) {
		
		if (typeof options === 'function') {
			cb = options;
			options = {};
		}
		
		if (!cb) {
			return new Promise((resolve, reject) => this.getStateHistory(id, options, (err, state) => err ? reject(err) : resolve(state)));
		} else {
			this.socket.emit('getHistory', id, options, cb);
		}
	}
	
	/**
	 * Sets a state.
	 *
	 */
	setState(id, val, cb) {
		
		if (!cb) {
			return new Promise((resolve, reject) => this.setState(id, val, err => err ? reject(err) : resolve()));
		} else {
			this.socket.emit('setState', id, val, cb);
		}
	}
}
