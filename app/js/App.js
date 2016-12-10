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

  constructor(document, settings) {
    mkdirp(path.resolve(__dirname, '..', 'tmp'))
    this.document = document
    this.settings = settings
    this.pages = []
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
    const page = new Page(this.document)
    page.setTheme(this.settings.get('theme'))
    this.pages.push(page)
    this.current_page = this.pages.length - 1
  }
}

/**
 * Export app
 */

module.exports = App
