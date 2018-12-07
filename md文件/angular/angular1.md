## angualrjs简介

### 什么是angular

AngularJS 是一个为动态WEB应用设计的结构框架(MVC: model, view, controller)，提供给大家一种新的开发应用方式，这种方式可以让你扩展HTML的语法，以弥补在构建动态WEB应用时静态文本的不足，从而在web应用程序中使用HTML声明动态内容。

### 为什么要用它

​	•	前后端分离，后端只提供数据接口，路由，模板渲染等都在前端完成

​	•	html和js分离,展示和逻辑分离

​	•	减少JS代码,减少DOM元素查找，事件绑定等代码

​	•	适合API开发



### 教程资料

[菜鸟教程](http://www.runoob.com/angularjs/angularjs-tutorial.html)

[github](https://github.com/angular/angular.js)



## 使用angularjs

### 引入angularjs

跟使用jquery类似，只需要使用一个script标签引入它就可以了

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<script src="angular.min.js" type="text/javascript" charset="utf-8"></script>
	</head>
	<body ng-app="">
		<div>{{3+2}}</div>
		<div>
			{{3+2}}
		</div>
	</body>
</html>
```

ng-app指令来标明一个AngularJS应用程序，并通过AngularJS完成自动初始化应用和标记应用根作用域，同时载入和指令内容相关的模块，并通过拥有ng-app指令的标签为根节点开始编译其中的DOM。

引用方法很简单，如下所示：

<div ng-app>

</div>    

如上引用，一个AngularJS应用程序初始化就完成了并标记了作用域，也就是div元素就是AngularJS应用程序的”所有者”，在它里面的指令也就会被Angular编译器所编译、解析了。



### 数据绑定

单向数据绑定:    应用程序数据->视图(m =>  v)

在AngularJS中，只需要使用**ng-model指令就可以把应用程序数据绑定到HTML元素，更改html元素内容也可以反映到应用程序数据, 实现model和view的双向绑定。**

如下示例，使用ng-model指令对数据进行绑定。

```html
<body ng-app="">
  <input type="text" ng-model="name" />
  <div>
    {{name}}
  </div>
</body>
```

ng-model把相关处理事件绑定到指定标签上，这样我们就可以不用在手工处理相关事件(比如change等)的条件下完成对数据的展现需求。

以上介绍了ng-model的单向绑定(view->model)后面控制器我们会用到它的双向绑定功能。

ng-model原理

​	1.	angular加载完成之后会启动，首先找 ng-app指令

​	2.	找到后认为ng-app里面的所有的内容都归angular来管

​	3.	找子层标签里所有的指令，然后就可以找到ng-model

​	4.	找到后会生成数据模型，然后挂在根作用域上面。

​	5.	然后下面所有的标签都可以读取ng-model的值。



### 表达式

ng-init指令初始化应用程序数据，也就是为AngularJS应用程序定义初始值，通常情况下，我们会使用一个控制器或模块来代替它，后面我们会介绍有关控制器和模块的知识。不能直接添加多行代码

```html
<body ng-app="" ng-init="num1=0; num2=0;">
		<input type="text" ng-model="num1" />
		<input type="text" ng-model="num2" />
		<div>
			{{num1*num2}}
		</div>
	</body>
```

案例2,数组：

```html
<body ng-app="" ng-init="arr=['3','5','9']">
  <div>
    {{arr[2]}}
    <!--<span ng-bind="arr[2]"></span>-->
  </div>
</body>
```

案例3，针对对象的：

```html
<body ng-app="" ng-init="person={name1:'hello',name2:'tangcaiye'};">
  <input type="text" ng-model="person.name1" />
  <input type="text" ng-model="person.name2" />
  <div>
    {{person.name1 +" "+ person.name2}}
  </div>
</body>
```

数据绑定4-配合`ng-class`：

ng-class是AngularJS预设的一个指令，用于动态自定义dom元素的css class name

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<style type="text/css">
			.active{
				color: red;
			}
			.inactive{
				color: green;
			}
		</style>
		<script src="angular.min.js" type="text/javascript" charset="utf-8"></script>
	</head>
	<body ng-app="" ng-init="isActive=true">
		<input type="text" ng-model="name1" />
		<input type="text" ng-model="name2" />
		<div ng-class="{true:'active',false:'inactive'}[isActive]">
			{{name1 +" "+ name2}}
		</div>
	</body>	
</html>
```

## 常用指令

### ng-bind

指令ng-bind和AngularJS表达式{{}}有异曲同工之妙，但不同之处就在于ng-bind是**在angular解析渲染完毕后才将数据显示出来的**。

如下使用ng-bind指令绑定应用程序数据。

```html
<body ng-app="" ng-init="arr=[3,5,9]">
    <!--{{arr[0]}}-->
    <span ng-bind="arr[0]"></span>
</body>
```

PS：使用花括号语法时，因为浏览器需要首先加载页面，渲染它，然后AngularJS才能把它解析成你期望看到的内容，所以**对于首个页面中的数据绑定操作，建议采用ng-bind，以避免其未被渲染的模板被用户看到**。

### ng-click

AngularJS也有自己的HTML事件指令,比如说通过ng-click定义一个AngularJS单击事件。

对按钮、链接等，我们都可以用ng-click指令属性来实现绑定，如下简单示例：

```html
<!--初始化click为false-->
<body ng-app="" ng-init="click=false">
    <!--在点击的时候更改click为相反的值-->
    <button ng-click="click=!click">点击切换</button>
    <!--ng-show:接受一个bol值,如果true为显示,false为隐藏-->
    <div ng-show="click">我是一些内容</div>
</body>
```

### ng-mouseover、ng-mouseout

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script type="text/javascript" src="js/angular.min.js"></script>
    <style type="text/css">
        .bd{
            border: 5px solid red;
        }
    </style>
</head>
<!--初始化click为false-->
<body ng-app="" ng-init="click=false; border=false;">
    <!--在点击的时候更改click为相反的值-->
    <button ng-click="click=!click">点击切换</button>
    <!--ng-show:接受一个bol值,如果true为显示,false为隐藏-->
    <div ng-show="click">我是一些内容</div>
    <input type="text" ng-mouseout="border=false" ng-mouseover="border=true" class="{{border?'bd':''}}">
</body>
</html>
```



### ng-repeat

ng-repeat指令，遍历一个数据集合中的每个数据元素，并且加载HTML模版把数据渲染出来(**1.x无法渲染包含重复元素的数组**)，当我们要向HTML容器节点中添加更多类似DOM元素的时候，使用ng-repeat是再好不过了。

ng-repeat指令对于集合中(数组中)的每一项都会渲染一次HTML元素。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        li:nth-child(2n){
            background-color: #ccc;
        }
    </style>
    <script type="text/javascript" src="js/angular.min.js"></script>
</head>
<body ng-app="" ng-init="arr=[3,5,9,15]">
<ul>
    <li ng-repeat="x in arr">值是:{{x}}</li>
</ul>
</body>
</html>
```

循环数组对象

```html
<body ng-app="" ng-init="arr=[{'user':'zhangsan','pass':'12345'},{'user':'lisi','pass':'54321'}]">
  <ul>
      <li ng-repeat="x in arr">
          <span>用户名:{{x.user}}</span>
          <span>密码:{{x.pass}}</span>
      </li>
  </ul>
</body>
```



### 在js文件中初始化-scope：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>

    </style>
    <script type="text/javascript" src="js/angular.min.js"></script>
</head>
<body ng-app="MyApp">
<ul ng-controller="MyCtrl">
    <li ng-repeat="obj in arr">
        <span>键名是:{{obj.user}}</span>
        <span>值是:{{obj.pass}}</span>
    </li>
</ul>
</body>
<script type="text/javascript">
    //创建一个模块叫MyApp
    angular.module("MyApp",[]);
    //获取MyApp这个模块并添加controler
    angular.module("MyApp").controller("MyCtrl", function ($scope) {
        $scope.arr=[{'user':'zhangsan','pass':'12345'},{'user':'lisi','pass':'54321'}];
    });
</script>
</html>
```

AngularJS控制器控制AngularJS应用程序的数据，是常规的JavaScript对象。

ng-controller指令就是用来定义应用程序控制器的，并且同时创建了一个新的作用域关联到相应的DOM元素上。

所谓作用域就是一个指向应用模型的对象，它是表达式的执行环境，作用域有层次结构，这个层次和相应的DOM几乎是一样的，作用域能监控表达式和传递事件并且可以从父作用域继承属性。

每一个AngularJS应用都有一个绝对的根作用域。但也可能有多个子作用域。 一个应用可以有多个作用域，因为有一些指令会生成新的子作用域，当新作用域被创建的时候，他们会被当成子作用域添加到父作用域下，这使得作用域会变成一个和相应DOM结构一个的树状结构。

$scope就是把一个DOM元素连结到控制器上的对象，它提供一个绑定到DOM元素(以及其子元素)上的执行上下文。它也是一个JavaScript对象，指向应用程序作用域内的所有HTML元素和执行上下文。

拥有了$scope，我们就可以操作作用域内任何我们想要获取的对象数据。



### 实例

tab切换

留言板&todolist