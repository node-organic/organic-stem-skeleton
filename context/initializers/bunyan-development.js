var Bunyan = require('bunyan');
var PrettyStream = require('bunyan-prettystream');

module.exports = function(plasma, dna, next){

  var prettyStdOut = new PrettyStream();
  prettyStdOut.pipe(process.stdout);

  next(null, Bunyan.createLogger({
    name: dna.bunyan.name,
    streams: [{
      level: 'debug',
      type: 'raw',
      stream: prettyStdOut
    }]
  }))
}