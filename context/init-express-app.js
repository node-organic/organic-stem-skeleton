var express = require("express")
var bodyParser = require("body-parser")
var path = require("path")
var CookieParser = require('cookie-parser');
var errorface = require('errorface')

module.exports = function(plasma, dna, next) {
  var app = express();

  app.set("views", path.join(process.cwd(), dna.views))
  app.set("view engine", dna.viewEngine.ext)
  app.set("x-powered-by", false)

  app.engine(dna.viewEngine.ext, require(dna.viewEngine.name).__express);
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  var cookieParser = CookieParser(dna.cookie_secret);
  app.use(cookieParser);
  
  plasma.on(dna.expressSetupDoneOnce, function(){
    app.all("*", function(req, res, next){
      res.status(404).send("not found")
    })
    if(dna.useErrorHandler)
      app.use(errorface.errorHandler())
  })
  next(null, app)
}