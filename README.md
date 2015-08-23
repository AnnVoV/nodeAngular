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

### Angular 自定义Directive 指令
------------------------

参考：https://docs.angularjs.org/guide/directive

````
<html ng-app='myApp'>
<head>
    <title>Watch实例</title>
    <style>
        .row {
            margin:10px;
        }
    </style>
    <script src="js/comm/angular.js"></script>
</head>
<body>
    <!-- 要界定清楚界限 -->
    <div ng-controller="myController">
        <div my-customer/>
    </div>
    <div>no effect by hello-world</div>
    <script>
        var app = angular.module('myApp', []);
        //在控制器的基础上添加directive
        app.controller('myController', function($scope){
            $scope.customer = {
                name: 'Ann',
                words: 'Fighting,Girl!'
            };
        }).directive('myCustomer',function(){
            return {
                template: 'Name: {{customer.name}} Address: {{customer.words}}'
            };
        });
    </script>
</body>
</html>

````
------------------------
## [译] 理解AngularJs的$apply()与$digest() ——帮助理解数据绑定过程


【原文地址】http://www.sitepoint.com/understanding-angulars-apply-digest/

【作者】Sandeep Panda

【补充】Scope的特性：

* Scope提供$watch方法监视Model的变化
* Scope提供$apply方法传播Model的变化
* Scope可以继承，用来隔离不同的application components和属性访问权限
* Scope为Expressions的计算提供上下文
* 根作用域：每个Angular应用默认有一个`根作用域 $rootScope`，也就是说，如果用户未指定自己的控制器，变量就是直接挂在这个层级上的。作用域在一个Angular应用中是以树的形状体现的，根作用域位于最顶层，从它往下挂着各级作用域。每一级作用域上面挂着变量和方法，供所属的视图调用。

### $apply 与 $digest 探索

&nbsp;&nbsp;&nbsp;&nbsp;AngularJs 为我们提供了难以置信的便利，让我们减少了手动DOM操作的过程。数据绑定使得我们在视图层做的任何改变，都会在数据层得到自动更新。同样的，数据层的改变也会自动更新视图层。AngularJS是如何做到这样的数据双向绑定的呢？当我们写下{{aModel}}的时候，在屏幕背后Angular创建了在scope model之上的监听者，去监视数据的变化。这些watcher就像你在AnuglarJS中写过的类似下面的代码：

````
    $scope.$watch('aModel', function(newValue, oldValue) {
      //update the DOM with newValue
    });

````

&nbsp;&nbsp;&nbsp;&nbsp;第二个传入$watch() 中的参数被认为是一个监听方法，当aModel的值发生变化时，会触发该监听。对于我们自己而言我们很好理解这一过程，因为我们填的值发生了改变，但是对于Angular它是如何知道什么时候去触发监听方法的呢？换言之，AngularJs 是怎么知道aModel发生了变化了，要触发对应方法了？它是不是有一个方法去定期检查了是否scope model 的值发生了改变？好，是时候介绍一下 `$digest` 循环了。


&nbsp;&nbsp;&nbsp;&nbsp;$digest 循环是何时开始并且如何工作的？$digest循环起始于`$scope.$digest()`的调用。假设，你在scope model 里面注册了一个ng-click事件。AngularJs 会自动通过调用$scope.$digest()开启$digest循环。$digest循环的开启会触发Angular的watchers(监听者). 这些watchers 会检查是否scope model 中的`当前值与上次收集到的值有所不同`。这看起来似乎并不高效，甚至严重影响性能。但angular JS采用了一些比较巧妙的手段解决了这个问题（还没研究过，目前尚不明确）如果不同，会触发对应监听事件。除了ng-click 之外，还有其他的指令也会让你去更新你的model.(例如$http,$timeout等)，他们都会自动触发$digest 循环。


【补充： 主流的两种监听数据变化的方法】
&nbsp;&nbsp;&nbsp;&nbsp;一种是需要用特殊的对象，让所有的数据都只能通过调用对象的方法设置，而不是直接通过property指定。这样的话，所有的修改就可以被记录下来了，就知道什么时候页面需要更新了。这样做的弊端就是我们必须去继承一个特殊的对象。对于赋值也只能通过object.set('key', 'value')而不是object.key=value的方式。在框架中，像EmberJS和KnockoutJS就是这么干的（我没用过）。另一种就是angular JS采用的方式，在每一次Javascript代码执行序列执行结束后都去检查是否有数据的改变。

