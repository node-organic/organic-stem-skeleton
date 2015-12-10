module.exports = function(angel) {
  angel.on('buildjs', function () {
    var webpack = require('webpack-stream')

    require('../lib/angelabilities-gulp-stream')({
      name: 'watchjs',
      src: 'client/apps/**/*.bundle.js',
      pipeline: [ webpack() ],
      dest: 'build/'
    })
  })
}
