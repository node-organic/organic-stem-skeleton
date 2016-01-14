var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var CookieParser = require('cookie-parser')
var methodOverride = require('method-override')

module.exports = function ExpressApp (plasma, dna, next) {
  var app = express()

  app.set('x-powered-by', false)

  if (dna.views) {
    app.set('views', path.join(process.cwd(), dna.views))
    app.set('view engine', dna.viewEngine.ext)
    app.engine(dna.viewEngine.ext, require(dna.viewEngine.name).__express)
  }

  if (dna.uploadsDir) {
    var multer = require('multer')
    app.set('uploadsDir', path.resolve(path.join(process.cwd(), dna.uploadsDir)))
    app.use(multer({
      dest: app.get('uploadsDir')
    }))
  }

  app.use(methodOverride())

  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  if (dna.cookie_secret) {
    var cookieParser = CookieParser(dna.cookie_secret)
    app.use(cookieParser)
  }

  if (dna.interceptors) {
    dna.interceptors.forEach(function (interceptorPath) {
      require(path.join(process.cwd(), interceptorPath))(app, dna)
    })
  }

  plasma.on(dna.expressSetupDoneOnce, function () {
    dna.responders.forEach(function (responderPath) {
      require(path.join(process.cwd(), responderPath))(app, dna)
    })
  })
  next(null, app)
}
