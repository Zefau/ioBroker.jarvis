import React, { useState, useEffect } from 'react'

import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import StopIcon from '@material-ui/icons/Stop';

import defaults from './defaults'


/*
 * STYLES
 */
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
	value: props => ({
		float: 'left',
		lineHeight: '32px',
		marginRight: '10px'
	}),
	noBorder: {
		borderLeftColor: 'transparent'
	}
}));


/*
 * ACTIONS
 *
 */
function BlindLevelAction(props) {
	const { device, state, stateKey } = props;
	const classes = useStyles();
	
	const onGoUp = () => {
		setLevel(100);
		setActivity(true);
		device.setDeviceState(stateKey, 100).catch(err => console.error(err));
	}
	
	const onGoDown = () => {
		setLevel(0);
		setActivity(true);
		device.setDeviceState(stateKey, 0).catch(err => console.error(err));
	}
	
	const onStop = () => {
		setActivity(false);
		device.setDeviceState('activity', true).catch(err => console.error(err));
	}
	
	// level
	const [level, setLevel] = useState(state.value);
	useEffect(() => setLevel(state.value), [state.value]);
	
	// activity
	const [activity, setActivity] = useState(null);
	useEffect(() => {
		
		if (device.states.activity && device.states.activity.state) {
			device.states.activity.state = typeof device.states.activity.state === 'string' ? { 'node': device.states.activity.state } : device.states.activity.state;
			
			// request device state
			device.requestDeviceState('activity', true).catch(err => console.error(err));
			
			// listen for updates
			device.on('stateChange', (sKey, s) => {
				if (sKey === 'activity') {
					
					let val = s.val;
					
					// HomeMatic
					if (device.options.manufacturer === 'HomeMatic') {
						
						switch(val) {
							case 1: // UP
							case 2: // DOWN
								val = true;
								break;
								
							case 3: // STABLE
							default: // UNKNOWN
								val = false;
								break;
						}
					}
					
					//
					setActivity(val);
				}
			});
		}
		
	}, [device]);
	
	return (

<React.Fragment>
	
	<div className={classes.value}>
		{level + state.unit}
	</div>
	
	<ButtonGroup size="small">
		<Button color="primary" onClick={onGoUp}><ExpandLessIcon /></Button>
			{activity !== null && <Button color="secondary" style={{ borderRightColor: !activity ? 'transparent' : 'rgba(245, 0, 87, 0.5)' }} onClick={onStop} disabled={!activity}><StopIcon /></Button>}
		<Button color="primary" style={activity !== null ? { borderLeftColor: !activity ? 'rgba(0, 0, 0, 0.26)' : 'transparent' } : {}} onClick={onGoDown}><ExpandMoreIcon /></Button>
	</ButtonGroup>
</React.Fragment>

	);
}


export default {
	configurations: {
		level: {
			value: val => Math.round(val),
			icon: {
				'default': 'window-shutter-open',
				'>90': 'window-shutter-open',
				'<=90': 'window-shutter'
			}
		},
		level2: {
			value: val => Math.round(val),
			unit: ' %',
			icon: {
				'default': 'window-shutter-open',
				'>90': 'window-shutter-open',
				'<=90': 'window-shutter'
			}
		}
	},
	components: {
		level2: defaults.components.LevelComponent
	},
	actions: {
		level: BlindLevelAction
	},
	styles: {
	}
}