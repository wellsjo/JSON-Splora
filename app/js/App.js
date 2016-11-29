'use strict'

/**
 * Dependencies
 */

const Page = require('./Page')

/**
 * App container class
 *
 * Manages pages, tabs, settings
 */

class App {

  constructor(document) {
    this.pages = [new Page()]
  }

  setThemeForAllPages(theme){
  	this.pages.forEach(function(page){
  		page.setTheme(theme);
  	})
  }
}


/**
 * Export app
 */

module.exports = App
