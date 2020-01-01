import React from 'react';
import clsx from 'clsx';

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';

import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';




/*
 * STYLES
 */
import { amber, green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
	success: {
		backgroundColor: green[600],
	},
	error: {
		backgroundColor: theme.palette.error.dark,
	},
	info: {
		backgroundColor: theme.palette.primary.main,
	},
	warning: {
		backgroundColor: amber[700],
	},
	icon: {
		fontSize: 20,
	},
	iconVariant: {
		opacity: 0.9,
		marginRight: theme.spacing(1),
	},
	message: {
		display: 'flex',
		alignItems: 'center',
	},
}));


const variantIcon = {
	success: CheckCircleIcon,
	warning: WarningIcon,
	error: ErrorIcon,
	info: InfoIcon,
};


export default function StatusSnackbar(props) {
	const classes = useStyles();
	let { className, open, autoHideDuration, message, closeButton, onClose, variant, ...other } = props;
	const Icon = variantIcon[variant];
	
	open = open || true;
	autoHideDuration = autoHideDuration || null;
	return (

<Snackbar
	anchorOrigin={{
		vertical: 'bottom',
		horizontal: 'center',
	}}
	open={open}
	autoHideDuration={autoHideDuration}
	onClose={onClose}
	>
	<SnackbarContent
		className={clsx(classes[variant], className)}
		message={
			<span id="client-snackbar" className={classes.message}>
				<Icon className={clsx(classes.icon, classes.iconVariant)} />
				{message}
			</span>
		}
		action={closeButton && [
			<IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
				<CloseIcon className={classes.icon} />
			</IconButton>,
		]}
		{...other}
		/>
		
</Snackbar>

	);
}