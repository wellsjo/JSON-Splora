/**
 * The Page class wraps the logic for the page DOM. It creates the input and
 * output editors, and responds to their events.
 */

'use strict'

/**
 * Dependencies
 */

const Editor = require('./Editor')
const Output = require('./Output')

/**
 * Page
 */

class Page {

  /**
   * Creates input and output editors, sets the horizontal slider, and
   * registers DOM events
   */

  constructor() {

    // Create input/output editors
    const editorEl = document.querySelector('.json-input')
    const outputEl = document.querySelector('.filter-output')
    const filterInput = $('.filter-input')
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
   * Respond to events emitted from the editor
   */

  handleEvents() {

    // Show the bottom bar when valid input is detected
    this.editor.on('input-valid', () => {
      if ($('.bottom-wrapper').hasClass('hidden')) {
        this.showBottomBar()
        this.editor.focusFilter()
      } else {

        // This enables live-updating the output as you edit the input
        this.editor.runFilter()
      }
    })

    // Show filter type on valid filter
    this.editor.on('filter-valid', (filter) => {
      $('.filter-icon').attr('src', `app/assets/${filter.type}.svg`)
      this.output.show(filter.result)
      this.showRightPanel()
    })

    // Show generic filter icon when filter is invalid or empty
    this.editor.on('filter-invalid', () => {
      $('.filter-icon').attr('src', 'app/assets/type.png')
    })

    // Hide right panel when filter is empty
    this.editor.on('filter-empty', () => {
      $('.filter-icon').attr('src', 'app/assets/type.png')
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
   */

  setTheme(theme) {
    this.editor.setTheme(theme)
    this.output.setTheme(theme)
  }
}

/**
 * Exports
 */

module.exports = Page
