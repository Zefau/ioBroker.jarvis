import React from 'react';
import clsx from 'clsx';

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
	defaultListDivider: {
		margin: '5px 0 0 0'
	},
	defaultListDividerText: {
		margin: '5px 0 0 0',
		[theme.breakpoints.down('md')]: {
			margin: '5px 0 0 10px',
		}
	},
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
		width: '150px',
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
	},
});


const ListDivider = withStyles(styles)(props => {
	const { classes, title } = props;
	return (
	
<React.Fragment>
	<ListItem divider className={classes.defaultListDivider} />
	<li>
		<Typography
			className={classes.defaultListDividerText}
			display="block"
			variant="caption"
		>
		{title}
		</Typography>
	</li>
</React.Fragment>
	
	);
});

const ListItemIconElement = withStyles(styles)(props => {
	const { customClassNames, children, classes } = props;
	
	let classNames = Array.isArray(customClassNames) ? customClassNames : [customClassNames];
	classNames = classNames.map(className => (classes[className] ? classes[className] : className));
	
	return <span className={clsx(classNames)}>{children}</span>
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
		const { classes, horizontal, prevSubgroup, device, component, action } = this.props;
		
		const stateVal = this.state[device.primaryStateKey];
		const options = device.get('options');
		let icon = null, primary = null, secondary = null;
		
		
			let ActionState = null;
		if (stateVal) {
			icon = device.getIcon(device.primaryStateKey, stateVal.val);
			
			const ActionElement = device.getAction();
			
			if (action && ActionElement) {
				ActionState = <ActionElement device={device} stateKey={device.primaryStateKey} stateVal={stateVal.val} />
			}
			else {
				primary = <ListItemAction key={'primary_' + device.id} customClassNames="defaultListItemActionPrimary" styles={device.getStyle('state', device.primaryStateKey, stateVal.val)}>{stateVal.value} {stateVal.unit}</ListItemAction>
				secondary = this.state[device.secondaryStateKey] && <ListItemAction key={'secondary_' + device.id} customClassNames="defaultListItemActionSecondary" styles={device.getStyle('state', device.secondaryStateKey, this.state[device.secondaryStateKey].val)}>{this.state[device.secondaryStateKey].value} {this.state[device.secondaryStateKey].unit}</ListItemAction>
				ActionState = (!secondary ? primary : [ primary, <br key={'br_' + device.id} />, secondary ]);
			}
		}
		
		return (

<React.Fragment>
	
	{options.divider && options.divider !== 'after' && <ListItem divider style={{margin: '5px 0'}} />}
	{prevSubgroup !== null && options.subgroup !== null && options.subgroup !== prevSubgroup && <ListDivider title={options.subgroup} />}
	
	<ListItem
		className={clsx(this.props.openDialog && classes.finger, horizontal && classes.horizontalListItem)}
		button={this.props.openDialog !== null}
		onClick={this.props.openDialog && this.openDialog.bind(this)}
		>
		
		{icon !== null &&
		<ListItemIcon className={ horizontal && classes.horizontalListItemIcon }>
			<ListItemIconElement customClassNames={['defaultListIcon','mdi mdi-' + icon]} styles={device.getStyle('icon', device.primaryStateKey, stateVal.val)} />
		</ListItemIcon>
		}
		
		<ListItemText
			primary={(component && device.getComponent()) || device.getOption('label')}
			secondary={(options.subtitle !== null ? (options.subtitle || (stateVal && stateVal.timeChanged) || null) : null)}
			/>
		
		<ListItemSecondaryAction className={ horizontal ? classes.horizontalListItemAction : classes.verticalListItemAction }>
			{ActionState}
		</ListItemSecondaryAction>
	</ListItem>
	
	{options.divider && options.divider === 'after' && <ListItem divider style={{margin: '5px 0'}} />}
	
</React.Fragment>

		);
	}
}

export default withStyles(styles)(StateListItem);
