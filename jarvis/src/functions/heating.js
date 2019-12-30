import React, { useState, useEffect } from 'react';


export default {
	configurations: {
		temperature: {
			value: (val) => val.toFixed(1),
			unit: ' °C'
		},
		setTemperature: { unit: ' °C' },
		humidity: { unit: ' %' }
	},
	icons: {
	},
	components: {
	},
	actions: {
	}
}