var _ = require('lodash')
var plasma = window.plasma

module.exports = function User (data) {
  _.extend(this, data)
}

module.exports.prototype.fetch = function () {
  var self = this
  var usersApi = plasma.api.one('users', this.id)
  return usersApi.get()
    .then(function (response) {
      _.extend(self, response.body(false))
      return self
    })
}

module.exports.prototype.save = function (data) {
  var self = this
  var usersApi = plasma.api.all('users')
  return usersApi.put(this.id, data).then(function (response) {
    _.extend(self, response.body(false))
    return self
  })
}
