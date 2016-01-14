module.exports = function (angel) {
  angel.on('buildjs', function () {
    var loadDNA = require('organic-dna-loader')
    var browserify = require('browserify')
    var gulp = require('gulp')
    var source = require('vinyl-source-stream')
    var assign = require('lodash').assign
    var globby = require('globby')
    var uglify = require('gulp-uglify')
    var buffer = require('vinyl-buffer')
    var path = require('path')

    var standardErrorHandler = require('../server/lib/gulp-error-notifier')({
      name: 'buildjs'
    })

    var version = require(process.cwd() + '/package.json').version
    loadDNA(function (err, dna) {
      if (err) return console.error(err)
      var options = dna.client.assetpipeline
      globby([options.src + (options['buildjs'] ? options['buildjs'].pattern : '/**/*.bundle.js')])
      .then(function (entries) {
        entries.forEach(function (entry) {
          // add custom browserify options here
          var customOpts = {
            entries: entry,
            debug: false
          }
          var opts = assign({}, customOpts)
          var b = browserify(opts)

          // apply transformations here
          if (options.browserify.transformations) {
            options.browserify.transformations.forEach(function (t) {
              b.transform(t)
            })
          }

          var bstream = b.bundle().on('error', standardErrorHandler)
          bstream = bstream.pipe(source(entry.replace(options.src + path.sep, '')))
          bstream = bstream.pipe(buffer())
          bstream = bstream.pipe(uglify())
          bstream.pipe(gulp.dest(options.dest.build + '/' + version))
        })
      })
      .catch(standardErrorHandler)
    })
  })
}
