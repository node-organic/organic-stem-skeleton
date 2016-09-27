var _ = require('lodash')

module.exports = function (plasma) {
  var store = module.exports.getStore()
  var userData = store.getItem('shared-expenses-user')

  if (userData && userData !== 'undefined' && userData !== 'null') {
    try {
      userData = JSON.parse(userData)
      _.extend(plasma.currentUser, userData)
    } catch (err) {
      console.log(err)
    }
  }

  var storeUserData = function () {
    store.setItem('shared-expenses-user', JSON.stringify(plasma.currentUser))
  }

  plasma.on('login', storeUserData)
  plasma.on('user-updated', storeUserData)
  plasma.on('register', storeUserData)
  plasma.on('logout', function (c) {
    store.setItem('shared-expenses-user', null)
  })
}

module.exports.getStore = function () {
  var mod = 'modernizr'

  // try localStorage
  // based on https://github.com/Modernizr/Modernizr/blob/master/feature-detects/storage/localstorage.js
  try {
    global.localStorage.setItem(mod, mod)
    global.localStorage.removeItem(mod)
    return global.localStorage
  } catch (e) {}

  // try sessionStorage
  // based on https://github.com/Modernizr/Modernizr/blob/master/feature-detects/storage/sessionstorage.js
  try {
    global.sessionStorage.setItem(mod, mod)
    global.sessionStorage.removeItem(mod)
    return global.sessionStorage
  } catch (e) {}

  return false
}
