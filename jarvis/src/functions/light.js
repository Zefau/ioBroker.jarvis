import React, { useState, useEffect } from 'react';

import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Switch from '@material-ui/core/Switch';


/*
 * STYLES
 */
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
	slider: {
		padding: theme.spacing(2, 30, 2, 2)
	},
}));


function Label(props) {
	const { title } = props;
	return (<Typography>{title}</Typography>);
}

function Power(props) {
	let { device, state } = props;
	
	const [checked, setChecked] = useState((state.state && state.state.value && state.state.value.val) || false);
	const onChange = (e, val) => device.setDeviceState(state.stateKey, val);
	
	useEffect(() => {
		device.on('stateChange', (stateKey, state) => {
			if (stateKey === 'power') {
				setChecked(state.val);
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

function Level(props) {
	let { device, state, title, min, max, step, markSteps } = props;
	const onChange = (e, val) => device.setDeviceState(state.stateKey, val);
	const classes = useStyles();
	
	// default settings
	min = min || 0;
	max = max || 100;
	step = step || 1;
	markSteps = markSteps || 11; // 0 to 10
	let markStep = ((max-min)/(markSteps-1)) || 10;
	return (

<React.Fragment>
	<Label title={title || state.stateKey } />
	<div classes={classes.slider}>
		<Slider
			//onChange
			onChangeCommitted={onChange}
			defaultValue={(state.state && state.state.value && state.state.value.val) || 0}
			valueLabelDisplay="auto"
			marks={[...Array(markSteps).keys()].map(number => ({ 'value': min+number*markStep, 'label': min+number*markStep }))}
			min={min}
			max={max}
			step={step}
		/>
	
	</div>
</React.Fragment>

	);
}

function ColorTemperature(props) {
	return (
		<Level min={2000} max={6500} step={10} {...props} />
	);
}



export default {
	configurations: {
		level: {
			value: (val) => val > 0 && val <= 1 ? val * 100 : val,
			unit: (val) => val > 0 ? ' %' : ''
		},
		colorTemperature: { unit: ' °K' },
		hue: { unit: ' °' }
	},
	icons: {
		defaultOn: '',
		defaultOff: '',
		
		power: 'light-switch',
		level: 'brightness-percent',
		colorTemperature: 'thermometer'
	},
	components: {
		level: Level,
		colorTemperature: ColorTemperature
	},
	actions: {
		power: Power
	}
}