'use strict';
var touristListControllers = angular.module('touristListControllers',[]);

touristListControllers.controller('touristListCtrl',function($scope,$http){
    $http.get('/api/list')
        .success(function(data){
            $scope.lists = data;
        })
        .error(function(err){
            console.log(err);
        });
});

touristListControllers.controller('touristDetailCtrl',function($scope,$http,$routeParams){
    var listId = $routeParams.id;
    console.log(listId);

    $http.get('/api/detail?listId='+listId)
         .success(function(data){
            console.log('callbackdata');
            console.log(data);
            for(var key in data){
                $scope[key] = data[key];
            }
         })
         .error(function(err){
            console.log('error:');
            console.log(err);
         });
});

