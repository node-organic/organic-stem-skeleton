'use strict';

require("../../bower_components/angular/angular")
require("../../bower_components/angular-route/angular-route")
require("../../bower_components/angular-resource/angular-resource.js")

require("./app/controllers")
require("./app/services")
require("./app/directives")
require("./app/filters")


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngResource',
  'ngRoute',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'public/templates/landing.html', controller: 'LandingCtrl'});
  $routeProvider.otherwise({redirectTo: '/404'});
}]);