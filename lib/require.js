var path = require('path')
module.exports = function (modulePath) {
  return require(path.join(process.cwd(), modulePath))
}
