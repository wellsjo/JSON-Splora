/**
 * Output class wraps the output editor logic
 */

'use strict'

// const CodeMirror = require('codemirror')

class Output {

  /**
   * @param {Element} el The element to use for the CodeMirror object
   */

  constructor(el) {
    this.output = CodeMirror.fromTextArea(el, {
      lineNumbers: true,
      smartIndent: true,
      readOnly: true,
      mode: 'application/javascript',
      lint: true,
      foldGutter: true,
      gutters: ['CodeMirror-lint-markers', 'CodeMirror-linenumbers', 'CodeMirror-foldgutter']
    })
  }

  /**
   * Formats and displays output
   *
   * @param {Object} data The data object to format and display
   */

  show(data) {
    this.output.setValue(JSON.stringify(data, null, 2))
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
