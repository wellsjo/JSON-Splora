/**
 * TODO add desc
 */

'use strict'

/**
 * Dependencies
 */

const Config = require('electron-config')

/**
 * Default settings
 */

const defaultSettings = {
  theme: 'default'
}

/**
 * Wrapper class for settings config file
 */

class Settings {

  /**
   * TODO create desc
   */

  constructor() {

    // Create the config file handler
    this.config = new Config({
      name: 'settings',
      defaults: defaultSettings
    })

  }

  /**
   * Reset the settings to the default values
   */

  reset() {
    this.config.store = defaultSettings
  }

  /**
   * Get a value by key
   */

  get(key) {
    return this.config.get(key)
  }

  /**
   * Set a value by key
   */

  set(key, value) {
    this.config.set(key, value)
  }

  /**
   * Get the file path
   */

  getPath() {
    return this.config.path
  }
}

/**
 * Exports
 */

module.exports = Settings
