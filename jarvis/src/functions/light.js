import React, { useState, useEffect } from 'react';
import { HuePicker, SketchPicker as ColorPicker } from 'react-color';

import defaults from './defaults';


/*
 * HELPER FUNCTIONS
 *
 */
function HslToRgb(h, s = 1, l = 0.5) {
	if (Array.isArray(h)) {
		l = h[2];
		s = h[1];
		h = h[0];
	}
	else if (typeof h === 'string' && h.indexOf(',')) {
		[h, s, l] = h.split(',');
	}
	
	let r, g, b;

	if (s === 0) {
		r = g = b = l; // achromatic
	}
	else {
		function hue2rgb(p, q, t) {
			if (t < 0) t += 1;
			if (t > 1) t -= 1;
			if (t < 1 / 6) return p + (q - p) * 6 * t;
			if (t < 1 / 2) return q;
			if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
			return p;
		}
		
		let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		let p = 2 * l - q;
		
		h = h > 1 ? h/360 : h;
		r = hue2rgb(p, q, h + 1 / 3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1 / 3);
	}
	
	return [
		Math.max(0, Math.min(Math.round(r * 255), 255)),
		Math.max(0, Math.min(Math.round(g * 255), 255)),
		Math.max(0, Math.min(Math.round(b * 255), 255)) 
	];
}

function RgbToHex(r, g, b) {
	if (Array.isArray(r)) {
		b = r[2];
		g = r[1];
		r = r[0];
	}
	else if (typeof r === 'string' && r.indexOf(',')) {
		[r, g, b] = r.split(',');
	}
	
	r = r.toString(16);
	g = g.toString(16);
	b = b.toString(16);
	
	if (r.length === 1) r = '0' + r;
	if (g.length === 1) g = '0' + g;
	if (b.length === 1) b = '0' + b;
	
	return "#" + r + g + b;
}


/*
 * ACTIONS
 *
 */
function LightColorAction(props) {
	const { device, state } = props;
	
	const [colorSpace, setColorSpace] = useState((state.state && state.state.value && state.state.value.val) || false);
	
	useEffect(() => {
		device.on('stateChange', (stateKey, s) => {
			if (stateKey === state.stateKey) {
				setColorSpace(s.val);
			}
		});
	});
	
	let colors, labels = {};
	if (state.stateKey === 'rgb' && colorSpace) {
		colors = colorSpace.split(',');
		labels = { Red: colors[0], Green: colors[1], Blue: colors[2] };
		
	}
	else if (state.stateKey === 'hsv' && colorSpace) {
		colors = colorSpace.split(',');
		labels = { Hue: colors[0], Saturation: colors[1], Brightness: colors[2] };
	}
	
	const Label = defaults.components.Label;
	let label = [];
	for (let key in labels) {
		label.push(<Label key={key} label={key + ' ' + labels[key]} br={true} />);
	}
	
	return label;
}


/*
 * COMPONENTS
 *
 */
function LightColorTemperatureComponent(props) {
	const Level = defaults.components.LevelComponent;
	return (
		<Level min={2000} max={6500} step={10} {...props} />
	);
}

function LightHueComponent(props) {
	const { device, state, title } = props;
	const onChangeComplete = (color, e) => device.setDeviceState(state.stateKey, Math.round(color.hsl.h));
	
	const Component = defaults.components.Component;
	const color = RgbToHex(HslToRgb((state.state && state.state.value && state.state.value.val) || 0));
	return (

<Component title={title || state.stateKey }>
	<HuePicker
		color={color}
		width={'100%'}
		onChangeComplete={onChangeComplete}
		/>
		
</Component>

	);
}

function LightColorComponent(props) {
	const { device, state, title } = props;
	const onChangeComplete = (color, e) => device.setDeviceState(state.stateKey, color.rgb.toString());
	
	const Component = defaults.components.Component;
	const color = (state.state && state.state.value && state.state.value.val) || '#fff';
	return (

<Component title={title || state.stateKey }>
	<ColorPicker
		color={color}
		width={'100%'}
		onChangeComplete={onChangeComplete}
		/>
		
</Component>

	);
}



export default {
	configurations: {
		power: {
			icon: {
				_widget: 'light-switch',
				'true': 'lightbulb-on',
				'false': 'lightbulb-off-outline'
			},
		},
		level: {
			value: (val) => val > 0 && val <= 1 ? val * 100 : val,
			unit: (value) => value !== 'off' ? ' %' : null,
			icon: {
				_widget: 'brightness-percent',
				'default': 'lightbulb-on',
				'0': 'lightbulb-off-outline'
			},
			state: {
				'0': 'off'
			},
		},
		colorTemperature: {
			icon: {
				_widget: 'thermometer',
			},
			unit: ' °K'
		},
		hue: {
			icon: {
				_widget: 'palette',
			},
			unit: ' °'
		},
		rgb: {
			icon: {
				_widget: 'palette',
			},
		},
		hsv: {
			icon: {
				_widget: 'palette',
			},
		},
		hex: {
			icon: {
				_widget: 'palette',
			},
		}
	},
	components: {
		level: defaults.components.LevelComponent,
		colorTemperature: LightColorTemperatureComponent,
		rgb: LightColorComponent,
		hsv: LightColorComponent,
		hex: LightColorComponent,
		hue: LightHueComponent
	},
	actions: {
		power: defaults.actions.PowerAction,
		rgb: LightColorAction,
		hsv: LightColorAction,
		hex: LightColorAction
	},
	styles: {
		_any: {
			//icon: {},
			state: {
				'0': {
					'color': '#999'
				}
			}
		}
	}
}