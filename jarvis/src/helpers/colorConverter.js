/**
 *
 *
 */
function HsvToRgb(h, s = 1, v = 1) {
	if (Array.isArray(h)) {
		v = h[2];
		s = h[1];
		h = h[0];
	}
	else if (typeof h === 'string' && h.indexOf(',')) {
		[h, s, v] = h.split(',');
	}
	
	if (h > 1) {
		h = h/360;
	}
	
	let r, g, b, i, f, p, q, t;
	
	i = Math.floor(h * 6);
	f = h * 6 - i;
	p = v * (1 - s);
	q = v * (1 - f * s);
	t = v * (1 - (1 - f) * s);
	
	switch (i % 6) {
		case 0:
			r = v;
			g = t;
			b = p;
			break;
			
		case 1:
			r = q;
			g = v;
			b = p;
			break;
		
		case 2:
			r = p;
			g = v;
			b = t;
			break;
		
		case 3:
			r = p;
			g = q;
			b = v;
			break;
		
		case 4:
			r = t;
			g = p;
			b = v;
			break;
		
		case 5:
			r = v;
			g = p;
			b = q;
			break;
		
		default: // for webpack
			break;
	}
	
	return [
		Math.round(r * 255),
		Math.round(g * 255),
		Math.round(b * 255)
	];
}


/**
 *
 *
 */
function RgbToHex(r, g, b) {
	if (Array.isArray(r)) {
		b = r[2];
		g = r[1];
		r = r[0];
	}
	else if (typeof r === 'string' && r.indexOf(',')) {
		[r, g, b] = r.split(',');
	}
	
	r = parseInt(r).toString(16);
	g = parseInt(g).toString(16);
	b = parseInt(b).toString(16);
	
	if (r.length === 1) r = '0' + r;
	if (g.length === 1) g = '0' + g;
	if (b.length === 1) b = '0' + b;
	
	return "#" + r + g + b;
}


export default {
	HsvToRgb,
	RgbToHex
}