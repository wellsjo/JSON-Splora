'use strict'

/**
 * Dependencies
 */

const { remote } = require('electron')
const { Menu } = remote
const menuTemplate = require('./menuTemplate')

class MainMenu {

  /**
   * Create the main menu for the given app
   */

  constructor(app) {
    this.app = app

    // Add theme sub menu
    menuTemplate[2].submenu[7].submenu = this.createThemeSubMenu()

    // Finally, build menu
    Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate))
  }

  /**
   *  Callback for when theme button is clicked.
   */

  themeClicked(menuItem, browserWindow, event) {
    this.app.setTheme(menuItem.theme)
  }

  /**
   * Create the theme sub menu. (Later versions can create this programmatically)
   */

  createThemeSubMenu() {
    return [{
      label: 'Default',
      theme: 'default',
      type: 'radio',
      click: (menuItem, browserWindow, event) => {
        this.themeClicked(menuItem, browserWindow, event)
      }
    }, {
      label: 'Elegant',
      theme: 'Elegant',
      type: 'radio',
      click: (menuItem, browserWindow, event) => {
        this.themeClicked(menuItem, browserWindow, event)
      }
    }, {
      label: 'Mdn-Like',
      theme: 'mdn-like',
      type: 'radio',
      click: (menuItem, browserWindow, event) => {
        this.themeClicked(menuItem, browserWindow, event)
      }
    }, {
      label: 'Neat',
      theme: 'neat',
      type: 'radio',
      click: (menuItem, browserWindow, event) => {
        self.themeClicked(menuItem, browserWindow, event)
      }
    }, {
      label: 'Neo',
      theme: 'neo',
      type: 'radio',
      click: (menuItem, browserWindow, event) => {
        this.themeClicked(menuItem, browserWindow, event)
      }
    }]
  }
}


/**
 * Export MainMenu
 */

module.exports = MainMenu
