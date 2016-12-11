'use strict'

// Dependencies
const enableContextMenu = require('electron-context-menu')
const electron = require('electron')
const path = require('path')
const fs = require('fs')

const { BrowserWindow } = electron
const { app } = electron

// Create window
const WINDOW_HEIGHT = 600
const WINDOW_WIDTH = 1000

// Environment
const env = process.env.ENV || 'production'

// Create tmp directory
mkdirp(path.resolve(__dirname, '..', 'tmp'))

// If there are args, they are being passed from the command line, which means we
// must slice them again
const args = process.argv.slice(2)

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {

  mainWindow = new BrowserWindow({
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    icon: `${__dirname}/app/assets/logos/logo.png`
  })

  // If initialized with a file input from the command line, save the path
  if (typeof args[0] === 'string') {
    const inputFile = path.resolve(args[0])
    if (inputFile && fs.existsSync(inputFile) && fs.lstatSync(inputFile).isFile()) {
      fs.writeFileSync(`${__dirname}/app/tmp/input.json`, inputFile)
    }
  }

  // Load the main program window
  mainWindow.loadURL(`file://${__dirname}/index.html`)

  // Enable context menu
  enableContextMenu()

  // Open the DevTools
  if (env === 'development') {
    mainWindow.webContents.openDevTools()
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {

    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {

  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})
