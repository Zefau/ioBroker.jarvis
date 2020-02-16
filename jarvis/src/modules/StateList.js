import React from 'react'
import i18n from '../i18n'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import StateListItem from './StateListItem'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'


/*
 * STYLES
 */
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
	defaultListSectionDivider: {
		margin: '5px 0 0 0'
	},
	defaultListSectionDividerItem: {
		margin: '6px 0 7px 0',
		padding: '0 16px !important'
	},
	defaultListSectionText: {
		margin: 0,
		[theme.breakpoints.down('md')]: {
			margin: '0 0 0 10px',
		}
	},
	horizontalList: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap'
	}
});


const ListDivider = withStyles(styles)(props => {
	const { classes, getDevicesBySubgroup, subgroup, title, subgroupActions } = props;
	
	const handleChangeOn = () => handleChange(true);
	const handleChangeOff = () => handleChange(false);
	const handleChange = targetStatus => {
		
		const devices = getDevicesBySubgroup(subgroup);
		devices.forEach(device => {
			
			let status = targetStatus;
			if (device.primaryStateKey === 'level') {
				status = status ? 100 : 0;
			}
			
			device.setDeviceState(null, status);
		});
	}
	
	return (
	
<React.Fragment>
	<ListItem divider className={classes.defaultListSectionDivider} />
	<ListItem className={classes.defaultListSectionDividerItem}>
		<ListItemText
			className={classes.defaultListSectionText}
			primary={title}
			/>
		
		<ListItemSecondaryAction>
		{subgroupActions === null || subgroupActions === false ? null :
			<ButtonGroup color="primary" size="small">
				<Button onClick={handleChangeOn}>{i18n.t('on')}</Button>
				<Button onClick={handleChangeOff}>{i18n.t('off')}</Button>
			</ButtonGroup>
		}
		
		</ListItemSecondaryAction>
	</ListItem>
</React.Fragment>
	
	);
});

class StateList extends React.Component {
	
	getDevicesBySubgroup(subgroup) {
		
		let devices = [];
		this.props.devices.forEach(device => {
			
			if (subgroup === device.getOption('subgroup')) {
				devices.push(device);
			}
		});
		
		return devices;
	}
	
	render() {
		const { classes, horizontal, devices, settings, component, action, ...props } = this.props;
		let subgroup;
		
		return (

<List dense={true} className={horizontal && classes.horizontalList}>
	{devices.map((device, i) => {
		
		const listSection = subgroup !== null && device.options.subgroup !== null && device.options.subgroup !== subgroup && <ListDivider
																																key={'ListDivider-' + device.get('id')}
																																getDevicesBySubgroup={this.getDevicesBySubgroup.bind(this)}
																																subgroup={device.getOption('subgroup')}
																																title={device.options.subgroup}
																																subgroupActions={settings.subgroupActions || device.options.subgroupActions}
																																/>
		
		const listItem = <StateListItem
							{...props}
							key={'StateListItem-' + device.get('id')}
							horizontal={horizontal}
							device={device}
							component={component || false}
							action={action || true}
							/>
		
		subgroup = device.getOption('subgroup');
		return [ listSection, listItem ];
	})}
</List>

		);
	}
}

export default withStyles(styles)(StateList);
