var gulp = require('gulp')
var path = require('path')
var async = require('async')
var _ = require('lodash')
var fs = require('fs')
var exec = require('child_process').exec

module.exports = function (angel) {
  angel.on('combine public assets', function (angel, next) {
    var loadDNA = require('organic-dna-loader')
    var version = require(process.cwd() + '/package.json').version
    loadDNA(function (err, dna) {
      if (err) throw err
      var publicData = dna.client.public
      var target = path.join(process.cwd(), '/build/' + version)
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
        tasks.push(move(publicData[mountUrl], mountUrl))
      }
      async.parallel(tasks, function (err) {
        if (!err) {
          var cwd = process.cwd()
          var childLN = exec('ln -sfT ' + cwd + '/build/' + version + ' ' + cwd + '/public/release')
          childLN.stdout.pipe(process.stdout)
          childLN.stderr.pipe(process.stderr)
          childLN.on('exit', process.exit)
        }
        console.info('Combination ', err ? 'FAILED' : 'SUCCESSFUL')
      })
    })
  })
}
