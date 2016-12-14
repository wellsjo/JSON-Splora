'use strict'

/**
 * Dependencies
 */

const Tab = require('./Tab')

class Tabs {
  constructor(rootEl, theme = 'default') {
    this.container = $(rootEl).tabs({
      activate: (event, ui) => {
        this.activeTabEl = ui.newTab
        this.activeTabId = ui.newTab.data('tab')
      }
    })
    this.tabBar = this.container.find('#tab-header')
    this.tabs = []
    this.totalTabsCreated = 0 // Counter for unique tab ids
    this.theme = theme

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

  removeTab(tabEl = this.activeTabEl) {
    if (this.tabs.length === 1) {
      return
    }

    const tabIndex = tabEl.index()
    const tabId = tabEl.remove().data('tab')

    $(`#tab-${tabId}`).remove()
    const removedTab = this.tabs.splice(tabIndex, 1)[0]
    removedTab.destroy()

    this.container.tabs('refresh')

    if (this.tabs.length === 1) {
      this.hideTabBar()
    }
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

    if (this.tabs.length > 1 && this.container.hasClass('tab-bar-hidden')) {
      this.showTabBar()
    }
  }

  /**
   * Shows tab bar
   */

  showTabBar() {
    this.container.removeClass('tab-bar-hidden')
  }

  /**
   * Hides tab bar
   */

  hideTabBar() {
    this.container.addClass('tab-bar-hidden')
  }
}


/**
 * Export app
 */

module.exports = Tabs
