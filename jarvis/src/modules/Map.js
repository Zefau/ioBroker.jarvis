import React, { useState, useEffect, useRef, useCallback } from 'react'
import clsx from 'clsx'

import L from 'leaflet'
import { Map as LeafletMap, TileLayer, Marker as LeafletMarker, Tooltip as LeafletTooltip } from 'react-leaflet'

import i18n from '../i18n'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import Avatar from '@material-ui/core/Avatar'


/*
 * STYLES
 */
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
	map: {
		width: '100%',
		height: '100%'
	},
	mapOverview: {
		color: '#666',
		position: 'absolute',
		left: 0,
		bottom: 0,
		width: '100%',
		height: '60px',
		zIndex: 999,
		display: 'flex',
		alignItems: 'center',
		
		'& > *': {
			margin: theme.spacing(1),
			cursor: 'pointer',
		},
	},
	mapIconContainer: {
	},
	mapIconParent: {
		backgroundColor: '#fff',
		boxShadow: '0 0 0 8px rgba(255, 255, 255, 0.3)',
		borderRadius: '50%',
		width: '100%',
		height: '100%'
	},
	mapIcon: {
		fontSize: '2rem',
		color: theme.palette.primary.main,
		transform: 'translate3d(4px, -4px,0)', /* for fontSize: '2.3rem' -> 'translate3d(2px, -8px,0)', */
		display: 'block',
		
		'&:after': {
			content: '""',
			display: 'block',
			padding: '50% 0%'
		}
	},
	mapTooltip: {
	}
}));


export default function Map(props) {
	const { settings, devices } = props;
	const classes = useStyles();
	
	const [zoom,] = useState(settings.component.defaultZoom);
	const [position,] = useState(settings.component.defaultPosition ? (Array.isArray(settings.component.defaultPosition) ? settings.component.defaultPosition : settings.component.defaultPosition.split(',')) : [ settings._global.iobroker.latitude, settings._global.iobroker.longitude ]);
	const [markers, setMarkers] = useState({});
	
	// map instance
	const map = useRef();
	const memoizedMapInitialised = useCallback(function() {map.current = this}, [],);
	
	// Marker click in overview
	const memoizedHandleClick = useCallback(flyTo => map.current.flyTo(flyTo.split(',')), [],);
	
	// get gps position coordinates
	useEffect(() => {
		devices.forEach(device => {
			
			// request device state
			device.requestDeviceState('position').catch(err => {
				console.error(err);
				
				setMarkers(prevMarkers => {
					if (!prevMarkers[device.id]) {
						return { ...prevMarkers, [device.id]: null };
					}
					
					return prevMarkers;
				});
			});
			
			// listen for updates
			device.on('stateChange', (stateKey, state) => {
				
				if (stateKey === 'position') {
					
					setMarkers(prevMarkers => {
						if (!prevMarkers[device.id] || prevMarkers[device.id].position !== state.val) {
							device.options.position = state.val;
							return { ...prevMarkers, [device.id]: device };
						}
						
						return prevMarkers;
					});
				}
			});
		});
	
	}, [devices]);
	
	// add markers
	let mapMarkers = [], mapOverview = [];
	if (devices.length > 0 && devices.length === Object.keys(markers).length) {
		
		for (let key in markers) {
			let device = markers[key];
			if (device !== null) {
				let marker = <Marker key={'marker-' + device.id} position={device.options.position} device={device} settings={settings.component} />
				mapMarkers.push(marker);
				
				let item = null;
				if (device.attributes.avatar) {
					item = <Avatar key={'overview-' + device.id} alt={device.name} src={device.attributes.avatar} onClick={() => memoizedHandleClick(device.options.position)} />
				}
				else {
					let state = device.getDeviceState();
					const icon = device.getIcon(null, state && state.val !== undefined ? state.val : null);
					const styles = device.getStyle('icon', null, state && state.val !== undefined ? state.val : null);
					console.log(state && state.val !== undefined ? state.val : null);
					console.log(styles);
					
					item = <Avatar style={styles} key={'overview-' + device.id} alt={device.name} onClick={() => memoizedHandleClick(device.options.position)}><span className={clsx('mdi mdi-' + icon)}></span></Avatar>
				}
				
				mapOverview.push(<Tooltip key={'tooltip-' + device.id} title={device.name} aria-label={device.name} arrow>{item}</Tooltip>);
			}
		}
	}
	
	return (

<React.Fragment>
	<Box className={classes.mapOverview}>
		<Typography>{i18n.t('Jump to')}:</Typography>
		{mapOverview}
	</Box>
	<LeafletMap useFlyTo={true} center={position} zoom={zoom} className={classes.map} whenReady={memoizedMapInitialised}>
		<TileLayer
			attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
			/>
		
		{mapMarkers}
	</LeafletMap>
</React.Fragment>

	);
}


function Marker(props) {
	const { position, device, settings } = props;
	const classes = useStyles();
	
	let markerIcon = null, offset = 40;
	console.info('Marker for ' + device.function + ' ' + device.name + ' added to map.');
	
	// Marker with avatar / picture
	if (device.attributes && device.attributes.avatar && device.attributes.avatar.substr(0, 11) === 'data:image/') {
		markerIcon = L.divIcon({
			className: classes.mapIconContainer,
			html: '<img src="' + device.attributes.avatar + '" class="' + classes.mapIconParent + '" />',
			iconSize: [ 64, 64 ]
		});
	}
	
	// Marker with Icon
	else {
		offset = 30;
		let state = device.getDeviceState();
		const icon = device.getIcon(null, state && state.val !== undefined ? state.val : null);
		const styles = device.getStyle('icon', null, state && state.val !== undefined ? state.val : null);
		
		console.log(styles); 
		const useStyles = makeStyles({root: styles}, {name:'testi'});
		console.log(useStyles.root); 
		
		markerIcon = L.divIcon({
			className: classes.mapIconContainer,
			html: '<div class="' + clsx(classes.mapIconParent) + '"><span class="' + clsx(classes.mapIcon, 'mdi mdi-' + icon) + '"></span></div>',
			iconSize: [ 40, 40 ]
		});
	}
	
	// Marker MouseOver / MouseOut (bring tooltip to front if markers overlay)
	const memoizedHandleMouseEvent = useCallback(function() {this.closeTooltip().openTooltip()}, [],);

	return (

<LeafletMarker riseOnHover={true} position={Array.isArray(position) ? position : position.split(',')} icon={markerIcon} onMouseOver={memoizedHandleMouseEvent}>
	<LeafletTooltip className={classes.mapTooltip} direction={settings.tooltipDirection || 'bottom'} permanent={settings.tooltipPermanent || true} offset={[0,offset]}>
		{device.name}
	</LeafletTooltip>
</LeafletMarker>

	);
}