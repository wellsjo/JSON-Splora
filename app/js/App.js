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
    this.current_page = 0;

    this.theme = 'default'
  }

  /**
   * Set theme for each page
   *
   * @param {String} theme
   */

  setTheme(theme) {
    this.theme = theme
    this.pages.forEach(page => page.setTheme(theme))
  }

  /**
   * Get the current page
   */

   getCurrentPage() {
     return this.pages[this.current_page];
   }

  /**
   * Create a new page
   */

   createPage() {
     let p = new Page()
     p.setTheme(this.theme)
     this.pages.append(p)
   }

}


/**
 * Export app
 */

module.exports = App
