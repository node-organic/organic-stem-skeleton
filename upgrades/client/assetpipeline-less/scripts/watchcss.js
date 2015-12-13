module.exports = function (angel) {
  angel.on('watchcss', function (angel) {
    var loadDNA = require('../lib/dna')
    var runPipeline = require('../lib/gulp-pipeline')
    var less = require('gulp-less')
    var lessWatcher = require('gulp-less-watcher')

    var LessPluginAutoPrefix = require('less-plugin-autoprefix')
    var config = {
      verbose: true,
      usePolling: true,
      plugins: [ new LessPluginAutoPrefix() ]
    }

    loadDNA(function (err, dna) {
      var options = dna.client.assetpipeline
      runPipeline({
        name: 'watchcss',
        src: options.src + '/**/*.bundle.css',
        pipeline: [
          lessWatcher(config),
          less(config)
        ],
        dest: options.dest
      })
    })
  })
}
