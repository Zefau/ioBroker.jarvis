import React from 'react'
import i18n from './i18n'
import Function from './Function'
import { formatDistanceToNow } from 'date-fns'
import { de } from 'date-fns/locale'


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
		
		// initialise class data
		this.id = deviceProperties.id;
		this.name = deviceProperties.name;
		
		this.room = deviceProperties.room || null;
		
		this.states = deviceProperties.states;
		this.options = deviceProperties.options;
		this.attributes = deviceProperties.attributes || {};
		
		this.socket = socket;
		
		// verify data
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
		
		// hierarchy
		this.children = deviceProperties.children || [];
		this.parent = deviceProperties.parent || null;
		
		// do some stuff
		this._setProperties();
		this.stateSubscriptions = [];
		this.historySubscriptions = [];
		
		// listen for errors of the device
		this.on('error', err => console.error('Device error occured!', err));
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
		
		// state not an object so far
		if (typeof s === 'string') {
			this.states[stateKey || this.primaryStateKey] = { [stateType]: { 'node': s }};
			s = this.states[stateKey || this.primaryStateKey];
		}
		else if (typeof s[stateType] === 'string') {
			this.states[stateKey || this.primaryStateKey][stateType] = { 'node': s[stateType] };
			s = this.states[stateKey || this.primaryStateKey];
		}
		
		// state not valid
		if (!s || !s[stateType]) {
			return 'Incorrect or non-defined state key for device ' + this.name + '!';
		}
		else if (typeof s[stateType] == 'object' && !s[stateType].node) {
			return 'No ' + stateType + ' specified for device ' + this.name + '!';
		}
		
		return s;
	}
	
	/**
	 *
	 *
	 * @private
	 */
	_getConfigurationSetting(config, stateKey, attribute, stateVal) {
		
		if (this[config][stateKey]) {
			
			// 1. if stateKey (e.g. level, power) is available, try to replace an attribute (e.g. icon, unit or for styles state, icon) based on current state (e.g. true, false)
			if (typeof this[config][stateKey][attribute] === 'object') {
				return super._isValue(this[config][stateKey][attribute][stateVal]) ? this[config][stateKey][attribute][stateVal] : this[config][stateKey][attribute]['default'];
			}
			
			// 2. if #1 is a function, apply it
			else if (super._isFunction(this[config][stateKey][attribute])) {
				return this[config][stateKey][attribute](stateVal);
			}
			
			// 3. fallback to stateKey with attribute, if defined but neither an object (thus stateless) nor a function
			else if (typeof this[config][stateKey][attribute] === 'string') {
				return this[config][stateKey][attribute];
			}
		}
		else if (this[config]['_any']) {
			
			// 4. fallback to _any if no stateKey (e.g. level, power) is given, but consider attribute to be stateful (e.g. true, false)
			if (typeof this[config]['_any'][attribute] === 'object') {
				return super._isValue(this[config]['_any'][attribute][stateVal]) ? this[config]['_any'][attribute][stateVal] : this[config]['_any'][attribute]['default'];
			}
			
			// 5. if #4 is a function, apply it
			else if (super._isFunction(this[config]['_any'][attribute])) {
				return this[config]['_any'][attribute](stateVal);
			}
		}
		
		// nothing, return undefined (not null, because this would mean take an empty value)
		return undefined;
	}
	
	/**
	 *
	 *
	 * @private
	 */
	_getUserSetting(stateKey, attribute, stateVal) {
		
		if (this.options[attribute][stateKey]) {
			
			if (typeof this.options[attribute][stateKey] === 'object') {
				return super._isValue(this.options[attribute][stateKey][stateVal]) ? this.options[attribute][stateKey][stateVal] : this.options[attribute][stateKey]['default'];
			}
			else if (super._isFunction(this.options[attribute][stateKey])) {
				return this.options[attribute][stateKey](stateVal);
			}
			else {
				return this.options[attribute][stateKey];
			}
		}
		
		return undefined;
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
		
		let states = Object.keys(this.states);
		
		// delete ignored states
		if (this.options.ignoredStates) {
			this.options.ignoredStates = Array.isArray(this.options.ignoredStates) ? this.options.ignoredStates : [this.options.ignoredStates];
			
			this.options.ignoredStates.forEach(ignoredState => {
				if (this.states[ignoredState]) {
					delete this.states[ignoredState];
				}
			});
		}
		
		// delete ignored states
		this.options.hiddenStates = [];
		if (this.options.hideStates) {
			this.options.hideStates = Array.isArray(this.options.hideStates) ? this.options.hideStates : [this.options.hideStates];
			
			this.options.hideStates.forEach(hideState => {
				if (this.states[hideState]) {
					this.options.hiddenStates.push(hideState);
				}
			});
		}
		
		// properties
		this.primaryStateKey = this.options.primary || states[0];
		this.secondaryStateKey = this.options.secondary || null;
		
		// bring user settings for value, state, unit, icon and styles in structure
		['value', 'state', 'unit', 'icon', 'styles'].forEach(key => {
			
			let stateOrAttribute = this.options[key] && Object.keys(this.options[key])[0];
			this.options[key] = !this.options[key] ? {} : super._setObjectStructure(stateOrAttribute && states.indexOf(stateOrAttribute) > -1 ? this.options[key] : { [this.primaryStateKey]: this.options[key] });
		});
		
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
		
		// add time changed
		state.timeChanged = formatDistanceToNow(new Date(state.lc-5*1000), { locale: de, includeSeconds: true, addSuffix: true })
		
		// add unit
		state.unit = '';
		
		// assign value
		state.value = state.val;
		
		// mapping of value to state values
		[{ 'value': 'value' }, { 'state': 'value' }, { 'unit': 'unit' }].forEach(pair => {
			let attribute = Object.keys(pair).toString();
			let option = Object.values(pair).toString();
			let settings = {};
			
			// get user setting
			settings['options'] = this._getUserSetting(stateKey, attribute, state.value);
			
			// get function setting or fallback to defaults
			['configurations', 'defaults'].forEach(config => {
				settings[config] = this._getConfigurationSetting(config, stateKey, attribute, state.value);
			});
			
			state[option] = super._getValueFromSettings(settings, state[option]);
			
		});
		
		state.value = i18n.t(state.value);
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
	 * @param	{String}	[stateKey=this.primaryStateKey]
	 * @return	{React.Component}
	 */
	getAction(stateKey = null, forceDefault = false) {
		stateKey = stateKey || this.primaryStateKey;
		
		const state = this.states[stateKey].state.value;
		const stateVal = state.val;
		
		const Action = (!forceDefault && this.actions[stateKey]) || this.actions.Action;
		return <Action key={'action-' + this.id + '-' + stateKey} device={this} state={state} stateKey={stateKey} stateVal={stateVal} styles={this.getStyle('state', stateKey, stateVal)} />
	}
	
	/**
	 *
	 *
	 * @param	{String}	[stateKey=this.primaryStateKey]
	 * @return	{React.Component}
	 */
	getComponent(stateKey) {
		stateKey = stateKey || this.primaryStateKey;
		const stateVal = this.states[stateKey].state.value.val;
		
		const Component = this.components[stateKey];
		return (Component && <Component title={i18n.t(this.function + '#' + stateKey)} device={this} stateKey={stateKey} stateVal={stateVal} />) || i18n.t(this.function + '#' + stateKey);
	}
	
	/**
	 *
	 *
	 * @param	{String}	[stateKey=this.primaryStateKey]
	 * @param	{String}	[stateProperty=null]
	 * @return	{String}
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
	 * Get an icon based on the current device state (or falls back to a default).
	 *
	 * @param	{String}	[stateKey=this.primaryStateKey]
	 * @param	{String}	[stateVal=default]
	 * @param	{String}	[defaultIcon=null]
	 * @return	{String}
	 */
	getIcon(stateKey, stateVal = '', defaultIcon = '?') {
		
		stateKey = stateKey || this.primaryStateKey;
		
		let settings = {};
		
		// get user setting
		settings['options'] = this._getUserSetting(stateKey, 'icon', stateVal);
		
		// get function setting or fallback to defaults
		['configurations', 'defaults'].forEach(config => {
			settings[config] = this._getConfigurationSetting(config, stateKey, 'icon', stateVal);
		});
		
		return super._getValueFromSettings(settings, defaultIcon);
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
	getStyle(attribute, stateKey, stateVal = 'default') {
		let settings = {};
		
		// get user setting
		settings['options'] = this._getUserSetting(stateKey, 'styles', attribute, stateVal);
		
		// get function setting or fallback to defaults
		['styles', 'defaultStyles'].forEach(config => {
			settings[config] = this._getConfigurationSetting(config, stateKey, attribute, stateVal);
		});
		
		return super._getValueFromSettings(settings, {});
	}
	
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
	 * @param	{String}	[stateKey=this.primaryStateKey]
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
						
						// state does not exist
						if (state === null) {
							reject({ 'success': false, 'stateKey': stateKey, 'error': 'State ' + s.state.node + ' not found!' });
						}
						
						// set result
						s.state.value = this._updateDeviceState(stateKey, state);
						
						// publish state change
						this.emit('stateChange', stateKey, s.state.value);
						
						// subscribe to state
						if (subscribe) {
							this.subscribeDeviceState(stateKey).catch(err => reject(err));
						}
						
						// resolve
						resolve({ 'success': true, 'stateKey': stateKey, 'cached': false });
					})
					.catch(err => reject({ 'success': false, 'stateKey': stateKey, 'error': err }));
			}
		});
	}
	
	/**
	 * Requests a state value from the backend.
	 *
	 * @param	{String}	[stateKey=this.primaryStateKey]
	 * @param	{Boolean}	[subscribe=false]
	 * @param	{Object}	[options={}]
	 * @return	{Promise}
	 * @see https://github.com/ioBroker/ioBroker.history#access-values-from-javascript-adapter
	 *
	 */
	requestDeviceStateHistory(stateKey = null, subscribe = false, options = {}) {
		
		stateKey = stateKey || this.primaryStateKey;
		let s = this._getStateFromKey(stateKey);
		if (typeof s == 'string') {
			return Promise.reject({ 'success': false, 'stateKey': stateKey, 'error': s });
		}
		
		return new Promise((resolve, reject) => {
			
			// send cached value if present and subscrbe (means always updated)
			if (s.state.history !== undefined && this.historySubscriptions.indexOf(stateKey) > -1) {
				
				// publish state
				this.emit('historyChange', stateKey, s.state.history);
				
				// resolve
				resolve({ 'success': true, 'stateKey': stateKey, 'cached': true });
			}
			
			// request from backend
			else {
				this.socket.getStateHistory(s.state.node, options)
					.then(history => {
						
						// state does not exist
						if (history === null) {
							reject({ 'success': false, 'stateKey': stateKey, 'error': 'State ' + s.state.node + ' not found!' });
						}
						
						// set result
						s.state.history = history; // this._updateDeviceState(stateKey, state);			// callback(err, data, step, sessionId);
						
						// publish state change
						this.emit('historyChange', stateKey, s.state.history);
						
						// subscribe to state
						/*
						if (subscribe) {
							this.subscribeDeviceState(stateKey).catch(err => reject(err));
						}
						*/
						
						// resolve
						resolve({ 'success': true, 'stateKey': stateKey, 'cached': false });
					})
					.catch(err => reject({ 'success': false, 'stateKey': stateKey, 'error': err }));
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
	 * @param	{String}	value
	 * @param	{String}	[stateKey=this.primaryStateKey]
	 * @return	void
	 */
	setDeviceState(stateKey = null, value) {
		
		stateKey = stateKey || this.primaryStateKey;
		let s = this._getStateFromKey(stateKey, 'action');
		if (typeof s == 'string') {
			return Promise.reject({ 'success': false, 'stateKey': stateKey, 'error': s });
		}
		
		return new Promise((resolve, reject) => {
			this.socket.setState(s.action.node, value)
				.then(res => {
				
					// get state value if not subscribed
					if (this.stateSubscriptions.indexOf(stateKey) === -1) {
						this.requestDeviceState(stateKey);
					}
					
					// resolve
					resolve({ 'success': true, 'stateKey': stateKey });
				})
				.catch(err => reject({ 'success': false, 'stateKey': stateKey, 'error': err }));
		});
	}
	
	/**
	 *
	 *
	 * @param	{String}	[stateKey=this.primaryStateKey]
	 * @return	void
	 */
	subscribeDeviceState(stateKey = null) {
		
		stateKey = stateKey || this.primaryStateKey;
		let s = this._getStateFromKey(stateKey);
		if (typeof s == 'string') {
			return Promise.reject({ 'success': false, 'stateKey': stateKey, 'error': s });
		}
		
		// add subscription	
		this.stateSubscriptions.push(stateKey);
		
		// subscribe
		return new Promise(resolve => {
			this.socket.subscribeState(s.state.node, (id, state, params) => {
				
				if (state && state.val !== this.getDeviceState(stateKey, 'val')) {
					
					// format value
					s.state.value = this._updateDeviceState(stateKey, state);
					
					// publish state change
					this.emit('stateChange', stateKey, s.state.value);
					
					// publish to children as well
					this.children.forEach(child => child.emit('stateChange', stateKey, s.state.value));
				}
			});
			
			resolve({ 'success': true, 'stateKey': stateKey });
		});
	}
}
