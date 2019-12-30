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
		this.icon = (functions[this.functionId] && functions[this.functionId].icons) || {};
		this.component = (functions[this.functionId] && functions[this.functionId].components) || {};
		this.action = (functions[this.functionId] && functions[this.functionId].actions) || {};
		this.configuration = (functions[this.functionId] && functions[this.functionId].configurations) || functions['defaults'].configurations;
	}
	
	/**
	 *
	 *
	 */
	setStateValue(stateKey, state) {
		
		['value', 'unit'].forEach(key => {
			state[key] = (this.configuration[stateKey] && this.configuration[stateKey][key] && ((typeof this.configuration[stateKey][key] === 'function' && this.configuration[stateKey][key](state.val)) || (typeof this.configuration[stateKey][key] !== 'function' && this.configuration[stateKey][key]))) || state[key] || '';
		});
		
		return state;
	}
}
