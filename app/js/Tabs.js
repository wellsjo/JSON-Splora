'use strict'

/**
 * Dependencies
 */

const Tab = require('./Tab')

class Tabs {
  constructor(rootEl, theme) {
    this.container = $(rootEl).tabs()
    this.tabBar = this.container.find('#tab-header')
    this.tabs = []
    this.totalTabsCreated = 0 // Counter for unique tab ids
    this.theme = theme || 'default'

    this.init()
  }

  /**
   * Binds a listener to the new tab button and creates first tab
   */

  init() {
    const newTabButton = this.tabBar.find('#new-tab')
    newTabButton.click(() => {
      this.newTab()
    })
  }

  /**
   * Sets theme for all tabs
   */

  setTheme(theme) {
    this.theme = theme
    this.tabs.forEach(tab => tab.setTheme(theme))
  }

  /**
   * Removes tab and cleans up any children
   */

  removeTab(tabEl) {
    const tabIndex = tabEl.index()
    const tabId = tabEl.remove().data('tab')

    $(`#tab-${tabId}`).remove()
    const removedTab = this.tabs.splice(tabIndex, 1)[0]
    removedTab.destroy()

    this.container.tabs('refresh')
  }

  /**
   * Adds a new tab
   */

  newTab(input, cursorPos) {

    // Generate HTML
    const tabEl = $(Tab.generateTabHeaderTemplate(this.totalTabsCreated))
    const contentEl = $(Tab.generateTabContentTemplate(this.totalTabsCreated))

    // Setup listener to remove tab
    const removeButton = tabEl.find('.ui-icon-close')
    removeButton.click(() => this.removeTab(tabEl))

    // Append tab to tab Bar
    this.tabBar.find('li:last-child').before(tabEl)
    this.container.append(contentEl)

    // Create the new tab
    const newTab = new Tab(contentEl)
    newTab.setTheme(this.theme)
    this.tabs.push(newTab)

    // Refresh tabs and set new tab as active
    this.container.tabs('refresh')
    this.container.tabs('option', 'active', this.tabs.length - 1)

    if (input) {
      newTab.editor.setValue(input)
      newTab.editor.setCursor(cursorPos || 0)
    }

    this.totalTabsCreated += 1
  }
}


/**
 * Export app
 */

module.exports = Tabs
