export default {
	configurations: {
		power: {
			value: (val) => val.toString()
		},
		battery: { unit: ' %' },
		humidity: { unit: ' %' },
		level: { unit: ' %' },
		temperature: { unit: ' °C' },
		wind: { unit: ' km/h' }
	}
}