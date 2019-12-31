import React from 'react';

import Grid from '@material-ui/core/Grid';
//import Drawer from '@material-ui/core/Drawer';
//import Tabs from './components/Tabs';

import Popup from './components/Popup';
import Box from './components/Box';
import StateList from './components/StateList';
import StateListHorizontal from './components/StateListHorizontal';
//import Map from './components/Map';

/*
 * STYLES
 */
import { ThemeProvider, withStyles } from '@material-ui/core/styles';
import theme from './theme';
const styles = theme => ({
	'gridContainer': {
		paddingLeft: theme.spacing(1),
		[theme.breakpoints.down('md')]: {
			paddingLeft: theme.spacing(0.4)
		}
	}
});

/*
 * COMPONENTS
 */
const COMPONENTS = {
	StateList,
	StateListHorizontal,
	Map
}

/*
 *
 */
const getGridColumn = (columnContent, groups, action = null) => {
	console.log("getGridColumn()");
	
	let contents = [];
	for (let index in columnContent) {
		
		let groupId = columnContent[index];
		let group = groups[groupId];
		
		if (!group) {
			console.error('Group ' + groupId + ' defined in columns but not assigned to any devices!');
			continue;
		}
		
		const Tag = COMPONENTS[group.settings.component || 'StateList'];
		if (Tag === undefined) {
			console.error('Undefined component "' + group.settings.component + '" used!');
			continue;
		}
		
		contents.push(
			<Box key={'Box' + groupId} title={group.settings.title !== null ? (group.settings.title || group.name) : null} icon={group.settings.icon} iconStyle={group.settings.iconStyle}>
				<Tag key={'Tag' + groupId} devices={group.devices} openDialog={action} />
			</Box>
		);
	}
	
	return contents;
};

/*
 *
 */
const getGrid = (columns = 3, contents = {}, groups, action) => {
	console.log("getGrid()");
	
	let grid = [];
	for (let column = 1; column <= columns; column++) {
		
		if (!contents[column]) {
			console.error('No content for column #' + column + '!');
			continue;
		}
		
		const gridColumn = getGridColumn(contents[column], groups, action);
		grid.push(
			<Grid key={column} item				// @see https://material-ui.com/customization/breakpoints/
				xs={12}							//    0 -  600px
				sm={6}							//  600 -  960px
				md={6}							//  960 - 1280px
				lg={Math.round(12/columns)}		// 1280 - 1920px
				xl={Math.round(12/columns)}		// 		> 1920px
				>
				
				{gridColumn}
			</Grid>
		);
	}
	
	return grid;
};


class Jarvis extends React.Component {
	
    constructor(props) {
		super(props);
		
		this.state = {
			notificationDrawer: false,
			dialog: false,
			dialogContents: {
				'ts': 0,
				'device': {}
			}
		}
		
		this.openDialog = this.openDialog.bind(this);
		this.closeDialog = this.closeDialog.bind(this);
		//this.toggleDrawer = this.toggleDrawer.bind(this);
	};
	
	openDialog(device) {
		this.setState({ 'dialog': true, 'dialogContents': { 'ts': Date.now(), 'device': device } });
	};
	
	closeDialog() {
		this.setState({ 'dialog': false, 'dialogContents': { 'ts': Date.now(), 'device': {} } });
	};
	
	/*
	toggleDrawer(drawer, open) {
		this.setState({ [drawer]: open });
	};
	*/
	
    render() {
		const { classes } = this.props;
		const grid = getGrid(
			this.props.settings.columns && this.props.settings.columns.number,
			this.props.settings.columns && this.props.settings.columns.groups,
			this.props.groups,
			this.openDialog
		);
		
        return (

<ThemeProvider theme={theme}>
	{/*
	<Tabs />
	
	{/*
	<Drawer anchor="right" open={this.state.notificationDrawer} onClose={this.toggleDrawer('notificationDrawer', false)}>
		
	</Drawer>
		<Map />
	*/}

	<Popup open={this.state.dialog} contents={this.state.dialogContents} closeDialog={this.closeDialog} />
	<Grid container spacing={0} className={classes.gridContainer}>
		{grid}
	</Grid>
</ThemeProvider>

		)
	};
}

export default withStyles(styles)(Jarvis);
