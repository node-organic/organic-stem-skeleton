/* global fetch */
var dna = require('webpack-dna-loader!')

var restful = require('restful.js')

module.exports = function (plasma) {
  plasma.api = restful.default(dna.apiendpoint, restful.fetchBackend(fetch))
  plasma.api.endpoint = dna.apiendpoint
  plasma.api.request = function (patternUrl, params) {
    for (var key in params) {
      patternUrl = patternUrl.replace(':' + key, params[key])
    }

    return window.plasma.api.custom(patternUrl)
  }
  var setApiAuth = function () {
    plasma.api.header('authtoken', plasma.currentUser.token)
  }
  if (plasma.currentUser.id) {
    setApiAuth()
  }
  plasma.on('login', setApiAuth)
  plasma.on('register', setApiAuth)
  plasma.on('logout', function () {
    plasma.api.header('authtoken', null)
  })
}
