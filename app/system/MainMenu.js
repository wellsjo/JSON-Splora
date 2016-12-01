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
			MainMenu.app.setTheme(menuItem.theme)
		}

		return [{
	      label: 'Default',
	      theme: 'default',
	      type: 'radio',
	      click(menuItem, browserWindow, event) {
	        MainMenu.themeClicked(menuItem, browserWindow, event)
	      }
	    }, {
	      label: 'Elegant',
	      theme: 'Elegant',
	      type: 'radio',
	      click(menuItem, browserWindow, event) {
	        MainMenu.themeClicked(menuItem, browserWindow, event)
	      }
	    }, {
	      label: 'Mdn-Like',
	      theme: 'mdn-like',
	      type: 'radio',
	      click(menuItem, browserWindow, event) {
	        MainMenu.themeClicked(menuItem, browserWindow, event)
	      }
	    }, {
	      label: 'Neat',
	      theme: 'neat',
	      type: 'radio',
	      click(menuItem, browserWindow, event) {
	        MainMenu.themeClicked(menuItem, browserWindow, event)
	      }
	    }, {
	      label: 'Neo',
	      theme: 'neo',
	      type: 'radio',
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