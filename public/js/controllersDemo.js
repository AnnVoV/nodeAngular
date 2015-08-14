//定义phonecatControllers模块下的控制器

var phonecatControllers = angular.module('phonecatControllers',[]);

phonecatControllers.controller('PhoneListCtrl',function($scope,$http){
    $http.get('../api/phone.json').success(function(data){
        console.log(data);
        $scope.phones = data;
    });
    $scope.orderProp = 'price';
});

//ng-controller是可以由代码进行更改的
phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    console.log($routeParams.phoneId);
    $scope.phoneId = $routeParams.phoneId;
}]);

