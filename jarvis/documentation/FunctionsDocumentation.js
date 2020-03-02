const _fs = require('fs');

function getFunctionConfiguration() {
	
	let contents = {};
	const file = _fs.readFileSync('src/functions/index.js', 'utf8');
	file.split('\n').forEach(line => {
		
		if (line.indexOf('require') > -1) {
			let funcFile = line.substr(line.indexOf('(')+4, line.indexOf(')')-line.indexOf('(')-5)
			let data = _fs.readFileSync('src/functions/' + funcFile + '.js', 'utf8');
			
			let start = data.indexOf('configurations:')+17;
			let end = data.indexOf('\r\n\t},\r\n\tcomponents:')-start;
			
			let config = data.substr(start, end).replace(RegExp('\r\n\t\t', 'g'), '\r\n');
			contents[funcFile] = config;
		}
	});
	
	return 'const FUNCTIONS = ' + JSON.stringify(contents);
}

function writeFunctionFile(contents, file = 'documentation/FunctionsDocumentation.json') {
	
	_fs.writeFile(file, contents, err => err ? console.error(err) : null);
}

let config = getFunctionConfiguration();
writeFunctionFile(config);
