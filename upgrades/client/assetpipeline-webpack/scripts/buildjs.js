module.exports = function (angel) {
  angel.on('buildjs', function () {
    var loadDNA = require('organic-dna-loader')
    var runPipeline = require('../server/lib/gulp-pipeline')
    var webpack = require('webpack-stream')
    var uglify = require('gulp-uglify')
    var sourcemaps = require('gulp-sourcemaps')
    var path = require('path')

    var version = require(process.cwd() + '/package.json').version
    loadDNA(function (err, dna) {
      if (err) return console.error(err)
      var options = dna.client.assetpipeline
      var config = {}
      if (options.webpack) {
        config = require(path.join(process.cwd(), options.webpack))
      }
      runPipeline({
        name: 'buildjs',
        src: options.src + (options['buildjs'] ? options['buildjs'].pattern : '/**/*.bundle.js'),
        pipeline: [
          sourcemaps.init(),
          webpack(config),
          uglify(),
          sourcemaps.write('../buildmaps')
        ],
        dest: options.dest.build + '/' + version,
        exitOnError: true
      })
    })
  })
}
