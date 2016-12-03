'use strict'

/**
 * Register linter callback with CodeMirror. This will override the JSON
 * linter to a JSON5 Linter using the parser.
 */

CodeMirror.registerHelper('lint', 'json', (text) => {
  const found = []
  try {
    json5.parse(text)
  } catch (e) {
    e.message = e.message.substring(0, e.message.indexOf('.') + 1)
    found.push({
      message: e.message,
      from: CodeMirror.Pos(e.lineNumber - 1, e.columnNumber - 1),
      to: CodeMirror.Pos(e.lineNumber - 1, e.columnNumber)
    })
  }
  return found
})
