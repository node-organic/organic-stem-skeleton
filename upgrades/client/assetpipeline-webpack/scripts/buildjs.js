module.exports = function(angel) {
  angel.on('buildjs', function () {
    var loadDNA = require('../lib/dna')
    var runPipeline = require('../lib/gulp-pipeline')
    var webpack = require('webpack-stream')
    var uglify = require('gulp-uglify')
    var sourcemaps = require('gulp-sourcemaps')

    loadDNA(function (err, dna) {
      var options = dna.client.assetpipeline
      runPipeline({
        name: 'buildjs',
        src: options.src + '/**/*.bundle.js',
        pipeline: [
          sourcemaps.init(),
          webpack(),
          uglify(),
          sourcemaps.write('../buildmaps')
        ],
        dest: options.dest,
        exitOnError: true
      })
    })
  })
}
