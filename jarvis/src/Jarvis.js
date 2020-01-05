import React from 'react';

//import Drawer from '@material-ui/core/Drawer';

import TopBar from './components/TopBar';
import TabBar, { TabPanel } from './components/TabBar';
import GridContainer from './components/GridContainer';
import Popup from './components/Popup';
import Widget from './components/Widget';
import COMPONENTS from './components';


/*
 * STYLES
 */
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';


/*
 *
 */
const getGroup = (groupId, group, props = {}) => {
	
	// group empty
	if (!group) {
		console.error('Group ' + groupId + ' defined in columns but not assigned to any devices!');
		return null;
	}
	
	// get module for component
	group.settings.component = typeof group.settings.component === 'string' ? { 'module': group.settings.component } : (group.settings.component || {})
	const Tag = COMPONENTS[group.settings.component.module || 'StateList'];
	if (Tag === undefined) {
		console.error('Undefined component "' + group.settings.component + '" used!');
		return null;
	}
	
	return <Tag key={'Tag' + groupId} devices={group.devices} openDialog={props.action ? props.action : null} settings={{ ...group.settings, ...props }} />
}


/*
 *
 */
const getGridContents = (contents, groups, props = {}) => {
	console.log("RENDER COMPONENT: getGridColumn()");
	
	let gridContents = {};
	const columns = Object.keys(contents).length;
	for (let column = 1; column <= columns; column++) {
		
		let columnContents = contents[column];
		gridContents[column] = gridContents[column] || [];
		
		// no contents, thus add placeholder
		if (!columnContents || columnContents.length === 0) {
			gridContents[column].push(null);
		}
		
		// add contents
		else {
			for (let index in columnContents) {
				
				let groupId = columnContents[index];
				let group = groups[groupId];
				
				let content = getGroup(groupId, group, props);
				if (content) {
					gridContents[column].push(
						<Widget key={'Box-' + groupId + '-' + index} title={group.settings.title !== null ? (group.settings.title || group.name) : null} icon={group.settings.icon} iconStyle={group.settings.iconStyle}>
							{content}
						</Widget>
					);
				}
			}
		}
	}
	
	return gridContents;
}


export default class Jarvis extends React.Component {
	
    constructor(props) {
		super(props);
		
		this.state = {
			selectedTab: 0,
			tabTitle: '',
			
			notificationDrawer: false,
			dialog: false,
			dialogContents: {
				'ts': 0,
				'device': {}
			}
		}
		
		// bind methods
		this.closeDialog = this.closeDialog.bind(this);
		this.openDialog = this.openDialog.bind(this);
		this.selectTab = this.selectTab.bind(this);
		//this.toggleDrawer = this.toggleDrawer.bind(this);
		
		// initialise
		this.gridContents = {};
		this.layout = this.props.settings.layout;
		this.tabs = Object.keys(this.layout);
		this.tabsEnabled = this.tabs[0] !== 1;
		this.state.tabTitle = this.tabs[this.state.selectedTab];
		
		// no tabs defined, so layout wrap into default tab
		if (!this.tabsEnabled) {
			this.layout = { 'Home': this.layout };
			this.tabs.push('1');
		}
		
		// widget props
		this.widgetProps = {}
	}
	
	getTabPanels() {
		
		let tab = 0;
		let tabPanels = [];
		for (let tabLabel in this.layout) {
			const contents = this.layout[tabLabel];
			
			// fullscreen in component
			if (!this.gridContents[tabLabel] && typeof contents === 'string') {
				this.gridContents[tabLabel] = getGroup(contents, this.props.groups[contents], { action: this.openDialog, ...this.widgetProps });
			}
			
			// grid layout
			else if (!this.gridContents[tabLabel]) {
				this.gridContents[tabLabel] = <GridContainer contents={getGridContents(contents, this.props.groups, { action: this.openDialog, ...this.widgetProps })} />
			}
			
			let tabPanel = (
				<TabPanel key={'tabPanel-' + tab} renderedTab={tab} selectedTab={this.state.selectedTab} fullscreen={typeof contents === 'string'}>
					{this.gridContents[tabLabel]}
				</TabPanel>
			);
			
			tabPanels.push(tabPanel);
			tab++;
		}
		
		return tabPanels;
	}
	
	closeDialog() {
		this.setState({ 'dialog': false, 'dialogContents': { 'ts': Date.now(), 'device': {} } });
	}
	
	openDialog(device) {
		this.setState({ 'dialog': true, 'dialogContents': { 'ts': Date.now(), 'device': device } });
	}
	
	selectTab(tab, title) {
		this.setState({ selectedTab: tab, tabTitle: title });
	}
	
	/*
	toggleDrawer(drawer, open) {
		this.setState({ [drawer]: open });
	};
	*/
	
    render() {
		console.log('RENDER COMPONENT: Jarvis');
        return (

<ThemeProvider theme={theme}>
	<TopBar title={this.props.settings.topBarTitle || (this.tabsEnabled && this.state.tabTitle) || 'jarvis'}>
		{this.tabsEnabled && <TabBar tabs={this.tabs} selectTab={this.selectTab} />}
	</TopBar>
	
	{/*
	<Drawer anchor="right" open={this.state.notificationDrawer} onClose={this.toggleDrawer('notificationDrawer', false)}>
		
	</Drawer>
	*/}

	<Popup open={this.state.dialog} contents={this.state.dialogContents} closeDialog={this.closeDialog} />
	{this.getTabPanels()}
	
</ThemeProvider>

		)
	}
}
