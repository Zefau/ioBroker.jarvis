import React from 'react'
import clsx from 'clsx'

import { Line } from 'react-chartjs-2'
// eslint-disable-next-line
import chartjs_colorschemes from 'chartjs-plugin-colorschemes'
// eslint-disable-next-line
import chartjs_zoom from 'chartjs-plugin-zoom'

import deLocale from 'date-fns/locale/de'
import DateFnsUtils from '@date-io/date-fns'

import i18n from '../i18n'
import helpers from '../helpers/timeConverter'

import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Alert from '@material-ui/lab/Alert'
import Tooltip from '@material-ui/core/Tooltip'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers'
import InputBase from '@material-ui/core/InputBase'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import CalendarIcon from '@material-ui/icons/Event'
import CalendarTodayIcon from '@material-ui/icons/EventAvailable'
import HistoryIcon from '@material-ui/icons/History'
import FastRewindIcon from '@material-ui/icons/FastRewind'
//import DisablePan from '@material-ui/icons/SelectAll'
//import DisableZoom from '@material-ui/icons/LocationDisabled'
import ResetZoom from '@material-ui/icons/ZoomOutMap'
import LiveUpdates from '@material-ui/icons/Update'



/*
 * STYLES
 */
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
	loading: {
		position: 'absolute',
		backgroundColor: 'rgba(0, 0, 0, 0.3)',
		width: '100%',
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	errorMessage: {
		marginBottom: 5,
		marginRight: 15,
		width: '100%'
	},
	toolbar: {
		display: 'flex'
	},
	toolbarButtons: {
		display: 'initial',
		whiteSpace: 'nowrap'
	},
	options: {
		display: 'flex',
		justifyContent: 'center',
	},
	datePicker: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
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
	dividerVertical: {
		height: 28,
		margin: 4,
	},
	button: {
		backgroundColor: theme.palette.primary.main,
		color: '#fff !important',
		margin: '4px'
	},
	buttonDisabled: {
		backgroundColor: '#eee',
		margin: '4px'
	}
});


class Chart extends React.Component {
	
