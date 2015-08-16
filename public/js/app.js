'use strict';
//我们定义我们的phonecatApp 依赖ngRoute与phoneecatControllers
//phonecatApp 是总的模块定义

//后面的数组是依赖的phonecatApp 依赖的模块
/*var phonecatApp = angular.module('phonecatApp', [
  'ngRoute',
  'phonecatControllers'
]);

phonecatApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/phones', {
        templateUrl: 'partials/phone-list.html',
        controller: 'PhoneListCtrl'
      }).
      when('/phones/:phoneId', {
        templateUrl: 'partials/phone-detail.html',
        controller: 'PhoneDetailCtrl'
      }).
      otherwise({
        redirectTo: '/phones'
      });
}]);*/

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