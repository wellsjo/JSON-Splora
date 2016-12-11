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

  constructor(document, settings) {
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
    this.settings.set('theme', theme)
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

  createPage(input, cursorPos) {
    const page = new Page(this.document)
    page.setTheme(this.settings.get('theme'))
    this.pages.push(page)
    this.current_page = this.pages.length - 1
    if (input) {
      this.getCurrentPage().editor.setValue(input)
      this.getCurrentPage().editor.setCursor(cursorPos)
    }
  }
}

/**
 * Export app
 */

module.exports = App
