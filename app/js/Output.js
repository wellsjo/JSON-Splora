/**
 * Output class wraps the output editor logic
 */

'use strict'

class Output {

  /**
   * @param {Element} el The element to use for the CodeMirror object
   */

  constructor(el) {
    this.outputEditor = CodeMirror.fromTextArea(el, {
      lineNumbers: true,
      smartIndent: true,
      readOnly: true,
      mode: 'application/javascript',
      lint: true
    })
  }

  /**
   * Formats and displays output
   *
   * @param {Object} data The data object to format and display
   */

  show(data) {
    this.outputEditor.setValue(JSON.stringify(data, null, 2))
  }

  /**
   * Sets the theme dynamically
   */

  setTheme(theme) {
    this.outputEditor.setOption('theme', theme)
  }
}

/**
 * Exports
 */

module.exports = Output
