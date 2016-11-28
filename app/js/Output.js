/**
 * Output class wraps the output editor logic
 */

'use strict'

class Output {

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
   * Format and set output
   */

  show(object) {
    if (object === '') {
      return
    }
    let formatted = JSON.stringify(object, null, 2)
    this.outputEditor.setValue(formatted)
  }
}

/**
 * Exports
 */

module.exports = Output
