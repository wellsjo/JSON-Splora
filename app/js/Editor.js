/**
 * CodeMirror editor wrapper class
 */

'use strict'

/**
 * Dependencies
 */

const welcomeMessage = require('./welcome-message')
const EventEmitter = require('events').EventEmitter
const formatJSON = require('js-beautify').js_beautify
const json5 = require('json5')
const jq = require('node-jq')
const vm = require('vm')

/**
 * Wrapper class for json editor
 */

class Editor extends EventEmitter {

  constructor(inputEditor, filterInput, outputEditor) {
    super()

    // Inputs
    this.outputEditor = outputEditor
    this.inputEditor = inputEditor
    this.filterInput = filterInput

    // Welcome message
    this.inputEditor.setValue(welcomeMessage)

    // Place cursor (after the welcome message)
    this.inputEditor.setCursor({
      line: 10
    })

    // Handle functions that respond to input
    this.handleChangeEvents()
  }

  /**
   * Respond to editor and filter input
   */

  handleChangeEvents() {

    // Change event triggers input validation
    this.inputEditor.on('change', _ => {
      this.validate(this.inputEditor.getValue())
    })

    // Paste (Cmd / Cntrl + v) triggers input validation and auto-format
    this.inputEditor.on('inputRead', (cm, e) => {
      if ('paste' == e.origin) {
        this.validate(e.text)
        if (this.data !== null) {
          this.formatInput()
        }
      }
    })

    // Pass the jq filter on to the parse function
    this.filterInput.on('keyup', e => {
      let filter = $(e.target).val()
      this.filter = filter
      this.runFilter()
    })
  }

  /**
   * Validate editor input. Emits 'valid-input' and sets this.data.
   *
   * @param {String} input Input to be parsed by json5
   */

  validate(input) {
    try {
      this.data = json5.parse(input)
      this.emit('valid-input')
      return true
    } catch (e) {
      this.data = null
      return false
    }
  }

  /**
   * Forats the code in the editor
   */

  formatInput() {
    let json = JSON.stringify(this.data, null, 2)
    this.inputEditor.setValue(json)
  }

  /**
   * Parse raw input as JavaScript first, then JQ
   *
   * @param {String} filter
   */

  runFilter() {

    // Ignore empty filters
    if (!this.filter.length) {
      this.hideRightPanel()
      return
    }

    // This will run 'result=<obj><filter>', and set it on the sandbox object
    let code = `result = x${this.filter}`
    let sandbox = {
      x: this.data,
      result: null
    }

    // Try to run through JavaScript vm first
    try {
      new vm.Script(code).runInNewContext(sandbox)
      this.showOutput(sandbox.result)
    } catch (e) {
      try {

        // If JavaScript filter fails, run through jq
        jq.run(this.filter, this.data, {
          input: 'json',
          output: 'json'
        }).then(result => {
          this.showOutput(result)
        }).catch(e => {
          this.hideRightPanel()
        });
      } catch (e) {
        this.hideRightPanel()
      }
    }
  }

  /**
   * Show the read-only filter output
   */

  showOutput(value) {
    let output = JSON.stringify(value, null, 2)
    this.outputEditor.setValue(output)
    this.showRightPanel()
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
 * Return date as unix timestamp
 */

function now() {
  return new Date().getTime() / 1000
}

/**
 * Exports
 */

module.exports = Editor
