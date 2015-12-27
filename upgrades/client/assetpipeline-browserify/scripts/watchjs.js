module.exports = function (angel) {
  angel.on('watchjs', function () {
    var loadDNA = require('../server/load-dna')
    var watchify = require('watchify')
    var browserify = require('browserify')
    var gutil = require('gulp-util')
    var gulp = require('gulp')
    var source = require('vinyl-source-stream')
    var assign = require('lodash').assign
    var globby = require('globby')
    var path = require('path')

    var standardErrorHandler = require('../server/lib/gulp-error-notifier')({
      name: 'watchjs'
    })

    loadDNA(function (err, dna) {
      if (err) return console.error(err)
      var options = dna.client.assetpipeline
      globby([options.src + (options['watchjs'] ? options['watchjs'].pattern : '/**/*.bundle.js')])
      .then(function(entries) {
        entries.forEach(function (entry) {
          // add custom browserify options here
          var customOpts = {
            entries: entry,
            debug: true
          }
          var opts = assign({}, watchify.args, customOpts)
          var b = watchify(browserify(opts))
          b.on('update', bundle) // on any dep update, runs the bundler
          b.on('log', gutil.log) // output build logs to terminal

          // add transformations here
          // b.transform(require('browserify-transform-dna'))

          var bstream = b.bundle().on('error', standardErrorHandler)
          function bundle() {
            bstream = bstream.pipe(source(entry.replace(options.src + path.sep, '')))
            bstream.pipe(gulp.dest('build/'))
          }
          bundle()
        })
      })
      .catch(standardErrorHandler)
    })
  })
}
