var path = require("path")
var rmdir = require("rimraf")

process.env.CELL_MODE = process.env.CELL_MODE || "_test"
var Cell = require("../../index")
var cell;

var variables = module.exports.variables = {
  cell: null,
  cellDNA: null,
  dbName: require("../../dna/_test/database").name,
  httpendpoint: "http://127.0.0.1:13371",
  uploadsDir: path.join(process.cwd(), "/tests/uploads")
}

module.exports.httpendpoint = variables.httpendpoint

module.exports.cleanDB = function(done) {
  var mongoose = require("mongoose")
  mongoose.connect("localhost", variables.dbName, function(){
    mongoose.connection.db.dropDatabase(function() {
      mongoose.disconnect(done)
    })
  })
}

module.exports.cleanUploads = function(next){
  rmdir(variables.uploadsDir, next)
}

module.exports.start = function(next){
  cell = new Cell()
  cell.on(["ExpressServer", "ApiRoutesReady", "SiteRoutesReady", "StaticPagesReady", "Mongoose"], function(err){
    if(err instanceof Error) return next(err)
    next()
  })
  cell.start()
}

module.exports.stop = function(next) {
  cell.stop(function(){
    next()
  })
}