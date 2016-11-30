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

  /**
   * Start application by creating a page
   */

  constructor() {
    this.pages = [new Page()]
  }

  /**
   * Set theme for each page
   *
   * @param {String} theme
   */

  setTheme(theme) {
    this.pages.forEach(page => page.setTheme(theme))
  }
}


/**
 * Export app
 */

module.exports = App
