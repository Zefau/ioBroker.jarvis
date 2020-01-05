import React, { useState, useEffect, useRef, useCallback } from 'react'
import clsx from 'clsx'

import { Line } from 'react-chartjs-2';

import Typography from '@material-ui/core/Typography';


/*
 * STYLES
 */
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
}));


export default function Chart(props) {
	const { component, devices } = props;
	const classes = useStyles();
	
	const [charts, setCharts] = useState({});
	
	// get history
	useEffect(() => {
		
		devices.forEach(device => {
			
			// request device state
			device.requestDeviceStateHistory().catch(err => {
				console.error(err);
				
				setCharts(prevCharts => {
					if (!prevCharts[device.id]) {
						return { ...prevCharts, [device.id]: null };
					}
					
					return prevCharts;
				});
			});
			
			// listen for updates
			device.on('historyChange', (stateKey, state) => {
				console.log(stateKey);
				console.log(state);
				/*
				if (stateKey === device.primaryKey) {
					
					setCharts(prevCharts => {
						if (!prevCharts[device.id] || prevMarkers[device.id].position !== state.val) {
							device.options.position = state.val;
							return { ...prevMarkers, [device.id]: device };
						}
						
						return prevMarkers;
					});
				}
				*/
			});
		});
	
	}, [devices], []);
	
	// INDEX: { ts: 1577796089456, val: 3971.88 }
/*
	
	var myLineChart = new Chart(chart.current, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45]
        }]
    },

    // Configuration options go here
    options: {}
});
*/

	return null
}
