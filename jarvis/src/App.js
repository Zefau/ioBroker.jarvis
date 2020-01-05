import React from 'react';
import LogRocket from 'logrocket';
import uuid from 'uuid/v3';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

import GridContainer from './components/GridContainer';
import StatusSnackbar from './components/StatusSnackbar';

import i18n from './i18n';
import Connection from './Connection';
import Device from './Device';
import Jarvis from './Jarvis';


/*
 * STYLES
 */
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
	loading: {
		margin: '10px 0 0 0',
		color: '#999'
	},
	gridItem: {
		margin: theme.spacing(1, 1, 0, 0),
		[theme.breakpoints.down('md')]: {
			marginRight: theme.spacing(0.4, 0.4, 0, 0)
		}
	}
});


/*
 * CONSTANTS
 *
 */
const NODE_SETTINGS = 'jarvis.0.settings';
const NODE_DEVICES = 'jarvis.0.devices';


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
		
		// connect and get connection
		const noErrorFunction = () => this.setState({ error: false, errorMessage: '' });
		const url = window.location.hostname === 'localhost' ? 'https://192.168.178.29:8082' : null;
		const listeners = [
			{ 'event': 'connect', 'callback': noErrorFunction },
			{ 'event': 'reconnect', 'callback': noErrorFunction },
			{ 'event': 'disconnect', 'callback': noErrorFunction },
			{ 'event': 'error', 'callback': err => this.setState({ error: true, errorMessage: i18n.t('Connection lost! Trying to reconnect') + '..' }) }
		];
		
		this.socket = Connection.connect(url, listeners);
		
		
		// retrieve settings
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
		
		
		// retrieve devices
		this.devices = {};
		this.groups = {};
		
		this.socket.getState(NODE_DEVICES)
			.then(state => {
				
				try {
					this.devices = state && JSON.parse(state.val);
					this.processDevices(this.devices).then(groups => {
						this.groups = groups;
						this.setState({ loaded: [...this.state.loaded, 'groups'] });
					});
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
    }

	/**
	 *
	 *
	 */
	useSettings() {
		
		// LogRocket
		if (this.settings.debug && this.settings.debug.name && this.settings.debug.email && this.settings.debug.email.indexOf('@') > -1) {
			LogRocket.init('36n1xl/jarvis');
			
			let id = uuid(this.settings.debug.name + '#' + this.settings.debug.email, 'e63359dc-bc1c-476e-81cd-8f580d09a557');
			LogRocket.identify(id, {
				name: this.settings.debug.name,
				email: this.settings.debug.email
			});
			
			console.info('Opt-In for providing debugging details to the developer. Your ID is: ' + id);
		}
		
		// language
		window.language = (this.settings.language || navigator.language || navigator.userLanguage || 'en').substr(0, 2);
		i18n.setLanguage(window.language);
		i18n.loadTranslations(['en', 'de']);
		
		// page title
		if (this.settings.pageTitle) {
			document.title = this.settings.pageTitle;
		}
		
		// favicon
		if (this.settings.pageFavicon && this.settings.pageFavicon.substr(0, 5) === 'data:') {
			document.getElementById('favicon').href = this.settings.pageFavicon;
		}
		
		// translations
		if (this.settings.translations) {
			
			let translations = this.settings.translations;
			for (let language in translations) {
				i18n.setTranslation(language, translations[language]);
			}
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
		
		let promises = [];
		let device = null;
		try {
			device = new Device(deviceProperties, this.socket, window.language);
			
			// request primary state value
			promises.push(device.requestDeviceState(null, true));
			
			// request secondary state value
			if (device.secondaryStateKey) {
				promises.push(device.requestDeviceState(device.secondaryStateKey, true));
			}
			
		}
		catch(err) {
			console.warn(err.message);
		}
		
		return new Promise(resolve => {
			Promise.allSettled(promises).then(results => {
				
				results.forEach(result => {
					if (result.status === 'rejected') {
						console.error(result);
					}
				});
				
				resolve(device);
			});
		});
	}
	
	/**
	 *
	 *
	 */
	processDevices(deviceList) {
		
		// loop through all devices of in the device list
		let promises = [];
		let groups = {};
		
		let devices = 0, groupedDevices = 0;
		for (let deviceId in deviceList) {
			devices++;
			
			deviceList[deviceId].options = deviceList[deviceId].jarvis;
			delete deviceList[deviceId].jarvis;
			
			let deviceProperties = { ...deviceList[deviceId], 'id': deviceId };
			promises.push(new Promise((resolve, reject) => {
				
				this.processDevice(deviceProperties).then(device => {
			
					if (device !== null) {
						groupedDevices++;
						groups = this.groupDevice(groups, device);
						resolve(deviceId);
					}
					
					reject(deviceId);
				});
			}));
			
			// check states for own device settings
			for (let stateKey in deviceProperties.states) {
				
				let state = deviceProperties.states[stateKey];
				if (state && state.jarvis !== undefined) {
					
					promises.push(new Promise((resolve, reject) => {
						
						this.processDevice({ ...deviceProperties, 'id': deviceId + '#' + stateKey, 'states': { [stateKey]: state }, 'options': state.jarvis }).then(device => {
					
							if (device !== null) {
								groupedDevices++;
								groups = this.groupDevice(groups, device);
								resolve(deviceId);
							}
							
							reject(deviceId);
						});
					}));
					
				}
			}
		}
		
		return new Promise(resolve => Promise.allSettled(promises).then(res => {
			
			// sort groups
			for (let groupId in groups) {
				groups[groupId].devices.sort((item1, item2) => {
					if (item1.options.sort > item2.options.sort) return 1;
					else if (item2.options.sort > item1.options.sort) return -1;
					else return 0;
				});
			}
		
			// return
			console.info('Processed ' + devices + ' devices. Added ' + groupedDevices + ' devices in ' + Object.keys(groups).length + ' groups.', res, groups);
			resolve(groups);
		}));
	};
	
	renderError() {
		console.error(JSON.stringify(this.state.errorMessage));
		return (

<StatusSnackbar
	key={'StatusSnackbar'}
	variant="error"
	closeButton={false}
	message={this.state.errorMessage.toString()}
	/>

		);
	}
	
	renderLoadingProgress() {
		const { classes } = this.props;
		return (

<Grid
	key="loadingProcess" 
	container
	spacing={0}
	direction="column"
	justify="center"
	alignItems="center"
	style={{ minHeight: "100vh" }}
	>

	<CircularProgress />
	<Typography className={classes.loading}>{i18n.t('Retrieving settings')}...</Typography>

</Grid>

		);
	};
	
	renderLoadingSkeleton(props) {
		const { classes } = this.props;
		const { topBar, tabBar, gridColumns } = props;
		
		const SkeletonLoader = (props) => <Skeleton variant="rect" className={classes.gridItem} height={props.height} />;
		
		let gridContents = {}
		for (let column = 1; column <= gridColumns; column++) {
			gridContents[column] = gridContents[column] || [];
			
			let loaders = Math.random() * (5 - 2) + 2;
			for (let loader = 1; loader <= loaders; loader++) {
				gridContents[column].push(<SkeletonLoader key={column + '#' + loader} height={(Math.random() * (400 - 100) + 100)} />);
			}
		}
		
		return (

<React.Fragment>
	{topBar && <Skeleton variant="rect"  height={64} />}
	{tabBar && <Skeleton variant="rect"  height={48} />}
	<GridContainer key="loadingSkeleton" contents={gridContents} />
</React.Fragment>

		);
	}
	
    render() {
		
		// error message
		const error = this.state.error ? this.renderError() : null;
		
		// loading screens
		if (this.state.error && this.state.loaded.length < 2) {
			return error;
		}
		else if (this.state.loaded.indexOf('settings') === -1) {
			return this.renderLoadingProgress();
		}
		else if (this.state.loaded.indexOf('groups') === -1) {
			const tab = Object.keys(this.settings.layout)[0];
			return this.renderLoadingSkeleton({ topBar: true, tabBar: tab !== 1, gridColumns: (tab !== 1 ? Object.keys(this.settings.layout[tab]).length : tab.length) });
		}
		
		// App
		return [ error, <Jarvis key="jarvis" settings={this.settings} groups={this.groups} /> ];
	};
}

export default withStyles(styles)(App);
