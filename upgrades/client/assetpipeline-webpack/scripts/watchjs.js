module.exports = function(angel) {
  angel.on('watchjs', function () {
    var loadDNA = require('../lib/dna')
    var webpack = require('webpack-stream')
    var sourcemaps = require('gulp-sourcemaps')

    loadDNA(function (err, dna) {
      var options = dna.client.assetpipeline
      require('../lib/angelabilities-gulp-stream')({
        name: 'watchjs',
        src: dna.client.assetpipeline.src + '/**/*.bundle.js',
        pipeline: [
          sourcemaps.init(),
          webpack({watch: true}),
          sourcemaps.write()
        ],
        dest: dna.client.assetpipeline.dest
      })
    })
  })
}
