'use strict'

/**
 * Dependencies
 */

const { remote } = require('electron')

const { Menu } = remote

class MainMenu {

  /**
   * Create the main menu for the given app
   */

  constructor(app) {
    this.app = app
    const template = this.createTemplate()

    // Finally, build menu
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))
  }

  /**
   *  Callback for when theme button is clicked.
   */

  themeClicked(menuItem) {
    this.app.setTheme(menuItem.theme)
  }

  createTemplate() {
    const template = [{
      label: 'Edit',
      submenu: [{
        role: 'undo'
      }, {
        role: 'redo'
      }, {
        type: 'separator'
      }, {
        role: 'cut'
      }, {
        role: 'copy'
      }, {
        role: 'paste'
      }, {
        role: 'selectall'
      }, {
        type: 'separator'
      }, {
        label: 'Format',
        click: () => {
          this.app.getCurrentPage().editor.format()
        }
      }, {
        label: 'Minify',
        click: () => {
          this.app.getCurrentPage().editor.minify()
        }
      }]
    }, {
      label: 'View',
      submenu: [{
        role: 'reload'
      }, {
        role: 'toggledevtools'
      }, {
        type: 'separator'
      }, {
        role: 'resetzoom'
      }, {
        role: 'zoomin'
      }, {
        role: 'zoomout'
      }, {
        type: 'separator'
      }, {
        label: 'Theme',
        submenu: this.createThemeSubMenu()
      }, {
        type: 'separator'
      }, {
        role: 'togglefullscreen'
      }]
    }, {
      role: 'window',
      submenu: [{
        role: 'minimize'
      }, {
        role: 'close'
      }]
    }, {
      role: 'help',
      submenu: [{
        label: 'Learn More',
        click: () => {
          electron.shell.openExternal('http://electron.atom.io')
        }
      }]
    }]
    if (process.platform === 'darwin') {
      template.unshift({
          label: 'JSON-Splora',
          submenu: [{
            role: 'about'
          }, {
            type: 'separator'
          }, {
            role: 'services',
            submenu: []
          }, {
            type: 'separator'
          }, {
            role: 'hide'
          }, {
            role: 'hideothers'
          }, {
            role: 'unhide'
          }, {
            type: 'separator'
          }, {
            role: 'quit'
          }]
        })
        // Edit menu.
      template[1].submenu.push({
          type: 'separator'
        }, {
          label: 'Speech',
          submenu: [{
            role: 'startspeaking'
          }, {
            role: 'stopspeaking'
          }]
        })
        // Window menu.
      template[3].submenu = [{
        label: 'Close',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
      }, {
        label: 'Minimize',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize'
      }, {
        label: 'Zoom',
        role: 'zoom'
      }, {
        type: 'separator'
      }, {
        label: 'Bring All to Front',
        role: 'front'
      }]
    }

    return template
  }

  /**
   * Create the theme sub menu. (Later versions can create this programmatically)
   */

  createThemeSubMenu() {
    return [{
      label: 'Default',
      theme: 'default',
      type: 'radio',
      click: (menuItem) => {
        this.themeClicked(menuItem)
      }
    }, {
      label: 'Elegant',
      theme: 'Elegant',
      type: 'radio',
      click: (menuItem) => {
        this.themeClicked(menuItem)
      }
    }, {
      label: 'Mdn-Like',
      theme: 'mdn-like',
      type: 'radio',
      click: (menuItem) => {
        this.themeClicked(menuItem)
      }
    }, {
      label: 'Neat',
      theme: 'neat',
      type: 'radio',
      click: (menuItem) => {
        this.themeClicked(menuItem)
      }
    }, {
      label: 'Neo',
      theme: 'neo',
      type: 'radio',
      click: (menuItem) => {
        this.themeClicked(menuItem)
      }
    }]
  }
}


/**
 * Export MainMenu
 */

module.exports = MainMenu
