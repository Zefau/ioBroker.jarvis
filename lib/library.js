'use strict';

/**
 * Library
 *
 * @description Library of general functions as well as helping functions handling ioBroker
 * @author Zefau <https://github.com/Zefau/>
 * @license MIT License
 * @version 0.31.0
 * @date 2020-11-07
 *
 */
class Library
{
	static get CONNECTION() {
		return { node: 'info.connection', description: 'Adapter Connection Status', role: 'indicator.connected', type: 'boolean' };
	}
	
	/**
	 * Constructor.
	 *
	 * @param	{object}	adapter		ioBroker adpater object
	 *
	 */
    constructor(adapter, options)
	{
		this._adapter = adapter;
		this.options = options || {};
		
		this._nodes = this.options.nodes || {};
		
		this.options.updatesInLog = this.options.updatesInLog || false;
		this.options.updatesExceptions = this.options.updatesExceptions || ['timestamp', 'datetime', 'UTC', 'localtime', 'last_use_date', 'lastSeen'];
		
		this._STATES = {};
		this.subscriptions = [];
		
		this.set({ 'node': 'info', 'description': 'Adapter Information', 'role': 'channel' });
		this.set(Library.CONNECTION, false);
    }
	
	/**
	 * Gets a node.
	 *
	 * @param	{string}	node			Node identifier
	 * @return	{object}					Node
	 *
	 */
	getNode(node, lowerCase)
	{
		return JSON.parse(JSON.stringify(
			this._nodes[this.clean(node, lowerCase)] ||
			this._nodes[this.clean(node.replace(RegExp(/\.\d+\./, 'g'), '.'), lowerCase)] ||
			{ 'description': '(no description given)', 'role': 'state', 'type': 'string', 'convert': null }
		));
	}
	
	/**
	 * Terminate adapter.
	 *
	 * @param	{string}	[message=Terminating adapter due to error!]			Message to display
	 * @param	{boolean}	[kill=false]										Whether to kill the adapter (red lights) or not (yellow lights)
	 * @param	{integer}	[reason=11]											Reason code for exit
	 * @return	void
	 *
	 */
	terminate(message, kill, reason)
	{
		this.resetStates();
		this.set(Library.CONNECTION, false);
		message = message ? message : 'Terminating adapter due to error!';
		
		// yellow lights
		if (!kill)
			this._adapter.log.warn(message);
		
		// red lights
		else if (kill === true)
		{
			this._adapter.log.error(message);
			
			// delay necessary to actually show the error message
			setTimeout(() => this._adapter && this._adapter.terminate ? this._adapter.terminate(message, reason || 11) : process.exit(reason || 11), 2000);
		}
		
		return false;
	}
	
	/**
	 * Remove specials characters from string.
	 *
	 * @param	{string}	string																												String to proceed
	 * @param	{boolean}	[lowerCase=false]																									If String shall be return in lower case
	 * @param	{string}	[replacement='']																									Characters shall be replaced with this character
	 * @param	{array}		[characters=['<', '>', ' ', ',', ';', '!', '?', '[', ']', '*', '\'', '"', '\\', '&', '^', '$', '(', ')', '/']]		Characters to be removed from string
	 * @return	{string}																														Cleaned String
	 *
	 */
	clean(string, lowerCase, replacement, characters)
	{
		if (!string && typeof string != 'string')
			return string;
		
		characters = characters ? characters : ['<', '>', ' ', ',', ';', '!', '?', '[', ']', '*', '\'', '"', '\\', '&', '^', '$', '(', ')', '/'];
		characters.forEach(character =>
		{
			string = string.replace(RegExp('\\'+character, 'gi'), replacement ? replacement : '')
		});
		
		return lowerCase ? string.toLowerCase() : string;
	}
	
	/**
	 * Encode a string.
	 *
	 * @param	{string}	key			Key used for encoding
	 * @param	{string}	string		String to encode
	 * @return	{string}				Encoded String
	 *
	 */
	encode(key, string)
	{
		let result = '';
		for (let i = 0; i < string.length; i++)
			result += String.fromCharCode(key[i % key.length].charCodeAt(0) ^ string.charCodeAt(i));
		
		return result;
	}
	
	/**
	 * Decode a string.
	 *
	 * @param	{string}	key			Key used for decoding
	 * @param	{string}	string		String to decode
	 * @return	{string}				Decoded String
	 *
	 */
	decode(key, string)
	{
		return this.encode(key, string);
	}
	
