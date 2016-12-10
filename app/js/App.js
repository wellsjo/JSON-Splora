'use strict'

/**
 * Dependencies
 */

const mkdirp = require('mkdirp')
const path = require('path')
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

  constructor(settings) {
    mkdirp(path.resolve(__dirname, '..', 'tmp'))
    this.pages = []
    this.current_page = 0
    this.settings = settings
  }

  /**
   * Set theme for each page
   *
   * @param {String} theme
   */

  setTheme(theme) {
    this.pages.forEach(page => page.setTheme(theme))
  }

  /**
   * Get the current page
   */

  getCurrentPage() {
    return this.pages[this.current_page]
  }

  /**
   * Create a new page
   */

  createPage() {
    const page = new Page()
    page.setTheme(this.settings.get('theme'))
    this.pages.push(page)
  }
}

/**
 * Export app
 */

module.exports = App
