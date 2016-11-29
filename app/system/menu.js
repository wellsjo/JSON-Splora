/**
 *
 */

'use strict'

/**
* Call this when a theme menu button is clicked.
* This function requires myApp is set to an instance of the app. 
*/
function themeClicked(menuItem, browserWindow, event){
  console.log(myApp.setThemeForAllPages(menuItem.label))
}

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
    submenu: [{
      label: 'default',
      click(menuItem, browserWindow, event) {
        themeClicked(menuItem, browserWindow, event)
      }
    }, {
      label: 'elegant',
      click(menuItem, browserWindow, event) {
        themeClicked(menuItem, browserWindow, event)
      }
    }, {
      label: 'mdn-like',
      click(menuItem, browserWindow, event) {
        themeClicked(menuItem, browserWindow, event)
      }
    }, {
      label: 'neat',
      click(menuItem, browserWindow, event) {
        themeClicked(menuItem, browserWindow, event)
      }
    }, {
      label: 'neo',
      click(menuItem, browserWindow, event) {
        themeClicked(menuItem, browserWindow, event)
      }
    }]
  }, {
    type: 'separator'
  },{
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
    click() {
      require('electron').shell.openExternal('http://electron.atom.io')
    }
  }]
}]

if (process.platform === 'darwin') {
  template.unshift({
      label: 'Electron1',
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

module.exports = template
