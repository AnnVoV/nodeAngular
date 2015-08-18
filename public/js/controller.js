'use strict';
var touristListControllers = angular.module('touristListControllers',[]);


touristListControllers.controller('testCtrl', function($scope, $http){

}).directive('helloWorld', function(){
    return {
        template: '<div style="color:{{color}}">Miss Mum</div>',
        link: function(scope, elem, attrs){
            elem.bind('click', function(){
                elem.css('background-color', '#ddd');
                scope.$apply(function(){
                    scope.color='#ddd';
                });
            });

            elem.bind('mouseover', function(){
                elem.css('cursor', 'pointer');
            })
        }
    }
});

/*touristListControllers.controller('testCtrl', function($scope,$http){
    $scope.name = 'ann';
    $scope.word = 'miss U';
}).directive('helloWord', function(){
    return {
        restrict: 'AE',
        replace: true,
        template: '<p style="color:blue}">Hello World</p>',
        link: function(scope, elem, attrs){
            elem.bind('click', function(){
                elem.css('background-color', 'yellow');
                //为什么这里要用$apply
                scope.$apply( function(){
                    scope.color = 'white';
                });
            });

            elem.bind('mouseover', function(){
                elem.css('cursor', 'pointer');
            });
        }
    };
})*/


touristListControllers.controller('touristListCtrl', function($scope,$http){
    $http.get('/api/list')
        .success(function(data){
            $scope.lists = data;
        })
        .error(function(err){
            console.log(err);
        });
});

touristListControllers.controller('touristDetailCtrl', function($scope,$http,$routeParams){
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

