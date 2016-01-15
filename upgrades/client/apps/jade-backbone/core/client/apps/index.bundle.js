window.$ = require('jquery')
window.Backbone = require('backbone')
window.Backbone.$ = window.$

var IndexView = require('./views')

window.$(function () {
  console.log('hello dom ready')
  var indexView = new IndexView({el: window.$('body')})
  indexView.render()
})