	/**
	 * Get a random key.
	 *
	 * @param	{integer}	length		Length of key
	 * @return	{string}				Key
	 *
	 */
	getKey(length)
	{
		length = length || 8;
		let key = '';
		
		while (key.length < length)
			key += Math.random().toString().substring(2,3) >= 5 ? Math.random().toString(36).substring(2, 4) : Math.random().toString(36).substring(2, 4).toUpperCase();
		
		return key.substr(0, length);
	}
	
	/**
	 * Convert an integer to IP.
	 *
	 * @param	{integer}	number		Number to be converted to IP address
	 * @return	{string}				Converted IP address
	 *
	 */
	getIP(number)
	{
		let ip = [];
		ip.push(number & 255);
		ip.push((number >> 8) & 255);
		ip.push((number >> 16) & 255);
		ip.push((number >> 24) & 255);
		
		ip.reverse();
		return ip.join('.');
	}
	
	/**
	 * Sends a message to another adapter.
	 *
	 * @param	{string}	receiver	
	 * @param	{string}	command		
	 * @param	{*}			message		Message to send to receiver, shall be an object and will be converted to such if another is given
	 * @param	{function}	(optional)	Callback
	 * @return	void
	 *
	 */
	msg(receiver, command, message, callback)
	{
		this._adapter.sendTo(
			receiver,
			command,
			typeof message !== 'object' ? {message: message} : message,
			callback === undefined ? function() {} : callback
		);
	}
	
