import React from 'react';

import List from '@material-ui/core/List';
import StateListItem from './StateListItem';


/*
 * STYLES
 */
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
	horizontalList: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap'
	}
}));


export default function StateList(props) {
	const { horizontal, openDialog, devices, component, action } = props;
	const classes = useStyles();
	let subgroup;
	
	return (

<List dense={true} className={horizontal && classes.horizontalList}>
	{devices.map(device => {
		const listItem = <StateListItem
							key={device.get('id')}
							horizontal={horizontal}
							openDialog={openDialog}
							prevSubgroup={subgroup}
							device={device}
							component={component || false}
							action={action || true}
							/>
		
		subgroup = device.getOption('subgroup');
		return listItem;
	})}
</List>

	);
}
