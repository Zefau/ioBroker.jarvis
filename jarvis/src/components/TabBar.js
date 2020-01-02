import React, { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';

import useWindowDimensions from '../helpers/useWindowDimensions';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';


/*
 * STYLES
 */
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
	icon: {
		...theme.components.icon,
		color: '#fff',
		paddingBottom: '6px',
		width: '1em',
		height: '1em',
		display: 'inline-block',
		fontSize: '1.5rem',
		transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
		flexShrink: 0,
		userSelect: 'none'
	},
	tabs: {
		backgroundColor: theme.palette.primary.main,
		paddingLeft: theme.spacing(),
		color: '#fff',
		width: '100%',
		/*width: 'calc(100% - ' + theme.spacing() + ')',*/
		zIndex: 101,
		borderBottom: '5px solid #eee'
	},
	fixed: {
		position: 'fixed',
		top: 0
	},
	indicator: {
		backgroundColor: '#fff',
	},
	fullscreen: {
		marginLeft: -theme.spacing(),
		marginTop: '-5px',
	}
}));


export default function TabBar(props) {
	let { tabs, selectTab } = props;
	const classes = useStyles();
	;
	
	// tab
	const [tab, setTab] = useState(0);
	const handleChange = (event, selectedTab) => {
		selectTab(selectedTab, tabs[selectedTab]);
		setTab(tab);
	}
	
	// scroll
	let tabBarProps = 0
	const [fixed, setFixed] = useState(false);
	const handleScroll = useCallback(() => {
		let threshold = (tabBarProps.top + tabBarProps.height - 53);
		const fixed = window.scrollY >= threshold;
		
		setFixed(prevFixed => {
			if (prevFixed !== fixed) {
				document.getElementById('root').style.paddingTop = fixed ? (threshold-10) + 'px' : 0;
				return fixed;
			}
			
			return prevFixed;
		});
		
	}, [tabBarProps]);

	useEffect(() => {
		tabBarProps = {
			top: document.getElementById('tabBar').offsetTop,
			height: document.getElementById('tabBar').offsetHeight
		}
		
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('keydown', handleScroll, 0);
		
	}, [handleScroll]);
	
	// render tabs
	const renderedTabs = tabs.map((tab, i) => {
		const [ icon, label ] = tab.indexOf('|') > -1 ? tab.split('|') : [ null, tab ];
		return <Tab key={'tab' + i} icon={<span className={clsx(classes.icon, 'mdi mdi-' + icon)}></span>} label={!fixed && label !== 'null' ? label : null} />
	});
	
	return (

<Tabs
	id="tabBar"
	value={tab}
	onChange={handleChange}
	variant="scrollable"
	classes={{
		root: clsx(classes.tabs, fixed && classes.fixed),
		indicator: classes.indicator
	}}>
	
	{renderedTabs}
</Tabs>

	);
}


export function TabPanel(props) {
	const { children, selectedTab, renderedTab, fullscreen } = props;
	const classes = useStyles();
	const { height } = useWindowDimensions();
	
	return (

<Box
	role="tabpanel"
	hidden={selectedTab !== renderedTab}
	id={'tabpanel-' + renderedTab}
	className={clsx(fullscreen && classes.fullscreen)}
	style={{ height: height+'px' }}
	>
	
	{children}
</Box>

	);
}
