module.exports = function (angel, next) {
  var parallel = require('../server/lib/parallel-exec')
  var loadDNA = require('organic-dna-loader')
  var registerHandler = function (cmd, commands) {
    angel.on(cmd, function (angel, next) {
      parallel(commands, next)
    })
  }
  loadDNA(function (err, dna) {
    if (err) throw err
    var commands = dna.client.assetpipeline.commands
    for (var cmd in commands) {
      registerHandler(cmd, commands[cmd])
    }
    next()
  })
}
