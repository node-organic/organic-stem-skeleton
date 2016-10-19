module.exports = function (angel) {
  var handleExit = function (err) {
    if (err) process.exit(1)
  }
  angel.on('test', function (angel, next) {
    require('angelabilities-exec')(angel)
    angel.sh([
      'node ./node_modules/.bin/eslint ./',
      'node ./node_modules/.bin/mocha ./test'
    ].join(' && '), handleExit)
  })
  angel.on('test style', function (angel, next) {
    require('angelabilities-exec')(angel)
    angel.sh([
      'node ./node_modules/.bin/eslint ./'
    ].join(' && '), handleExit)
  })
  angel.on('test :path', function (angel, next) {
    require('angelabilities-exec')(angel)
    angel.sh([
      'node ./node_modules/.bin/mocha ' + angel.cmdData.path
    ].join(' && '), handleExit)
  })
}
