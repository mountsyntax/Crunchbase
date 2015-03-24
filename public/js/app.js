'use strict';

/* App Module */
var crunchbaseApp = angular.module('crunchbaseApp', [
  'ngRoute',
  'crunchbase.controllers',
  'crunchbase.directives'
]);

crunchbaseApp.config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.
      when('/orgs', {
        templateUrl: 'partials/orgs.html',
        controller: 'OrgsListCtrl'
      }).
      when('/organization/:orgid', {
        templateUrl: 'partials/orgdetails.html',
        controller: 'OrgDetailsCtrl'
      }).
      when('/people', {
        templateUrl: 'partials/people.html',
        controller: 'PeopleListCtrl'
      }).
      when('/person/:personid', {
        templateUrl: 'partials/persondetails.html',
        controller: 'PersonDetailsCtrl'
      }).
      when('/products', {
        templateUrl: 'partials/products.html',
        controller: 'ProductListCtrl'
      }).
      when('/product/:productid', {
        templateUrl: 'partials/productdetails.html',
        controller: 'ProductDetailsCtrl'
      }).
      otherwise({
        redirectTo: '/orgs'
      });
  }
]);
