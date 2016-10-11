module.exports = function (tag) {
  var findParentLink = function (el) {
    if (el.attributes.href) return el
    if (!el.parentNode) return
    return findParentLink(el.parentNode)
  }
  tag.router = window.plasma.router
  tag.navigate = function (e) {
    var target
    if (e.ctrlKey || e.which === 2 || e.button === 4) return
    if (e.preventDefault) {
      e.preventDefault()
      e.preventUpdate = true
      var el = findParentLink(e.target)
      target = el.attributes.href.value
    }
    if (typeof e === 'string') {
      target = e
    }
    if (target) {
      if (target.indexOf(tag.router.root) !== 0) {
        window.navigatePage(target)
      } else {
        tag.router.navigate(target)
      }
    }
  }
  tag.onRoute = function (route, callback) {
    var pattern = {
      type: 'url-change',
      url: route
    }
    window.plasma.on(pattern, callback)
    tag.on('unmount', function () {
      window.plasma.off(pattern, callback)
    })
  }
  tag.onRouteChange = function (callback) {
    var pattern = {
      type: 'url-change'
    }
    window.plasma.on(pattern, callback)
    tag.on('unmount', function () {
      window.plasma.off(pattern, callback)
    })
  }
}
