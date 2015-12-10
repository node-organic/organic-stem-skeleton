module.exports = function (angel) {
  angel.on('buildcss', function (){
    var less = require('gulp-less')

    var LessPluginAutoPrefix = require('less-plugin-autoprefix')
    var config = {
      verbose: true,
      plugins: [ new LessPluginAutoPrefix() ]
    }

    require('../lib/angelabilities-gulp-stream')({
      name: 'watchcss',
      src: 'client/apps/**/*.bundle.css',
      pipeline: [
        less(config).on('error', standardHandler)
      ],
      dest: 'build/'
    })
  })
}
