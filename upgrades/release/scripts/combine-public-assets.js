var $require = require(process.cwd() + '/lib/require')

var gulp = require('gulp')
var path = require('path')
var async = require('async')

module.exports = function (angel) {
  angel.on('combine public assets', function (angel, next) {
    var publicData = $require('dna/client/public')
    var target = path.normalize(path.join(process.cwd(), 'public-build'))
    var moved = []
    var tasks = []
    var move = function (sources, publicSuffix) {
      return function (done) {
        var dest = target + '/' + publicSuffix
        var sourcePaths = sources.map(function (src) {
          if (typeof src === 'object') {
            return src.path + '/**/' + (src.include ? src.include : '*.*')
          } else {
            return src + '/**/*.*'
          }
        })
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
      tasks.push(move(publicData[mountUrl], mountUrl.replace('public', '')))
    }
    async.parallel(tasks, function (err) {
      next && next(err, moved)
      console.info('Combination ', err ? 'FAILED' : 'SUCCESSFUL')
    })
  })
}
