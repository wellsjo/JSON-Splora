/**
 * Controls the output pane
 */

'use strict'

// Default CodeMirror options for output editor
const defaultOutputOptions = {
  lineNumbers: true,
  smartIndent: true,
  foldGutter: true,
  readOnly: true,
  gutters: [
    'CodeMirror-lint-markers',
    'CodeMirror-linenumbers',
    'CodeMirror-foldgutter'
  ],
  mode: 'application/javascript',
  lint: true
}

/**
 * Read-only CodeMirror editor wrapper
 */

class Output {

  /**
   * @param {Element} el The element to use for the CodeMirror object
   */

  constructor(el) {
    this.output = CodeMirror.fromTextArea(el, defaultOutputOptions)
  }

  /**
   * Formats and displays output
   *
   * @param {Object} data The data object to format and display
   */

  show(data) {
    let output = null
    if (typeof data === 'string') {
      output = data
    } else {
      output = JSON.stringify(data, null, 2)
    }
    this.output.setValue(output)
  }

  /**
   * Sets the theme dynamically
   *
   * @param {String} theme
   */

  setTheme(theme) {
    this.output.setOption('theme', theme)
  }

  /**
   * Return the output theme
   *
   * @param {String} setting Retrieve an editor setting
   */

  getSetting(setting) {
    return this.output.getOption(setting)
  }
}

/**
 * Exports
 */

module.exports = Output
