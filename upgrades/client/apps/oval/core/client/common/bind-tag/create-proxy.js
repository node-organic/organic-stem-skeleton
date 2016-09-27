var isProxyPolyfill = false
if (typeof Proxy === 'undefined') {
  isProxyPolyfill = true
  require('proxy-polyfill/proxy.min.js')
}
var proxy_cache = [
  /*
  {
    target: Variable,
    value: Proxy,
    tags: [ Tag, ... ]
  }
  */
]
var canProxy = function (input) {
  return (Array.isArray(input) || (typeof input === 'object' && input))
}
var getCached = function (target) {
  for (var i = 0; i < proxy_cache.length; i++) {
    if (proxy_cache[i].target === target || proxy_cache[i].value === target) {
      return proxy_cache[i]
    }
  }
  return false
}
var setCached = function (proxy) {
  proxy_cache.push(proxy)
  return proxy
}

var createProxy = module.exports = function (target, deep, parentProxy) {
  var cached = getCached(target)
  if (cached) {
    return cached
  }

  var proxy = setCached({
    target: target,
    value: null,
    tags: [],
    updateRelatedProxyTags: function () {
      for (var i = 0; i < proxy.tags.length; i++) {
        if (proxy.tags[i]._bindingsEnabled === false) continue
        proxy.tags[i].update()
      }
      if (parentProxy) {
        parentProxy.updateRelatedProxyTags()
      }
    }
  })

  if (Array.isArray(target)) {
    var array = target
    if (deep) {
      for (var i = 0; i < array.length; i++) {
        if (canProxy(array[i])) {
          array[i] = createProxy(array[i], deep, proxy).value
        }
      }
    }
    if (isProxyPolyfill) {
      var oPush = array.push
      var oSplice = array.splice
      array.push = function () {
        oPush.apply(this, arguments)
        proxy.updateRelatedProxyTags()
      }
      array.splice = function () {
        oSplice.apply(this, arguments)
        proxy.updateRelatedProxyTags()
      }
      proxy.value = array
    } else {
      proxy.value = new Proxy(array, {
        set: function (obj, prop, newval) {
          if (canProxy(newval) && deep) {
            newval = createProxy(newval, deep, proxy).value
          }
          obj[prop] = newval
          proxy.updateRelatedProxyTags()
          return true
        }
      })
    }
  } else {
    var object = target
    if (deep) {
      for (var key in object) {
        if (canProxy(object[key])) {
          object[key] = createProxy(object[key], deep, proxy).value
        }
      }
    }
    proxy.value = new Proxy(object, {
      set: function (obj, prop, newval) {
        if (canProxy(newval) && deep) {
          newval = createProxy(newval, deep, proxy).value
        }
        obj[prop] = newval
        proxy.updateRelatedProxyTags()
        return true
      }
    })
  }

  return proxy
}
