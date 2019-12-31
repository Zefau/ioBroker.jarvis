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
		this.styles = { ...functions['defaults'].styles, ...(functions[this.functionId] && functions[this.functionId].styles) || {} };
		
		// components and actions
		this.components = (functions[this.functionId] && functions[this.functionId].components) || {};
		this.actions = (functions[this.functionId] && functions[this.functionId].actions) || {};
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
}
