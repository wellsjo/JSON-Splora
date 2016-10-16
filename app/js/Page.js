'use strict'

const Editor = require('./Editor')

/**
 * Business logic for a JSON-splora editor
 */

class Page {

  constructor() {
    this.editor = new Editor()
    $('.panel-left').resizable({
      handleSelector: '.splitter',
      handles: 'e, w'
    })
  }
}


/**
 * Exports
 */

module.exports = Page
