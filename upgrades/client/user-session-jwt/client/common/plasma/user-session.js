var merge = require('merge')

class UserSession {
  constructor(plasma, dna) {
    this.store = this.getStore()

    var storeUserData = function () {
      this.store.setItem('webadvisor-user', JSON.stringify(plasma.currentUser))
    }

    plasma.on('login', storeUserData)
    plasma.on('user-updated', storeUserData)
    plasma.on('register', storeUserData)
    plasma.on('logout', function (c) {
      store.removeItem('webadvisor-user')
    })

    if (dna.clearLocalStorage) {
      store.removeItem('webadvisor-user')
    } else {
      var userData = store.getItem('webadvisor-user')
      if (userData && userData !== 'undefined' && userData !== 'null') {
        try {
          userData = JSON.parse(userData)
          merge(plasma.currentUser, userData)
        } catch (err) {
          console.log(err)
        }
      }
    }
  }

  getStore() {
    var mod = 'modernizr'

    // try localStorage
    // based on https://github.com/Modernizr/Modernizr/blob/master/feature-detects/storage/localstorage.js
    try {
      global.localStorage.setItem(mod, mod)
      global.localStorage.removeItem(mod)
      return global.localStorage
    } catch (e) { }

    // try sessionStorage
    // based on https://github.com/Modernizr/Modernizr/blob/master/feature-detects/storage/sessionstorage.js
    try {
      global.sessionStorage.setItem(mod, mod)
      global.sessionStorage.removeItem(mod)
      return global.sessionStorage
    } catch (e) { }

    return new CookieStorage()
  }
}

class CookieStorage {
  constructor() {}

  static cookiesToObject() {
    let data = {}
    if (document.cookie === '') return {}
    document.cookie.split('; ').forEach(function (cookie) {
      const name = cookie.slice(0, cookie.indexOf('='))
      const value = cookie.slice(cookie.indexOf('=') + 1)
      data[name] = value
    })
    return data
  }

  getItem(name) {
    return cookiesToObject()[name]
  }

  setItem(name, value) {
    document.cookie = name + '=' + value + '; path=/'
  }

  removeItem(name) {
    document.cookie = name + '=; path=/; expires=' + new Date(0).toUTCString()
  }
}
