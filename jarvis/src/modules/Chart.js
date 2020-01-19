import React from 'react'
//import clsx from 'clsx'

import { Line } from 'react-chartjs-2'
import chartjs_colorschemes from 'chartjs-plugin-colorschemes'
import chartjs_zoom from 'chartjs-plugin-zoom'

import deLocale from 'date-fns/locale/de'
import DateFnsUtils from '@date-io/date-fns'

import i18n from '../i18n'
import helpers from '../helpers/timeConverter'


import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers'
import InputBase from '@material-ui/core/InputBase'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import CalendarIcon from '@material-ui/icons/Event'
import HistoryIcon from '@material-ui/icons/History'
import FastRewindIcon from '@material-ui/icons/FastRewind'


/*
 * STYLES
 */
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
	options: {
		display: 'flex',
		alignItems: 'center'
	},
	datePicker: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		width: 400,
		margin: 2
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1,
	},
	select: {
		width: 100
	},
	icon: {
		margin: 10,
	},
	iconButton: {
		padding: 10,
	},
	divider: {
		margin: '15px 0',
	},
});


class Chart extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			datePicker: false,
			timeRangeValue: 1,
			timeRangeUnit: 'days',
			selectedDateTime: new Date(),
			selectedTimeRange: 0,
			
			chartLabels: [],
			chartData: {
				labels: ['1'],
				datasets: []
			}
		}
		
		this.timeRangeRef = React.createRef();
		this.chartOptions = {
			maintainAspectRatio: false,
			
			plugins: {
				colorschemes: {
					scheme: 'brewer.SetOne9'
				},
				zoom: {
					// Container for pan options
					pan: {
						// Boolean to enable panning
						enabled: true,

						// Panning directions
						mode: 'xy'
					},
					
					// Container for zoom options
					zoom: {
						// Boolean to enable zooming
						enabled: true,

						// Zooming directions.
						mode: 'xy'
					}
				}
			}
		};
	}
	
	componentDidMount() {
		this.updateCharts(this.state.selectedDateTime.getTime(), this.getTimeRange());
	}
	
	componentDidUpdate(prevProps, prevState) {
		
		if (this.state.timeRangeValue &&
				(prevState.selectedDateTime !== this.state.selectedDateTime || prevState.timeRangeValue !== this.state.timeRangeValue || prevState.timeRangeUnit !== this.state.timeRangeUnit)
			) {
			
			this.setState({
				chartLabels: [],
				chartData: {
					labels: ['1'],
					datasets: []
				}
			});
			
			this.updateCharts(this.state.selectedDateTime.getTime(), this.getTimeRange());
		}
	}
	
	getTimeRange() {
		
		let timeRange = this.state.timeRangeValue;
		let step = 1;
		
		switch(this.state.timeRangeUnit) {
			default:
				break;
			
			case 'minutes':
				timeRange = timeRange*60;
				step = step;
				break;
				
			case 'hours':
				timeRange = timeRange*60*60;
				step = step*60;
				break;
				
			case 'days':
				timeRange = timeRange*60*60*24;
				step = step*60*60;
				break;
				
			case 'months':
				timeRange = timeRange*60*60*24*31;
				step = step*60*60*24;
				break;
				
			case 'years':
				timeRange = timeRange*60*60*24*365;
				step = step*60*60*24*31;
				break;
		}
		
		return { timeRange: timeRange*1000, step: step*1000 };
	}
	
	updateCharts(end, options) {
		
		// add devices to chart
		this.props.devices.forEach(device => {
			
			// request device state
			device.requestDeviceStateHistory(null, false, { 'start': end-options.timeRange, 'end': end, 'step': options.step, 'aggregate': 'average', 'ignoreNull': true }).catch(err => {
				console.error(err);
			});
			
			// listen for updates
			device.on('historyChange', (stateKey, history) => {
				
				let temp = {};
				if (this.state.chartLabels.indexOf(device.name) === -1) {
					
					temp[device.name] = {
						labels: [],
						data: []
					};
					
					
					
					
					
					
					
					//console.log(device.name);
					//console.log(history);
					
					let nextStep = history[0].ts;
					
					
					history.forEach(entry => {
						
						nextStep += options.step;
						
						temp[device.name].labels.push(helpers.secondsToDateTime(nextStep/1000));
						
						
						//console.log(entry.ts + ' < ' + nextStep + ': ' + entry.val);
						//console.log(helpers.secondsToDateTime(entry.ts/1000) + ' < ' + helpers.secondsToDateTime(nextStep/1000) + ': ' + entry.val);
						
						if (entry.ts < nextStep) {
							temp[device.name].data.push(entry.val.toFixed(2));
							
						}
						else {
							temp[device.name].data.push('nothing');
						}
						
					});
					
					// index chart
					this.setState(prevStates => ({ chartLabels: [ ...prevStates.chartLabels, device.name ] }));
					
					// add data to chart
					let dataset = {
						label: device.name, // i18n.t(stateKey),
						data: temp[device.name].data,
						fill: false
					};
					
					//console.log(temp[device.name].labels);
					//console.log(temp[device.name].data);
					
					this.setState(prevStates => ({
						chartData: {
							labels: temp[device.name].labels, // [ ...prevStates.chartData.labels,  ],
							datasets: [ ...prevStates.chartData.datasets, dataset ],
						}
					}));
					
					//console.log(this.state.chartData);
				}
			});
		});
	}
	
	render() {
		const { classes } = this.props;
		return (

<div>
	<div className={classes.options}>
	
		<Paper className={classes.datePicker}>
			<HistoryIcon className={classes.icon} />
			
			<InputBase
				inputRef={this.timeRangeRef}
				className={classes.input}
				value={this.state.timeRangeValue}
				onChange={event => this.setState({ timeRangeValue: event.target.value })}
				/>

			<Select
				value={this.state.timeRangeUnit}
				onChange={event => this.setState({ timeRangeUnit: event.target.value })}
				displayEmpty
				disableUnderline
				className={classes.select}
				>
				
				<MenuItem value="seconds">{i18n.t('Seconds')}</MenuItem>
				<MenuItem value="minutes">{i18n.t('Minutes')}</MenuItem>
				<MenuItem value="hours">{i18n.t('Hours')}</MenuItem>
				<MenuItem value="days">{i18n.t('Days')}</MenuItem>
				<MenuItem value="months">{i18n.t('Months')}</MenuItem>
				<MenuItem value="years">{i18n.t('Years')}</MenuItem>
			</Select>
			
			{/*
			<IconButton className={classes.iconButton} onClick={() => this.timeRangeRef.current.focus()}>
				<CalendarIcon />
			</IconButton>
			*/}
		</Paper>

		<Paper className={classes.datePicker}>
			<FastRewindIcon className={classes.icon} />
			
			<MuiPickersUtilsProvider locale={deLocale} utils={DateFnsUtils}>
				<DateTimePicker
					className={classes.input}
					value={this.state.selectedDateTime}
					onChange={selectedDateTime => this.setState({ selectedDateTime })}
					
					open={this.state.datePicker}
					onOpen={() => this.setState({ datePicker: true })}
					onClose={() => this.setState({ datePicker: false })}
					
					variant="inline"
					ampm={false}
					format="dd.MM.yyyy HH:mm"
					InputProps={{
						disableUnderline: true,
					}}
					/>
					
			</MuiPickersUtilsProvider>
			
			<IconButton className={classes.iconButton} onClick={() => this.setState({ datePicker: true })}>
				<CalendarIcon />
			</IconButton>
		</Paper>
		
	</div>
	<Divider className={classes.divider} />
	
	<div className={'chart-container'} style={{ position: 'relative' }}>
		<Line
			data={this.state.chartData}
			options={this.chartOptions}
			height={500}
			/>
			
	</div>
</div>

		);
	}
}

export default withStyles(styles)(Chart);