&nbsp;&nbsp;&nbsp;&nbsp;目前为止不错！但是，有一个小问题。在上面的案例中，Angular并没有直接直接调用$digest()这个方法，而是调用`scope.apply()方法`，是因为在scope.apply()方法里面，它会去调用scope.digest()方法。scope.apply()方法带一个函数或者一个表达式，然后执行它，最后调用scope.digest()方法去更新bindings或者watchers。

### 你该何时手动地去触发$apply()?

&nbsp;&nbsp;&nbsp;&nbsp;Angular帮我们自动去触发了$apply与$digest 循环，那么我们该何时自己手动处理呢？事实上，AngularJs 做了一件界定很清晰的事情。它将只对那些在AngularJs环境中的数据变化负责。（`我们几乎所有的代码都包在scope.apply()里面，像ng-click,http的回调`）如果我们去调用一个`不是由AngularJs库中方法创建的方法`则需要手动调用$apply()

````
    [html]
    <body ng-app="myApp">
      <div ng-controller="MessageController">
        Delayed Message: {{message}}
      </div>  
    </body>
    
    [Javascript]
    /* What happens without an $apply() */
    
    angular.module('myApp',[]).controller('MessageController',  function($scope) {
    
      $scope.getMessage = function() {
        setTimeout(function() {
          $scope.message = 'Fetched after 3 seconds';
          console.log('message:'+$scope.message);
        }, 2000);
      }
    
````
&nbsp;&nbsp;&nbsp;&nbsp;运行上面的代码，你会发现数据并没有更新，原因你也猜到了，我们需要手动调用$apply()方法。

````
    [Javascript]
    /* What happens with $apply */ 
angular.module('myApp',[]).controller('MessageController', function($scope) {
    
      $scope.getMessage = function() {
        setTimeout(function() {
          $scope.$apply(function() {
            //wrapped this within $apply
            $scope.message = 'Fetched after 3 seconds'; 
            console.log('message:' + $scope.message);
          });
        }, 2000);
      }
      
      $scope.getMessage();
    
    });
````
&nbsp;&nbsp;&nbsp;&nbsp;这次你再运行上面的代码，你会发现数据发生了更新，你会发现两次唯一的区别就是我们把我们的代码包在了$scope.$apply()中，它会自动触发$rootScope.$digest(). 去触发监听者对应的事件。

&nbsp;&nbsp;&nbsp;&nbsp;【注意】:你可以使用Angular自带的$timeout而不用使用setTimeout这样就不用手动调用apply()了。

### $digest 循环执行了多少次？
&nbsp;&nbsp;&nbsp;&nbsp;$digest 循环一旦执行，watchers就会执行去看是否scope model 的值发生了变化。如果发生了变化，那么对应监听的方法会被触发。那么这将会又导致一个新的疑问？假设监听方法又会改变scope model的值，那么AngularJS 会怎么处理？
&nbsp;&nbsp;&nbsp;&nbsp;答案是$digest 循环并不会只执行一遍。它会不断的重复执行去检查models的值有没有发生变化。$digest 循环会不断执行直到没有数据发生变化，或者其达到了循环的上限。这就是最基本的dirty checking(脏检查).`【补充：】脏检查策略被广泛应用在不同的应用中，游戏引擎，数据库应用，ORMs数据表等。下面有一张找到的补充图。`

![](http://gtms02.alicdn.com/tps/i2/TB1OvJWJXXXXXXxXpXX09q3TFXX-698-593.png)

【注意】：$digest最少也会执行两次，即使你并没有更改如何数据。因为它还要跑一轮去确保已经没有数据发生变化。

### 小结
&nbsp;&nbsp;&nbsp;&nbsp;我希望这篇文章让你理解了$apply与$digest.你要记住的一点是你要学会判断Angular是否能检测出你的变化，如果不能请手动调用$apply()方法


