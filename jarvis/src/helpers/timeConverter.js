import { format } from 'date-fns'
import { de } from 'date-fns/locale'

/**
 *
 *
 */
function timeToSeconds(time) {
	
	if (time.toString().indexOf(':') > -1) {
		time = time.toString();
		let format = time.split(':').length-1;
		let [ hours, minutes, seconds ] = format > 1 ? time.split(':') : ('0:' + time).split(':');
		time = parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
	}
	
	return parseInt(time);
}

/**
 *
 *
 */
function timeToHoursMinutesSeconds(time, withHours = false) {
	
	if (time.toString().indexOf(':') > -1) {
		return time;
	}
	
	time = parseInt(time);
	withHours = withHours || (time > 3600);
	
	if (Number.isNaN(time)) {
		return withHours ? '00:00:00' : '00:00';
	}
	
	let hours = '0' + Math.floor(time/3600);
	let minutes = '0' + Math.floor(time/60);
	let seconds = '0' + (time % 60);
	
	return withHours ? [ hours.substr(-2), minutes.substr(-2), seconds.substr(-2) ].join(':') : [ minutes.substr(-2), seconds.substr(-2) ].join(':');
}

/**
 *
 *
 */
function secondsToDateTime(seconds, dateTimeFormat = 'dd. MMM yyyy, HH:mm') {
	return format(new Date(seconds*1000), dateTimeFormat, { locale: de });
}


export default {
	timeToSeconds,
	timeToHoursMinutesSeconds,
	secondsToDateTime
}