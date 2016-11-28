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

  constructor() {
    let editorEl = document.querySelector('.json-input')
    let outputEl = document.querySelector('.filter-output')

    // Create input/output editors
    this.editor = new Editor(editorEl)
    this.output = new Output(outputEl)

    // Create filter input
    this.filter = $('.filter-input')

    // Enable slider pane UI
    $('.panel-left').resizable({
      handleSelector: '.splitter',
      handles: 'e, w'
    })

    // Respond to valid input and key events
    this.handleEditorEvents()
  }

  /**
   * Respond to events emitted from the editor
   */

  handleEditorEvents() {

    // Show the bottom bar when valid input is detected
    this.editor.on('valid-input', _ => {
      if ($('.bottom-wrapper').hasClass('hidden')) {
        this.showBottomBar()
        this.focusFilter()
      } else {

        // Live-update the output
        let filter = $(this.filter).val()
        this.editor.runFilter(filter)
      }
    })

    this.editor.on('filter-valid', filter => {
      $('.filter-icon').attr('src', `app/assets/${filter.type}.svg`)
      this.output.show(filter.result)
      this.showRightPanel()
    })

    this.editor.on('filter-invalid', _ => {
      console.log('here')
      $('.filter-icon').attr('src', 'app/assets/type.png')
      this.hideRightPanel()
    })

    this.filter.on('keyup', e => {
      let filter = $(e.target).val()
      this.editor.runFilter(filter)
    })
  }

  /**
   * Show bottom bar with filter input
   */

  showBottomBar() {
    $('.bottom-wrapper').removeClass('hidden')
  }

  /**
   * Focus cursor on the filter input
   */

  focusFilter() {
    $('.filter-input').focus()
  }

  /**
   * Show the right panel
   */

  showRightPanel() {
    $('.panel-left').css('width', '50%')
  }

  /**
   * Show the left panel
   */

  hideRightPanel() {
    $('.panel-left').css('width', '100%')
  }
}


/**
 * Exports
 */

module.exports = Page
