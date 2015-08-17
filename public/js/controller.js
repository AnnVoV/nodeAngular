'use strict';

var touristListControllers = angular.module('touristListControllers',[]);

touristListControllers.controller('touristListCtrl',function($scope,$http){
    $http.get('/api/list')
        .success(function(data){
            console.log(data);
            $scope.lists = data;
        })
        .error(function(err){
            console.log(err);
        });
});

touristListControllers.controller('touristDetailCtrl',function($scope,$http,$routeParams){
    $scope.data = 'this is a test';
    console.log($routeParams.id);

    $http.get('/api/detail')
         .success(function(data){
            console.log(data);
         })
         .error(function(err){
            console.log(err);
         });
        
});

