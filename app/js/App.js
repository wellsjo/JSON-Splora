'use strict'

/**
 * Dependencies
 */

const Tabs = require('./Tabs')
const { ipcRenderer: ipc } =  require('electron')

/**
 * App container class
 *
 * Manages pages, tabs, settings
 */

class App {

  /**
   * Start application
   *
   * @param {Element} document The html document
   * @param {Object} settings Application settings coming from electron-config
   */

  constructor(document, settings) {
    this.document = document
    this.settings = settings
    const theme = settings.get('theme')
    const rootEl = this.document.querySelector('#tabs')
    this.tabs = new Tabs(rootEl, theme)
    ipc.on('tab-change', (evt, direction) => {
      this.tabs.changeTab(direction)
    }) 
  }

  /**
   * Set theme for each page
   *
   * @param {String} theme
   */

  setTheme(theme) {
    this.settings.set('theme', theme)
    this.tabs.setTheme(theme)
  }
}

/**
 * Export app
 */

module.exports = App
