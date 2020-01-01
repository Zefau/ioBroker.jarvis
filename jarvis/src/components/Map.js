import React from 'react'
import L from 'leaflet'
import { Map, TileLayer, Marker, Tooltip } from 'react-leaflet'


class LeafletMap extends React.Component {
	constructor() {
		super()
		this.state = {
			lat: 51.505,
			lng: -0.09,
			zoom: 13
		}
	}

	render() {
		const position = [61.595961,5.0889158];
		
		const myIcon = L.icon({
			iconUrl: require('../marker.png'),
			iconSize: [64,64],
			iconAnchor: [32, 64],
			popupAnchor: null,
			shadowUrl: null,
			shadowSize: null,
			shadowAnchor: null
		});
		
		const markers = (
<Marker position={[61.5959486,5.0889303]} icon={myIcon}>
	<Tooltip direction="bottom">
		A pretty CSS3 popup. <br/> Easily customizable.
	</Tooltip>
</Marker>

		);

		return (

<Map center={position} zoom={this.state.zoom} style={{ width: '100%', height: '500px' }} >
	<TileLayer
		attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
		/>
		
	{markers}
</Map>

		);
	}
}

export default LeafletMap