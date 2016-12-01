'use strict'

class MainMenu {

	// Create the main menu for the given app
	constructor(app) {
	    const {remote} = require('electron')
    	const {Menu} = remote
		const menuTemplate = require('./menuTemplate')
		MainMenu.app = app
		
		// Add theme sub menu
		menuTemplate[2].submenu[7].submenu = this.createThemeSubMenu()

		// Finally, build menu
		Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate))
	}

	/**
	* Create the theme sub menu. (Later versions can create this programmatically)
	*/
	createThemeSubMenu(){
		
		// First create static reference to themeClicked callback
		MainMenu.themeClicked = function(menuItem, browserWindow, event) {
			MainMenu.app.setTheme(menuItem.label)
		}

		return [{
	      label: 'default',
	      click(menuItem, browserWindow, event) {
	        MainMenu.themeClicked(menuItem, browserWindow, event)
	      }
	    }, {
	      label: 'elegant',
	      click(menuItem, browserWindow, event) {
	        MainMenu.themeClicked(menuItem, browserWindow, event)
	      }
	    }, {
	      label: 'mdn-like',
	      click(menuItem, browserWindow, event) {
	        MainMenu.themeClicked(menuItem, browserWindow, event)
	      }
	    }, {
	      label: 'neat',
	      click(menuItem, browserWindow, event) {
	        MainMenu.themeClicked(menuItem, browserWindow, event)
	      }
	    }, {
	      label: 'neo',
	      click(menuItem, browserWindow, event) {
	        MainMenu.themeClicked(menuItem, browserWindow, event)
	      }
	    }]
	}
}


/**
 * Export MainMenu
 */

module.exports = MainMenu