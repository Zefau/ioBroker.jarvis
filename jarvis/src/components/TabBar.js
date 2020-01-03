import React, { useState, useEffect, useRef, useCallback } from 'react';
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
		width: 'calc(100% - ' + theme.spacing() + 'px)',
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
	},
	grid: {
		paddingBottom: '30px'
	}
}));


export default function TabBar(props) {
	let { tabs, selectTab } = props;
	const classes = useStyles();
	let tabBarProps = useRef({});
	
	// tab
	const [tab, setTab] = useState(0);
	const handleChange = (event, selectedTab) => {
		selectTab(selectedTab, tabs[selectedTab]);
		setTab(selectedTab);
	}
	
	// scroll
	const [fixed, setFixed] = useState(false);
	const handleScroll = useCallback(() => {
		const threshold = (tabBarProps.current.top + tabBarProps.current.height - 53);
		const fixed = window.scrollY >= threshold;
		
		setFixed(prevFixed => {
			if (prevFixed !== fixed) {
				document.getElementById('root').style.paddingTop = fixed ? (threshold-5-8) + 'px' : 0;
				return fixed;
			}
			
			return prevFixed;
		});
		
	}, [tabBarProps]);

	useEffect(() => {
		tabBarProps.current = {
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
	
	
	// get map height based on viewport
	const { height } = useWindowDimensions();
	const [mapHeight, setMapHeight] = useState(height);
	let topBarHeight = useRef({});
	
	useEffect(() => {
		topBarHeight.current = document.getElementById('appBar').offsetHeight;
		setMapHeight(height-topBarHeight.current+5);
		
	}, [height], []);
	
	/*
	 * Some components need to be visible upon loading, so proper initialise.
	 * Due to the 'hidden' attribute though, they might be hidden.
	 * This is a workaround to initially show everything for a short period of time and then hide according to tab settings.
	 *
	 */
	const [hidden, setHidden] = useState(null);
	useEffect(() => {
		setTimeout(() => setHidden(selectedTab !== renderedTab), 10);
		
	}, [selectedTab, renderedTab], [selectedTab]);
	
	return (

<Box
	role="tabpanel"
	hidden={hidden}
	id={'tabpanel-' + renderedTab}
	className={clsx(fullscreen ? classes.fullscreen : classes.grid)}
	style={{ height: mapHeight + 'px' }}
	>
	
	{children}
</Box>

	);
}
