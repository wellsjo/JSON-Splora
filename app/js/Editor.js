/**
 * CodeMirror editor wrapper class
 */

'use strict'

/**
 * Dependencies
 */

const { EventEmitter } = require('events')
const superagent = require('superagent')

// const CodeMirror = require('codemirror')
const beautify = require('js-beautify').js_beautify
const json5 = require('json5')
const isUrl = require('is-url')
const path = require('path')
const jq = require('node-jq')
const vm = require('vm')
const fs = require('fs')

/**
 * Editor options
 */

const defaultEditorOptions = {
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
}

const defaultFormatOptions = {
  indent_size: 2,
  indent_char: ' ',
  preserve_newlines: false,
  brace_style: 'expand'
}

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

    // Create CodeMirror input and filter elements
    this.editor = CodeMirror.fromTextArea(el, defaultEditorOptions)
    this.filter = filter

    // Path to store data file so it can be read for jq (required for large input)
    this.tmp = path.resolve(__dirname, '..', 'tmp', 'data.json')

    // Set js-beautify format options
    this.formatOptions = defaultFormatOptions

    // Handle functions that respond to input
    this.handleEvents()
  }

  /**
   * Respond to editor and filter input
   */

  handleEvents() {
    this.formatOnNextChange = false

    // Change event triggers input validation
    this.editor.on('change', () => {
      this.validate()
      if (this.formatOnNextChange) {
        this.format()
        this.formatOnNextChange = false
      }
    })

    // Paste (Cmd / Cntrl + v) triggers input validation and auto-format
    this.editor.on('inputRead', (cm, e) => {
      if (e.origin === 'paste') {
        const pasted = e.text[0]

        // If pasted text looks like url, try to download it
        if (isUrl(pasted)) {
          superagent.get(pasted).end((err, res) => {
            if (!err && res.body) {
              this.formatOnNextChange = true
              this.editor.setValue(JSON.stringify(res.body))
            }
          })
        } else {

          // Validate and format the input
          this.validate()
          this.format()
        }
      }
    })

    // File drop event (editor's value has not been changed yet)
    this.editor.on('drop', () => {
      this.formatOnNextChange = true
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
   * Set the theme dynamically
   *
   * @param {String} theme The theme to set
   */

  setTheme(theme) {
    this.editor.setOption('theme', theme)
  }

  /**
   * Set the editor value dynamically
   *
   * @param {String} value The value to set
   */

  setValue(value) {
    this.editor.setValue(value)
    this.validate()
    this.format()
  }

  /**
   * Set the editor value dynamically
   *
   * @param {String} value The value to set
   */

  setCursor(line) {
    this.editor.setCursor({ line })
  }

  /**
   * Returns the editor theme
   *
   * @param {String} setting Retrieve an editor setting
   */

  getSetting(setting) {
    return this.editor.getOption(setting)
  }

  /**
   * Formats the code in the editor
   */

  format() {
    if (this.data !== null) {
      const beautified = beautify(this.editor.getValue(), this.formatOptions)
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
      fs.writeFileSync(this.tmp, JSON.stringify(this.data))

      // If JavaScript filter fails, run through jq
      jq.run(filter, this.tmp, {
        input: 'file',
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
