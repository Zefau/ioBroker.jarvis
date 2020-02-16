import React from 'react'
import clsx from 'clsx'

import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'


/*
 * STYLES
 */
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
	defaultListDivider: {
		margin: '0 0 5px 0'
	},
	defaultListIcon: props => ({
		...theme.components.icon,
		...props.styles
	}),
	horizontalListItem: {
		display: 'inline-block',
		textAlign: 'center',
		paddingRight: '16px',
		width: '140px',
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


const ListItemIconElement = withStyles(styles)(props => {
	const { customClassNames, children, classes } = props;
	
	let classNames = Array.isArray(customClassNames) ? customClassNames : [customClassNames];
	classNames = classNames.map(className => (classes[className] ? classes[className] : className));
	
	return <span className={clsx(classNames)}>{children}</span>
});


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
		const { classes, horizontal, device, component, action } = this.props;
		
		const state = this.state[device.primaryStateKey];
		const options = device.get('options');
		
		let icon = device.getIcon(device.primaryStateKey, state.val);
		let primary = device.getAction(device.primaryStateKey, device.options.primaryAction === false);
		let secondary = action && this.state[device.secondaryStateKey] ? device.getAction(device.secondaryStateKey) : null;
		
		return (

<React.Fragment>
	
	{options.divider && options.divider !== 'after' && <ListItem divider className={classes.defaultListDivider} />}
	
	<ListItem
		className={clsx(this.props.openDialog && classes.finger, horizontal && classes.horizontalListItem)}
		button={this.props.openDialog !== null}
		onClick={this.props.openDialog && this.openDialog.bind(this)}
		>
		
		<ListItemIcon className={clsx(horizontal && classes.horizontalListItemIcon)}>
		{icon === null ? <React.Fragment /> :
			<ListItemIconElement customClassNames={['defaultListIcon','mdi mdi-' + icon]} styles={device.getStyle('icon', device.primaryStateKey, state.val)} />
		}
		</ListItemIcon>
		
		<ListItemText
			primary={(component && device.getComponent()) || device.getOption('label')}
			secondary={(options.subtitle !== null ? (options.subtitle || (state && state.timeChanged) || null) : null)}
			/>
		
		<ListItemSecondaryAction className={ horizontal ? classes.horizontalListItemAction : classes.verticalListItemAction }>
			{!secondary ? primary : [ primary, <br key={'br_' + device.id} />, secondary ]}
		</ListItemSecondaryAction>
	</ListItem>
	
	{options.divider && options.divider === 'after' && <ListItem divider style={{margin: '5px 0'}} />}
	
</React.Fragment>

		);
	}
}

export default withStyles(styles)(StateListItem);
