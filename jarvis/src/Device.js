import React from 'react';
import Function from './Function';
import moment from 'moment';


/**
 * Device
 *
 * @param	{Object}	deviceProperties
 * @param	{String}	deviceProperties.id
 * @param	{String}	deviceProperties.name
 * @param	{String}	[deviceProperties.room=null]
 * @param	{String}	deviceProperties.function
 * @param	{Object}	deviceProperties.states
 * @param	{Object}	[deviceProperties.attributes={}]
 * @param	{Object}	deviceProperties.options
 * @param	{Object}	socket
 * @return	{Device}
 *
 */
export default class Device extends Function {
	
	constructor(deviceProperties, socket, defaults = { 'states': {}, 'styles': {} }) {
		try {
			super(deviceProperties.function);
		}
		catch(err) {
			throw new Error('No function given for device ' + deviceProperties.name + '!');
		}
		
		this.id = deviceProperties.id;
		this.name = deviceProperties.name;
		
		this.room = deviceProperties.room || null;
		
		this.states = deviceProperties.states;
		this.options = deviceProperties.options;
		this.attributes = deviceProperties.attributes || {};
		
		this.socket = socket;
		
		if (!this.options || typeof this.options !== 'object' || Object.keys(this.options).length === 0) {
			throw new Error('Device' + (deviceProperties.id || deviceProperties.name ? ' ' + (deviceProperties.name || deviceProperties.id) : '') + ' not defined for jarvis!');
		}
		else if (!this.states || typeof this.states !== 'object' || Object.keys(this.states).length === 0) {
			throw new Error('Insufficent properties provided' + (deviceProperties.id || deviceProperties.name ? ' for device ' + (deviceProperties.name || deviceProperties.id) : '') + ' (no states defined)!');
		}
		else if (!this.id || !this.name || !this.function) {
			throw new Error('Insufficent properties provided' + (deviceProperties.id || deviceProperties.name ? ' for device ' + (deviceProperties.name || deviceProperties.id) : '') + ' (no id, name or function defined)!');
		}
		else if (!this.socket) {	
			throw new Error('No socket given!');
		}
		
		this.defaults = defaults;
		this._setProperties();
		this.stateSubscriptions = [];
	}
	
	/**
	 *
	 *
	 * @return	{Object|String}
	 * @private
	 */
	_getStateFromKey(stateKey = null) {
		
		// already a state object
		if (stateKey && typeof stateKey === 'object') {
			return stateKey;
		}
		
		// get state object
		let s = this.states[stateKey || this.primaryStateKey];
		
		if (!s || !s.state) {
			return 'Incorrect or non-defined state key for device ' + this.name + '!';
		}
		else if (typeof s.state == 'string') {
			s.state = { 'node': s.state };
		}
		else if (typeof s.state == 'object' && !s.state.node) {
			return 'No state specified to retrieve for device ' + this.name + '!';
		}
		
		return s;
	}
	
	/**
	 *
	 *
	 * @return	{Object}
	 * @private
	 */
	_setObjectStructure(obj, defaultValue = null) {
		
		if (!obj || typeof obj != 'object') {
			obj = { 'default': obj || defaultValue };
		}
		else if (typeof obj == 'object' && !obj.default) {
			obj.default = defaultValue;
		}
		
		return obj;
	}
	
	/**
	 *
	 *
	 *
	 * @return void
	 * @private
	 *
	 */
	_setProperties() {
		
		// properties
		this.primaryStateKey = this.options.primary || Object.keys(this.states)[0];
		this.secondaryStateKey = this.options.secondary || null;
		
		// styles
		this.options.styles =  { ...this.defaults.styles, ...this.options.styles || {} };
		
		// all options
		this.options.groups = Array.isArray(this.options.group) ? this.options.group : [this.options.group];
		this.options.sort = this.options.sort || 999;
		
		this.options.label = (this.options.label && (typeof this.options.label === 'string' && this.options.label.replace(/%name%/g, this.name))) || this.options.label || this.name;
		this.options.icon = this._setObjectStructure(this.options.icon, 'square-medium');
		this.options.mapping = this._setObjectStructure({ ...this.defaults.states, ...this.options.secondaryStateMapping, ...this.options.primaryStateMapping });
		this.options.subtitle = this.options.subtitle;
		this.options.divider = this.options.divider || false;
	}
	
	/**
	 *
	 *
	 *
	 * @return	{Object}
	 * @private
	 */
	_updateDeviceState(stateKey, state) {
		
		state.timeChanged = moment(state.lc-2000).fromNow();
		state.value = this.options.mapping[stateKey + '#' + state.val] || this.options.mapping[state.val] || state.val;
		return super.setStateValue(stateKey, state);
	}
	
	/**
	 *
	 *
	 */
	get(property) {
		return this[property] || null;
	}
	
