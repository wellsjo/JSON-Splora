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

  constructor(inputEditor) {
    super()
    this.inputEditor = inputEditor

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
        this.formatInput()
      }
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
    if (null !== this.data) {
      let json = JSON.stringify(this.data, null, 2)
      this.inputEditor.setValue(json)
    }
  }

  /**
   * Parse raw input as JavaScript first, then JQ
   *
   * @param {String} filter
   */

  runFilter(filter) {

    // Ignore empty filters
    if (!filter.length) {
      this.emit('filter-invalid')
      return
    }

    // This will run 'result=<obj><filter>', and set it on the sandbox object
    let code = `result = x${filter}`
    let sandbox = {
      x: this.data,
      result: null
    }

    // Try to run through JavaScript vm first
    try {
      new vm.Script(code).runInNewContext(sandbox)
      this.emit('filter-valid', sandbox.result)
    } catch (e) {
      try {

        // If JavaScript filter fails, run through jq
        jq.run(filter, this.data, {
          input: 'json',
          output: 'json'
        }).then(result => {

          // The filter worked
          this.emit('filter-valid', result)
        }).catch(e => {
          this.emit('filter-invalid')
        });
      } catch (e) {
        this.emit('filter-invalid')
      }
    }
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
