import React from 'react'

import MultimediaItem from './MultimediaItem'


export default function StateList(props) {
	const { devices, settings } = props;
	return devices.map((device, i) => <MultimediaItem key={'MultimediaItem-' + device.id} {...props} index={i} noHeader={i === 0 && settings.icon === null && settings.title === null} device={device} />)
}
