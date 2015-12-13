var path = require("path")
var exec = require("child_process").exec
var kill = require("killprocess")
var async = require('async')

module.exports = function (entries) {
  var counter = 0
  var stopAndExit = function(code){
    async.each(entries, function (e, next) {
      kill(e.pid, "SIGINT", next)
    }, function () {
      process.exit(code)
    })
  }
  var childExit = function (code) {
    if (code !== 0) {
      return stopAndExit(code)
    }
    counter += 1
    if (counter === entries.length) {
      process.exit(0)
    }
  }

  async.each(entries, function (e, next) {
    var child = exec(e.cmd)
    child.on("exit", childExit)
    child.stdout.pipe(process.stdout)
    child.stderr.pipe(process.stderr)
    e.pid = child.pid
    e.child = child
  })

  process.on("SIGINT", stopAndExit)
}
