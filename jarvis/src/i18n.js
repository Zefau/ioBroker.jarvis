/**
 * Internationalization
 *
 * @param	{String}		functionType
 * @return	{Function}
 *
 */
export default class i18n {
	
	constructor(language = 'en', languages = ['de', 'en'], path = './i18n', translations = null) {
		
		this.language = language;
		this.translations = this._getTranslations(languages, path) || translations || {};
	}
	
	/**
	 *
	 * @private
	 */
	_getTranslations(languages, path) {
		
		let translations = {};
		languages.forEach(language => {
			translations[language] = require(path + '/' + language + '.json');
		});
		
		return translations;
	}
	
	/**
	 *
	 *
	 */
	i18n(word, language = this.language) {
		
		return (this.translations[language] && this.translations[language][word]) || word;
	}
}
