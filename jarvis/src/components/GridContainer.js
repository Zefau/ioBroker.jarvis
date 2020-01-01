import React from 'react'

import Grid from '@material-ui/core/Grid';


/*
 * STYLES
 */
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
	gridContainer: {
		paddingLeft: theme.spacing(1),
		[theme.breakpoints.down('md')]: {
			paddingLeft: theme.spacing(0.4)
		}
	}
}));


export default function GridContainer(props) {
	const { contents = {} } = props;
	
	const classes = useStyles();
	const columns = Object.keys(contents).length;
	
	let grid = [];
	for (let column = 1; column <= columns; column++) {
		
		if (!contents[column]) {
			console.error('No content for column #' + column + '!');
			continue;
		}
		
		grid.push(
			<Grid key={column} item				// @see https://material-ui.com/customization/breakpoints/
				xs={12}							//    0 -  600px
				sm={6}							//  600 -  960px
				md={6}							//  960 - 1280px
				lg={Math.round(12/columns)}		// 1280 - 1920px
				xl={Math.round(12/columns)}		// 		> 1920px
				>
				
				{contents[column]}
			</Grid>
		);
	}
	
	return (

<Grid container spacing={0} className={classes.gridContainer}>
	{grid}
</Grid>

	);
}
