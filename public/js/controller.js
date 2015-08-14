'use strict';
var scotchTodo = angular.module('scotchTodo',[]);

scotchTodo.controller('mainController',function($scope,$http){
    $scope.formData = {};

    //因为这个没有绑定在事件里面，所以会自动执行
    $http.get('/api/todos')
        .success(function(data){
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data){
            console.log('Error:',data);
        });

    //绑定createTodo 方法
    $scope.createTodo = function(){
        alert('createTodo list ......');
        $http.post('/api/todos',$scope.formData)
            .success(function(data){
                $scope.todos = data;
            })
            .error(function(data){
                console.log('Error:',data);
            })
    };

    //绑定deleteTodo 方法
    $scope.deleteTodo = function(id){
        $http.delete('api/todos/'+id)
            .success(function(data){
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data){
                console.log('Error:',data);
            });
    }
});