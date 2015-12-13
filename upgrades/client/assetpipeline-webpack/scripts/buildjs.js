module.exports = function(angel) {
  angel.on('buildjs', function () {
    var loadDNA = require('../lib/dna')
    var runPipeline = require('../lib/gulp-pipeline')
    var webpack = require('webpack-stream')
    var uglify = require('gulp-uglify')

    loadDNA(function (err, dna) {
      var options = dna.client.assetpipeline
      runPipeline({
        name: 'buildjs',
        src: dna.client.assetpipeline.src + '/**/*.bundle.js',
        pipeline: [
          webpack(),
          uglify()
        ],
        dest: dna.client.assetpipeline.dest
      })
    })
  })
}
