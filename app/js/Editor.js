/**
 * CodeMirror editor wrapper class
 */

'use strict'

/**
 * Dependencies
 */

const formatJSON = require('js-beautify').js_beautify
const json5 = require('json5')
const jq = require('node-jq')
const vm = require('vm')

let welcomeMessage =
`/**
 * Welcome to JSON-Splora!
 *
 * Drag-and-drop a file, or input raw JSON or JS
 *
 * When valid JSON is detected, a window will open
 * below where you can run js and jq filters
 */

`

/**
 * Wrapper class for json editor
 */

class Editor {

  constructor() {
    this.messageBox = document.querySelector('.message')
    this.lastFormatted = 0

    // CodeMirror is exposed in /index.html
    this.editor = CodeMirror.fromTextArea(document.querySelector('.json-input'), {
      gutters: ["CodeMirror-lint-markers"],
      lineNumbers: true,
      smartIndent: true,
      autofocus: true,
      extraKeys: {
        Tab: false
      },
      indentUnit: 2,
      tabSize: 2,
      mode: 'application/javascript',
      lint: true
    })

    this.editor.setValue(welcomeMessage)
    this.editor.setCursor({
      line: 10
    })

    // CodeMirror readonly filter output
    this.output = CodeMirror.fromTextArea(document.querySelector('.filter-output'), {
      lineNumbers: true,
      smartIndent: true,
      readOnly: true,
      mode: 'application/javascript',
      lint: true
    })

    this.editor.on('change', _ => this.update())

    // Trigger a change event for pasting data, with 'format' set to true
    this.editor.on('inputRead', (cm, e) => {
      if (e.origin == 'paste') {
        this.update({
          format: true
        })
      }
    })

    // Pass the jq filter on to the parse function
    $('.filter-input').on('keyup', e => {
      let filter = $(e.target).val()
      this.runFilter(filter)
    })
  }

  /**
   * Fires when a change is registered in the editor
   *
   * @param {Objects} opts
   */

  update(opts) {
    opts = opts || {}
    let input = this.editor.getValue()
    try {
      this.data = json5.parse(input)
      if (opts.format) this.formatInput()
      this.showBottomBar()
    } catch (e) {
      this.hideBottomBar()
    }
  }

  /**
   * Forats the code in the editor
   */

  formatInput() {
    let json = JSON.stringify(this.data, null, 2)
    this.editor.setValue(json)
    this.lastFormatted = now()
  }

  /**
   * Parse raw input as JavaScript first, then JQ
   *
   * @param {String} filter
   */

  runFilter(filter) {
    console.log('running filter', filter)
    if (!filter.length) {
      this.hideRightPanel()
      return
    }

    if (filter.substring(0, 1) !== '.')
      filter = '.' + filter;

    let sandbox = {
      x: this.data,
      result: null
    }
    let code = `result = x${filter}`

    // Try to run through JavaScript vm
    try {
      new vm.Script(code).runInNewContext(sandbox)
      this.showOutput(sandbox.result)
    } catch (e) {
      try {

        // try jq filter
        jq.run(filter, this.data, {
          input: 'json',
          output: 'json'
        }).then(result => {
          this.showOutput(result)
        }).catch(e => {
          console.log(e.stack || e)
          this.hideRightPanel()
        });
      } catch (e) {
        console.log(e.stack || e)
        this.hideRightPanel()
      }
    }
  }

  /**
   * Show the read-only filter output
   */

  showOutput(value) {
    let output = JSON.stringify(value, null, 2)
    this.output.setValue(output)
    this.showRightPanel()
    console.log('showing output', value)
  }

  /**
   * Shows the bottom bar
   */

  showBottomBar() {
    if ($('.bottom-wrapper').hasClass('hidden')) {
      $('.bottom-wrapper').removeClass('hidden')
      $('.filter-input').focus()
    }
  }

  /**
   * Hides the bottom bar
   */

  hideBottomBar() {
    $('.bottom-wrapper').addClass('hidden')
  }

  showRightPanel() {
    $('.panel-left').css('width', '50%')
  }

  hideRightPanel() {
    $('.panel-left').css('width', '100%')
  }

  /**
   * Write a message to the application message bar
   */

  message(message) {
    // this.messageBox.innerHTML = message
  }
}

function now() {
  return new Date().getTime() / 1000
}

/**
 * Exports
 */

module.exports = Editor