	/**
	 * Capitalize first letter of a string
	 *
	 * @param	{string}	str			String to capitalize
	 * @return	{string}
	 *
	 */
	ucFirst(str)
	{
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
	
	/**
	 * Convert a date to timestamp.
	 *
	 * @param	{date}		date		Datetime to parse
	 * @return	{integer}					parsed Timestamp
	 *
	 */
	getTimestamp(date)
	{
		if (date === undefined || !date)
			return 0;
		
		let ts = new Date(date).getTime();
		return isNaN(ts) ? 0 : ts;
	}

	/**
	 * Convert a timestamp to datetime.
	 *
	 * @param	{integer}	ts			Timestamp to be converted to date-time format (in ms)
	 * @return	{string}				Timestamp in date-time format
	 *
	 */
	getDateTime(ts)
	{
		if (ts === undefined || ts <= 0 || ts == '')
			return '';
		
		let date    = new Date(ts);
		let day     = '0' + date.getDate();
		let month   = '0' + (date.getMonth() + 1);
		let year    = date.getFullYear();
		let hours   = '0' + date.getHours();
		let minutes = '0' + date.getMinutes();
		let seconds = '0' + date.getSeconds();
		return day.substr(-2) + '.' + month.substr(-2) + '.' + year + ' ' + hours.substr(-2) + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
	}

	/**
	 * Get all instances of an adapter.
	 *
	 * @param	{string}	adapter		Adapter to get instances of
	 * @param	{function}	callback	Callback to invoke
	 * @return	void
	 *
	 */
	getAdapterInstances(adapter, callback)
	{
		this._adapter.objects.getObjectView('system', 'instance', { 'startkey': 'system.adapter.' + adapter + '.', 'endkey': 'system.adapter.' + adapter + '.\u9999'}, (err, instances) =>
		{
			if (instances && instances.rows)
			{
				let result = [];
				instances.rows.forEach(instance => result.push({ 'id': instance.id.replace('system.adapter.', ''), 'config': instance.value.native.type }));
				callback(null, result);
			}
			else
				callback('Could not retrieve ' + adapter + ' instances!');
		});
	}

	/**
	 * Run Garbage Collector and delete outdated states / objects.
	 *
	 * @param	{object}	state					Selected state
	 * @param	{number}	[ts=null]				Objects older than this timespan will be deleted (in seconds)
	 * @param	{boolean}	[del=true]				Whether to delete the object (or only empty its value)
	 * @param	{number}	[offset=60]				Offset for the timespan in seconds
	 * @return	void
	 *
	 */
	runGarbageCollector(state, del = false, offset = 60, whitelist = [])
	{
		this._adapter.log.debug('Running Garbage Collector for ' + state + '...');
		this._adapter.getStates(state + '.*', (err, states) =>
		{
			if (err || !states) return;
			
			// loop through states
			let key;
			for (let state in states)
			{
				key = state.replace(this._adapter.name + '.' + this._adapter.instance + '.', '');
				
				if (this._STATES[key] && this._STATES[key].ts < (Math.round(Date.now()/1000)-offset) && !(whitelist.length > 0 && RegExp(whitelist.join('|')).test(state)))
				{
					// apply deletion
					this._adapter.log.debug('Garbage Collector: ' + (del ? 'Deleted ' : 'Emptied ') + state + '!');
					
					if (del)
					{
						this._STATES[key] = undefined;
						this._adapter.delObjectAsync(state);
					}
					else
						this._setValue(key, '', { 'force': true });
				}
			}
		});
	}
	
	/**
	 * Get a device state.
	 *
	 *
	 */
	getDeviceState(state, property = 'val')
	{
		return this._STATES[state] !== undefined ? (this._STATES[state][property] || false) : null;
	}
	
	/**
	 * Set a device state.
	 *
	 *
	 */
	setDeviceState(state, value)
	{
		if ((this._STATES[state] === null || this._STATES[state] === undefined || this._STATES[state].val != value) &&
				this._adapter && this._adapter.log && (
					(this.options.updatesInLog && !this.options.updatesExceptions) ||
					(this.options.updatesInLog && this.options.updatesExceptions && Array.isArray(this.options.updatesExceptions) && this.options.updatesExceptions.indexOf(state.substr(state.lastIndexOf('.')+1)) == -1)
		))
			this._adapter.log.debug('Updated state ' + state + ' to value ' + value + ' (from ' + (this._STATES[state] && this._STATES[state].val) + ').');
		
		
		return this.setDeviceProperties(state, {
			'val': value
		});
	}
	
	/**
	 * Set a device properties.
	 *
	 *
	 */
	setDeviceProperties(state, properties)
	{
		this._STATES[state] = { ...this._STATES[state] || {}, ...properties || {}, 'ts': Math.round(Date.now()/1000) };
		return true;
	}
	
	/**
	 * Deletes a state / object.
	 *
	 * @param	{string}	state			State to be deleted
	 * @param	{boolean}	[nested=false]	Whether to delete nested states as well
	 * @param	{function}	[callback]		Callback to be invoked once finished deleting all states
	 * @return	void
	 *
	 */
	del(state, nested, callback)
	{
		let that = this;
		
		// create state to have at least one deletion (in case no states exist at all)
		this._createNode({ 'node': state, 'description': 'DELETED' }, () =>
		{
			// get state tree
			that._adapter.getStates(nested ? state + '.*' : state, (err, objects) =>
			{
				let deleted = 0;
				objects = Object.keys(objects);
				objects.push(state);
				
				that._adapter.log.silly('Found ' + objects.length + ' objects in state ' + state + ' to delete..');
				objects.forEach(object =>
				{
					that._adapter.delObject(object, err =>
					{
						that._STATES[object.replace(that._adapter.namespace + '.', '')] = undefined;
						deleted++;
						
						if (deleted == objects.length)
						{
							that._adapter.log.debug('Deleted state ' + state + ' with ' + deleted + ' objects.');
							callback && callback();
						}
					});
				});
			});
		});
	}

	/**
	 * Set multiple values and create the necessary nodes for it in case they are missing.
	 *
	 * @param	{object}	values
	 * @param	{object}	nodes
	 * @param	{object}	options
	 * @return	void
	 *
	 */
	setMultiple(nodes, values, options = {})
	{
		for (let key in values)
		{
			if (nodes[key] && nodes[key].node && nodes[key].description)
			{
				let node = nodes[key];
				let value = values[key];
				
				// replace options if given
				options.placeholders = options.placeholders || {};
				for (let placeholder in options.placeholders)
				{
					node.node = node.node.replace(placeholder, options.placeholders[placeholder]);
					node.description = node.description.replace(placeholder, options.placeholders[placeholder]);
				}
				
				// convert data if necessary
				switch(node.convert)
				{
					case "string":
						if (value && Array.isArray(value))
							value = value.join(', '); 
						break;
						
					case "datetime":
						this.set({node: node.node + 'Datetime', description: node.description.replace('Timestamp', 'Date-Time'), common: {"type": "string", "role": "text"}}, value ? this.getDateTime(value * 1000) : '');
						break;
				} 
				
				// set node
				this.set(node, value, options);
			}
		}
	}

	/**
	 * Set a value and create the necessary nodes for it in case it is missing.
	 *
	 * @param	{object}	node					
	 * @param	{string}	node.node				Node (= state) to set the value (and create in case it does not exist)
	 * @param	{string}	node.description		Description of the node (in case it will be created)
	 * @param	{object}	node.common				Common Details of the node (in case it will be created)
	 * @param	{string}	node.common.role		Role of the node (in case it will be created)
	 * @param	{string}	node.common.type		Type of the node (in case it will be created)
	 * @param	{object}	node.native				Native Details of the node (in case it will be created)
	 * @param	{string}	value					Value to set (in any case)
	 * @param	{object}	[options={}]			Additional options
	 * @return	void
	 *
	 */
	set(node, value, options = {})
	{
		// set value
		if (node && node.node && this._STATES[node.node] !== undefined) {
			
			this._setValue(node.node, value, options);
			
			if (options.subscribe === true && this.subscriptions.indexOf(node.node) === -1) {
				this._adapter.subscribeStates(node.node);
				this.subscriptions.push(node.node);
			}
		}
		// create node
		else {
			// catch error
			if (!node || !node.node || (node.name === undefined && node.description === undefined)) {
				this._adapter.log.error('Error: State not properly defined (' + JSON.stringify(node) + ')!');
				return false;
			}
			
			this._createNode(node, () => this._setValue(node.node, value, options), options);
		}
		
		return true;
	}
	
	/**
	 * Creates an object (channel or state).
	 *
	 * @param	{object}	node					
	 * @param	{string}	node.node				Node (= state) to set the value (and create in case it does not exist)
	 * @param	{string}	node.description		Description of the node (in case it will be created)
	 * @param	{object}	node.common				Common Details of the node (in case it will be created)
	 * @param	{string}	node.common.role		Role of the node (in case it will be created)
	 * @param	{string}	node.common.type		Type of the node (in case it will be created)
	 * @param	{object}	node.native				Native Details of the node (in case it will be created)
	 * @param	{function}	callback				Callback function to be invoked
	 * @param	{object}	[options={}]			Additional options
	 * @return	void
	 *
	 */
	_createNode(node, callback, options = {})
	{
		if (!this._adapter)
			return Promise.reject('Adapter not defined!');
		
		// remap properties to common
		let type = node.role == 'device' || node.role == 'channel' ? (node.role == 'device' ? 'device' : 'channel') : 'state';
		let common = {
			'name': node.name || node.description,
			'role': (node.common && node.common.role) || node.role || 'state',
			'type': (node.common && node.common.type) || node.type || 'string',
			'read': node.common && node.common.read !== undefined ? node.common.read : (node.read !== undefined ? node.read : true),
			'write': node.common && node.common.write !== undefined ? node.common.write : (node.write !== undefined ? node.write : false),
			...node.common || {}
		};
		
		// special roles
		if (common.role.indexOf('button') > -1 || common.role.indexOf('indicator') > -1) {
			common = { ...common, 'type': 'boolean', 'read': false, 'write': true };
		}
		else if (common.role == 'device' || common.role == 'channel') {
			common = { ...common, 'type': undefined, 'role': undefined };
		}
		
		// create object
		this._adapter.setObjectNotExists(
			node.node,
			{
				'common': common,
				'type': type,
				'native': node.native || {}
			},
			(err, obj) =>
			{
				this._STATES[node.node] = null;
				
				if (options.subscribe === true && this.subscriptions.indexOf(node.node) === -1) {
					this._adapter.subscribeStates(node.node);
					this.subscriptions.push(node.node);
				}
				
				callback && callback();
			}
		);
	}

	/**
	 * Sets a value of a state.
	 *
	 * @param	{string}	state					State the value shall be set
	 * @param	{string}	value					Value to be set
	 * @param	{object}	[options={}]			Additional options
	 * @param	{boolean}	[options.force=false]	Force to set value
	 * @param	{boolean}	[options.ack=true]		Ack to use
	 * @return	void
	 *
	 */
	_setValue(state, value, options = {}) {
		if (state !== undefined) {
			if (value !== undefined && (options.force || this._STATES[state] === undefined || this._STATES[state] === null || this._STATES[state].val != value)) {
				if (options.ack !== false) {
					this.setDeviceState(state, value);
				}
				
				this._adapter.setStateAsync(state, value, options.ack !== undefined ? options.ack : true, { ts: Date.now() })
					.then(res => options.callback && options.callback(null, res))
					.catch(err => options.callback && options.callback(err));
			}
			else {
				this.setDeviceProperties(state);
			}
		}
	}

	/**
	 * Reset all states.
	 *
	 * @param	void
	 * @return	void
	 *
	 */
	resetStates()
	{
		this._STATES = {};
	}
}

module.exports = Library;
