import React from 'react'

import Connection from './Connection'

import TopBar from './components/TopBar'
import TabBar, { TabPanel } from './components/TabBar'
import Sidebar from './components/Sidebar'
import Notifications from './components/Notifications'
import GridContainer from './components/GridContainer'
import Popup from './components/Popup'
import Widget from './components/Widget'
import Modules, { ModuleSettings } from './modules'


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
	if (!group && ModuleSettings[group.settings.component.module].noDevicesAllowed !== true) {
		console.error('Group ' + groupId + ' defined in columns but not assigned to any devices!');
		return null;
	}
	
	// get module for component
	group.settings._global = props.settings;
	group.settings.component = typeof group.settings.component === 'string' ? { 'module': group.settings.component } : (group.settings.component || {});
	const Tag = Modules[group.settings.component.module || 'StateList'];
	
	// get tag
	if (Tag === undefined) {
		console.error('Undefined component "' + group.settings.component.module + '" used!');
		return null;
	}
	
	return <Tag key={'Tag' + groupId} devices={group.devices} openDialog={props.action ? props.action : null} settings={{ ...group.settings, ...props }} />
}


/*
 *
 */
const getGridContents = (contents, groups, props = {}) => {
	
	let gridContents = {};
	const columns = Object.keys(contents).length;
	
	for (let column = 1; column <= columns; column++) {
		
		let columnContents = contents[column];
		gridContents[column] = gridContents[column] || [];
		
		// no contents, thus add placeholder
		if (!columnContents || !Object.keys(columnContents).length) {
			gridContents[column].push(null);
		}
		
		// add contents
		else {
			for (let groupId in columnContents) {
				
				let group = groups[groupId] || {};
				group.settings = columnContents[groupId] || {};
				group.settings._global = props.settings;
				group.settings.component = typeof group.settings.component === 'string' ? { 'module': group.settings.component } : (group.settings.component || {});
				
				let content = getGroup(groupId, group, props);
				if (content) {
					gridContents[column].push(
						<Widget key={'Box-' + groupId}
							title={group.settings.title === null ? null : (group.settings.title || group.name || (ModuleSettings[group.settings.component.module] && ModuleSettings[group.settings.component.module].title))}
							icon={group.settings.icon === null ? null : (group.settings.icon || (ModuleSettings[group.settings.component.module] && ModuleSettings[group.settings.component.module].icon))}
							iconStyle={group.settings.iconStyle}
							>
							
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
			connectionStatus: this.props.connectionStatus || false,
			
			selectedTab: 0,
			tabTitle: '',
			
			sidebarDrawer: false,
			notificationDrawer: false,
			notifications: [],
			notificationsUnread: 0,
			
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
		this.toggleDrawer = this.toggleDrawer.bind(this);
		
		//
		this.socket = Connection.getConnection;
		
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
	
	componentDidMount() {
		
		this.socket.getState('jarvis.0.notifications').then(notifications => {
			notifications = (notifications && notifications.val && JSON.parse(notifications.val)) || [];
			
			this.setState({
				notificationsUnread: notifications.filter(notification => !notification.unread || notification.unread !== false).length,
				notifications: notifications
			});
		});
		
		this.socket.subscribeState('jarvis.0.notifications', notifications => console.log(notifications));
	}
	
	getTabPanels() {
		
		let tab = 0;
		let tabPanels = [];
		for (let tabLabel in this.layout) {
			const contents = this.layout[tabLabel];
			
			// fullscreen in component
			let groupId = Object.keys(contents)[0];
			let fullscreen = Number.isNaN(parseInt(groupId));
			
			if (!this.gridContents[tabLabel] && fullscreen) {
				this.gridContents[tabLabel] = getGroup(contents, { ...this.props.groups[groupId], settings: contents[groupId] }, { settings: this.props.settings, action: this.openDialog, ...this.widgetProps });
			}
			
			// grid layout
			else if (!this.gridContents[tabLabel]) {
				this.gridContents[tabLabel] = <GridContainer contents={getGridContents(contents, this.props.groups, { settings: this.props.settings, action: this.openDialog, ...this.widgetProps })} />
			}
			
			let tabPanel = (
				<TabPanel key={'tabPanel-' + tab} renderedTab={tab} selectedTab={this.state.selectedTab} fullscreen={fullscreen}>
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
	
	toggleDrawer(drawer, open) {
		this.setState({ [drawer]: open });
	};
	
    render() {
        return (

<ThemeProvider theme={theme}>
	<TopBar
		title={this.props.settings.topBarTitle || (this.tabsEnabled && this.state.tabTitle) || 'jarvis'}
		connectionStatus={this.state.connectionStatus}
		toggleDrawer={this.toggleDrawer}
		notifications={this.state.notificationsUnread}
		>
		
		{this.tabsEnabled && <TabBar tabs={this.tabs} selectTab={this.selectTab} />}
	</TopBar>
	
	
	{/* DRAWER: SIDEBAR */}
	<Sidebar
		open={this.state.sidebarDrawer}
		toggleDrawer={this.toggleDrawer}
		/>
	
	
	{/* DRAWER: NOTIFICATIONS */}
	<Notifications
		open={this.state.notificationDrawer}
		toggleDrawer={this.toggleDrawer}
		notifications={this.state.notifications}
		/>
	
	
	{/* POPUP */}
	<Popup open={this.state.dialog} contents={this.state.dialogContents} closeDialog={this.closeDialog} />
	{this.getTabPanels()}
	
</ThemeProvider>

		)
	}
}
