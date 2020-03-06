import React from 'react'
import clsx from 'clsx'

import i18n from '../i18n'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/tooltip'
import Badge from '@material-ui/core/Badge'
import NotificationsIcon from '@material-ui/icons/Notifications'
import MenuIcon from '@material-ui/icons/Menu'
import SettingsIcon from '@material-ui/icons/Settings'


/*
 * STYLES
 */
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
	appBar: {
		flexGrow: 1,
		boxShadow: 'none',
		transform: 'none',
	},
	toolbar: {
		backgroundColor: theme.palette.primary.main
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1,
	},
	icon: {
		...theme.components.icon,
		color: '#fff',
		paddingRight: '6px',
		width: '1em',
		height: '1em',
		display: 'inline-block',
		fontSize: '1.5rem',
		transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
		flexShrink: 0,
		userSelect: 'none'
	}
}));


export default function TopBar(props) {
	const classes = useStyles();
	
	const { children, title, connectionStatus, toggleDrawer, notifications } = props;
	const [ icon, label ] = title.indexOf('|') > -1 ? title.split('|') : [ null, title ];
	
	const connectionStatusIcon = connectionStatus ? 'lan-connect' : (connectionStatus === 'pending' ? 'lan-pending' : 'lan-disconnect');
	const connectionStatusTooltip = connectionStatus ? i18n.t('Connected to ioBroker') : (connectionStatus === 'pending' ? i18n.t('Not connected to ioBroker! Reconnecting..') : i18n.t('Not connected to ioBroker! Connection failed!'));
	
	return (

<AppBar id="appBar" position="static" className={classes.appBar}>

	<Toolbar className={classes.toolbar}>
	
		<IconButton color="inherit" edge="start" className={classes.menuButton} onClick={() => toggleDrawer('sidebarDrawer', true)}>
			<MenuIcon />
		</IconButton>

		<Typography variant="h6" className={classes.title}>
			{icon && <span className={clsx(classes.icon, 'mdi mdi-' + icon)}></span>}
			{label !== 'null' && label}
		</Typography>
		<IconButton color="inherit">
			<Tooltip title={i18n.t(connectionStatusTooltip)}>
				<span className={"mdi mdi-" + connectionStatusIcon}></span>
			</Tooltip>
		</IconButton>
		<IconButton color="inherit" onClick={() => this.props.navigate('settings')}>
			<SettingsIcon />
		</IconButton>
		<IconButton color="inherit" onClick={() => toggleDrawer('notificationDrawer', true)}>
			<Badge badgeContent={notifications} color="secondary">
				<NotificationsIcon />
			</Badge>
		</IconButton>
		
	</Toolbar>
	
	{children}
</AppBar>

	);
}
