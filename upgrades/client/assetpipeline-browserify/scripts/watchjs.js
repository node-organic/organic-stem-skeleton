module.exports = function (angel) {
  angel.on('watchjs', function () {
    var watchify = require('gulp-watchify')
    require('../lib/angelabilities-gulp-stream')({
      name: 'watchjs',
      src: 'client/apps/**/*.bundle.js',
      pipeline: [ watchify({watch: true}) ],
      dest: 'build/'
    })
  })
}
