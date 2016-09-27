if (typeof Promise === 'undefined') {
  require('es6-promise').polyfill()
}

module.exports = function (options) {
  var _ = require('lodash')
  var dna = require('webpack-dna-loader!')
  var Plasma = require('organic-plasma')

  var CurrentUser = require('./plasma/current-user')
  var UserSessionStore = require('./plasma/user-session')
  var Api = require('./plasma/api')
  var Router = require('./plasma/router')
  var I18N = require('./plasma/i18n')

  window.onerror = window.handleException = window.onerror || require('./handle-exception')
  window.navigatePage = require('./navigate-page')

  window.plasma = new Plasma()

  window.plasma.debug = dna.debug

  window.plasma.organelles = [
    new I18N(window.plasma, {
      endpoint: dna.i18n.endpoint,
      defaultLang: dna.i18n.defaultLang,
      saveMissing: dna.i18n.saveMissing
    }),
    new CurrentUser(window.plasma),
    new UserSessionStore(window.plasma),
    new Api(window.plasma),
    new Router(window.plasma, {
      root: options.root,
      urls: dna.fronturls,
      params: options.urlParams,
      director: {
        html5history: true
      }
    })
  ]
  if (options.buildOrgenelles) {
    window.plasma.organelles = window.plasma.organelles.concat(options.buildOrgenelles(window.plasma))
  }

  if (window.socialLoggedUser) {
    _.extend(window.plasma.currentUser, window.socialLoggedUser)
    window.plasma.emit({ type: 'login', user: window.plasma.currentUser })
  }

  if (options.protected) {
    if (!window.plasma.currentUser.id) {
      return window.navigatePage(options.redirectNotAuthorized || 'login')
    }
  }
  if (options.allowedUserRole) {
    if (!window.plasma.currentUser.id || window.plasma.currentUser.role !== options.allowedUserRole) {
      return window.plasma.emit({ type: 'redirect-authorized', user: window.plasma.currentUser })
    }
  }
  if (options.redirectAuthorized) {
    if (window.plasma.currentUser.id) {
      return window.navigatePage(options.redirectAuthorized)
    }
  }

  require('domready')(function () {
    window.plasma.i18n.init(window.plasma.currentUser.lang).then(function () {
      oval.init()
      if (options.globalDirectives) {
        var oldBaseTag = oval.BaseTag
        oval.BaseTag = function (tag, tagName, rootEl, rootProps, rootAttributes) {
          oldBaseTag(tag, tagName, rootEl, rootProps, rootAttributes)
          tag.injectDirectives(options.globalDirectives)
        }
      }
      options.requireTags()
      oval.mountAll(document.body)
    })
  })
}
