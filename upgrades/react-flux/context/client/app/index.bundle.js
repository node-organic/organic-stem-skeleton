import React from "react"
import $ from "jquery-browserify"
import Application from "./components/Application"

$(function(){
  React.render( <Application/>, document.body);
})