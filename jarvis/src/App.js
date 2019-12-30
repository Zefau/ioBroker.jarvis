import React from 'react';
import Socket from './Socket';
import Device from './Device';
import Jarvis from './Jarvis';

/*
 *
 *
 */
const NODE_SETTINGS = 'jarvis.0.settings';
const NODE_DEVICES = 'jarvis.0.devices';

const DEAULTS_STATES = { true: 'an', false: 'aus', 0: 'aus' };
const DEFAULT_STYLES = {
	'state': {
		true: { 'color': '#090', 'fontWeight': 'bold' },
		false: { 'color': '#999' },
		0: { 'color': '#999' }
	}
};


class App extends React.Component {
	
    constructor(props) {
		super(props);
		
		this.state = {
			loaded: [],
			error: false,
			errorMessage: ''
		}
	};
	
	componentDidMount() {
		
		// data connection
		let url = window.location.hostname === 'localhost' ? 'https://192.168.178.29:8082' : null;
		this.socket = new Socket(url);
		
		this.socket.on('error', error => {
			this.setState({
				error: true,
				errorMessage: error
			});
		});
		
		
		// get settings
		this.settings = {};
		
		this.socket.getState(NODE_SETTINGS)
			.then(state => {
				
				try {
					this.settings = state && JSON.parse(state.val);
					this.useSettings();
					this.setState({ loaded: [...this.state.loaded, 'settings'] });
				}
				catch(err) {
					console.error('GET_SETTINGS: ' + err.message);
					this.setState({
						error: true,
						errorMessage: 'Error parsing settings!'
					});
				}
				
			})
			.catch(err => {
				console.error('GET_SETTINGS: ' + err.message);
				this.setState({
					error: true,
					errorMessage: err
				});
			});
		
		
		// get devices
		this.devices = {};
		this.groups = {};
		
		this.socket.getState(NODE_DEVICES)
			.then(state => {
				
				try {
					this.devices = state && JSON.parse(state.val);
					this.groups = this.processDevices(this.devices);
					this.setState({ loaded: [...this.state.loaded, 'groups'] });
				}
				catch(err) {
					console.error('GET_DEVICES: ' + err.message);
					this.setState({
						error: true,
						errorMessage: 'Error parsing devices!'
					});
				}
			})
			.catch(err => {
				console.error('GET_DEVICES: ' + err.message);
				this.setState({
					error: true,
					errorMessage: err
				});
			});
    };
	
	/**
	 *
	 *
	 */
	useSettings() {
		// page title
		if (this.settings.title) {
			document.title = this.settings.title;
		}
		
		// favicon
		if (this.settings.favicon && this.settings.favicon.substr(0, 5) === 'data:') {
			document.getElementById('favicon').href = this.settings.favicon;
		}
	}
	
	/**
	 *
	 *
	 */
	groupDevice(groups, device) {
		
		// add device to group(s)
		let options = device.get('options');
		options.groups.forEach(group => {
			
			let groupId = group.toLowerCase().replace(/ /g, '');
			if (!groups[groupId]) {
				groups[groupId] = { 'id': groupId, 'name': group, 'settings': (this.settings.groups && this.settings.groups[groupId]) || {}, 'devices': [device] };
			}
			else {
				groups[groupId].devices.push(device);
			}
		});
		
		return groups;
	}
	
	/**
	 *
	 *
	 */
	processDevice(deviceProperties) {
		
		let device = null;
		try {
			device = new Device(deviceProperties, this.socket, { 'states': DEAULTS_STATES, 'styles': DEFAULT_STYLES });
			
			// request primary state value
			device.requestDeviceState(null, true).catch(err => console.error(err));
			
			// request secondary state value
			if (device.secondaryStateKey) {
				device.requestDeviceState(device.secondaryStateKey, true).catch(err => console.error(err));
			}
			
		}
		catch(err) {
			console.warn(err.message);
		}
		
		return device;
	}
	
	/**
	 *
	 *
	 */
	processDevices(deviceList) {
		
		// loop through all devices of in the device list
		let groups = {};
		
		let devices = 0, groupedDevices = 0, device, deviceProperties;
		for (let deviceId in deviceList) {
			devices++;
			
			deviceList[deviceId].options = deviceList[deviceId].jarvis;
			delete deviceList[deviceId].jarvis;
			
			deviceProperties = { ...deviceList[deviceId], 'id': deviceId };
			device = this.processDevice(deviceProperties);
			
			if (device !== null) {
				groupedDevices++;
				groups = this.groupDevice(groups, device);
			}
			
			// check states for own device settings
			let state;
			for (let stateKey in deviceProperties.states) {
				
				state = deviceProperties.states[stateKey];
				if (state && state.jarvis !== undefined) {
					device = this.processDevice({ ...deviceProperties, 'id': deviceId + '#' + stateKey, 'states': { [stateKey]: state }, 'options': state.jarvis });
					
					if (device !== null) {
						groupedDevices++;
						groups = this.groupDevice(groups, device);
					}
				}
			}
		}
		
		// sort groups
		for (let groupId in groups) {
			groups[groupId].devices.sort((item1, item2) => {
				if (item1.options.sort > item2.options.sort) return 1;
				else if (item2.options.sort > item1.options.sort) return -1;
				else return 0;
			});
		}
		
		// return
		console.info('Processed ' + devices + ' devices. Added ' + groupedDevices + ' devices in ' + Object.keys(groups).length + ' groups.');
		console.debug(groups);
		return groups;
	};
	
	renderLoading() {
		return null;
	};
	
    render() {
		if (this.state.error) {
			alert(this.state.errorMessage);
		}
		
		if (this.state.loaded.length < 2) {
			return this.renderLoading();
		}
		
        return <Jarvis settings={this.settings} groups={this.groups} />
	};
}
	
export default App;
