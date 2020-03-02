/**
 * Admin functions.
 *
 * @author Zefau <zefau@mailbox.org>
 * @version 0.4.1
 * @date 2019-09-17
 *
 */


/**
 * Status Message
 *
 *
 */
function _log(message, severity, id)
{
	var log = $(id || '#log').html();
	$(id || '#log').append('<li class="log ' + (severity || 'info') + ' translate">' + message + '</li>');
	console.log((severity !== undefined ? severity.toUpperCase() : 'INFO') + ': ' + message);
}
	
/**
 * Encode a string.
 *
 * @param	{string}	key			Key used for encoding
 * @param	{string}	string		String to encode
 * @return	{string}				Encoded String
 *
 */
function encode(key, string)
{
	let result = '';
	for (let i = 0; i < string.length; i++)
		result += String.fromCharCode(key[i % key.length].charCodeAt(0) ^ string.charCodeAt(i));
	
	return result;
}

/**
 * Decode a string.
 *
 * @param	{string}	key			Key used for decoding
 * @param	{string}	string		String to decode
 * @return	{string}				Decoded String
 *
 */
function decode(key, string)
{
	return encode(key, string);
}

/**
 * Load settings.
 *
 *
 */
function _load(settings, onChange)
{
	if (!settings)
		return;
	
	$('.value').each(function()
	{            
		var $this = $(this);
		var id = $this.attr('id');
		
		// load certificates
		if ($this.attr('data-select') === "certificate")
			fillSelectCertificates('#'+id,  $this.attr('data-type') || '', settings[id]);
		
		// load settings
		if ($this.attr('type') === 'checkbox')
			$this.prop('checked', settings[id]).trigger('change').on('change', function() {onChange();});
		
		else if ($this.attr('type') === 'radio')
			$this.prop('checked', settings[$this.attr('name')] == $this.val()).trigger('change').on('change', function() {onChange();});
		
		else
			$this.val(settings[id]).on('change', function() {onChange();}).on('keyup', function() {onChange();});
	});
	
	onChange(false);
	M.updateTextFields();
}

/**
 * Save settings.
 *
 *
 */
function _save(callback, obj)
{
	obj = obj !== undefined ? obj : {};
	$('.value').each(function()
	{
		var $this = $(this);
		var id = $this.attr('id');
		
		// save checkboxes
		if ($this.attr('type') === 'checkbox')
			obj[id] = $this.prop('checked');
		
		else if ($this.attr('type') === 'radio' && $this.prop('checked'))
			obj[$this.attr('name')] = $this.val();
		
		// save certificates
		else if ($this.attr('data-select') === "certificate")
		{
			socket.emit('getObject', 'system.certificates', function (err, res) {
				if (res.native.certificates !== undefined)
				{
					obj[id] = $this.val();
					obj[id + 'Val'] = res.native.certificates[$this.val()];
				}
			});
		}
		
		// save settings
		else
			obj[id] = obj[id] ? obj[id] : $this.val();
	});
	
	callback(obj);
}
