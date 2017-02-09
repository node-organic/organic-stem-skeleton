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
  .example('angel test')
  .description('1. checks the codestyle via eslint\n' +
               '2. runs all Mocha tests in "test/"\n')

  angel.on('test style', function (angel, next) {
    require('angelabilities-exec')(angel)
    angel.sh([
      'node ./node_modules/.bin/eslint ./'
    ].join(' && '), handleExit)
  })
  .example('angel test style')
  .description('checks the codestyle via eslint')

  angel.on('test :path', function (angel, next) {
    require('angelabilities-exec')(angel)
    angel.sh([
      'node ./node_modules/.bin/mocha ' + angel.cmdData.path
    ].join(' && '), handleExit)
  })
  .example('angel test test/server')
  .description('runs all Mocha tests in ":path"')
}
