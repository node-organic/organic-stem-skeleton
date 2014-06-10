var request = require("request").defaults({jar: true})

process.env.CELL_MODE = process.env.CELL_MODE || "_test"
var Cell = require("../../index")
var cell;

module.exports.httpendpoint = "http://127.0.0.1:13371"

module.exports.start = function(next){
  cell = new Cell()
  cell.on([
    {type: "SiteRoutesReady"}
  ], function(err){
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