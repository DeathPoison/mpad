const electron      = require('electron')
const app           = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url  = require('url')
const defaultWindowOpts = require('electron-browser-window-options')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// debug mode
let DEBUG = false

// share cli argv's
global.sharedObject = {args: process.argv}

// clone defaults and customize options 
var myOpts = Object.assign({}, defaultWindowOpts, {
  titleBarStyle: 'hidden',
  resizeable: true,
  darkTheme: true,
  autoHideMenuBar: true,

  width:  800, 
  height: 600, 
  frame: true,  // remove complete frame of this window
})

// remove dev tools from contex menu
require('electron-context-menu')({
  showInspectElement: false,
});


function createWindow () {

  // Create the browser window.
  mainWindow = new BrowserWindow(myOpts)
 
  // remove menu bar
  if ( !DEBUG )
    mainWindow.setMenu(null)

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  if ( DEBUG )
    mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object
    mainWindow = null
  })

}

// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications to stay active...
  if (process.platform !== 'darwin') 
    app.quit()
})

app.on('activate', function () {
  // On OS X tries to re-create a window but there are no windows open...
  if (mainWindow === null)
    createWindow()
})
