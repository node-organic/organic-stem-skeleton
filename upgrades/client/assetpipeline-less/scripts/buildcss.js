module.exports = function (angel) {
  angel.on('buildcss', function () {
    var loadDNA = require('../lib/dna')
    var runPipeline = require('../lib/gulp-pipeline')
    var less = require('gulp-less')

    var LessPluginAutoPrefix = require('less-plugin-autoprefix')
    var config = {
      verbose: true,
      plugins: [ new LessPluginAutoPrefix() ],
      compress: true
    }

    loadDNA(function (err, dna) {
      if (err) return console.error(err)
      var options = dna.client.assetpipeline
      runPipeline({
        name: 'buildcss',
        src: options.src + (options['buildcss'] ? options['buildcss'].pattern : '/**/*.bundle.css'),
        pipeline: [
          less(config)
        ],
        dest: options.dest,
        exitOnError: true
      })
    })
  })
}
