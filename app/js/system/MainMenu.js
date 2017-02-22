'use strict'

/**
 * Dependencies
 */

const fs = require('fs')

const path = require('path')

const { remote } = require('electron')

const { Menu, BrowserWindow, dialog } = remote

class MainMenu {

  /**
   * Create the main menu for the given app
   */

  constructor(app, settings) {
    this.app = app
    this.settings = settings
    this.updateMenu()
  }

  /**
   *  Callback for when theme button is clicked.
   */

  themeClicked(menuItem) {
    this.settings.set('theme', menuItem.theme)
    this.app.setTheme(menuItem.theme)
  }

  createTemplate() {
    const template = [{
      label: 'File',
      submenu: [{
        label: 'Open',
        accelerator: 'CommandOrControl+O',
        click: () => {
          dialog.showOpenDialog(
            BrowserWindow.getFocusedWindow() || BrowserWindow.getAllWindows()[0],
            { filters: [{ name: 'JSON Files', extensions: ['json'] }, { name: 'All Files', extensions: ['*'] }] },
            (filePaths) => {
              var filename = filePaths[0]           
              var r = this.settings.get('recent') || []
              if (r.indexOf(filename.toLowerCase()) === -1) {
                r.push(filePaths[0].toLowerCase());
                this.settings.set('recent', r)
              }
              window.app = this.app
              
              this.app.tabs.newTab(fs.readFileSync(filename, 'utf8'), 0, path.basename(filename), filename )             

              this.updateMenu()
            }
          )
        }
      }, {
        label: 'Open Recent',
        accelerator: 'CommandOrControl+r',
        submenu: this.createRecentSubMenu(this.updated),
      }, {
        label: 'New Tab',
        accelerator: 'CommandOrControl+t',
        click: () => {
          window.app = this.app
          this.app.tabs.newTab()
        }
      }, {
        label: 'Close Tab',
        accelerator: 'CommandOrControl+w',
        click: () => {
          window.app = this.app
          this.app.tabs.removeTab()
        }
      }]
    }, {
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
        accelerator: 'CommandOrControl+Shift+F',
        click: () => {
          this.app.getCurrentPage().editor.format()
        }
      }, {
        label: 'Minify',
        accelerator: 'CommandOrControl+Shift+M',
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
      template[2].submenu.push({
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
      template[4].submenu = [{
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

  createRecentSubMenu(updated) {
    // give properties    
    const recentFiles = this.settings.get('recent')
    let files = [];   
    recentFiles.forEach((filename) => {
      let mi = {}
      mi.label = filename
      mi.click = (menuItem) => {
        window.app = this.app        
        this.app.tabs.newTab(fs.readFileSync(filename, 'utf8'), 0, path.basename(filename), filename);
      }
      files.push(mi)
    })

    if (files.length > 0) {
      files.push({
        type: 'separator'
      })

      files.push({
        label: "Clear items",
        click: () =>{
          this.settings.set('recent', [])
          this.updateMenu()
        }
      })
    }
    
    return files
  }

  /**
   * Create the theme sub menu. (Later versions can create this programmatically)
   */

  createThemeSubMenu() {
    const themes = [{
      label: 'Default',
      theme: 'default'
    }, {
      label: 'Elegant',
      theme: 'elegant'
    }, {
      label: 'Mdn-Like',
      theme: 'mdn-like'
    }, {
      label: 'Neat',
      theme: 'neat'
    }, {
      label: 'Neo',
      theme: 'neo'
    }, {
      label: 'Seti',
      theme: 'seti'
    }, {
      label: 'Zenburn',
      theme: 'zenburn'
    }]

    // give properties
    const selectedTheme = this.settings.get('theme')
    themes.forEach((i) => {
      const t = i
      t.type = 'radio'
      t.checked = (selectedTheme === t.theme)
      t.click = (menuItem) => {
        this.themeClicked(menuItem)
      }
    })
    return themes
  }


  updateMenu() {
    const template = this.createTemplate()

    // build menu
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))
  }

}

/**
 * Export MainMenu
 */

module.exports = MainMenu
