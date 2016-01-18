module.exports = function (req, res, next) {
  res.locals.version = require(process.cwd() + '/package.json').version

  res.locals.timestampUrl = function (path) {
    if (path.indexOf('?') === -1) {
      return path + '?v=' + res.locals.version
    } else {
      return path + '&v=' + res.locals.version
    }
  }

  next()
}
