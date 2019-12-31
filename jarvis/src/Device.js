import React from 'react';
import i18n from './i18n';
import Function from './Function';
import * as moment from 'moment/min/moment-with-locales.min.js';


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
	
	constructor(deviceProperties, socket, language = window.sysLang || 'en') {
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
		
		this._setProperties();
		this.stateSubscriptions = [];
		
		moment.locale(language);
	}
	
	/**
	 *
	 *
	 * @return	{Object|String}
	 * @private
	 */
	_getStateFromKey(stateKey = null, stateType = 'state') {
		
		// already a state object
		if (stateKey && typeof stateKey === 'object') {
			return stateKey;
		}
		
		// get state object
		let s = this.states[stateKey || this.primaryStateKey];
		
		if (!s || !s[stateType]) {
			return 'Incorrect or non-defined state key for device ' + this.name + '!';
		}
		else if (typeof s[stateType] == 'string') {
			this.states[stateKey || this.primaryStateKey][stateType] = { 'node': s[stateType] };
			s = this.states[stateKey || this.primaryStateKey];
		}
		else if (typeof s[stateType] == 'object' && !s[stateType].node) {
			return 'No ' + stateType + ' specified for device ' + this.name + '!';
		}
		
		return s;
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
		
		// icon
		this.options.icon = !this.options.icon ? {} : super._setObjectStructure((this.options.icon[this.primaryStateKey] !== undefined && typeof this.options.icon[this.primaryStateKey] == 'object' ? this.options.icon[this.primaryStateKey] : { [this.primaryStateKey]: this.options.icon }));
		
		// states
		this.options.mapping = super._setObjectStructure({ ...super.state, ...this.options.secondaryStateMapping, ...this.options.primaryStateMapping });
		
		// styles
		this.options.styles =  { ...super.style, ...this.options.styles || {} };
		
		// all options
		this.options.groups = Array.isArray(this.options.group) ? this.options.group : [this.options.group];
		this.options.sort = this.options.sort || 999;
		
		this.options.label = (this.options.label && (typeof this.options.label === 'string' && this.options.label.replace(/%name%/g, this.name))) || this.options.label || this.name;
		//this.options.subtitle = this.options.subtitle;
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
		state.value = this.options.mapping[stateKey + '#' + state.val] || this.options.mapping[state.val] || this.options.mapping['default'] || state.val;
		
		
		['value', 'unit'].forEach(key => {
			//state[key] = (this.configuration[stateKey] && this.configuration[stateKey][key] && ((typeof this.configuration[stateKey][key] === 'function' && this.configuration[stateKey][key](state.val)) || (typeof this.configuration[stateKey][key] !== 'function' && this.configuration[stateKey][key]))) || state[key] || '';
		});
		
		
		return state;
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
		const Action = this.actions[stateKey];
		return (Action && <Action device={this} state={{ ...this.states[stateKey], 'stateKey': stateKey }} />) || null;
	}
	
	/**
	 *
	 *
	 */
	getComponent(stateKey) {
		const Component = this.components[stateKey];
		return (Component && <Component title={i18n.t(this.function + '#' + stateKey)} device={this} state={{ ...this.states[stateKey], 'stateKey': stateKey }} />) || i18n.t(this.function + '#' + stateKey);
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
	getIcon(stateKey, stateVal = 'default', defaultIcon = null) {
		
		let userIcon = this.options.icon[stateKey] && (this.options.icon[stateKey][stateVal] || this.options.icon[stateKey]['default']);
		let functionIcon = this.configurations[stateKey] && this.configurations[stateKey].icon && (this.configurations[stateKey].icon[stateVal] || this.configurations[stateKey].icon['default']);
		let globalDefaultIcon = this.defaults[stateKey] && this.defaults[stateKey].icon && (this.defaults[stateKey].icon[stateVal] || this.defaults[stateKey].icon['default']);
		
		return userIcon || functionIcon || globalDefaultIcon || defaultIcon;
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
		
		if (!s.state) {
			console.log(this.name);
		console.log(s);
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
	setAction(action) {
		this.options.action = action;
		
	}
	
	/**
	 *
	 *
	 */
	setComponent(component) {
		this.options.label = component;
		
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
			this.socket.setState(s.action.node, value).then(res => {
				
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
