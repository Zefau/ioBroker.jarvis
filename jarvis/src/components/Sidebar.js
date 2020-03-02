import React from 'react'
import clsx from 'clsx'

import Connection from '../Connection'
import i18n from '../i18n'

import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import SettingsIcon from '@material-ui/icons/Settings'


/*
 * STYLES
 */
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
	drawer: {
		width: 240,
		justifyContent: 'flex-end'
	}
});


class Sidebar extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
		}
	}
	
	render() {
		const { classes } = this.props;
		
		return (

<Drawer
	anchor="left"
	open={this.props.open}
	onClose={() => this.props.toggleDrawer('sidebarDrawer', false)}
	classes={{
		paper: classes.drawer
	}}
	>
	
	<Divider />
	<List>
		<ListItem button key="settings">
			<ListItemIcon><SettingsIcon /></ListItemIcon>
			<ListItemText primary={i18n.t('Settings')} />
		</ListItem>
	</List>
</Drawer>

		);
	}
}

export default withStyles(styles)(Sidebar);
