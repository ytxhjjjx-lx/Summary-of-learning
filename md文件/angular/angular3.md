## 服务

AngularJS中的服务指的是一些函数或对象，它们可以在整个应用中持有某些行为和状态。每个服务都只有一个实例，无论从应用中何处访问该服务，指向的都是同一个对象实例。

控制器和服务的应用场景：

- 控制器

- - 1、表现层逻辑
  - 2、和视图直接相关
  - 3、驱动UI
  - 4、一次性的
  - 5、决定如何获取数据，显示哪些数据，如何进行用户交互，展示UI样式


- 服务

- - 1、业务层逻辑
  - 2、独立于页面
  - 3、驱动应用
  - 4、可重用的
  - 5、决定如何调用服务端接口，常见的验证逻辑，应用级别的数据存储，可重用的业务逻辑



依赖注入（Dependency Injection）简称DI：

- 任何已有的angularJS服务（包括内置服务和自定义服务）都能通过将它定义成为一种依赖（Dependency）来注入到其他服务、指令、过滤器或控制器中


- 非依赖注入形式

- - function loadData () {  var $http = new HttpService();  return $http.get(‘xxx/url’);}


- 依赖注入形式

- - loadData ($http) {   return $http.get(‘xxx/url’);}


- 依赖注入的好处

- - 在函数执行之前，显式声明我们需要引入哪些东西



定时器服务：

- $timeout

- - $timeout(function () {
  - ​    $scope.value = '哈哈哈哈';
  - }, 2000);


- $interval

- - $interval(function () {
  - ​    $scope.value = '哈哈哈哈';
  - }, 2000);


- 和JS定时器的区别

- - 取消方式

  - - $timeout.cancel(timerId)
    - $interval.cancel(timerId)

  - 内部实现了封装了特殊功能,例如：支持双向绑定


- [$http](http://www.angularjs.net.cn/api/105.html)

- - 发起网络请求，获取数据

  - - $http.get("[http://www.vrserver.applinzi.com/aixianfeng/apihome.php](http://www.vrserver.applinzi.com/aixianfeng/apihome.php)").success(function (data) {
    - ​                $scope.data = data;
    - ​                console.log(data);
    - ​            });




案例1-get：

```html
<!DOCTYPE html>
<html ng-app="myApp">
	<head>
		<meta charset="UTF-8">
		<title></title>
		<script type="text/javascript" src="angular.min.js" ></script>
	</head>
	<body ng-controller="myCtrl">
		<h1>搜索用户</h1>
		<input type="text" ng-model="userName" placeholder="搜索用户。。" />
		<ul>
			<li ng-repeat="item in users | filter:userName">
				{{ item.username }}
			</li>
		</ul>
	</body>
	<script type="text/javascript">
		var app = angular.module('myApp', []);
		app.controller("myCtrl",function ($scope,$http){

			$http.get("jsonUserList.json").
				success(function (resultData){
					$scope.users = resultData.users;
				})
		})
	</script>
</html>
```

案例2-jsonp:

```html
<!DOCTYPE html>
<html ng-app="myApp">
	<head>
		<meta charset="UTF-8">
		<title></title>
		<script type="text/javascript" src="angular.min.js" ></script>
	</head>
	<body ng-controller="myCtrl">
		<h1>百度搜索</h1>
		<input type="text" ng-model="key" placeholder="百度一下" />
		<ul>
			<li ng-repeat="item in words">
				{{ item }}
			</li>
		</ul>
	</body>
	<script type="text/javascript">
		var app = angular.module('myApp', []);
		app.controller("myCtrl",function ($scope,$http){

			/*
			https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=html
			*/
			$http.jsonp("https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=html&cb=JSON_CALLBACK").
				success(function (resultData){
					$scope.words = resultData.s;
				})
		})
	</script>
</html>
```

$scope.$watch("监听的属性"，回调函数):监听属性的变化

```javascript
$scope.$watch("key",function (newModel){
				$http.jsonp("https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+newModel+"&cb=JSON_CALLBACK").
					success(function (resultData){
						$scope.words = resultData.s;
					})
			})
```