import defaults from './defaults'


export default {
	configurations: {
		level: {
			icon: {
				'default': 'window-shutter-open',
				'>90': 'window-shutter-open',
				'<=90': 'window-shutter'
			}
		},
		level2: {
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
	},
	styles: {
	}
}