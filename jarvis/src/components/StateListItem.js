import React from 'react';
import multipleClassNames from 'classnames';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';


/*
 * STYLES
 */
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
	defaultListIcon: props => ({
		...theme.components.icon,
		...props.styles
	}),
	defaultListItemActionPrimary: props => ({
		...props.styles
	}),
	defaultListItemActionSecondary: props => ({
		color: '#999',
		fontSize: '14px',
		...props.styles
	}),
	horizontalListItem: {
		display: 'inline-block',
		textAlign: 'center',
		paddingRight: '16px',
		minWidth: '150px',
		marginTop: '10px'
	},
	horizontalListItemIcon: {
		minWidth: 'auto'
	},
	horizontalListItemAction: {
		textAlign: 'center',
		top: 0,
		right: 0,
		position: 'static',
		transform: 'none',
	},
	verticalListItemAction: {
		textAlign: 'right'
	}
});


const ListDivider = ({ title }) => (
	<React.Fragment>
		<ListItem divider style={{margin: '5px 0 0 0'}} />
		<li>
			<Typography
				style={{margin: '5px 0 0 0px'}}
				display="block"
				variant="caption"
			>
			{title}
			</Typography>
		</li>
    </React.Fragment>
);

const ListItemIconElement = withStyles(styles)(props => {
	const { customClassNames, children, classes, styles } = props;
	
	let classNames = Array.isArray(customClassNames) ? customClassNames : [customClassNames];
	classNames = classNames.map(className => (classes[className] ? classes[className] : className));
	
	return (<span className={multipleClassNames(classNames)}>{children}</span>);
});
const ListItemAction = ListItemIconElement;


class StateListItem extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {}
		this.state[this.props.device.primaryStateKey] = this.props.device.getDeviceState() || {}
		
		if (this.props.device.secondaryStateKey) {
			this.state[this.props.device.secondaryStateKey] = this.props.device.getDeviceState(this.props.device.secondaryStateKey) || {}
		}
	}
	
	componentDidMount() {
		
		this.props.device.on('stateChange', (stateKey, state) => {
			
			if (stateKey === this.props.device.primaryStateKey || stateKey === this.props.device.secondaryStateKey) {
				this.setState({ [stateKey]: state });
			}
		});
	}
	
	openDialog() {
		this.props.openDialog(this.props.device);
	}
	
	render() {
		const { classes, horizontal, prevSubgroup, device } = this.props;
		
		console.log(device);
		
		
		
		
		
		let options = device.get('options');
		let icon = null, primary = null, secondary = null, action = null;
		secondary = this.state[device.secondaryStateKey] && <ListItemAction key={'secondary_' + device.id} customClassNames="defaultListItemActionSecondary" styles={{...device.getStyle('state', this.state[device.secondaryStateKey].val), ...device.getStyle('secondaryState', this.state[device.secondaryStateKey].val)}}>{this.state[device.secondaryStateKey].value} {this.state[device.secondaryStateKey].unit}</ListItemAction>
		
		if (this.state[device.primaryStateKey]) {
			icon = device.getOption('icon', this.state[device.primaryStateKey].val);
			primary = <ListItemAction key={'primary_' + device.id} customClassNames="defaultListItemActionPrimary" styles={{...device.getStyle('state', this.state[device.primaryStateKey].val), ...device.getStyle('primaryState', this.state[device.primaryStateKey].val)}}>{this.state[device.primaryStateKey].value} {this.state[device.primaryStateKey].unit}</ListItemAction>
			action = device.getOption('action') || (!secondary ? primary : [primary, <br key={'br_' + device.id} />, secondary]);
		}
		
		return (

<React.Fragment>
	{options.divider && <ListItem divider style={{margin: '5px 0'}} />}
	{prevSubgroup !== null && options.subgroup !== null && options.subgroup !== prevSubgroup && <ListDivider title={options.subgroup} />}
	
	<ListItem
		className={multipleClassNames(this.props.openDialog && classes.finger, horizontal && classes.horizontalListItem)}
		button={this.props.openDialog !== null}
		onClick={this.props.openDialog && this.openDialog.bind(this)}
		>
		
		{icon !== null &&
		<ListItemIcon className={ horizontal && classes.horizontalListItemIcon }>
			<ListItemIconElement customClassNames={['defaultListIcon','mdi mdi-' + icon]} styles={device.getStyle('icon', this.state[device.primaryStateKey].val)} />
		</ListItemIcon>
		}
		
		<ListItemText
			primary={device.getOption('label')}
			secondary={(options.subtitle !== null ? (options.subtitle || (this.state[device.primaryStateKey] && this.state[device.primaryStateKey].timeChanged) || null) : null)}
			/>
		
		<ListItemSecondaryAction className={ horizontal ? classes.horizontalListItemAction : classes.verticalListItemAction }>
			{action}
		</ListItemSecondaryAction>
	</ListItem>
	
</React.Fragment>

		);
	}
}

export default withStyles(styles)(StateListItem);
