/**
 * The Tab class wraps the logic for the page DOM. It creates the input and
 * output editors, and responds to their events.
 */

'use strict'

/**
 * Dependencies
 */

const defaultTab = require('./system/default-tab')
const Editor = require('./Editor')
const Output = require('./Output')

/**
* Creates input and output editors, sets the horizontal slider, and
* registers DOM events
*/

class Tab {

  /**
   * Initiate a tab
   *
   * @param {Element} container
   */

  constructor(container, tabName) {
     console.log(tabName)
    this.tabName = tabName || "&nbsp;";
    this.container = container
    this.container.html(defaultTab)

    this.bottomWrapper = this.container.find('.bottom-wrapper')
    this.leftPanel = this.container.find('.panel-left')
    this.filterIcon = this.container.find('.filter-icon')

    const editorEl = this.container.find('.json-input')[0]
    const outputEl = this.container.find('.filter-output')[0]
    const filterInput = this.container.find('.filter-input')

    this.editor = new Editor(editorEl, filterInput)
    this.output = new Output(outputEl)

    // Set page jQuery elements
    this.bottomWrapper = $('.bottom-wrapper')
    this.editorWrapper = $('.editor-wrapper')
    this.leftPanel = $('.panel-left')

    // Enable slider pane UI
    this.leftPanel.resizable({
      handleSelector: '.splitter',
      handles: 'e, w'
    })

    // Width percentage of the output panel
    this.outputWidthPercent = 50

    // Respond to valid input and key events
    this.handleEvents()
  }

  /**
   * Creates tab html
   *
   * @param {Integer} tabId
   */

  static generateTabHeaderTemplate(tabId, tabName) {
    return `
      <li data-tab="${tabId}">
        <a href="#tab-${tabId}">${tabName || "Untitled-" + tabId }</a>
        <span class="ui-icon ui-icon-close" role="presentation">Remove Tab</span>
      </li>
    `
  }

  /**
   * Generate tab content html
   *
   * @param {Integer} tabId
   */

  static generateTabContentTemplate(tabId) {
    return `<div id="tab-${tabId}" class="tab-content"></div>`
  }

  /**
   * Respond to events emitted from the editor
   */

  handleEvents() {

    // Show the bottom bar when valid input is detected

    this.editor.on('input-valid', () => {
      if (this.bottomWrapper.hasClass('hidden')) {
        this.showBottomBar()
        this.editor.focusFilter()
      } else {

        // This enables live-updating the output as you edit the input
        this.editor.runFilter()
      }
    })

    // Show filter type on valid filter
    this.editor.on('filter-valid', (filter) => {
      this.filterIcon.attr('src', `app/assets/images/${filter.type}.svg`)
      this.output.show(filter.result)
      this.showRightPanel()
    })

    // Show generic filter icon when filter is invalid or empty
    this.editor.on('filter-invalid', () => {
      this.filterIcon.attr('src', 'app/assets/images/no-filter.png')
    })

    // Hide right panel when filter is empty
    this.editor.on('filter-empty', () => {
      this.filterIcon.attr('src', 'app/assets/images/no-filter.png')
      this.hideRightPanel()
    })

    // Update the panel width percent when it is dragged
    this.leftPanel.on('resize', () => {
      const containerWidth = Number(this.editorWrapper.css('width').replace('px', ''))
      const panelWidth = Number(this.leftPanel.css('width').replace('px', ''))
      this.outputWidthPercent = 100 * (panelWidth / containerWidth)
    })
  }

  /**
   * Show bottom bar with filter input
   */

  showBottomBar() {
    this.bottomWrapper.removeClass('hidden')

    // Makes room for the bottom bar (fixes bug where you can't scroll to bottom)
    this.leftPanel.css('height', 'calc(100% - 40px)')
  }

  /**
   * Show the right panel
   */

  showRightPanel() {
    this.leftPanel.css('width', `${this.outputWidthPercent}%`)
  }

  /**
   * Show the left panel
   */

  hideRightPanel() {
    this.leftPanel.css('width', '100%')
  }

  /**
   * Sets the theme on both editors
   *
   * @param {String} theme
   */

  setTheme(theme) {
    this.editor.setTheme(theme)
    this.output.setTheme(theme)
  }

  /**
   * Cleans up any outstanding listeners within itself and it's contained editor and output classes
   */

  destroy() {
    this.editor.removeAllListeners()
  }
}

/**
 * Exports
 */

module.exports = Tab
