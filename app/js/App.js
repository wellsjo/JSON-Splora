'use strict'

/**
 * Dependencies
 */

const Tabs = require('./Tabs')

/**
 * App container class
 *
 * Manages pages, tabs, settings
 */

class App {

  /**
   * Start application
   */

  constructor(document, settings) {
    this.document = document
    this.settings = settings
    this.theme = settings.get('theme')
    const rootEl = this.document.querySelector('#tabs')
    this.tabs = new Tabs(rootEl, this.theme)
  }

  /**
   * Set theme for each page
   *
   * @param {String} theme
   */

  setTheme(theme) {
    this.settings.set('theme', theme)
    this.theme = theme
    this.tabs.setTheme(theme)
  }

  /**
   * @todo Get the current tab
   */

  getCurrentTab() {
    return this.tabs.activeTab
  }
}

/**
 * Export app
 */

module.exports = App
