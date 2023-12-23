
/**
 *
 */
module.exports.BindToClass = (obj, thisClass) => {
	for (let [ functionKey, functionValue ] of Object.entries(obj)) {
		thisClass[functionKey] = typeof obj === 'function' ? functionValue.bind(thisClass) : functionValue;
	}
}
