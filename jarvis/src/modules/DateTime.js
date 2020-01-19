import React, { useState, useEffect, useRef } from 'react'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'

import i18n from '../i18n'


export default function DateTime(props) {
	const { settings } = props;
	
	const refTimer = useRef();
	const [DateTime, setDateTime] = useState(format(new Date(), settings.format, { locale: de }));
	
	// https://date-fns.org/v2.9.0/docs/format
	settings.style = { fontSize: '1.5rem', textAlign: 'center', ...settings.style };
	settings.format = settings.format || 'dd.MM.yyyy HH:mm:ss';
	settings.refresh = settings.format.indexOf('s') > -1 ? 1000 : (settings.format.indexOf('i') > -1 ? 60*1000 : 60*60*1000);
	
	useEffect(() => {
		clearTimeout(refTimer.current);
		refTimer.current = setTimeout(() => setDateTime(format(new Date(), settings.format, { locale: de })), settings.refresh);
	});
	
	return (

<div style={settings.style}>
	{i18n.t('%DateTime').replace(/%DateTime/, DateTime)}
</div>

	);
}

export const Settings = {
	noDevicesAllowed: true,
	title: i18n.t('Time'),
	icon: 'clock-outline'
}
