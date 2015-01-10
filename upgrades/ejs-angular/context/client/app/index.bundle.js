'use strict';

require("../../../bower_components/angular/angular")
require("../../../bower_components/angular-route/angular-route")
require("../../../bower_components/angular-resource/angular-resource.js")

require("./controllers")
require("./services")
require("./directives")
require("./filters")


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngResource',
  'ngRoute',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'public/app/templates/landing.html', controller: 'LandingCtrl'});
  $routeProvider.otherwise({redirectTo: '/404'});
}]);