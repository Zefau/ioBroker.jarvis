import React from 'react';
import Device from '../Device';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import StateList from './StateList';


/*
 * STYLES
 */
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
	root: {
		margin: 0,
		padding: theme.spacing(2),
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
});


const DialogTitle = withStyles(styles)(props => {
	const { children, classes, onClose, ...other } = props;
	return (

<MuiDialogTitle disableTypography className={classes.root} {...other}>
	<Typography variant="h6">{children}</Typography>
	{onClose ? (
	<IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
		<CloseIcon />
	</IconButton>
	) : null}
</MuiDialogTitle>

	);
});

const DialogContent = withStyles(theme => ({
	root: {
		padding: theme.spacing(2),
	},
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
	root: {
		margin: 0,
		padding: theme.spacing(1),
	},
}))(MuiDialogActions);


export default class Popup extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			children: []
		};
	}
	
	componentDidUpdate(prevProps, prevState) {
		
		if (this.props.contents && this.props.contents.device && this.props.contents.ts !== prevProps.contents.ts) {
			let device = this.props.contents && this.props.contents.device;
			
			// loop through states and request status
			let responses = [];
			let children = [];
			
			for (let stateKey in device.states) {
				
				if (device.states[stateKey].state === undefined) {
					continue;
				}
					
				let child = new Device({
							'id': device.id + '#' + stateKey,
							'name': device.name,
							'function': device.function,
							'states': { [stateKey]: device.states[stateKey] },
							'options': {
								'primary': stateKey,
								'icon': { 'default': device.getIcon(stateKey) || 'tune' },
								'label': device.getComponent(stateKey),
								'action': device.getAction(stateKey),
								'divider': children.length !== 0,
								'subgroup': null,
								'subtitle': null
							}
							
						},
						device.socket
					);
				
				responses.push(child.requestDeviceState(null, true));
				children.push(child);
				
			}
			
			Promise.allSettled(responses).then(() => this.setState({ 'children': children }, () => this.forceUpdate()));
		}
	}
	
	shouldComponentUpdate(nextProps, nextState) {
		return !this.props.contents || this.props.contents.ts !== nextProps.contents.ts;
	}
	
	render() {
		const { open, closeDialog, contents } = this.props;
		const { ts, device } = contents;
		
		return (

<Dialog onClose={closeDialog} open={open || false} maxWidth={'md'} fullWidth={true}>
	<DialogTitle onClose={closeDialog}>
		{device.name}
	</DialogTitle>
	<DialogContent dividers style={{ padding: 0 }}>
		
		<StateList openDialog={null} devices={this.state.children} />	
		
	</DialogContent>
	<DialogActions>
		<Button autoFocus onClick={closeDialog} color="primary">
			Close
		</Button>
	</DialogActions>
</Dialog>

		);
	};
}
