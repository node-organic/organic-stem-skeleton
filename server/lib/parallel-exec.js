var exec = require('child_process').exec
var kill = require('killprocess')
var async = require('async')

module.exports = function (entries, done) {
  var counter = 0
  var hasChildError = false
  var halting = false

  entries = entries.map(function (e) {
    if (typeof e === 'string') {
      return {
        cmd: e
      }
    } else {
      return e
    }
  })

  var stopAndExit = function (code) {
    halting = true
    async.each(entries, function (e, next) {
      kill(e.pid, 'SIGINT', next)
    }, function () {
      if (hasChildError) {
        if (done) {
          return done(new Error('child has error'))
        }
        process.exit(1)
      } else {
        if (done) return done()
        process.exit(code || 0)
      }
    })
  }

  var childExit = function (e) {
    return function (code) {
      if (halting) return
      if (code !== 0) {
        hasChildError = true
        console.info(e.cmd, 'failed with code', code)
      }
      counter += 1
      if (counter === entries.length) {
        if (hasChildError) {
          if (done) return done(new Error('child has error'))
          process.exit(1)
        } else {
          if (done) return done()
          process.exit(0)
        }
      }
    }
  }
  async.each(entries, function (e, next) {
    var child = exec(e.cmd)
    child.on('exit', childExit(e))
    child.stdout.pipe(process.stdout)
    child.stderr.pipe(process.stderr)
    e.pid = child.pid
    e.child = child
  })

  process.on('SIGINT', stopAndExit)
}
