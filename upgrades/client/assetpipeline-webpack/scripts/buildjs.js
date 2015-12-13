module.exports = function(angel) {
  angel.on('buildjs', function () {
    var loadDNA = require('../lib/dna')
    var runPipeline = require('../lib/gulp-pipeline')
    var webpack = require('webpack-stream')
    var uglify = require('gulp-uglify')
    var sourcemaps = require('gulp-sourcemaps')
    var path = require('path')

    loadDNA(function (err, dna) {
      var options = dna.client.assetpipeline
      var config = {}
      if (options.webpack) {
        config = require(path.join(process.cwd(), options.webpack))
      }
      runPipeline({
        name: 'buildjs',
        src: options.src + '/**/*.bundle.js',
        pipeline: [
          sourcemaps.init(),
          webpack(config),
          uglify(),
          sourcemaps.write('../buildmaps')
        ],
        dest: options.dest,
        exitOnError: true
      })
    })
  })
}
