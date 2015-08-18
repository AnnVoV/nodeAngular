### AngularJS http 请求
------------------------

基本的操作由 $http 服务提供。它的使用很简单，提供一些描述请求的参数，请求就出去了，然后返回一个扩充了 success 方法和 error 方法的 promise 对象（下节介绍），你可以在这个对象中添加需要的回调函数。

````
    var TestCtrl = function($scope, $http){
    var p = $http({
      method: 'GET',
      url: '/json'
    });
    p.success(function(response, status, headers, config){
        $scope.name = response.name;
    });
  }

````

$http 接受的配置项有：

* method 方法
* url 路径
* params GET请求的参数
* data post请求的参数
* headers 头
* transformRequest 请求预处理函数
* transformResponse 响应预处理函数
* cache 缓存
* timeout 超时毫秒，超时的请求会被取消
* withCredentials 跨域安全策略的一个东西