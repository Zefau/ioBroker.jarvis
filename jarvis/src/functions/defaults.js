import React, { useState, useEffect } from 'react';

import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Switch from '@material-ui/core/Switch';


/*
 * STYLES
 */
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
	component: {
		padding: theme.spacing(2, 8, 2, 2)
	},
	sliderMarkLabel: {
		[theme.breakpoints.down('md')]: {
			display: 'none',
			'&:nth-child(5)': { display: 'block' },
			'&:nth-child(15)': { display: 'block' },
			'&:nth-child(25)': { display: 'block' }
		}
	}
}));


/*
 * ACTIONS
 *
 */
function PowerAction(props) {
	const { device, state } = props;
	const onChange = (e, val) => device.setDeviceState(state.stateKey, val);
	
	const [checked, setChecked] = useState((state.state && state.state.value && state.state.value.val) || false);
	
	useEffect(() => {
		device.on('stateChange', (stateKey, s) => {
			if (stateKey === state.stateKey) {
				setChecked(s.val);
			}
		});
	});
	
	return (

<Switch
	checked={checked}
	onChange={onChange}
	value="true"
	color="primary"
/>

	);
}


/*
 * COMPONENTS
 *
 */
function Label(props) {
	const { label, br } = props;
	const linebreak = br || false;
	
	return (
	
<React.Fragment>
	<Typography>{label}</Typography>
	{linebreak && <br />}
</React.Fragment>
	
	);
}

function Component(props) {
	const { title, children } = props;
	const classes = useStyles();
	
	return (

<React.Fragment>
	<Label label={title} />
	<div className={classes.component}>
		{children}
	
	</div>
</React.Fragment>

	);
}

function LevelComponent(props) {
	let { device, state, title, min, max, step, markSteps } = props;
	const classes = useStyles();
	
	const onChange = (e, val) => device.setDeviceState(state.stateKey, val);
	const [level, setLevel] = useState((state.state && state.state.value && state.state.value.val) || 0);
	
	useEffect(() => {
		device.on('stateChange', (stateKey, s) => {
			if (stateKey === state.stateKey) {
				setLevel(s.val);
			}
		});
	});
	
	// default settings
	min = min || 0;
	max = max || 100;
	step = step || 1;
	markSteps = markSteps || 11; // 0 to 10
	let markStep = ((max-min)/(markSteps-1)) || 10;
	return (

<Component title={title || state.stateKey }>
	<Slider
		classes={{ markLabel: classes.sliderMarkLabel }}
		//onChange
		onChangeCommitted={onChange}
		defaultValue={level}
		valueLabelDisplay="auto"
		marks={[...Array(markSteps).keys()].map(number => ({ 'value': min+number*markStep, 'label': min+number*markStep }))}
		min={min}
		max={max}
		step={step}
	/>

</Component>

	);
}



export default {
	configurations: {
		_any: {
			value: (val) => val.toString(),
			//unit
			//icon
			//state
		},
		battery: {
			unit: ' %',
			icon: 'battery-medium'
		},
		humidity: {
			unit: ' %',
			icon: 'water-percent'
		},
		level: {
			unit: ' %'
		},
		position: {
			icon: 'map-marker'
		},
		power: {
			state: {
				'true': 'on',
				'false': 'off'
			},
			icon: 'power'
		},
		temperature: {
			unit: ' °C',
			icon: 'thermometer'
		},
		wind: {
			unit: ' km/h',
			icon: 'weather-windy'
		}
	},
	components: {
		Label,
		Component,
		LevelComponent
	},
	actions: {
		PowerAction
	},
	styles: {
		_any: {
			//icon: {},
			state: {
				'true': {
					'color': '#090',
					'fontWeight': 'bold'
				},
				'false': {
					'color': '#999'
				}
			}
		}
	}
}