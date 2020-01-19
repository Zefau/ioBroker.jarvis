import React from 'react'
import clsx from 'clsx'

import Connection from '../Connection'
import i18n from '../i18n'

import CircularProgress from '@material-ui/core/CircularProgress'
import Tooltip from '@material-ui/core/Tooltip'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import StarIcon from '@material-ui/icons/Star';


/*
 * STYLES
 */
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
	UpdateAvailable: {
		color: '#CCAA00',
	},
	UpdatesListItem: {
		backgroundColor: '#ffd700',
		color: '#fff',
		margin: theme.spacing(0, -2),
		paddingLeft: theme.spacing(2)
	},
	UpdatesIndicator: {
		right: theme.spacing(3.75),
		backgroundColor: '#CCAA00',
		borderRadius: '50%',
		width: theme.spacing(3),
		height: theme.spacing(3),
		color: '#fff',
		textAlign: 'center',
		fontSize: '1rem !important'
	},
	StatusIndicator: {
		fontSize: '1.4rem'
	},
	loading: {
		textAlign: 'center',
		marginTop: '5px'
	},
	small: {
		width: theme.spacing(3),
		height: theme.spacing(3),
	},
	alive: {
		color: '#86d686'
	},
	notAlive: {
		color: '#f7e43b'
	},
	disabled: {
		color: '#bababa'
	}
});


class AdapterStatus extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			adapterInformation: [],
			adapterAliveStatus: {},
			adapterUpdates: {}
		}
		
		this.socket = Connection.getConnection;
		this.list = this.props.settings.list ? (Array.isArray(this.props.settings.list) ? this.props.settings.list : this.props.settings.list.split(',')) : null;
		this.blacklist = this.props.settings.blacklist ? (Array.isArray(this.props.settings.blacklist) ? this.props.settings.blacklist : this.props.settings.blacklist.split(',')) : null;
	}
	
	componentDidMount() {
		
		// retrieve updates
		if (this.props.settings.updates !== false) {
			this.socket.getState('admin.0.info.updatesJson', (id, adapterUpdates) => {
				this.setState({ adapterUpdates });
				
				// get state updates
				this.socket.subscribeState('admin.0.info.updatesJson', (err, adapterUpdates) => this.setState({ adapterUpdates }));
			});
		}
		
		// get adapter instances
		this.socket.getAdapterInstances((err, instances) => {
			
			let states = [];
			if (instances && instances.rows) {
				let adapters = [];
				
				// states per instance to retrieve
				instances.rows.forEach((instance, i) => {
					
					// get alive / connected states
					if ((!this.list || (this.list && this.list.indexOf(instance.value.common.name) > -1)) && (!this.blacklist || (this.blacklist && this.blacklist.indexOf(instance.value.common.name) === -1))) {
						
						adapters.push(instance);
						states = states.concat([
							instance.id + '.alive',
							instance.id + '.connected',
							instance.id.replace('system.adapter.', '') + '.info.connection'
						]);
					}
				});
				
				// sort instances
				this.setState({ adapterInformation: adapters.sort((item1, item2) => {
						if (item1.id > item2.id) return 1;
						else if (item2.id > item1.id) return -1;
						else return 0;
					})
				});
				
				// retrieve intial states
				this.socket.getStates(states, (id, adapterAliveStatus) => {
					this.setState({ adapterAliveStatus });
					
					// get state updates
					this.socket.subscribeStates(states, (id, aliveStatus) => {
						if (aliveStatus && (!this.state.adapterAliveStatus[id] || (aliveStatus.val !== this.state.adapterAliveStatus[id].val))) {
							this.setState(prevState => ({ adapterAliveStatus: { ...prevState.adapterAliveStatus, [id]: aliveStatus } }));
						}
					});
				});
			}
		});
	}
	
	render() {
		const { classes } = this.props;
		
		// adapter updates
		const updateList = (this.state.adapterUpdates && this.state.adapterUpdates.val && JSON.parse(this.state.adapterUpdates.val)) || {};
		const updates = Object.keys(updateList).length
		
		// adapter instances
		let adapterList = <ListItem key='loading' className={classes.loading}><CircularProgress size={20} /></ListItem>
		
		if (this.state.adapterInformation.length > 0) {
			
			adapterList = this.state.adapterInformation.map(adapter => {
				adapter.update = updateList[adapter.value.common.name] || false;
				
				const enabled = adapter.value.common.enabled;
				const alive = (this.state.adapterAliveStatus[adapter.id + '.alive'] && this.state.adapterAliveStatus[adapter.id + '.alive'].val) || false;
				const connected = (this.state.adapterAliveStatus[adapter.id + '.connected'] && this.state.adapterAliveStatus[adapter.id + '.connected'].val) || false;
				const connection = this.state.adapterAliveStatus[adapter.id.replace('system.adapter.', '') + '.info.connection'] ? this.state.adapterAliveStatus[adapter.id.replace('system.adapter.', '') + '.info.connection'].val : true;
				
				const tooltip = i18n.t('Adapter') + ' ' + (enabled ? (alive && connected && connection ? i18n.t('alive') : i18n.t('not alive')) : i18n.t('disabled'));
				
				return (
				
					<ListItem key={'adapter-' + adapter.id}>
						<ListItemAvatar>
							<Avatar alt={adapter.value.common.name} src={adapter.value.common.extIcon} className={classes.small} />
						</ListItemAvatar>
						<ListItemText
							primary={adapter.value.common.title}
							secondary={[
								'v' + adapter.value.common.version,
								(adapter.update && (<span key={'updates-' + adapter.id}>, <span className={classes.UpdateAvailable}>{i18n.t('Update available') + ' v' + adapter.update.availableVersion}</span></span>)),
								(adapter.value.common.runAsCompactMode && ', ' + i18n.t('Compact Mode') + ' ' + i18n.t('on') + ' (' + i18n.t('Group') + ' ' + adapter.value.common.compactGroup + ')')
							]}
							/>
						
						<ListItemSecondaryAction className={clsx(classes.StatusIndicator, enabled ? (alive && connected && connection ? classes.alive : classes.notAlive) : classes.disabled)}>
							<Tooltip title={tooltip}>
								<span className={enabled ? (alive && connected && connection ? 'mdi mdi-check-circle' : 'mdi mdi-alert') : 'mdi mdi-close'}></span>
							</Tooltip>
						</ListItemSecondaryAction>
					</ListItem>
				
				)
			});
		}
		
		return (

<List dense>
	{updates > 0 &&
	<ListItem key="updates" classes={{ container: classes.UpdatesListItem }}>
		<ListItemAvatar>
			<StarIcon />
		</ListItemAvatar>
		<ListItemText
			primary={i18n.t('Updates available') + '!'}
			/>
		
		<ListItemSecondaryAction className={clsx(classes.StatusIndicator, classes.UpdatesIndicator)}>
			{updates}
		</ListItemSecondaryAction>
	</ListItem>
	}
	
	{adapterList}
</List>

		);
	}
}

export const Settings = {
	noDevicesAllowed: true,
	title: i18n.t('Adapter Status'),
	icon: 'traffic-light'
}

export default withStyles(styles)(AdapterStatus);
