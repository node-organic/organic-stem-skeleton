var exec = require('child_process').exec
var kill = require('killprocess')
var async = require('async')

module.exports = function (entries) {
  var counter = 0
  var halting = false
  var stopAndExit = function (code) {
    halting = true
    async.each(entries, function (e, next) {
      kill(e.pid, 'SIGINT', next)
    }, function () {
      process.exit(code || 0)
    })
  }
  var childExit = function (code) {
    if (halting) return
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
    child.on('exit', childExit)
    child.stdout.pipe(process.stdout)
    child.stderr.pipe(process.stderr)
    e.pid = child.pid
    e.child = child
  })

  process.on('SIGINT', stopAndExit)
}
