## 过滤器

过滤器可以使用一个管道字符（|）添加到表达式和指令中。

AngularJS 过滤器可用于转换数据：

**内置过滤器**

**描述**

currency

格式化数字为货币格式。

filter

从数组项中选择一个子集。

lowercase

格式化字符串为小写。

orderBy

根据某个表达式排列数组。

uppercase

格式化字符串为大写。



### 实例1-货币：

```html
<body ng-app="myApp">
  <div ng-controller="myCtrl">
    <span>相乘</span>
    <input type="text" ng-model="num1" />
    <input type="text" ng-model="num2" /><br />
    <!--currency:"￥" 中文-->
    结果为：{{myFn() | currency}}
  </div>
</body>
```

```javascript
var app = angular.module("myApp",[]);
app.controller("myCtrl",function ($scope){
	
	$scope.num1=5;
	$scope.num2=10;
	$scope.myFn = function (){
		return $scope.num1*$scope.num2;
	}
});
```

### 实例2-大小写转换

```html
<div>
  <!--{{'HelloWorld' | lowercase}}-->
  {{'HelloWorld' | uppercase}}
</div>
```

### 实例3-筛选

```html
<body ng-app="" ng-init="arr=['tangcaiye','zhangsan','lisi']">
  搜索：<input type="text" ng-model="name" />
  <ul>
    <li ng-repeat="x in arr | filter:name">{{x}}</li>
  </ul>
</body>	
```

### 实例4-筛选加排序

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<script src="angular.min.js" type="text/javascript" charset="utf-8"></script>
	</head>
	<body ng-app="myApp">
		<div ng-controller="myCtrl">
			<ul>
				<li ng-repeat="x in friends |filter:'a' | orderBy:order:true">{{x}}</li>
			</ul>
		</div>
	</body>	
	<script type="text/javascript">
		var app = angular.module("myApp",[]);
		app.controller("myCtrl",function ($scope){
			
			$scope.friends = [{name:'John', phone:'555-1212', age:21},
           {name:'Mary', phone:'555-9876', age:19},
           {name:'Mike', phone:'555-4321', age:10},
           {name:'Adam', phone:'555-5678', age:35},
           {name:'Julie', phone:'555-8765', age:29}];
           $scope.order="phone";
		});
	</script>	
</html>

```

### 自定义过滤器

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<script src="angular.min.js" type="text/javascript" charset="utf-8"></script>
	</head>
	<body ng-app="myApp">
		<div ng-controller="myCtrl">
			<ul>
				<li ng-repeat="x in notes | favoriteList">{{x.text}}</li>
			</ul>
		</div>
	</body>	
	<script type="text/javascript">
		var app = angular.module("myApp",[]);
		app.controller("myCtrl",function ($scope){
			
			$scope.notes = [{
				text:"文章1",
				favorite:false
			},{
				text:"文章2",
				favorite:true
			},{
				text:"文章3",
				favorite:false
			}
			];
		});
		app.filter('favoriteList',function (){
			return function (arr){
				return arr.filter(function (obj){
					return obj.favorite
				})
			}
		})
	</script>	
</html>
```

### filter

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<script src="angular.min.js" type="text/javascript" charset="utf-8"></script>
	</head>
	<body ng-app="myApp">
		<div ng-controller="myCtrl">
			<ul>
				<li ng-repeat="x in notes | filter:favoriteList">{{x.text}}</li>
			</ul>
		</div>
	</body>	
	<script type="text/javascript">
		var app = angular.module("myApp",[]);
		app.controller("myCtrl",function ($scope){
			
			$scope.notes = [{
				text:"文章1",
				favorite:false
			},{
				text:"文章2",
				favorite:true
			},{
				text:"文章3",
				favorite:true
			}
			];
			$scope.favoriteList = function (item){
				return item.favorite;
			}
		});
		/*app.filter('favoriteList',function (){
			return function (arr){
				return arr.filter(function (obj){
					return obj.favorite
				})
			}
		})*/
	</script>	
</html>
```
