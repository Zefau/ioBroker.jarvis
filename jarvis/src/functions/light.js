import React, { useState, useEffect } from 'react';
import { HuePicker, SketchPicker as ColorPicker } from 'react-color';

import defaults from './defaults';


/*
 * HELPER FUNCTIONS
 *
 */
function HsvToRgb(h, s = 1, v = 1) {
	if (Array.isArray(h)) {
		v = h[2];
		s = h[1];
		h = h[0];
	}
	else if (typeof h === 'string' && h.indexOf(',')) {
		[h, s, v] = h.split(',');
	}
	
	if (h > 1) {
		h = h/360;
	}
	
	let r, g, b, i, f, p, q, t;
	
	i = Math.floor(h * 6);
	f = h * 6 - i;
	p = v * (1 - s);
	q = v * (1 - f * s);
	t = v * (1 - (1 - f) * s);
	
	switch (i % 6) {
		case 0:
			r = v;
			g = t;
			b = p;
			break;
			
		case 1:
			r = q;
			g = v;
			b = p;
			break;
		
		case 2:
			r = p;
			g = v;
			b = t;
			break;
		
		case 3:
			r = p;
			g = q;
			b = v;
			break;
		
		case 4:
			r = t;
			g = p;
			b = v;
			break;
		
		case 5:
			r = v;
			g = p;
			b = q;
			break;
		
		default: // for webpack
			break;
	}
	
	return [
		Math.round(r * 255),
		Math.round(g * 255),
		Math.round(b * 255)
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
	
	r = r > 1 ? r / 255 : r;
	g = g > 1 ? g / 255 : g;
	b = b > 1 ? b / 255 : b;
	
	r = Math.round(r.toString(16)*100);
	g = Math.round(g.toString(16)*100);
	b = Math.round(b.toString(16)*100);
	
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
	const [hue, setHue] = useState((state.state && state.state.value && state.state.value.val) || 0);
	
	useEffect(() => {
		device.on('stateChange', (stateKey, s) => {
			if (stateKey === state.stateKey) {
				setHue(s.val);
			}
		});
	});
	
	const Component = defaults.components.Component;
	const color = RgbToHex(HsvToRgb(hue));
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
	
	const onChangeComplete = (color, e) => {
		color = color[state.stateKey];
		
		// RGB
		if (state.stateKey === 'rgb') {
			color = [color.r, color.g, color.b].join(',');
		}
		// HSV
		else if (state.stateKey === 'hsv') {
			color = [color.h, color.s, color.v].join(',');
		}
		
		console.log(color);
		device.setDeviceState(state.stateKey, color);
	};
	
	let initialColor = (state.state && state.state.value && state.state.value.val) || '#ffffff';
	
	// RGB
	if (state.stateKey === 'rgb') {
		initialColor = RgbToHex(initialColor);
	}
	// HSV
	else if (state.stateKey === 'hsv') {
		initialColor = RgbToHex(HsvToRgb(initialColor));
	}
	
	const [colorSpace, setColorSpace] = useState(initialColor);
	
	useEffect(() => {
		device.on('stateChange', (stateKey, s) => {
			
			// RGB
			if (stateKey === 'rgb') {
				setColorSpace(RgbToHex(s.val));
			}
			// HSV
			else if (stateKey === 'hsv') {
				setColorSpace(RgbToHex(HsvToRgb(s.val)));
			}
			// HEX
			else if (stateKey === 'hex') {
				setColorSpace(s.val);
			}
		});
	});
	
	const Component = defaults.components.Component;
	return (

<Component title={title || state.stateKey }>
	<ColorPicker
		color={colorSpace}
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