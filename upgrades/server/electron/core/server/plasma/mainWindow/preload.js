(function () {
  window.frame = require('remote').getCurrentWindow()
  window.frame.resizeTo = function (w, h) {
    window.frame.setSize(w, h)
  }
  window.frame.bringToFront = function () {
    window.frame.show()
  }
  window.frame.setAppTrayIcon = function (path) {
    require('remote').getGlobal('appIcon').setImage(path)
  }
})()
