import EventEmitter from 'events';
import functions from './functions';


/**
 * Function
 *
 * @param	{String}		functionType
 * @return	{Function}
 *
 */
export default class Function extends EventEmitter {
	
	constructor(functionType) {
		super();
		
		this.function = functionType;
		
		if (!this.function) {	
			throw new Error('No function given!');
		}
		
		this.functionId = this.function.toLowerCase();
		
		// configuration
		this.defaults = functions['defaults'].configurations;
		this.configurations = (functions[this.functionId] && functions[this.functionId].configurations) || {};
		
		// styles
		this.defaultStyles = functions['defaults'].styles;
		this.styles = (functions[this.functionId] && functions[this.functionId].styles) || {};
		
		// components and actions
		this.components = { ...functions['defaults'].components, ...(functions[this.functionId] && functions[this.functionId].components) || {} };
		this.actions = { ...functions['defaults'].actions, ...(functions[this.functionId] && functions[this.functionId].actions) || {} };
	}
	
	/**
	 *
	 *
	 * @return	{Mixed}
	 * @private
	 */
	_applyFunction(key, val) {
		return this._isFunction(key) ? key(val) : val;
	}
	
	/**
	 *
	 *
	 * @return	{String}
	 * @private
	 */
	_getValueFromSettings(settings, defaults = '') {
		
		for (let key in settings) {
			if (settings[key] !== undefined) {
				return settings[key];
			}
		}
		
		return defaults;
	}
	
	/**
	 *
	 *
	 * @return	{Boolean}
	 * @private
	 */
	_isFunction(key) {
		return key && typeof key === 'function';
	}
	
	/**
	 *
	 *
	 * @return	{Boolean}
	 * @private
	 */
	_isValue(val) {
		return val !== undefined; // || val === null || val === false; // null is considered a value, so it can be used to actually null the output
	}
	
	/**
	 *
	 *
	 * @return	{Object}
	 * @private
	 */
	_setObjectStructure(obj, defaultValue = undefined) {
		
		if (!obj || typeof obj != 'object') {
			obj = { 'default': obj || defaultValue };
		}
		else if (typeof obj == 'object' && !obj.default) {
			obj.default = defaultValue;
		}
		
		return obj;
	}
}
