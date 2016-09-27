var format = require('string-template')

var translateString = module.exports.t = function (value, placeholders) {
  return format(window.plasma.i18n.get(value), placeholders)
}

module.exports = function (tag) {
  var translateElements = function () {
    var elements = tag.root.querySelectorAll('[translate]')
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i]
      el.$originalHTML = el.$originalHTML || el.innerHTML.trim()
      el.innerHTML = window.plasma.i18n.get(el.$originalHTML)
    }
  }
  tag.translateElements = translateElements
  tag.t = translateString
  tag.on('mount', tag.translateElements)
  tag.on('update', tag.translateElements)
  tag.on('updated', tag.translateElements)
}

module.exports.t = translateString
