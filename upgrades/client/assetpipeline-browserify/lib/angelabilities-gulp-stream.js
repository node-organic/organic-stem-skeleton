module.exports = function (options) {
  var named = require('vinyl-named')
  var debug = require('gulp-debug')
  var util = require('gulp-util')
  var notifier = require('node-notifier')
  var gulp = require('gulp')

  // Standard handler
  function standardHandler (err) {
    // Notification
    if (notifier) {
      notifier.notify({ title: options.name + ' Error', message: err.message })
    }
    // Log to console
    util.log(util.colors.red(options.name + ' Error'), err.message)
  }

  var stream = gulp.src(options.src).on('error', standardHandler)
    .pipe(named())
  options.pipeline.forEach(function (p) {
    stream.pipe(p).on('error', standardHandler)
  })
  stream.pipe(debug({title: options.name}))
  stream.pipe(gulp.dest(options.dest))
}
