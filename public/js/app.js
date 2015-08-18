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

touristListApp.directive('helloWorld', function() {
  return {
      restrict: 'AE',
      replace: 'true',
      template: '<h3>Hello World!!</h3>'
  };
});