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
			device.on('historyChange', (stateKey, history) => {
				
				let temp = {};
				if (!charts[stateKey]) {
					
					temp[stateKey] = {
						labels: [],
						data: []
					};
					
					history.forEach(entry => {
						temp[stateKey].labels.push(entry.ts);
						temp[stateKey].data.push(entry.val);
					});
					
					setCharts(prevCharts => ({ ...prevCharts, [stateKey]: temp[stateKey] }));
				}
				
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
	
	}, [devices]);
	
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

let data = {};

console.log(charts);

if (charts && charts['brightness']) {
data = {
  labels: charts['brightness'].labels,
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: charts['brightness'].data
    }
  ]
};

} 


	return (

<div className={'chart-container'} style={{ position: 'relative' }}>
	<Line data={data} />
</div>

	);
}