	/**
	 *
	 *
	 */
	getAction(stateKey) {
		const Action = this.action[stateKey];
		return (Action && <Action device={this} state={{...this.states[stateKey], 'stateKey': stateKey}} />) || null;
	}
	
	/**
	 *
	 *
	 */
	getComponent(stateKey) {
		const Component = this.component[stateKey];
		return (Component && <Component device={this} state={{...this.states[stateKey], 'stateKey': stateKey}} />) || stateKey;
	}
	
	/**
	 *
	 *
	 */
	getDeviceState(stateKey = null, stateProperty = null) {
		const s = this.states[stateKey || this.primaryStateKey];
		
		let deviceState = null;
		
		if (s && s.state && stateProperty !== null && s.state.value !== undefined && s.state.value[stateProperty] !== undefined) {
			deviceState = s.state.value[stateProperty];
		}
		else if (s && s.state && stateProperty === null && s.state.value !== undefined) {
			deviceState = s.state.value;
		}
		
		return deviceState;
	}
	
	/**
	 *
	 *
	 */
	getIcon(stateKey) {
		return this.icon[stateKey];
	}
	
	/**
	 *
	 *
	 */
	getOption(option, stateVal = 'default') {
		return (this.options[option] && (this.options[option][stateVal] || this.options[option]['default'])) || this.options[option] || null;
	}
	
	/**
	 *
	 *
	 */
	getStyle(attribute, stateVal = 'default') {
		return (this.options.styles[attribute] && (this.options.styles[attribute][stateVal] || this.options.styles[attribute]['default'])) || {};
	}
	
	/**
	 *
	 *
	 */
	render() { return null }
	
	/**
	 * Requests all state values from the backend.
	 *
	 * @param	{Boolean}	[subscribe=false]
	 * @return	{Array<Promises>}
	 *
	 */
	requestDeviceStates(subscribe = false) {
		
		let responses = [];
		for (let stateKey in this.states) {
			responses.push(this.requestDeviceState(stateKey, subscribe));
		}
		
		return responses;
	}
	
	/**
	 * Requests a state value from the backend.
	 *
	 * @param	{String}	stateKey
	 * @param	{Boolean}	[subscribe=false]
	 * @return	{Promise}
	 *
	 */
	requestDeviceState(stateKey = null, subscribe = false) {
		
		stateKey = stateKey || this.primaryStateKey;
		let s = this._getStateFromKey(stateKey);
		if (typeof s == 'string') {
			return Promise.reject({ 'success': false, 'stateKey': stateKey, 'error': s });
		}
		
		return new Promise((resolve, reject) => {
			
			// send cached value if present and subscrbe (means always updated)
			if (s.state.value !== undefined && this.stateSubscriptions.indexOf(stateKey) > -1) {
				
				// publish state
				this.emit('stateChange', stateKey, s.state.value);
				
				// resolve
				resolve({ 'success': true, 'stateKey': stateKey, 'cached': true });
			}
			
			// request from backend
			else {
				this.socket.getState(s.state.node)
					.then(state => {
						
						// set result
						s.state.value = this._updateDeviceState(stateKey, state);
						
						// publish state change
						this.emit('stateChange', stateKey, s.state.value);
						
						// subscribe to state
						if (subscribe) {
							this.subscribeDeviceState(stateKey);
						}
						
						// resolve
						resolve({ 'success': true, 'stateKey': stateKey, 'cached': false });
					})
					.catch(err => reject({ 'success': false, 'stateKey': stateKey, 'error': err.message }));
			}
		});
	}
	
	/**
	 *
	 *
	 */
	setDeviceState(stateKey = null, value) {
		
		stateKey = stateKey || this.primaryStateKey;
		let s = this._getStateFromKey(stateKey);
		if (typeof s == 'string') {
			return Promise.reject({ 'success': false, 'stateKey': stateKey, 'error': s });
		}
		
		return new Promise(resolve => {
			this.socket.setState(s.state.node, value).then(res => {
				
				// get state value if not subscribed
				if (this.stateSubscriptions.indexOf(stateKey) === -1) {
					this.requestDeviceState(stateKey);
				}
				
				// resolve
				resolve({ 'success': true, 'stateKey': stateKey });
			});
		});
	}
	
	/**
	 *
	 *
	 */
	subscribeDeviceState(stateKey = null) {
		
		stateKey = stateKey || this.primaryStateKey;
		let s = this._getStateFromKey(stateKey);
		if (typeof s == 'string') {
			return Promise.reject({ 'success': false, 'stateKey': stateKey, 'error': s });
		}
		
		// add subscription	
		this.stateSubscriptions.push(stateKey);
		
		// subscrbe
		this.socket.subscribeState(s.state.node, (id, state) => {
			
			if (state && state.val !== this.getDeviceState(stateKey, 'val')) {
				
				// format value
				s.state.value = this._updateDeviceState(stateKey, state);
				
				// publish state change
				this.emit('stateChange', stateKey, s.state.value);
			}
		});
	}
}
