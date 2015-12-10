module.exports = function (angel) {
  angel.on('buildjs', function () {
    var browserify = require('gulp-browserify')
    require('../lib/angelabilities-gulp-stream')({
      name: 'watchjs',
      src: 'client/apps/**/*.bundle.js',
      pipeline: [ browserify({}) ],
      dest: 'build/'
    })
  })
}
