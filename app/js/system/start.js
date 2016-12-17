/**
 * Initialize the program
 */

'use strict'

const welcomeMessage = require('./welcome-message.js')
const Settings = require('../Settings')
const MainMenu = require('./MainMenu')
const path = require('path')
const App = require('../App')
const fs = require('fs')

// Check if jsplora is opening with input file. If so, load it, then delete
// the temporary file
const inputFile = path.resolve(__dirname, '..', '..', 'tmp', 'input.json')
let cursorPos = 10
let input = welcomeMessage
if (fs.existsSync(inputFile)) {
  cursorPos = 0
  input = fs.readFileSync(fs.readFileSync(inputFile).toString()).toString()
  fs.unlinkSync(inputFile)
}

const settings = new Settings()
const app = new App(document, settings)

app.tabs.newTab(input, cursorPos)
const menu = new MainMenu(app, settings)

module.exports = menu
