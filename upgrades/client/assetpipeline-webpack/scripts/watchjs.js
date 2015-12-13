module.exports = function(angel) {
  angel.on('watchjs', function () {
    var loadDNA = require('../lib/dna')
    var runPipeline = require('../lib/gulp-pipeline')
    var webpack = require('webpack-stream')
    var sourcemaps = require('gulp-sourcemaps')

    loadDNA(function (err, dna) {
      var options = dna.client.assetpipeline
      runPipeline({
        name: 'watchjs',
        src: options.src + '/**/*.bundle.js',
        pipeline: [
          sourcemaps.init(),
          webpack({watch: true}),
          sourcemaps.write()
        ],
        dest: options.dest
      })
    })
  })
}
