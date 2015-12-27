var path = require('path')
var named = require('vinyl-named')
var debug = require('gulp-debug')
var gulp = require('gulp')
var glob2base = require('glob2base')
var glob = require('glob')

module.exports = function (options) {
  var standardErrorHandler = require('./gulp-error-notifier')(options)
  var rootDir = path.join(process.cwd(), glob2base(new glob.Glob(options.src)))
  var stream = gulp.src(options.src)
    .on('error', standardErrorHandler)
    .pipe(named(function (file) {
      var relativeFilePath = file.path.replace(rootDir, '')
      relativeFilePath = relativeFilePath.replace(path.extname(relativeFilePath), '')
      return relativeFilePath
    }))
  options.pipeline.forEach(function (p) {
    p.on('error', standardErrorHandler)
    stream = stream.pipe(p)
  })
  stream = stream.pipe(debug({title: options.name}))
  stream = stream.pipe(gulp.dest(options.dest))
  return stream
}
