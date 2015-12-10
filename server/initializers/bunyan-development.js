var Bunyan = require('bunyan');
var bformat = require('bunyan-format');
var formatOut = bformat({outputMode: 'short'})

module.exports = function(plasma, dna, next){

  next(null, Bunyan.createLogger({
    name: dna.bunyan.name,
    stream: formatOut,
    level: 'debug'
  }))
}