import React from 'react';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';


/*
 * STYLES
 */
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
	card: {
		margin: theme.spacing(1, 1, 0, 0),
		[theme.breakpoints.down('md')]: {
			margin: theme.spacing(0.4, 0.4, 0, 0)
		}
	},
	cardHeaderNoContents: {
		padding: theme.spacing(),
	},
	cardAvatar: props => ({
		backgroundColor: theme.palette.primary.main,
		color: '#fff',
		fontSize: '24px',
		...props
	}),
	cardContent: {
		padding: theme.spacing(0, 2),
		[theme.breakpoints.down('md')]: {
			padding: theme.spacing(0)
		}
	}
}));


export default function Widget(props) {
	const { title, icon, iconStyle } = props;
	const classes = useStyles(iconStyle);
	
	return (

<Card className={classes.card}>
	<CardHeader
		avatar={icon !== null &&
			<Avatar variant="rounded" classes={{ root: classes.cardAvatar }}>
				{React.createElement('span', { 'className': 'mdi mdi-' + (icon || 'home') })}
			</Avatar>
		}
		title={title &&
			<Typography variant="h5" component="h2">
				{title}
			</Typography>
		}
	/>
	<CardContent className={classes.cardContent}>
		{props.children}
	</CardContent>
</Card>

	);
}
