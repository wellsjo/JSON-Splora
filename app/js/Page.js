/**
 * The Page class wraps the logic for the page DOM. It creates the input and
 * output editors, and responds to their events.
 */

'use strict'

/**
 * Dependencies
 */

const Editor = require('./Editor')

/**
 * Page
 */

class Page {

  constructor() {

    // Input CodeMirror object
    let inputEl = document.querySelector('.json-input')
    let inputEditor = CodeMirror.fromTextArea(inputEl, {
      gutters: ["CodeMirror-lint-markers"],
      lineNumbers: true,
      smartIndent: true,
      autofocus: true,
      extraKeys: {
        Tab: false
      },
      indentUnit: 2,
      tabSize: 2,
      mode: {
        name: 'javascript',
        json: true
      },
      lint: true
    })

    // Output CodeMirror object (read-only)
    let outputEl = document.querySelector('.filter-output')
    this.outputEditor = CodeMirror.fromTextArea(outputEl, {
      lineNumbers: true,
      smartIndent: true,
      readOnly: true,
      mode: 'application/javascript',
      lint: true
    })

    // Filter input (jQuery object)
    this.filterInput = $('.filter-input')

    // Create editor
    this.editor = new Editor(inputEditor)

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
        $('.bottom-wrapper').removeClass('hidden')
        $('.filter-input').focus()
      }
    })

    this.editor.on('filter-valid', output => {
      this.showOutput(output)
      this.showRightPanel()
    })

    this.editor.on('filter-invalid', _ => {
      this.hideRightPanel()
    })

    this.filterInput.on('keyup', e => {
      let filter = $(e.target).val()
      this.editor.runFilter(filter)
    })
  }

  /**
   * Show the read-only filter output
   */

  showOutput(output) {
    this.outputEditor.setValue(JSON.stringify(output, null, 2))
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
