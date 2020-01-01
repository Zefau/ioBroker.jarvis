/**
 * Internationalization
 * Based on https://raw.githubusercontent.com/ioBroker/adapter-react/master/src/i18n.js.
 * Copyright 2018-2019 bluefox <dogafox@gmail.com>
 *
 * MIT License
 *
 *
 *
 * @param	{String}		functionType
 * @return	{Function}
 *
 */
export default class i18n {

	/*
	* holds the translations
	*/
	static translations = {};

	/*
	* default language
	*/
	static language = navigator.language || navigator.userLanguage || 'en';

	/**
	* Override default language.
	*
	* @param	{String}	language
	* @return	{Boolean}
	*/
	static setLanguage(language) {
		if (language) {
			i18n.language = language;
			console.log('i18n: Set language to ' + language + '.');
			return true;
		}
		
		return false;
	}
	
	/**
	* Loads multiple translations.
	*
	* @param	{String|Array}	languages
	* @return	{Boolean}
	*/
	static loadTranslations(languages) {
		
		if (languages) {
			languages = Array.isArray(languages) ? languages : [languages];
			languages.forEach(language => i18n.loadTranslation(language));
			
			return true;
		}
		
		return false;
	}
	
	/**
	* Loads a translation.
	*
	* @param	{String}	language
	* @return	{Boolean}
	*/
	static loadTranslation(language) {
		
		if (language) {
			let translation;
			try {
				translation = require('./i18n/' + language + '.js').default;
			}
			catch(err) {
				console.error(err.message);
				return false;
			}
			
			i18n.setTranslation(language, translation);
			return true;
		}
		
		return false;
		
	}
	
	/**
	* Set a translation for language.
	*
	* @param	{String}	language
	* @param	{Object}	translation
	* @return	{Boolean}
	*/
	static setTranslation(language, translation) {
		if (language && translation) {
			i18n.translations[language] = { ...i18n.translations[language] || {}, ...translation };
			console.log('i18n: Set translations for language ' + language + '.');
			return true;
		}
		
		return false;
	}
	
	/**
	* Get current set language.
	*
	* @param	void
	* @return	{String}
	*/
	static getLanguage() {
		return i18n.lang;
	}
	
	/**
	* Get current set language.
	*
	* @param	{String}	word
	* @param	{Object}	[options={}]
	* @param	{Boolean}	[options.ucFirst=false]
	* @param	{Object}	[placeholders={}]
	* @param	{String}	[language=i18n.language]
	* @return	{String}
	*/
	static t(word, options = {}, placeholders = {}, language = i18n.language) {
		
		word = word.toString();
		if (i18n.translations[language]) {
			
			// check if word is concatenated
			if (word.indexOf('#') > -1) {
				
				let parts = word.split('#');
				while (parts.length > 0 && !i18n.translations[language][parts.join('#')]) {
					parts.shift();
				}
				
				word = i18n.translations[language][parts.join('#')] || word;
			}
			else {
				word = i18n.translations[language][word] || word;
			}
		}
		
		// replace placeholders
		for (let key in placeholders) {
			word = word.replace(RegExp('%' + key + '%', 'g'), placeholders[key]);
		}
		
		// options
		if (options.ucFirst) {
			word = word.charAt(0).toUpperCase() + word.slice(1);
		}
		
		return word;
	}
}
