import React, { useState, useEffect } from 'react'

import Connection from '../Connection'
import i18n from '../i18n'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'


/*
 * STYLES
 */
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
	paper: {
		width: 100,
		height: 160,
		padding: 5,
		textAlign: 'center',
	}
}));


export default function Weather(props) {
	const { settings } = props;
	const classes = useStyles();
	
	const [data,setData] = useState(null);
	useEffect(() => {
		
		Connection.getConnection.getRemoteResource(settings.url).then(
			response => {
				
				if (response.statusCode === 200) {
					setData(JSON.parse(response.body));
				}
			},
			error => console.error(error)
		);
		
	}, [settings.url]);
	
	let weatherForecast = [];
	console.log(data);
	
	if (!data) {
		return null;
	}
	else {
		for (let day in data.day) {
			let forecast = data.day[day];
			forecast.title = day === 1 ? i18n.t('today') : (day === 2 ? i18n.t('tomorrow') : forecast.name);
			
			const dailyForecast = (

<Grid key={'day-' + day} item>
	<Paper className={classes.paper}>
		<Typography variant="body1">
			{forecast.title}
		</Typography>
		<Typography variant="caption">
			{forecast.date}
		</Typography>


	</Paper>
</Grid>

			);
			
			weatherForecast.push(dailyForecast);
		}
	}
	
	return (

<Grid container justify="space-between" spacing={1}>
	{weatherForecast}
	
</Grid>

	);
}

export const Settings = {
	noDevicesAllowed: true,
	title: i18n.t('Weather'),
	icon: 'weather-partly-cloudy'
}
