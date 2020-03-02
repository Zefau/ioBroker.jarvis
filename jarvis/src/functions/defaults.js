import React, { useState, useEffect } from 'react'
import clsx from 'clsx'

import i18n from '../i18n'

import Slider from '@material-ui/core/Slider'
import Switch from '@material-ui/core/Switch'
import Button from '@material-ui/core/Button'


/*
 * STYLES
 */
import { makeStyles, withStyles } from '@material-ui/core/styles';
const styles = theme => ({
	primaryAction: props => ({
		...props.styles
	}),
	secondaryAction: props => ({
		color: '#999',
		fontSize: '14px',
		...props.styles
	}),
});

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
const Action = withStyles(styles)(props => {
	const { classes, device, state, stateKey } = props;
	return (

<span className={clsx((stateKey === device.primaryStateKey && classes.primaryAction) || (stateKey === device.secondaryStateKey && classes.secondaryAction))}>
	{state && state.value} {state && state.unit}
</span>

	);
});

function PowerAction(props) {
	const { device, stateKey, stateVal, onChange: parentOnChange } = props;
	
	const onChange = (e) => {
		setChecked(e.target.checked);
		device.setDeviceState(stateKey, e.target.checked).catch(err => console.error(err));
	}
	
	const [checked, setChecked] = useState(stateVal);
	useEffect(() => setChecked(stateVal), [stateVal]);
	
	return (

<Switch
	checked={checked}
	onChange={parentOnChange || onChange}
	value={checked !== true}
	color="primary"
	/>

	);
}

function TriggerAction(props) {
	const { device, stateKey, stateVal } = props;
	
	const onClick = () => {
		device.setDeviceState(stateKey, true).catch(err => console.error(err));
	}
	
	//
	if (stateVal === true || stateVal > 0) {
		return <Action {...props} onChange={null} />;
	}
	
	const icon = 'power';
	return (

<Button
	variant="outlined"
	color="primary"
	size="small"
	startIcon={<span className={'mdi mdi-' + icon}></span>}
	onClick={onClick}
	>
	
	{i18n.t('turn on')}
</Button>

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
	{label}
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
	let { device, stateKey, stateVal, title, min, max, step, markSteps } = props;
	const classes = useStyles();
	
	const onChange = (e, val) => {
		setLevel(val);
		device.setDeviceState(stateKey, val).catch(err => console.error(err));
	}
	
	const [level, setLevel] = useState(stateVal);
	useEffect(() => setLevel(stateVal), [stateVal]);
	
	// default settings
	min = min || 0;
	max = max || 100;
	step = step || 1;
	markSteps = markSteps || 11; // 0 to 10
	let markStep = ((max-min)/(markSteps-1)) || 10;
	return (

<Component title={title || stateKey }>
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
		door: {
			icon: {
				'true': 'door-open',
				'false': 'door-closed'
			},
			state: {
				'true': 'open',
				'false': 'closed'
			},
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
		trigger: {
			state: {
				'true': 'on',
				'false': 'off'
			},
			icon: 'power'
		},
		wind: {
			unit: ' km/h',
			icon: 'weather-windy'
		}
	},
	components: {
		Label,
		Component,
		LevelComponent,
		
		level: LevelComponent
	},
	actions: {
		Action,
		PowerAction,
		TriggerAction,
		
		power: PowerAction,
		trigger: TriggerAction
	},
	styles: {
		_any: {
			//icon: {},
			state: {
				true: {
					'color': '#090',
					'fontWeight': 'bold'
				},
				false: {
					'color': '#999'
				}
			}
		}
	}
}