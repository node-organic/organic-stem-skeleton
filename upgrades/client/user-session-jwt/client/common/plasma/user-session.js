export class UserSession {
  constructor (plasma, dna) {
    this.store = this.getStore()

    plasma.on('login', this.setToken)
    plasma.on('register', this.setToken)
    plasma.on('logout', function () {
      this.store.removeItem('{{{platform}}}-user-token')
    })

    if (dna.clearLocalStorage) {
      this.store.removeItem('{{{platform}}}-user-token')
    }
  }

  setToken (c) {
    this.store.setItem('{{{platform}}}-user-token', c.token)
  }

  getStore () {
    const mod = 'modernizr'

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
  constructor () {}

  static cookiesToObject () {
    let data = {}
    if (document.cookie === '') return {}
    document.cookie.split('; ').forEach(function (cookie) {
      const name = cookie.slice(0, cookie.indexOf('='))
      const value = cookie.slice(cookie.indexOf('=') + 1)
      data[name] = value
    })
    return data
  }

  getItem (name) {
    return cookiesToObject()[name]
  }

  setItem (name, value) {
    document.cookie = name + '=' + value + '; path=/'
  }

  removeItem (name) {
    document.cookie = name + '=; path=/; expires=' + new Date(0).toUTCString()
  }
}
