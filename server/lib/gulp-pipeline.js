var path = require('path')
var named = require('vinyl-named')
var debug = require('gulp-debug')
var util = require('gulp-util')
var gulp = require('gulp')
var glob2base = require('glob2base')
var glob = require('glob')

var notifier = null
try {
  notifier = require('node-notifier')
} catch (err) {
  // ignore err
}

// Standard handler
function standardHandler (err) {
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

module.exports = function (options) {
  var rootDir = path.join(process.cwd(), glob2base(new glob.Glob(options.src)))
  var stream = gulp.src(options.src)
    .on('error', standardHandler)
    .pipe(named(function (file) {
      var relativeFilePath = file.path.replace(rootDir, '')
      relativeFilePath = relativeFilePath.replace(path.extname(relativeFilePath), '')
      return relativeFilePath
    }))
  options.pipeline.forEach(function (p) {
    p.on('error', standardHandler)
    stream = stream.pipe(p)
  })
  stream = stream.pipe(debug({title: options.name}))
  stream = stream.pipe(gulp.dest(options.dest))
  return stream
}
