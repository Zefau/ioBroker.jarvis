import React from 'react';

//import Drawer from '@material-ui/core/Drawer';
//import Tabs from './components/Tabs';

import GridContainer from './components/GridContainer';
import Popup from './components/Popup';
import Box from './components/Box';
import StateList from './components/StateList';
import StateListHorizontal from './components/StateListHorizontal';
//import Map from './components/Map';


/*
 * STYLES
 */
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';


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
const getGridContents = (columns, contents, groups, action = null) => {
	console.log("getGridColumn()");
	
	let gridContents = {};
	for (let column = 1; column <= columns; column++) {
		
		let columnContents = contents[column];
		for (let index in columnContents) {
			
			let groupId = columnContents[index];
			let group = groups[groupId];
			
			if (!group) {
				console.error('Group ' + groupId + ' defined in columns but not assigned to any devices!');
				continue;
			}
			
			const Tag = COMPONENTS[group.settings.component || 'StateList'];
			if (Tag === undefined) {
				console.error('Undefined component "' + group.settings.component + '" used!');
				return;//continue;
			}
			
			gridContents[column] = gridContents[column] || [];
			gridContents[column].push(
				<Box key={'Box' + groupId} title={group.settings.title !== null ? (group.settings.title || group.name) : null} icon={group.settings.icon} iconStyle={group.settings.iconStyle}>
					<Tag key={'Tag' + groupId} devices={group.devices} openDialog={action} />
				</Box>
			);
		}
	}
	
	return gridContents;
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
		const gridContents = getGridContents(
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
	<GridContainer contents={gridContents} />
	
</ThemeProvider>

		)
	};
}

export default Jarvis;
