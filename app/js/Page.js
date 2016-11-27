/**
 * The Page class represents
 */

'use strict'

const Editor = require('./Editor')

/**
 * Business logic for a JSON-splora editor
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
    let outputEditor = CodeMirror.fromTextArea(outputEl, {
      lineNumbers: true,
      smartIndent: true,
      readOnly: true,
      mode: 'application/javascript',
      lint: true
    })

    // Filter input (jQuery object)
    let filterInput = $('.filter-input')

    this.editor = new Editor(inputEditor, filterInput, outputEditor)

    // Enable slider pane UI
    $('.panel-left').resizable({
      handleSelector: '.splitter',
      handles: 'e, w'
    })

    // Show the bottom bar when valid input is detected
    this.editor.on('valid-input', _ => {
      if ($('.bottom-wrapper').hasClass('hidden')) {
        $('.bottom-wrapper').removeClass('hidden')
        $('.filter-input').focus()
      }
    })
  }
}


/**
 * Exports
 */

module.exports = Page
