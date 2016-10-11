var _ = require('lodash')
module.exports = function (tag, directiveName) {
  return {
    preCreate: function (createElement, tagName, props, ...children) {
      // we have something like <input tag-value="user.firstName"/>
      if (props[directiveName]) {
        var path = props[directiveName]
        var value = _.get(tag, path)
        var existingOnChange = props['prop-onchange']
        var onchange = function (e) {
          _.set(tag, path, e.value)
          existingOnChange && existingOnChange(e)
        }
        props['prop-value'] = value
        props['prop-onchange'] = onchange
        delete props[directiveName]
      }
    }
  }
}
