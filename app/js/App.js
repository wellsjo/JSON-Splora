'use strict'

/**
 * Dependencies
 */

const Page = require('./Page')

/**
 * App container class
 *
 * Manages pages, tabs, settings
 */

class App {

  constructor(document) {
    this.pages = [new Page()]
  }
}


/**
 * Export app
 */

module.exports = App
