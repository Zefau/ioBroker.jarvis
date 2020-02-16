import React from 'react'
import clsx from 'clsx'

import helpers from '../helpers/timeConverter'

import Divider from '@material-ui/core/Divider'
//import IconButton from '@material-ui/core/IconButton'
import Fab from '@material-ui/core/Fab'
import PlayIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'
import StopIcon from '@material-ui/icons/Stop'
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious'
import SkipNextIcon from '@material-ui/icons/SkipNext'


/*
 * STYLES
 */
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
	divider: {
		margin: '15px -16px'
	},
	container: {
		margin: theme.spacing(0, -2),
	},
	noHeader: {
		marginTop: theme.spacing(-4),
	},
	image: {
		height: '200px',
		display: 'flex',
		alignItems: 'flex-end',
		backgroundPosition: 'center',
		cursor: 'pointer'
	},
	noImage: {
		backgroundColor: theme.palette.primary.main,
		display: 'flex',
		cursor: 'pointer'
	},
	information: {
		backgroundColor: theme.palette.primary.main + '66',
		color: '#fff',
		padding: '10px',
		margin: 0,
		width: '100%',
		minHeight: '45px'
	},
	informationLeft: {
		width: '80%',
		float: 'left',
		margin: 0
	},
	informationRight: {
		width: '19%',
		float: 'right',
		margin: 0,
		textAlign: 'right'
	},
	length: {
		backgroundColor: theme.palette.primary.main,
		width: '100%',
		height: '7px',
	},
	lengthBar: {
		backgroundColor: theme.palette.secondary.main,
		height: '100%',
	},
	controls: {
		display: 'flex',
		alignItems: 'stretch'
	},
	controlsBox: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: '30px'
	},
	controlsBoxLeft: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'baseline'
	},
	controlsBoxCenter: {
		flex: 3
	},
	controlsBoxRight: {
		flex: 1,
		justifyContent: 'end'
	},
	controlButton: {
		margin: '0 5px'
	},
	controlButtonSmall: {
		margin: '0 10px',
		fontSize: '1.2rem',
		height: '32px',
		width: '32px'
	}
});


class Multimedia extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {}
	}
	
	componentDidMount() {
		
		// get initial states
		for (let stateKey in this.props.device.states) {
			this.props.device.requestDeviceState(stateKey, true).catch(err => console.error(err));
		}
		
		// receive updates
		this.props.device.on('stateChange', (stateKey, state) => {
			
			// duration
			if (stateKey === 'duration' && state && state.val.indexOf(':') === -1) {
				state.val = helpers.timeToHoursMinutesSeconds(state.val);
			}
			
			// isRunning
			if (stateKey === 'isRunning' && state && typeof state.val === 'string') {
				state.val = state.val.indexOf('play') > -1;
			}
			
			this.setState({ [stateKey]: state }, () => {
				this.progress();
			});
		});
	}
	
	progress() {
		clearTimeout(this.progressTimeout);
		
		if (this.state.isRunning && this.state.isRunning.val === true && this.state.progress && this.state.progress.val && this.state.duration && this.state.duration.val) {
			this.progressTimeout = setTimeout(() => {
				this.setState(prevState => ({ progress: { ...prevState.progress, val: helpers.timeToSeconds(prevState.progress.val) + 1 }}), () => this.progress());
			}, 1000);
		}
	}
	
	openDialog() {
		this.props.openDialog(this.props.device);
	}
	
	setDeviceState(stateKey, value) {
		this.props.device.setDeviceState(stateKey, value).catch(err => console.error(err));
	}
	
	render() {
		const { classes, noHeader, index, device } = this.props;
		let styleImage = {}, styleLength = {}, styleLengthBar = {};
		
		// background
		if (this.state.background && this.state.background.val !== '') {
			styleImage.backgroundImage = 'url(' + ((device.options.backgroundUrlPrepend || '') + this.state.background.val) + ')';
		}
		
		// duration
		if (this.state.duration && this.state.duration.val) {
			styleLengthBar.width = ((this.state.progress && this.state.progress.val) || 0) + 'px';
		}
		
		const playIconElements = this.state.isRunning && this.state.isRunning.val ? [<PauseIcon onClick={this.setDeviceState.bind(this, 'pause', true)} />, <StopIcon />] : [<PlayIcon onClick={this.setDeviceState.bind(this, 'play', true)} />];
		//const repeatIcon = 'repeat'; // repeat, repeat-off, repeat-once
		//const shuffleIcon = 'shuffle-variant'; // shuffle-variant, shuffle-disabled
		//const volumeIcon = 'volume-high'; // volume-variant-off
		
		return (

<React.Fragment>
	
	{index > 0 && <Divider className={classes.divider} />}
	<div className={clsx(classes.container, noHeader && classes.noHeader)}>
		
		<div className={clsx(this.state.background && this.state.background.val !== '' ? classes.image : classes.noImage)} style={ styleImage } onClick={this.openDialog.bind(this)}>
			
			<div className={classes.information}>
				<p className={classes.informationLeft}>
					{this.state.grandParent && this.state.grandParent.val && [this.state.grandParent.val, <br key={'br-' + device.id} />]}
					{this.state.parent && this.state.parent.val && this.state.parent.val + ' - '}{this.state.title && this.state.title.val}
				</p>
				<p className={classes.informationRight}>
					{this.state.progress && helpers.timeToHoursMinutesSeconds(this.state.progress.val)} / {this.state.duration && this.state.duration.val}
				</p>
			</div>
			
		</div>
		<div className={classes.length} style={ styleLength }>
			<div className={classes.lengthBar} style={ styleLengthBar }></div>
		</div>
		
		<div className={classes.controls}>
			<div className={clsx(classes.controlsBox, classes.controlsBoxLeft)}>
				{/*
				<IconButton size="small" className={classes.controlButtonSmall}>
					<span className={'mdi mdi-' + repeatIcon}></span>
				</IconButton>
				<IconButton size="small" className={classes.controlButtonSmall}>
					<span className={'mdi mdi-' + shuffleIcon}></span>
				</IconButton>
				*/}
				
			</div>
			<div className={clsx(classes.controlsBox, classes.controlsBoxCenter)}>
				
				<Fab className={classes.controlButton} size="small" color="secondary">
					<SkipPreviousIcon onClick={this.setDeviceState.bind(this, 'previous', true)} />
				</Fab>
				
				{playIconElements.map((icon, i) => 
				<Fab key={'icon-' + i} className={classes.controlButton} size="large" color="primary">
					{icon}
				</Fab>
				)}
				
				<Fab className={classes.controlButton} size="small" color="secondary">
					<SkipNextIcon onClick={this.setDeviceState.bind(this, 'next', true)} />
				</Fab>
				
			</div>
			<div className={clsx(classes.controlsBox, classes.controlsBoxRight)}>
				{/*
				<IconButton size="small" className={classes.controlButtonSmall}>
					<span className={'mdi mdi-' + volumeIcon}></span>
				</IconButton>
				*/}
				
			</div>
		</div>
		
	</div>

</React.Fragment>

		);
	}
}

export default withStyles(styles)(Multimedia);
