import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';

import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';


/*
 * STYLES
 */
import { useStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		boxShadow: 'none'
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	indicator: {
		backgroundColor: '#fff',
	},
	'tabs': {
		paddingLeft: theme.spacing(),
		color: '#fff'
		
	},
}));


export default function VisTabs() {
	console.log('COMPONENT RENDER: VisTabs');
	
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (

<AppBar position="static" className={classes.root}>

	<Toolbar>
		<Typography variant="h6" className={classes.title}>
			News
		</Typography>
		<IconButton aria-label="show 17 new notifications" color="inherit">
			<Badge badgeContent={17} color="secondary">
				<NotificationsIcon />
			</Badge>
		</IconButton>
	</Toolbar>
		
	<Tabs style={STYLES.tabs}
		value={value}
		onChange={handleChange}
		variant="scrollable"
		classes={{
			indicator: classes.indicator
		}}>
	>
		
		<Tab icon={<PhoneIcon />} label="RECENTS" />
		<Tab icon={<FavoriteIcon />} label="FAVORITES" />
		<Tab icon={<PersonPinIcon />} label="NEARBY" />
	</Tabs>
</AppBar>

	);
}