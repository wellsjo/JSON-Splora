/**
 * Settings
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
   * Create reusable config
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
   * Get a settings value by key
   *
   * @param {String} key
   */

  get(key) {
    return this.config.get(key)
  }

  /**
   * Set a settings value by key
   *
   * @param {String} key
   * @param {String} value
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
