import React from 'react';
import clsx from 'clsx';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';


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
		marginRight: theme.spacing(2),
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
	
	const { children, title } = props;
	const [ icon, label ] = title.indexOf('|') > -1 ? title.split('|') : [ null, title ];
	return (

<AppBar id="appBar" position="static" className={classes.appBar}>

	<Toolbar className={classes.toolbar}>
		<Typography variant="h6" className={classes.title}>
			{icon && <span className={clsx(classes.icon, 'mdi mdi-' + icon)}></span>}
			{label !== 'null' && label}
		</Typography>
		{/*
		<IconButton color="inherit">
			<Badge badgeContent={17} color="secondary">
				<NotificationsIcon />
			</Badge>
		</IconButton>
		*/}
	</Toolbar>
	
	{children}
</AppBar>

	);
}
