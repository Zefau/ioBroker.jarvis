
export const ModuleSettings = {
	AdapterStatus: require('./AdapterStatus').Settings || {},
	Chart: require('./Chart').Settings || {},
	DateTime: require('./DateTime').Settings || {},
	Map: require('./Map').Settings || {},
	Multimedia: require('./Multimedia').Settings || {},
	StateList: require('./StateList').Settings || {},
	StateListHorizontal: require('./StateListHorizontal').Settings || {},
	Weather: require('./Weather').Settings || {}
}

export default {
	AdapterStatus: require('./AdapterStatus').default,
	Chart: require('./Chart').default,
	DateTime: require('./DateTime').default,
	Map: require('./Map').default,
	Multimedia: require('./Multimedia').default,
	StateList: require('./StateList').default,
	StateListHorizontal: require('./StateListHorizontal').default,
	Weather: require('./Weather').default
}