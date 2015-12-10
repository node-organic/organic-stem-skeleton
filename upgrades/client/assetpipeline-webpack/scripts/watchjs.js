module.exports = function(angel) {
  angel.on('watchjs', function () {
    var webpack = require('webpack-stream')

    require('../lib/angelabilities-gulp-stream')({
      name: 'watchjs',
      src: 'client/apps/**/*.bundle.js',
      pipeline: [ webpack({watch: true}) ],
      dest: 'build/'
    })
  })
}
