/**
 * CodeMirror editor wrapper class
 */

'use strict'

/**
 * Dependencies
 */

const { EventEmitter } = require('events')
const welcomeMessage = require('./system/welcome-message')
const superagent = require('superagent')
const beautify = require('js-beautify').js_beautify
const json5 = require('json5')
const isUrl = require('is-url')
const jq = require('node-jq')
const vm = require('vm')

/**
 * Wrapper class for json editor
 */

class Editor extends EventEmitter {

  /**
   * Creates the input editor, sets a welcome message, and registers DOM events
   *
   * @param {Element} el The textarea element to use for CodeMirror instance
   * @param {jQuery} filter The filter input element
   */

  constructor(el, filter) {
    super()
    this.filter = filter

    // Create CodeMirror element
    this.editor = CodeMirror.fromTextArea(el, {
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
      lint: true,
      matchBrackets: true,
      foldGutter: true,
      gutters: ['CodeMirror-lint-markers', 'CodeMirror-linenumbers', 'CodeMirror-foldgutter']
    })

    // Create js-beautify format options
    this.beautify_options = {
      indent_size: 2,
      indent_char: ' ',
      preserve_newlines: false
    }

    // Welcome message
    this.editor.setValue(welcomeMessage)

    // Place cursor (after the welcome message)
    this.editor.setCursor({
      line: 10
    })

    // Handle functions that respond to input
    this.handleEvents()
  }

  /**
   * Set the theme dynamically
   */

  setTheme(theme) {
    this.editor.setOption('theme', theme)
  }

  /**
   * Respond to editor and filter input
   */

  handleEvents() {

    // Change event triggers input validation
    this.editor.on('change', () => {
      this.validate()
    })

    // Paste (Cmd / Cntrl + v) triggers input validation and auto-format
    this.editor.on('inputRead', (cm, e) => {
      if (e.origin === 'paste') {
        const pasted = e.text[0]

        // If pasted text looks like url, try to download it
        if (isUrl(pasted)) {
          superagent.get(pasted).end((err, res) => {
            if (!err && res.body) {
              this.editor.setValue(JSON.stringify(res.body))
              this.validate()
              this.format()
            }
          })
        } else {

          // Validate and format the input
          this.validate()
          this.format()
        }
      }
    })

    // Run the filter as the user types
    this.filter.on('keyup', () => {
      this.runFilter()
    })
  }

  /**
   * Validate editor input. Emits 'input-valid' and sets this.data.
   */

  validate() {
    const input = this.editor.getValue()
    try {
      this.data = json5.parse(input)
      this.emit('input-valid')
    } catch (e) {
      this.data = null
    }
  }

  /**
   * Formats the code in the editor
   */

  format() {
    if (this.data !== null) {
      const beautified = beautify(this.editor.getValue(), this.beautify_options)
      this.editor.setValue(beautified)
    }
  }

  /**
   * Minifies the code in the editor
   */

  minify() {
    if (this.data !== null) {
      const minified = JSON.stringify(this.data)
      this.editor.setValue(minified)
    }
  }

  /**
   * Focus cursor in the filter input
   */

  focusFilter() {
    this.filter.focus()
  }

  /**
   * Parse raw input as JavaScript first, then JQ
   */

  runFilter() {

    // Set filter here so this function can be called externally
    const filter = this.filter.val()

    // Ignore empty filters
    if (!filter || !filter.length) {
      this.emit('filter-empty')
      return
    }

    // Use the JavaScript vm to evaluate the filter with this context
    const script = `result = x${filter}`
    const context = {
      x: this.data,
      result: null
    }

    try {
      new vm.Script(script).runInNewContext(context)
      if (typeof context.result !== 'undefined') {
        this.emit('filter-valid', {
          result: context.result,
          type: 'js'
        })
      } else {
        this.emit('filter-invalid')
      }
    } catch (e) {

      // If JavaScript filter fails, run through jq
      jq.run(filter, this.data, {
        input: 'json',
        output: 'json'
      }).then((result) => {
        if (result === null) {

          // jq returns null for incorrect keys, but we will count them as
          // invalid
          this.emit('filter-invalid')
        } else {

          // The jq filter worked
          this.emit('filter-valid', {
            type: 'jq',
            result
          })
        }
      }).catch(() => {

        // jq filter failed
        this.emit('filter-invalid')
      })
    }
  }
}

/**
 * Exports
 */

module.exports = Editor
