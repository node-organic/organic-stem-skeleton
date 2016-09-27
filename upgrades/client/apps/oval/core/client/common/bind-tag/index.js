var createProxy = require('./create-proxy')
var _ = require('lodash')

module.exports = function (tag) {
  var modelBindCache = []
  var tagProxies = []
  var bindModelsHandler

  var addProxyToTag = function (proxy) {
    if (tagProxies.indexOf(proxy) === -1) {
      tagProxies.push(proxy)
    }
  }

  tag.disableBindings = function () {
    tag._bindingsEnabled = false
  }
  tag.enableBindings = function () {
    tag._bindingsEnabled = true
    tag.update()
  }

  tag.bind = function (propertyName, object, deep, update) {
    if (typeof object !== 'object') throw new Error(object + ' ' + typeof object + ' is not object')
    if (typeof deep === 'undefined') deep = true
    if (typeof update === 'undefined') update = true
    var proxy = createProxy(object, deep)
    if (update) {
      if (proxy.tags.indexOf(tag) === -1) {
        proxy.tags.push(tag)
      }
    }
    tag[propertyName] = proxy.value
    addProxyToTag(proxy)
  }

  var getElementsWithModels = function (tag) {
    var elements = tag.root.querySelectorAll('[tag-value]')
    var result = []
    for (var i = 0; i < elements.length; i++) {
      if (elements[i].attributes['tag-value'].value.split('#')[0] === tag.id.toString()) {
        result.push(elements[i])
      }
    }
    return result
  }

  var bindElementChangeToModel = function (el) {
    var value
    var modelPath = el.attributes['tag-value'].value.split('#')[1]
    var handler = function (e) {
      _.set(tag, modelPath, e.target.value)
    }
    el.addEventListener('change', handler)
    if (el.attributes['multiple']) {
      value = _.get(tag, modelPath) || []
      for (var i = 0; i < el.children.length; i++) {
        var option = el.children[i]
        if (value.indexOf(option.value) !== -1) {
          option.selected = true
        }
      }
    } else {
      value = _.get(tag, modelPath)
      if (typeof value === 'undefined' &&
        ['button', 'radio', 'checkbox'].indexOf(el.type) === -1 &&
        ['INPUT', 'TEXTAREA'].indexOf(el.nodeName) !== -1) {
        value = null
      }
      el.value = value
    }
    modelBindCache.push({
      el: el,
      fn: handler
    })
  }

  var bindModels = function () {
    if (!bindModelsHandler) {
      bindModelsHandler = function () {
        var i = 0
        for (i = 0; i < modelBindCache.length; i++) {
          var pair = modelBindCache[i]
          pair.el.removeEventListener('change', pair.fn)
        }
        modelBindCache = []
        var elementsWithModels = getElementsWithModels(tag)
        for (i = 0; i < elementsWithModels.length; i++) {
          bindElementChangeToModel(elementsWithModels[i])
        }
      }
      tag.on('updated', bindModelsHandler)
    }
  }

  tag.bindProp = function (modelPath) {
    bindModels()
    return tag.id + '#' + modelPath
  }

  tag.on('unmount', function () {
    for (var i = 0; i < tagProxies.length; i++) {
      var proxy = tagProxies[i]
      var tagIndex = proxy.tags.indexOf(tag)
      if (tagIndex !== -1) {
        proxy.tags.splice(tagIndex, 1)
      }
    }
    if (bindModelsHandler) {
      tag.off('mount', bindModelsHandler)
      tag.off('updated', bindModelsHandler)
      bindModelsHandler = null
    }
  })
}
