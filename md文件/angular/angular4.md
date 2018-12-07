## 前端路由

### 什么是前端路由（SPA）

根据不同的地址跳转到不同的页面，提到前端路由就不得不提SPA单页应用，单页面应用就是视觉感觉是页面的切换，但页面其实一直没有刷新，我们是通过js来让页面看起来好像是跳转到了另外一个页面。很多时候项目文件中也只有一个`.html`文件。不需要跟服务器频繁的进行交互，只需要通过ajax来在切换的时候获取最新的数据，而不需要把整个页面都重新加载。而前端路由就是也是切换浏览器地址，但确实通过js来控制切换的

- 通过AngularJS可以实现SPA


- AngularJS路由允许我们通过不同的URL访问不同的内容


- 解释

- - [http://localhost:8080/note?wdd#/first](http://localhost:8080:/note#/first)
  - 网址中#后面的内容如果没有被angular程序处理，会被浏览器所忽略掉，不影响网页的访问。



### 使用

- 1、引入angluar-route.js文件


- 2、包含ngRoute模块作为主应用模块的依赖模块

- - `angular.module('myApp', ['ngRoute'])`


- 3、使用ng-view指令

- - <div ng-view></div>

- 4、配置$routeProvider, AngularJS的$routeProvider服务用来提供路由规则

```javascript
app.config(['$routeProvider’, function ($routeProvider) {
	$routeProvider
	.when('/home', {
		templateUrl : './views/home.html',
	})

	.when('/cart', {
		templateUrl : './views/cart.html'
	})
	
	.when('/mine', {
		templateUrl : './views/mine.html',
		controller : "mineCtrl"
	})

	.otherwise({
		redirectTo : '/home'
	})
}])
```

实例一：

```html
<!DOCTYPE html>
<html lang="en" ng-app="myApp">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<script type="text/javascript" src="js/angular.min.js"></script>
	<script type="text/javascript" src="js/angular-route.js"></script>
</head>
<body>
	我是index.html中的内容
	<div ng-view></div>
	<div>
		<a href="#/home">首页</a>
		<a href="#/cart">购物车</a>
		<a href="#/mine">我的</a>
	</div>
</body>
<script type="text/javascript">
	var app = angular.module('myApp', ['ngRoute']);
	app.config(["$routeProvider",function ($routeProvider){
		$routeProvider
			.when('/home',{
				//	template : '<h1>首页</h1>'
				templateUrl : './view/home.html',
				//给当前这个view配置一个控制器（自动就会管理，不需要在view上
				//写ng-controller）
				//如果想使用别名方式定义控制器，可以加入as 别名即可
				controller : 'HomeCtrl as homeCtrl'
			})
			.when('/cart', {
//				template : '<h1>购物车</h1>'
				templateUrl : './view/cart.html',
				controller : 'CartCtrl'
			})
			.when('/mine', {
//				template : '<h1>我的</h1>'
				templateUrl : './view/mine.html',
				controller : 'MineCtrl'
			})
			//其他
			.otherwise({
				redirectTo : '/home'
			})
	}])
	.controller('HomeCtrl', ['$scope', 
		function ($scope) {
			

	}])
	.controller('CartCtrl', ['$scope', 
		function ($scope) {
			

	}])
	.controller('MineCtrl', ['$scope', 
		function ($scope) {
			

	}])
</script>
</html>
```



自定义服务，实现共享数据和方法(状态和行为),    另一种方式使用$rootScope

```javascript

	app.factory("UserService",[function (){

		var userList = [
			{ 'userId' : 1001, userName : '李达康', userAge : 18},
			{ 'userId' : 1002, userName : '高玉良', userAge : 20},
			{ 'userId' : 1003, userName : '祁同伟', userAge : 16},
			{ 'userId' : 1004, userName : '侯亮平', userAge : 22},
			{ 'userId' : 1005, userName : '白百何', userAge : 33}
		];

		return {
			// 获取所有的用户数据
			getUserList: userList,
			// 根据id返回对应的数据
			getUserInfDetail:function (uid){

				// 1003
				for (var i=0; i<userList.length; i++){

					if (userList[i].userId == uid){
						return userList[i];
					}
				}

				return null;
			}
		}
	}])
```

动态加载css,使用`angular-css.js`

声明依赖：

```javascript
var app = angular.module("myApp",["angularCSS"]);
```

使用：

```javascript
controller("HomeCtrl",["$scope","$css","UserService",function ($scope,$css,UserService){

		$scope.pageName = "我是首页";

		$scope.userList = UserService.getUserList;

		// 将一个css文件作为一个模块进行加载
		$css.add("./css/home.css");
}])
```



### 详情页隐藏tabBar

```javascript
// run->运行，angular加载完成后就会调用这个run方法,run方法是做一些初始化的操作
// $scope->控制器的作用域，用于连接数据和view视图,$rootScope-》用于连接控制器于控制器
app.run(["$rootScope","$location",function ($rootScope,$location){

	// $locationChangeSuccess事件->在当浏览器地址发生改变的时候触发
	$rootScope.$on("$locationChangeSuccess",function (){

		// console.log($location.path());
		if ($location.path().indexOf("userDetail") !== -1){
			$rootScope.tabBarBol = false;
		}else{
			$rootScope.tabBarBol = true;
		}
	});
}]);
```

