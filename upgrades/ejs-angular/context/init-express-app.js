var express = require("express")
var bodyParser = require("body-parser")
var path = require("path")
var CookieParser = require('cookie-parser');
var ejs = require("ejs")
var errorface = require('errorface')

module.exports = function(plasma, dna, next) {
  var app = express();

  app.set("views", path.join(process.cwd(), dna.views))
  app.set("view engine", "html")
  app.set("x-powered-by", false)

  app.engine('html', ejs.__express);
  app.use(bodyParser());

  var cookieParser = CookieParser(dna.cookie_secret);
  app.use(cookieParser);
  
  plasma.on(dna.expressSetupDoneOnce, function(){
    app.all("*", function(req, res, next){
      res.send(404, "not found")
    })
    app.use(errorface.errorHandler())
  })
  next(null, app)
}