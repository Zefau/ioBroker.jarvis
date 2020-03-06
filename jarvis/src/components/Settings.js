import React from 'react'
import clsx from 'clsx'

import i18n from '../i18n'

import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'


/*
 * STYLES
 */
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
	drawer: {
		width: 400
	}
});


class Settings extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
		}
	}
	
	render() {
		const { classes, notifications } = this.props;
		
		return (

<Drawer
	anchor="right"
	open={this.props.open}
	onClose={() => this.props.toggleDrawer('notificationDrawer', false)}
	classes={{
		paper: classes.drawer
	}}
	>
	
</Drawer>

		);
	}
}

export default withStyles(styles)(Notifications);
