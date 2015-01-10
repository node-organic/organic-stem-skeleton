var express = require("express")
var bodyParser = require("body-parser")
var path = require("path")
var CookieParser = require('cookie-parser')
var errorface = require('errorface')
var methodOverride = require('method-override')

module.exports = function(plasma, dna, next) {
  var app = express();

  app.set("x-powered-by", false)

  if(dna.views) {
    app.set("views", path.join(process.cwd(), dna.views))
    app.set("view engine", dna.viewEngine.ext)
    app.engine(dna.viewEngine.ext, require(dna.viewEngine.name).__express)
    app.use(function(req, res, next){
      require("../page-helpers")(res.locals)
      next()
    })
  }

  if(dna.uploadsDir) {
    var multer = require("multer")
    app.set('uploadsDir', path.resolve(path.join(process.cwd(), dna.uploadsDir)))
    app.use(multer({
      dest: app.get('uploadsDir')
    }))
  }

  app.use(methodOverride())
  
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  var cookieParser = CookieParser(dna.cookie_secret);
  app.use(cookieParser);
  
  require("../routes/params")(app)
  
  plasma.on(dna.expressSetupDoneOnce, function(){
    
    require("../routes/responders")(app)

    if(dna.useErrorHandler)
      app.use(errorface.errorHandler())
  })
  next(null, app)
}