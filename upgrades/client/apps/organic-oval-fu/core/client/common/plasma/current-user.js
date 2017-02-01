var _ = require('lodash')
var FormData = window.FormData // eslint-disable-line no-unused-vars
var User = require('../models/user')

module.exports = function CurrentUser (plasma) {
  plasma.currentUser = new User()

  plasma.currentUser.fetch = function () {
    var self = this
    var api = plasma.api.one('users', this.id)
    return api.get()
      .then(function (response) {
        _.extend(self, response.body(false))
        plasma.emit({type: 'user-updated', user: self})
        return self
      })
  }

  plasma.currentUser.save = function (data) {
    var self = this
    var api = plasma.api.all('users')
    return api.put(this.id, data).then(function (response) {
      _.extend(self, response.body(false))
      plasma.emit({type: 'user-updated', user: self})
      return self
    })
  }

  plasma.currentUser.login = function (credentials) {
    var self = this
    var api = plasma.api.all('users')
    return api.custom('login')
      .post(credentials)
      .then(function (response) {
        _.extend(self, response.body(false))
        plasma.emit({type: 'login', user: self})
        return self
      })
  }

  plasma.currentUser.register = function (data) {
    var self = this
    var api = plasma.api.all('users')
    return api.custom('register')
      .post(data)
      .then(function (response) {
        _.extend(self, response.body(false))
        plasma.emit({type: 'register', user: self})
        return self
      })
  }

  plasma.currentUser.requestResetPassword = function (data) {
    var self = this
    var api = plasma.api.all('users')
    return api.custom('reset-password')
      .post(data)
      .then(function (response) {
        return self
      })
  }

  plasma.currentUser.changePassword = function (data) {
    var self = this
    var api = plasma.api.all('users')
    return api.custom('change-password')
      .post(data, {}, {'authtoken': data.token || self.token})
      .then(function (response) {
        _.extend(self, response.body(false))
        plasma.emit({type: 'login', user: self})
        return self
      })
  }

  plasma.currentUser.logout = function () {
    plasma.emit({type: 'logout', user: this})
    return Promise.resolve(this)
  }

  plasma.currentUser.delete = function () {
    var self = this
    var api = plasma.api.all('users')
    return api.delete(this.id).then(function (response) {
      _.extend(self, response.body(false))
      plasma.emit({type: 'logout', user: this})
      return self
    })
  }
}
