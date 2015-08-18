'use strict';

var touristListApp = angular.module('touristListApp',[
    'ngRoute',
    'touristListControllers'
]);

touristListApp.config(['$routeProvider',
  function($routeProvider){
    $routeProvider.
      when('/list',{
        templateUrl: 'partials/travel-list.html',
        controller: 'touristListCtrl'
      }).
      when('/list/:id',{
        templateUrl: 'partials/travel-detail.html',
        controller: 'touristDetailCtrl'
      }).
      otherwise({
        redirectTo: '/list'
      });
  }
]);

