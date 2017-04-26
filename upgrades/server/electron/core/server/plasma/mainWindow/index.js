var Tray = require('electron').Tray
var BrowserWindow = require('electron').BrowserWindow
var app = require('electron').app
var globalShortcut = require('electron').globalShortcut

module.exports = function (plasma, dna) {
  plasma.on('kill', function () {
    if (dna.globalShortcut) {
      globalShortcut.unregister(dna.globalShortcut)
    }

    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  plasma.on(dna.reactOn, function () {
    // Keep a global reference of the window object, if you don't, the window will
    // be closed automatically when the JavaScript object is garbage collected.
    var mainWindow = global['mainWindow'] = null

    // Quit when all windows are closed.
    app.on('window-all-closed', function () {
      plasma.emit('kill')
    })

    // Create the browser window.
    mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      'web-preferences': {
        preload: __dirname + '/preload.js'
      },
      frame: true,
      icon: __dirname + dna.mainWindowIconPath
    })

    // and load the index.html of the app.
    mainWindow.loadURL(dna.url)

    // Open the DevTools.
    if (dna.devTools) {
      mainWindow.openDevTools()
    }

    // setup TrayIcon
    if (dna.trayIcon) {
      var appIcon = global['appIcon'] = new Tray(__dirname + dna.trayIconPath)
      appIcon.setToolTip(dna.trayIconTooltip)
      appIcon.on('clicked', function () {
        if (mainWindow.isVisible()) {
          mainWindow.hide()
        } else {
          mainWindow.show()
        }
      })
    }

    if (dna.globalShortcut) {
      var ret = globalShortcut.register(dna.globalShortcut, function () {
        if (mainWindow.isVisible()) {
          mainWindow.hide()
        } else {
          mainWindow.show()
        }
      })

      if (!ret) {
        console.info('registration failed for ' + dna.globalShortcut)
      }
    }
  })
}
