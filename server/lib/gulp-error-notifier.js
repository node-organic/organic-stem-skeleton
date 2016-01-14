var util = require('gulp-util')
var notifier = null
try {
  notifier = require('node-notifier')
} catch (err) {
  // ignore err
}

module.exports = function (options) {
  return function standardErrorHandler (err) {
    // Notification
    if (notifier) {
      notifier.notify({ title: options.name + ' Error', message: err.message })
    }
    // Log to console
    util.log(util.colors.red(options.name + ' Error'), err.message)
    if (options.exitOnError) {
      process.exit(1)
    }
  }
}
