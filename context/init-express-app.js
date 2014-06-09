var express = require("express")
var bodyParser = require("body-parser")
var path = require("path")
var CookieParser = require('cookie-parser');
var jade = require("jade")

module.exports = function(plasma, dna, next) {
  var app = express();

  app.set("views", path.join(process.cwd(), dna.views))
  app.set("view engine", "jade")
  app.set("x-powered-by", false)

  app.engine('jade', jade.__express);
  app.use(bodyParser());

  var cookieParser = CookieParser(dna.cookie_secret);
  app.use(cookieParser);
  
  next(null, app)
}