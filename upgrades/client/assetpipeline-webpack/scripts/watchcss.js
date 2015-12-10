module.exports = function (angel) {
  angel.on('watchcss', function (angel) {
    var less = require('gulp-less')
    var lessWatcher = require('gulp-less-watcher')

    var LessPluginAutoPrefix = require('less-plugin-autoprefix')
    var config = {
      verbose: true,
      usePolling: true,
      plugins: [ new LessPluginAutoPrefix() ]
    }

    require('../lib/angelabilities-gulp-stream')({
      name: 'watchcss',
      src: 'client/apps/**/*.bundle.css',
      pipeline: [
        lessWatcher(config),
        less(config)
      ],
      dest: 'build/'
    })
  })
}
