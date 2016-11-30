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
      lint: true,
      foldGutter: true,
      gutters: ['CodeMirror-lint-markers', 'CodeMirror-linenumbers', 'CodeMirror-foldgutter']
    })
  }

  /**
   * Format and set output
   */

  show(object) {
    let val = ''
    if (object !== '') {
      val = JSON.stringify(object, null, 2)
    }
    this.outputEditor.setValue(val)
  }

  /**
   * Set the theme dynamically
   */

  setTheme(theme) {
    this.outputEditor.setOption('theme', theme)
  }
}

/**
 * Exports
 */

module.exports = Output
