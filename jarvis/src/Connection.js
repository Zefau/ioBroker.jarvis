import Socket from './Socket'

/**
 * Connection
 +
 *
 */
export default class Connection {

	/*
	 * URL
	 */
	static url = window.location.hostname;
	
	/*
	 * Connection
	 */
	static connection = null;
	
	/**
	 * Connects to the Socket.
	 *
	 * @param	{String}	url
	 * @param	{Array}		listeners
	 * @return	{Connection}
	 */
	static connect(url = null, listeners = null) {
		
		// set URL
		if (url) {
			Connection.setUrl = url;
		}
		
		// connect
		Connection.connection = new Socket(Connection.url);
		
		// set listeners
		if (listeners) {
			Connection.setListeners = listeners;
		}
		
		// return connection
		return Connection.connection;
	}
	
	/**
	 * Gets the current Connection.
	 *
	 * @param	void
	 * @return	{Connection}	Current Connection
	 */
	static get getConnection() {
		return Connection.connection || null;
	}
	
	/**
	 * Get the current URL.
	 *
	 * @param	void
	 * @return	{String}	URL
	 */
	static get getUrl() {
		return Connection.url;
	}
	
	/**
	 * Sets an event listener.
	 *
	 * @param	{Object}			listener
	 * @param	{String}			listener.event
	 * @param	{Function}			listener.callback
	 * @return	void
	 */
	static set setListener(listener) {
		Connection.connection.on(listener.event, listener.callback);
	}
	
	/**
	 * Set event listeners.
	 *
	 * @param	{Array<Object>}		listeners
	 * @return 	{Boolean}
	 */
	static set setListeners(listeners = []) {
		
		if (!listeners || !Array.isArray(listeners)) {
			return false;
		}
		
		listeners.forEach(listener => Connection.setListener = listener);
		return true;
	}
	
	/**
	 * Set a new URL (has to be set before calling connect()).
	 *
	 * @param	{String}	URL
	 * @return	void
	 */
	static set setUrl(url) {
		Connection.url = url;
	}
}