	constructor(props) {
		super(props);
		
		// chart settings
		this.chartFilter = this.props.settings.chartFilter || {};
		this.chartConfig = this.props.settings.chartConfig || {};
		
		this.chartConfig.yAxes = this.chartConfig.yAxes || [];
		this.chartConfig.yAxes.unshift({
			id: 'left',
			type: 'linear',
			position: 'left',
			ticks: {
				callback: value => (this.chartConfig.yLeftAxisUnitBefore || '') + Number.parseFloat(value).toFixed(1) + (this.chartConfig.yLeftAxisUnitAfter || '')
			}
		});
		
		// states
		this.state = {
			loading: true,
			errors: [],
			
			datePicker: false,
			selectedTimeRangeValue: (this.chartFilter && this.chartFilter.selectedTimeRangeValue) || 1,
			selectedTimeRangeUnit: (this.chartFilter && this.chartFilter.selectedTimeRangeUnit) || 'days',
			selectedDateTime: (this.chartFilter && this.chartFilter.selectedDateTime && new Date(this.chartFilter.selectedDateTime)) || new Date(),
			dateNow: this.chartFilter && this.chartFilter.selectedDateTime ? false : true,
			
			chartLabels: [],
			chartData: {
				labels: [],
				datasets: []
			},
			
			chartPan: true,
			chartZoom: true
		}
		
		//
		this.timer = null;
		this.timeRangeRef = React.createRef();
		
		// chart instance options
		this.chartRef = React.createRef();
		this.chartUpdates = {};
		this.chartOptions = {
			maintainAspectRatio: false,
			spanGaps: true,
			legend: {
				onClick: this.legendClickHandler.bind(this)
			},
			tooltips: {
				callbacks: {
					label: (item, data) => data.datasets[item.datasetIndex].label + ': ' + item.value + data.datasets[item.datasetIndex].unit
				},
			},
			scales: {
				yAxes: this.chartConfig.yAxes
			},

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
		
		// request initial history data
		let options = { ...this.getTimeRange(), axis: this.getAxis() };
		
		this.props.devices.forEach(device => {
			device.label = device.name + ' (' + i18n.t(device.primaryStateKey) + ')';
			device.requestDeviceStateHistory(device.options.history || null, true, { 'start': options.start, 'end': options.end, 'step': options.step, 'aggregate': 'average', 'ignoreNull': true }).catch(err => {
				console.error(err);
			});
			
			// add listeners for newly requested data
			device.on('historyChange', (stateKey, history, state) => {
				
				this.addChartGraph(device, history, { ...options, axis: this.getAxis(options.start, options.end) } );
				this.setState({ loading: false });
			});
			
			// add listeners for data updates
			if (this.props.settings.liveUpdates !== null && this.props.settings.liveUpdates !== false && this.state.dateNow) {
				
				device.on('stateChange', (stateKey, val, state) => this.updateChartGraph(device, val, { ...options, axis: this.getAxis(options.end, new Date()) } ));
			}
		});
	}
	
	componentDidUpdate(prevProps, prevState) {
		
		if (this.state.selectedTimeRangeValue &&
				(prevState.selectedDateTime !== this.state.selectedDateTime || prevState.selectedTimeRangeValue !== this.state.selectedTimeRangeValue || prevState.selectedTimeRangeUnit !== this.state.selectedTimeRangeUnit)
			) {
			
			// request updated history data
			this.setState({ loading: true, errors: [] });
			
			clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				
				const options = this.getTimeRange();
				this.props.devices.forEach(device => {
					device.requestDeviceStateHistory(device.options.history || null, true, { 'start': options.start, 'end': options.end, 'step': options.step, 'aggregate': 'average', 'ignoreNull': true }).catch(err => {
						console.error(err);
					});
				});
				
			}, 500);
		}
	}
	
	getTimeRange() {
		
		const end = this.state.selectedDateTime.getTime();
		let timeRange = this.state.selectedTimeRangeValue;
		let step = 1;
		let axisTimeFormat = 'dd. MMM yyyy, HH:mm';
		
		switch(this.state.selectedTimeRangeUnit) {
			default:
				break;
			
			case 'seconds':
				axisTimeFormat = 'dd. MMM yyyy, HH:mm:ss';
				break;
				
			case 'minutes':
				axisTimeFormat = 'dd. MMM yyyy, HH:mm:ss';
				timeRange = timeRange*60;
				//step = step;
				break;
				
			case 'hours':
				axisTimeFormat = 'dd. MMM yyyy, HH:mm';
				timeRange = timeRange*60*60;
				step = step*60;
				break;
				
			case 'days':
				axisTimeFormat = 'dd. MMM yyyy, HH:mm';
				timeRange = timeRange*60*60*24;
				step = step*60*60;
				break;
				
			case 'months':
				axisTimeFormat = 'dd. MMM yyyy';
				timeRange = timeRange*60*60*24*31;
				step = step*60*60*24;
				break;
				
			case 'years':
				axisTimeFormat = 'dd. MMM yyyy';
				timeRange = timeRange*60*60*24*365;
				step = step*60*60*24*31;
				break;
		}
		
		return {
			'axisTimeFormat': axisTimeFormat,
			'start': end-timeRange*1000,
			'end': end,
			'timeRange': timeRange*1000,
			'step': step*1000
		};
	}
	
	getAxis(start, end) {
		
		const { step, axisTimeFormat } = this.getTimeRange();
		let axis = {};
		
		for (let time = start; time <= end; time += step) {
			axis[time] = helpers.secondsToDateTime(time/1000, axisTimeFormat);
		}
		
		return axis;
	}
	
	groupChartData(chartData, axis) {
		
		let prevMarker;
		let data = [];
		
		let markers = Object.keys(axis);
		markers.forEach((marker, i) => {
			prevMarker = markers[(i-1 > 0 ? i-1 : 0)];
			
			for (let index in chartData) {
				let entry = chartData[index];
				entry.val = parseFloat(entry.val);
				
				// 
				if (!entry.ts || entry.val === null) {
					continue;
				}
				
				// before range, continue
				if (prevMarker > entry.ts) {
					continue;
				}
				
				// in range
				else if (prevMarker < entry.ts && entry.ts <= marker) {
					data[i] = !data[i] ? [ entry.val ] : [ ...data[i], entry.val ]; // parseFloat((data[i] ? ((data[i]+entry.val)/2) : entry.val).toFixed(2));
				}
				
				// beyond range, so next marker
				else if (entry.ts > marker) {
					break;
				}
			}
			
			//
			if (!data[i]) {
				// 
			}
			else if (data[i].length === 1) {
				data[i] = data[i][0];
			}
			else {
				data[i] = data[i].reduce((a,b) => a + b, 0) / data[i].length;
			}
		});
		
		return data;
	}
	
	updateChartGraph(device, value, options) {
		
		const chartIndex = this.state.chartLabels.findIndex(entry => entry === device.label);
		if (chartIndex === -1) {
			return false;
		}
		
		this.chartUpdates[chartIndex] = this.chartUpdates[chartIndex] || [];
		this.chartUpdates[chartIndex].push({
			'ts': value.ts,
			'val': value.val
		});
		
		// process data
		const data = this.groupChartData(this.chartUpdates[chartIndex], options.axis);
		
		//console.log(value);
		//console.log(options, options.axis, data);
		
		// update chart
		this.chartRef.current.chartInstance.data.labels = [ ...this.state.chartData.labels, ...Object.values(options.axis) ];
		this.chartRef.current.chartInstance.data.datasets[chartIndex].data = [ ...this.state.chartData.datasets[chartIndex].data, ...data ];
		this.chartRef.current.chartInstance.update();
	}
	
	addChartGraph(device, history, options) {
		
		// only add chart if data is given
		if (!history || !history.length) {
			let error = i18n.t('No history data given for %s').replace('%s', device.label) + '!';
			this.setState(prevStates => ({ errors: [ ...prevStates.errors, error ] }));
			return false;
		}
		
		// process data
		const data = this.groupChartData(history, options.axis);
		
		// update chart
		const chartIndex = this.state.chartLabels.findIndex(entry => entry === device.label);
		if (chartIndex > -1) {
			this.chartRef.current.chartInstance.data.labels = Object.values(options.axis);
			this.chartRef.current.chartInstance.data.datasets[chartIndex].data = data;
			this.chartRef.current.chartInstance.update();
		}
		
		// index chart
		else {
			this.setState(prevStates => ({ chartLabels: [ ...prevStates.chartLabels, device.label ] }));
			
			// chart dataset
			let dataSet = {
				label: device.label,
				unit: device.states[device.primaryStateKey].state.value.unit || '',
				fill: false,
				...device.options.graphConfig || {},
				data: data
			};
			
			// add data to chart
			this.setState(prevStates => ({
				axisTimeFormat: options.axisTimeFormat,
				chartData: {
					labels: Object.values(options.axis),
					datasets: [ ...prevStates.chartData.datasets, dataSet ],
				}
			}));
		}
	}
	
	legendClickHandler(e, legendItem) {
		
		let index = legendItem.datasetIndex;
		let ci = this.chartRef.current.chartInstance;
		let meta = ci.getDatasetMeta(index);

		meta.hidden = meta.hidden === null ? !ci.data.datasets[index].hidden : null;
		ci.update();
		ci.resetZoom();
	}
	
	disablePan() {
		let pan = this.chartRef.current.chartInstance.options.plugins.zoom.pan.enabled;
		this.chartRef.current.chartInstance.options.plugins.zoom.pan.enabled = (pan === false);
		this.setState({ chartPan: (pan === false) });
	}
	
	disableZoom() {
		let zoom = this.chartRef.current.chartInstance.options.plugins.zoom.zoom.enabled;
		this.chartRef.current.chartInstance.options.plugins.zoom.zoom.enabled = (zoom === false);
		this.setState({ chartZoom: (zoom === false) });
	}
	
	render() {
		const { classes, settings } = this.props;
		return (

<div>
	<div className={classes.options}>
	
		<Paper className={classes.datePicker}>
			<Tooltip title={i18n.t('Period shown in Chart')}>
				<HistoryIcon className={classes.icon} />
			</Tooltip>
			
			<InputBase
				inputRef={this.timeRangeRef}
				className={classes.input}
				value={this.state.selectedTimeRangeValue}
				onChange={event => this.setState({ selectedTimeRangeValue: event.target.value })}
				/>
			
			<Select
				value={this.state.selectedTimeRangeUnit}
				onChange={event => this.setState({ selectedTimeRangeUnit: event.target.value })}
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
			<Tooltip title={i18n.t('End date')}>
				<FastRewindIcon className={classes.icon} />
			</Tooltip>
			
			<MuiPickersUtilsProvider locale={deLocale} utils={DateFnsUtils}>
				<DateTimePicker
					className={classes.input}
					value={this.state.selectedDateTime}
					onChange={selectedDateTime => this.setState({ selectedDateTime: selectedDateTime, dateNow: false })}
					
					open={this.state.datePicker}
					onOpen={() => this.setState({ datePicker: true })}
					onClose={() => this.setState({ datePicker: false })}
					
					variant="inline"
					ampm={false}
					format='dd.MM.yyyy HH:mm'
					InputProps={{
						disableUnderline: true,
					}}
					/>
					
			</MuiPickersUtilsProvider>
			
			<Tooltip title={i18n.t('Select end date')}>
				<IconButton color="primary" className={classes.iconButton} onClick={() => this.setState({ datePicker: true })}>
					<CalendarIcon />
				</IconButton>
			</Tooltip>
			<Divider className={classes.dividerVertical} orientation="vertical" />
			<Tooltip title={i18n.t('Select today as end date')}>
				<IconButton className={classes.iconButton} onClick={() => this.setState({ selectedDateTime: new Date(), dateNow: true })}>
					<CalendarTodayIcon />
				</IconButton>
			</Tooltip>
		</Paper>
	
		<Button className={clsx(classes.datePicker, this.props.settings.liveUpdates !== null && this.props.settings.liveUpdates !== false && this.state.dateNow ? classes.button : classes.buttonDisabled)} disabled={true}>
			<Tooltip title={i18n.t('Indicates whether live updates are turn on or off.')}>
					<LiveUpdates />
			</Tooltip>
		</Button>
		
	</div>
	<Divider className={classes.divider} />
	
	<div className={classes.toolbar}>
		<div className={classes.errorMessage}>
			{this.state.errors.length > 0 && <Alert severity="error">{this.state.errors.map((error, i) => [ error, React.createElement('br', { key: 'br-error-' + i }) ])}</Alert>}
		</div>
		
		<ButtonGroup className={classes.toolbarButtons} color="primary">
		{/*
			<Button disableElevation={true} variant={this.state.chartPan ? 'contained' : 'outlined'} onClick={this.disablePan.bind(this)}>
				<Tooltip title={i18n.t(this.state.chartPan ? 'Disable panning' : 'Enable panning')}>
					<DisablePan />
				</Tooltip>
			</Button>
			<Button disableElevation={true} variant={this.state.chartZoom ? 'contained' : 'outlined'} onClick={this.disableZoom.bind(this)}>
				<Tooltip title={i18n.t(this.state.chartZoom ? 'Disable Zoom' : 'Enable Zoom')}>
					<DisableZoom />
				</Tooltip>
			</Button>
		*/}
			<Button disableElevation={true} variant="contained" onClick={() => this.chartRef.current.chartInstance.resetZoom()}>
				<Tooltip title={i18n.t('Reset Zoom')}>
					<ResetZoom />
				</Tooltip>
			</Button>
		</ButtonGroup>
	</div>
	
	<div className={'chart-container'} style={{ position: 'relative', height: settings.chartHeight || '500px' }}>
		{this.state.loading && <div className={classes.loading}>
			<CircularProgress />
		</div>}
		
		<Line
			ref={this.chartRef}
			data={this.state.chartData}
			options={this.chartOptions}
			/>
			
	</div>
</div>

		);
	}
}

export default withStyles(styles)(Chart);
