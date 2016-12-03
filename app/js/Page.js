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
    this.bottomWrapper = $('.bottom-wrapper')
    this.leftPanel = $('.panel-left')

    // Create input/output editors
    const editorEl = document.querySelector('.json-input')
    const outputEl = document.querySelector('.filter-output')
    const filterInput = $('.filter-input')
    this.editor = new Editor(editorEl, filterInput)
    this.output = new Output(outputEl)

    // Enable slider pane UI
    $('.panel-left').resizable({
      handleSelector: '.splitter',
      handles: 'e, w'
    })

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
    this.leftPanel.css('width', '50%')
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
