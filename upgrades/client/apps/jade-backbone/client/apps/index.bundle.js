$ = require("jquery")
Backbone = require("backbone")
Backbone.$ = $

var IndexView = require("./views")

$(function(){
  console.log("hello dom ready")
  var indexView = new IndexView({el: $("body")})
  indexView.render()
})
