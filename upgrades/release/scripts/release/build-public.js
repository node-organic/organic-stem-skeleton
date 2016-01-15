module.exports = function (angel) {
  angel.on('build public', function (angel, next) {
    var gulp = require('gulp')
    var path = require('path')
    var async = require('async')
    var _ = require('lodash')
    var fs = require('fs')
    var exec = require('child_process').exec
    var format = require('string-template')

    var loadDNA = require('organic-dna-loader')
    var version = require(process.cwd() + '/package.json').version

    loadDNA(function (err, dna) {
      if (err) throw err
      var publicData = dna.client.public
      var options = dna.client.assetpipeline
      var target = format(options.dest.build, {version: version})
      var moved = []
      var tasks = []
      var move = function (sources, publicSuffix) {
        return function (done) {
          var dest = target + '/' + publicSuffix
          var sourcePaths = sources.map(function (src) {
            if (src.combine === false) return null
            if (typeof src === 'object') {
              return src.path + '/**/' + (src.include ? src.include : '*.*')
            } else {
              return src + '/**/*.*'
            }
          })
          sourcePaths = _.compact(sourcePaths)
          gulp.src(sourcePaths)
            .pipe(gulp.dest(dest))
            .on('end', function () {
              moved.push({sources: sourcePaths, dest: dest})
              done()
            })
            .on('error', done)
        }
      }
      for (var mountUrl in publicData) {
        tasks.push(move(publicData[mountUrl], mountUrl.replace(options.dest.watch, '')))
      }
      async.parallel(tasks, function (err) {
        if (!err) {
          console.info('public builded', version)
          process.exit(0)
        } else {
          console.error('failed to move', err)
          process.exit(1)
        }
      })
    })
  })
}
