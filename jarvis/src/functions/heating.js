import React from 'react'

import defaults from './defaults'


/*
 * COMPONENTS
 *
 */
function HeatingSetTemperatureComponent(props) {
	const Level = defaults.components.LevelComponent;
	return (
		<Level min={0} max={35} {...props} />
	);
}



export default {
	configurations: {
		temperature: {
			value: (val) => val.toFixed(1),
			unit: ' °C'
		},
		setTemperature: {
			unit: ' °C',
			icon: 'thermometer-chevron-up'
		},
		humidity: {
			unit: ' %'
		},
		boost: {
			icon: 'radiator'
		}
	},
	components: {
		setTemperature: HeatingSetTemperatureComponent
	},
	actions: {
		boost: defaults.actions.PowerAction
	},
	styles: {
	}
}