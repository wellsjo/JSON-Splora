'use strict'

const json5 = require('json5')

// Array of errors to ignore
const ignoreErrors = ['Unexpected EOF']

/**
 * Register linter callback with CodeMirror. This will override the JSON
 * linter to a JSON5 Linter using the parser.
 */

CodeMirror.registerHelper('lint', 'json', (text) => {
  const found = []
  try {
    json5.parse(text)
  } catch (e) {

    // Check if error message should be ignored
    if (ignoreErrors.some(x => e.message.indexOf(x) > -1)) {
      return []
    }
    e.message = e.message.substring(0, e.message.indexOf('.') + 1)
    found.push({
      message: e.message,
      from: CodeMirror.Pos(e.lineNumber - 1, e.columnNumber - 1),
      to: CodeMirror.Pos(e.lineNumber - 1, e.columnNumber)
    })
  }
  return found
})
