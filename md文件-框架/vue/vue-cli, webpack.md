# vue第三节课

## vue-cli

### 简介及安装

vue-cli是官方提供的一个脚手架工具(帮组写好基础代码).可以**快速生成一个vue的项目模板**

[github地址](https://github.com/vuejs/vue-cli)

主要的功能：

* 规范的目录结构
* 本地调试
* 代码部署
* 热加载
* 单元测试

vue-cli的优势：

* 成熟的vue项目的架构设计
* **本地测试服务器**(基于Node环境)
* 集成打包上线

环境要求

* nodejs>4.0
* git
* 能够使用命令行的终端

安装流程：

如果没有装cnpm可以使用`npm install cnpm -g`安装

或者也可以使用：

`npm install --registry=https://registry.npm.taobao.org`

安装vue-cli到全局

`cnpm install vue-cli -g`安装到全局

也可以通过`vue list`来查看所有可以使用的模板



vue-cli安装成功以后`vue init webpack vuecli`（项目名称）

- `webpack`是vue-cli的模板
- `vuecli`是项目名称
- 然后配置信息
- 进入目录执行`cnpm isntall`安装依赖
- `npm run dev`运行项目

### vue build(打包)

`Runtime+Compiler:recommended for most users`:建议大多数用户

`Runtime-only`：相比上一种少了6kb，因为它少了模板编译的过程，是使用了webpack的`vue-loader`，但必须依赖`.vue`文件的开发,当然因为`.vue`是个人推荐的开发方式，所以可以使用这种，少6kb的大小

### 目录文件介绍

<img src="http://i4.buimg.com/567571/60cdfa675f15418a.jpg" width="200">

* `build`和`config`是webpack的配置文件
* node_modules中存放的是`npm install`安装的文件**依赖**代码库
* `src`文件是存放的是**项目源码**
* `static`存放的是**第三方的静态资源**，里面只有`.gitkeep`这个文件的意思是当这个目录为空也是可以提交git代码仓库里，如果没有这个文件git会忽略这个目录
* `.babelrc`这个文件是**`babel`的一些配置**,主要就是用于将es6的代码转成es5的,详细介绍：[babel](http://www.ruanyifeng.com/blog/2016/01/babel.html)
* `.editorconfig`是编辑器的一些配置
* `.gitignore`用于向git声明需要忽略提交的文件
* `.postcssrc.js`这个文件是**postCSS的配置文件**，postCSS是一款通过JS插件来转换CSS的工具，这些插件能帮你校验你的CSS代码、转换未来的CSS语法、支持变量和混写、以及内联图片等等，其中[自动前缀](https://github.com/postcss/autoprefixer)插件是PostCSS最受欢迎预处理器之一。默认就配置使用了`autoprefixer`也就是自动前缀的这个插件
* `index.html`就是入口的html文件，在编译打包过程中会将资源文件插入到这个html文件中
* `package.json`**项目的配置文件**，这个文件中是我们在初始化`vue-cli`的时候填入的信息：
  * 最重要的就是里面的`scripts`属性，表示的是我们可以**执行的一些命令**,比如`npm run dev`就是执行的`node build/dev-server.js`这个命令，然后`npm run build`就是执行的`node build/build.js`也就是打包的操作，我们也自己在`scripts`中去配置一些脚本
  * `dependencies`里面放的项目**生产环境的一些依赖**，然后在安装一些模块的时候可以通过`--save`保存到这个属性下，比如要使用`vue-router`就可以使用`npm install vue-router --save`(-S)
  * `devDependencies`里面放的编译过程中的一些依赖，在最后打包的时候不存在, 开发环境的依赖,  然后在安装一些模块的时候可以通过`--save-dev`保存到这个属性下，比如要使用`vue-router`就可以使用`npm install vue-router --save-dev`(-D)
* `README.md`就是项目的描述文件


项目打包(npm run build)后会生成一个dist文件夹



### 使用vue-cli编写组件

前置学习-es6模块化

使用.vue文件格式编写`apple.vue`和`banana.vue`并加载到`App.vue`中

### 项目运行

**项目的入口文件是`main.js`**,  加载顺序: main.js -> app -> hello,   代码执行顺序: hello -> app -> main.js

然后在`main.js`中依赖`app.vue`.`app.vue`中又依赖了`hello.vue`这个组件。一个标准组件的构成就是由`template,script,style`这三个标签构成，如果要在`app.vue`中使用`hello.vue`这个组件的话，需要把hello定义为app的子组件

```javascript
import Hello from './components/Hello'

export default {
  name: 'app',
  components: {
    Hello
  }
}
```

###在vue-cli下编写Tab组件![Markdown](http://i2.bvimg.com/1949/4eb984c83a950ba0.jpg)代码：

```html
<template>
	<div class="tab">
		<a v-for="(item,index) in data" :class="{active: activeIndex==index}" @mouseover="changeIndex(index)">
			{{item.btn}}
		</a>
		<span class="slider" :style="{left: activeIndex*100+'px'}"></span>
		<div v-for="(item,index) in data" :class="{active: activeIndex==index}">
			{{item.content}}
		</div>
	</div>
</template>
<script type="text/javascript">
export default {
	data(){
		return {
			activeIndex: 0
		}
	},
	props: ["data"],
	methods:{
		changeIndex(index){
			this.activeIndex = index
		}
	}
}	
</script>
<style scoped>
.tab{
	float: left;
	padding-top: 10px;
	position: relative;
}
.tab>a{
	color: black;
	font-size: 16px;
	padding: 0 10px;
	width: 80px;
	display: inline-block;
	border-right: 1px solid #ccc;
}
.tab>a:last-of-type{
	border-right: none;
}
.tab>a.active{
	color: red;
}
.tab span.slider{
	position: absolute;
	left: 0;
	top: 31px;
	height: 2px;
	width: 100px;
	background-color: red;
	-webkit-transition: all 0.4s;
	-o-transition: all 0.4s;
	transition: all 0.4s;
}
.tab>div{
	width: 100%;
	height: 200px;
	background-color: #ccc;
	display: none;
}
.tab>div.active{
	display: block;
}	
</style>
```

###在App.vue中引入Tab并调用

```html
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <!-- 3.调用该组件 -->
    <tab :data="tabData1"></tab>
    <tab :data="tabData2"></tab>
  </div>
</template>

<script>
// import Hello from './components/Hello'
// 1.tab切换组件
import Tab from './components/Tab'

export default {
  data(){
    return {
      tabData1:[
        {btn:"手机通讯",content: "手机通讯的详情"},
        {btn:"剃须刀",content: "剃须刀的详情"},
        {btn:"生活电器",content: "剃须刀的详情"}
      ],
      tabData2:[
        {btn:"休闲食品",content: "休闲食品的详情"},
        {btn:"只能手环",content: "只能手环的详情"},
        {btn:"手机",content: "手机的详情"}
      ]
    }
  },
  name: 'app',
  components: {
    // Hello
    Tab
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

```

###仿写element ui的el-button组件

```html
<template>
	<div class="el-button" @click="clickFn()">
		<div class="message" :class="{'active':showBol}">{{msg}}</div>
		<slot>内容分发</slot>
	</div>
</template>
<script type="text/javascript">
export default {
	data(){
		return {
			showBol: false
		}
	},
	methods:{
		clickFn(){
			this.showBol = true
			var _this = this
			setTimeout(function (){
				_this.showBol = false
			}, 2000)
		}
	},
	props:["msg"]
}
</script>
<style scoped>
.message{
	position: fixed;
	top: -100px;
	/*top: 0;*/
	left: 50%;
	-webkit-transform: translate(-50%,0%);
	-ms-transform: translate(-50%,0%);
	-o-transform: translate(-50%,0%);
	transform: translate(-50%,0%);
	-webkit-transition: all 0.5s;
	-o-transition: all 0.5s;
	transition: all 0.5s;
	padding: 10px;
	border: 1px solid #ccc;
	border-radius: 5px;
}
.message.active{
	top: 20px;
}
.el-button{
	display: inline-block;
	padding: 14px;
	border: 1px solid #ccc;
	border-radius: 7px;
}
.el-button:hover{
	border-color: blue;
	color: blue;
}
</style>
```

###在App.vue中引用

```html
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <!-- <hello></hello> -->
    <el-button msg="今天天气真晴朗">我是按钮</el-button>
    <!-- 3.调用该组件 -->
    <tab :data="tabData1"></tab>
    <tab :data="tabData2"></tab>
  </div>
</template>

<script>
// import Hello from './components/Hello'
// 1.引入该组件
import elButton from './components/el-button'

// 1.tab切换组件
import Tab from './components/Tab'

export default {
  data(){
    return {
      tabData1:[
        {btn:"手机通讯",content: "手机通讯的详情"},
        {btn:"剃须刀",content: "剃须刀的详情"},
        {btn:"生活电器",content: "剃须刀的详情"}
      ],
      tabData2:[
        {btn:"休闲食品",content: "休闲食品的详情"},
        {btn:"只能手环",content: "只能手环的详情"},
        {btn:"手机",content: "手机的详情"}
      ]
    }
  },
  name: 'app',
  components: {
    // Hello
    elButton,
    // 2.添加该组件
    Tab
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

### 在vue-cli中使用less

`1.cnpm install less-loader less --save-dev`

`2.后在组件的style标签上加上 lang="less"属性就可以了`

在style写的less代码自动回转成普通css

```html
<template>
	<h1>在vue-cli中使用less</h1>
</template>
<style scoped lang="less">
@color: red;
h1{
	color: @color/2;
}
</style>
```

在App.vue中引用

```html
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <!-- <hello></hello> -->
    <el-button msg="今天天气真晴朗">我是按钮</el-button>
    <!-- 3.调用该组件 -->
    <tab :data="tabData1"></tab>
    <tab :data="tabData2"></tab>
    <less-demo></less-demo>
  </div>
</template>

<script>
// import Hello from './components/Hello'
// 1.引入该组件
import elButton from './components/el-button'

// 1.tab切换组件
import Tab from './components/Tab'

import LessDemo from './components/less-demo'

export default {
  data(){
    return {
      tabData1:[
        {btn:"手机通讯",content: "手机通讯的详情"},
        {btn:"剃须刀",content: "剃须刀的详情"},
        {btn:"生活电器",content: "剃须刀的详情"}
      ],
      tabData2:[
        {btn:"休闲食品",content: "休闲食品的详情"},
        {btn:"只能手环",content: "只能手环的详情"},
        {btn:"手机",content: "手机的详情"}
      ]
    }
  },
  name: 'app',
  components: {
    // Hello
    elButton,
    // 2.添加该组件
    Tab,
    LessDemo
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```



## webpack

### 简介

`webpack`是当下最热门的**前端资源模块化管理和打包工具**.它可以将许多松散的模块按照依赖和规则打包成符合生产环境部署的前端资源。还可以将按需加载的模块进行代码分隔，等到实际需要的时候再异步加载。通过 `loader` 的转换，任何形式的资源都可以视作模块，比如 CommonJs 模块、 AMD 模块、 ES6 模块、CSS、图片、 JSON、Coffeescript、 LESS 等

<img src="http://webpackdoc.com/images/what-is-webpack.png" >

文档：[webpack](http://webpackdoc.com/index.html)

### 现状

伴随着移动互联的大潮，当今越来越多的网站已经从网页模式进化到了 Webapp 模式。它们运行在现代的高级浏览器里，使用 HTML5、 CSS3、 ES6 等更新的技术来开发丰富的功能，网页已经不仅仅是完成浏览的基本需求，并且webapp通常是一个单页面应用，每一个视图通过异步的方式加载，这导致页面初始化和使用过程中会加载越来越多的 JavaScript 代码，这给前端开发的流程和资源组织带来了巨大的挑战。

前端开发和其他开发工作的主要区别，首先是前端是基于多语言、多层次的编码和组织工作，其次**前端产品的交付是基于浏览器，这些资源是通过增量加载的方式运行到浏览器端，如何在开发环境组织好这些碎片化的代码和资源，并且保证他们在浏览器端快速、优雅的加载和更新，就需要一个模块化系统**，这个理想中的模块化系统是前端工程师多年来一直探索的难题。



### 模块系统的演进-扩展

#### <script>标签

```html
<script src="module1.js"></script>
<script src="module2.js"></script>
<script src="libraryA.js"></script>
<script src="module3.js"></script>
```

这是最原始的 JavaScript 文件加载方式，如果把每一个文件看做是一个模块，那么他们的接口通常是暴露在全局作用域下，也就是定义在 `window` 对象中，不同模块的接口调用都是一个作用域中，一些复杂的框架，会使用命名空间的概念来组织这些模块的接口，典型的例子如 [YUI](http://yuilibrary.com/) 库。

这种原始的加载方式暴露了一些显而易见的弊端：

- 全局作用域下容易造成变量冲突
- 文件只能按照 `<script>` 的书写顺序进行加载
- 开发人员必须主观解决模块和代码库的依赖关系
- 在大型项目中各种资源难以管理，长期积累的问题导致代码库混乱不堪

#### CommonJS

服务器端的 Node.js 遵循 [CommonJS规范](http://wiki.commonjs.org/wiki/CommonJS)，该规范的核心思想是允许模块通过 `require` 方法来同步加载所要依赖的其他模块，然后通过 `exports` 或 `module.exports` 来导出需要暴露的接口。

```javascript
require("module");
require("../file.js");
exports.doStuff = function() {};
module.exports = someValue;
```

优点：

- 服务器端模块便于重用
- [NPM](https://www.npmjs.com/) 中已经有超过47.5万个可以使用模块包
- 简单并容易使用

缺点：

- 同步的模块加载方式不适合在浏览器环境中，同步意味着阻塞加载，浏览器资源是异步加载的
- 不能非阻塞的并行加载多个模块

实现：

- 服务器端的 [Node.js](http://www.nodejs.org/)
- [Browserify](http://browserify.org/)，浏览器端的 CommonJS 实现，可以使用 NPM 的模块，但是编译打包后的文件体积可能很大
- [modules-webmake](https://github.com/medikoo/modules-webmake)，类似Browserify，还不如 Browserify 灵活
- [wreq](https://github.com/substack/wreq)，Browserify 的前身

####AMD

[Asynchronous Module Definition](https://github.com/amdjs/amdjs-api) 规范其实只有一个主要接口 `define(id?, dependencies?, factory)`，它要在声明模块的时候指定所有的依赖 `dependencies`，并且还要当做形参传到 `factory`中，对于依赖的模块提前执行，依赖前置。

```javascript
define("module", ["dep1", "dep2"], function(d1, d2) {
  return someExportedValue;
});
require(["module", "../file"], function(module, file) { /* ... */ });
```

优点：

- 适合在浏览器环境中异步加载模块
- 可以并行加载多个模块

缺点：

- 提高了开发成本，代码的阅读和书写比较困难，模块定义方式的语义不顺畅
- 不符合通用的模块化思维方式，是一种妥协的实现

实现：

- [RequireJS](http://requirejs.org/)
- [curl](https://github.com/cujojs/curl)

#### CMD

[Common Module Definition](https://github.com/cmdjs/specification/blob/master/draft/module.md) 规范和 AMD 很相似，尽量保持简单，并与 CommonJS 和 Node.js 的 Modules 规范保持了很大的兼容性。

```javascript
define(function(require, exports, module) {
  var $ = require('jquery');
  var Spinning = require('./spinning');
  exports.doSomething = ...
  module.exports = ...
})
```

优点：

- 依赖就近，延迟执行
- 可以很容易在 Node.js 中运行

缺点：

- 依赖 SPM 打包，模块的加载逻辑偏重

实现：

- [Sea.js](http://seajs.org/)
- [coolie](https://github.com/cloudcome/coolie)

#### ES6 模块

EcmaScript6 标准增加了 JavaScript 语言层面的模块体系定义。[ES6 模块](http://es6.ruanyifeng.com/#docs/module)的设计思想，是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。

```javascript
import "jquery";
export function doStuff() {}
module "localModule" {}
```

优点：

- 容易进行静态分析
- 面向未来的 EcmaScript 标准

缺点：

- 原生浏览器端还没有实现该标准
- 全新的命令字，新版的 Node.js才支持

实现：

- [Babel](https://babeljs.io/)

#### 期望的模块系统

可以兼容多种模块风格，尽量可以利用已有的代码，不仅仅只是 JavaScript 模块化，还有 CSS、图片、字体等资源也需要模块化。



## 单独使用webpack

### 一、学习资源

[webpack](http://webpack.github.io/)是一款**模块加载器兼打包工具**，它能把各种资源，例如JS（含JSX）、ES6、样式（含less/sass）、图片等都作为模块来使用和处理。需要先在全局安装webpack,  再在本地(项目当前目录)安装

[更多webpack学习内容](https://github.com/lengziyu/learn-webpack)


### 二、安装

```basic
$ npm install webpack -g
```

### 三. 配置

创建 **webpack.config.js** 它的作用和gulpfile.js一样就是一个配置项，设置 webpack 任务功能。

* entry 入口文件 让webpack用哪个文件作为项目的入口
* output 出口 让webpack把处理完成的文件放在哪里
* module 模块 要**用什么不同的模块来处理各种类型的文件**
* plugins 是插件项
* resolve 用来**设置路径指向**
* watch 用监听文件有改动后执行打包

```javascript
module.exports = {
	entry:"",//入口文件
	output:{//出口
		path:"",
		filename:""
	},
	module:{//模块
		loaders:[
			{test:/\.js$/,loader:""}
		]
	},
	plugins:{},
	resolve:{},
	wacth:true
	
}
```

### webpack命令

```basic
//直接运行webpack.config.js来打包  (内容每次更新后需要重新打包)
$ webpack     
```

### demo01

我们首先来看一下使用`webpack`来实现打包:

我们定义一个模块`show.js`:

```javascript
exports.show = function () {
	alert("show")
      document.write("<div>这是div</div>")
}
```

并在`main.js`中进行了引入：

```javascript
var obj = require("./show");
obj.show();
```

在`webpack.config.js`(运行在node环境下的文件, 采用node导出方式)中进行配置：

```javascript
module.exports = {
	entry:'./module/main.js',
	output:{
		filename:"./js/bundle.js"
	}
}
```

最后在html文件中引入bundle.js文件

### 2.例子demo02文件

需要引入CommonsChunkPlugin,这个属于webpack内置的一个插件，需要在当前目录安装webpack

作用是：用于提取多个入口文件的公共脚本部分

### 配置设置webpack.config.js

```javascript
//用于提取多个入口文件的公共脚本部分
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var webpack = require('webpack');

//node导出方式
module.exports = {
	entry:{
		bundle1:"./module/page1",
		bundle2:"./module/page2"
	},
	output:{
		filename:"./js/[name].js"
	},
    plugins: [
        new CommonsChunkPlugin("commons")
    ]
}
```

### 3.例子demo03文件

打包样式和转换less或sass或stylus

```basic
//安装转css模块
$ npm install style-loader css-loader 
//安装转less模块
$ npm install less-loader less
//安装转sass模块
$ npm install sass-loader node-sass
```

编写less和sass文件

less:

```less
@color:#666;
body{
	background:@color/2;
}
```

sass:

```scss
$color: red;
body{
	background:$color;
}
```



配置设置webpack.config.js

```javascript
module.exports = {
	entry:'./module/main.js',
	output:{
		filename:"./js/bundle.js"
	},
	module: {
		// webpack使用loader的方式来处理各种各样的资源，比如说样式文件，我们需要两种loader，css-loader 和 style－loader，注意顺序(需要先引入style-loader), css-loader会遍历css文件
	    loaders:[	   
	    	// { test: /\.(css|less)$/, loader: 'style-loader!css-loader!less-loader'},
	    	
	    	{ test: /\.(css|scss)$/, loader: 'style-loader!css-loader!sass-loader'}
	    ]
	},
	resolve: {
         //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['.js', '.css',".less"],
      
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
            style : '../css/style.less',//后续直接 require('style') 即可
        }
    },
    watch:true//监听文件一旦改变重新打包
}
```

默认webpack是将css添加到页面的`head`标签中的.

如果你需要将**不同类型的css文件**打包到一个css文件中, 不想css和js都打包到一个js文件中, 可以通过`extract-text-webpack-plugin`这个插件来实现

```javascript
// 安装并引入extract-text-webpack-plugin插件
let ExtractTextPlugin = require('extract-text-webpack-plugin');

// 使用extract插件-参数定义了输出的路径及文件名，entry没有设置键，默认为main
let extractCSS = new ExtractTextPlugin('stylesheets/[name].css');
// let extractLESS = new ExtractTextPlugin('stylesheets/[name].less');

module.exports = {
	entry:'./module/main.js',
	output:{
		filename:"./js/bundle.js"
	},
	module: {
		// webpack使用loader的方式来处理各种各样的资源，比如说样式文件，我们需要两种loader，css-loader 和 style－loader，css-loader会遍历css文件
	    loaders:[	    
	    	//npm install style-loader css-loader less-loader less
	    	// 使用css-loader,和less-loader处理文件，并使用extract来打包css文件
	    	{ test: /\.(css|less)$/, loader: extractCSS.extract(['css-loader','less-loader'])},
          
	    	//npm install sass-loader node-sass
	    	// { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader'}
	    ]
	},
	resolve: {
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['.js', '.css',".less"],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
            style : '../css/style.less',//后续直接 require('style') 即可
        }
    },
    plugins: [
    	extractCSS
	    // extractLESS
	],
    watch:true//监听文件一旦改变重新打包
}
```

然后在页面中直接引入main.css文件

### 4.例子demo04文件

 打包js

```basic
//安装es6转es5模块
$ cnpm install babel-loader babel-preset-es2015（babel-preset-env） babel-core webpack(这里装在本地) --save-dev

babel-preset-env 是一个新的 preset，可以根据配置的目标运行环境（environment）自动启用需要的 babel 插件
```



安装相关模块时,可以使用@指定相关版本号,  jquery@3.2.1,    jquery@3



### 配置设置webpack.config.js

```javascript
module.exports = {
	...
	module: {			
	    loaders:[		    	
	    	{ 
	    		test: /\.js$/, 
  //排除不需要处理的文件夹
	    		exclude: '/node_modules/', 
  //采用babel-loader模块加载
	    		loader: 'babel-loader'   
	    	},
	    ]
	}
}
```

需要注意，在es6转es5的时候在`webpack.config.js`同级目录也要添加`.babelrc`文件，并写入：

```json
{
  "presets": [
    "es2015"
  ]
}
```

这样才能将es6的代码转化为es5的代码(打包后生成的bundle.js文件中可以看到效果)





### 在vue-cli中使用webpack

我们可以先从`npm run dev`这个入口开始去分析它.

`npm run dev`其实就是启动一个node服务器(webpack-dev-server是一个小型的`Node.js Express`服务器) ,  

我们可以看到关于`webpackConfig`的配置引入了一个`./webpack.dev.conf`的文件，在`./webpack.dev.conf`文件中又依赖了`./webpack.base.conf`的文件，然后这个`webpack.base.conf`文件就是`webpack`的配置文件了.

### webpack.base.conf

[webpack2.x最新版文档](http://www.css88.com/doc/webpack2/concepts/)

#### entry

入口的配置，它表示webpack编译的入口是指向这个src下的`main.js`

#### output

输出的配置

* `path`:表示输出的一个文件路径，对应的就是`confit/index.js`下的`build.assetsRoot`，意思就是会在根目录下创建一个叫dist的文件目录
* `filename`：输出文件的名称,`[name]`获取的是`entry`的键
* `publicPath`:请求的静态资源绝对路径
####resolve

引入的一些模块相关配置

* `extensions`自动补全引入文件的文件后缀
  * `fallback`：指向的是node_modules文件夹，就是在require找不到这个模块的时候，会去node_modules里面查找
  * `alias`:提供一些别名
####[module](http://www.css88.com/doc/webpack2/configuration/module/)

这些选项决定了如何处理项目中的[不同类型的模块](http://www.css88.com/doc/webpack2/concepts/modules)，也是webpack最核心的功能

* `rules`:创建模块时，匹配请求的[规则](http://www.css88.com/doc/webpack2/configuration/module/#rule)数组。这些规则能够修改模块的创建方式。这些规则能够对模块(module)应用加载器(loader)，或者修改解析器(parser)
  * [加载器](http://www.css88.com/doc/webpack2/loaders/)
  * `include`：只对指定文件目录处理
  * `options`：属性为字符串或对象。值可以传递到 loader 中，将其理解为 loader 选项，由于兼容性原因，也可能有 `query` 属性，它是 `options` 属性的别名。使用 `options` 属性替代
    * `limit`:当文件大小小于10kb的时候，会生成base64串，如果超过的话就会单独生成一个文件，规则就是用`utils.assetsPath`去生成 

#### [plugins](http://www.css88.com/doc/webpack2/plugins/)

插件，webpack 自身的多数功能都使用这个插件接口。这个插件接口使 webpack 变得**极其灵活**

常用的：

* [HotModuleReplacementPlugin](http://www.tuicool.com/articles/aiEva2Q)热更新插件
* [HtmlWebpackPlugin](http://www.cnblogs.com/haogj/p/5160821.html),该插件可以简化创建调用webpack bundles的html文件




### vue-cli脚手架的.babelrc文件
```json
	{
    // 此项指明，转码的规则
    "presets": [
        // env项是借助插件babel-preset-env，下面这个配置说的是babel对es6,es7,es8进行转码，并且设置amd,commonjs这样的模块化文件，不进行转码
        ["env", { "modules": false }],
        // 下面这个是不同阶段出现的es语法，包含不同的转码插件
        "stage-2"
    ],
    // 下面这个选项是引用插件来处理代码的转换，transform-runtime用来处理全局函数和优化babel编译
    "plugins": ["transform-runtime"],
    // 下面指的是在生成的文件中，不产生注释
    "comments": false,
    // 下面这段是在特定的环境中所执行的转码规则，当环境变量是下面的test就会覆盖上面的设置
    "env": {
        // test 是提前设置的环境变量，如果没有设置BABEL_ENV则使用NODE_ENV，如果都没有设置默认就是development
        "test": {
            "presets": ["env", "stage-2"],
            // instanbul是一个用来测试转码后代码的工具
            "plugins": ["istanbul"]
        }
    }
}
```




## vue常用插件之vue-router

### 什么是前端路由

根据不同的地址跳转到不同的页面，提到前端路由就不得不提SPA单页应用，单页面应用就是视觉感觉是页面的切换，但页面其实一直没有刷新，我们是通过js来让页面看起来好像是跳转到了另外一个页面。很多时候项目文件中也只有一个`.html`文件。不需要跟服务器频繁的进行交互，只需要通过ajax来在切换的时候获取最新的数据，而不需要把整个页面都重新加载。而前端路由就是也是切换浏览器地址，但确实通过js来控制切换的

[api文档](https://router.vuejs.org/zh-cn/)

### 安装及基础

* 在终端中进入到你的项目目录: `cd 项目路径`
* 在项目目录下执行：`npm install vue-router --save`。后面加上`--save`的原因是要将`vue-router`添加到`package.json`的依赖中
* 然后在可以项目中引入`vue-router`，比如在`main.js`中

```javascript
/// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 1.引入vue-router及组件
import Router from 'vue-router'
import Hello from './components/Hello'
import Orange from './components/Orange'
import Banana from './components/Banana'

// 2.使用vue-router
Vue.use(Router)
// 3.实例化router这个类
let router = new Router({
	// 5.做映射,什么样的地址,跳转到什么样的页面
	routes:[
		{
          	// path:路径
			path:'/',
          	// 跳转的组件
			component:Hello
		},
		{
			path:'/orange',
			component:Orange
		},
		{
			path:'/banana',
			component:Banana
		}
	]
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // 4.在vue实例中使用router
  router:router,
  template: '<App/>',
  components: { App }
})
```

然后在`app.vue`中指定路由的位置，使用`router-view`这个组件

```html
<template>
  <div id="app">
    <img src="./assets/logo.png">
   	<!--指定路由位置-->
    <router-view></router-view>
  </div>
</template>

<script>
// import Hello from './components/Hello'

export default {
  name: 'app',
  components: {
    // Hello
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

然后可以在浏览器中修改地址来实现跳转：`http://localhost:8080/#/banana`

### html5 History模式

`vue-router` 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。

如果不想要很丑的 hash，我们可以用路由的 **history 模式**(前提是需要后台服务器支持)，这种模式充分利用 `history.pushState` API 来完成 URL 跳转而无须重新加载页面。

```javascript
const router = new Router({
  mode: 'history',
  routes: [...]
})
```

当你使用 history 模式时，URL 就像正常的 url，例如 `http://yoursite.com/user/id`，也好看！

### 页面中的跳转

在页面中的跳转可以使用`router-link`组件.它有一个`to`的属性用于指定跳转的地址,  tag属性可以指定渲染的标签:

```html
 <router-link v-bind:to="{path:'orange'}" tag="span">跳转到orange</router-link>
 <router-link v-bind:to="{path:'banana'}">跳转到banana</router-link>
 <router-link v-bind:to="{path:'/'}">返回首页</router-link>
```

当然`v-bind:to`也可以缩写为`:to`

### 通过js控制跳转
`this.$router.push(地址)`

`this.$router.replace(地址)`,  这种方式无法回退到之前的页面(没有添加到历史记录列表)





原生js实现页面跳转方式:

1, window.location.replace()

2,  window.history.go()







### 路由参数

以前我们页面之前的参数是通过`?`号后面的键值对来传递的，比如：

`http://localhost:8080/?user=xx&pass=12345`

然后在`vue-router`中是以`:`号开头做为我们的参数的，比如：

```javascript
{
  path:'/orange/:color',
  component:Orange
}
```

`:color`就是我们的参数，在地址栏中写入：`http://localhost:8080/orange/red`,red就是我们参数的值，可以通过`this.$route.params`来获取到参数. 这种方式**必须传递参数才能跳转**, 比如要获取传过来red,就可以通过下面的代码：

```html
<template>
  <div class="orange">
    我是orange橙子
    <button @click="getParams">获取参数</button>
  </div>
</template>
<script type="text/javascript">
export default {
  methods:{
    getParams(){
      console.log(this.$route.params)
    }
  }
}
</script>
```

这种方式就是固定死了,如果在地址栏中没有参数是跳转不到`orange`这个页面的，作为变通你还可以使用`query`的方式传参。

```html
<router-link v-bind:to="{path:'orange',query:{color:'red'}}">跳转到orange</router-link>
```

在跳转到地址栏中显示的就是：`http://localhost:8080/orange?color=red`，然后通过`this.$route.query`获取传过来的值，**这种方式就算是没有参数也会正常跳转到`orange`**：

```html
<template>
  <div class="orange">
    我是orange橙子
    <button @click="getQuery">获取参数</button>
  </div>
</template>
<script type="text/javascript">
export default {
  methods:{
    getQuery(){
      console.log(this.$route.query)
    }
  }
}
</script>
```

### 路由嵌套

实际生活中的应用界面，通常由多层嵌套的组件组合而成。同样地，URL 中各段动态路径也按某种结构对应嵌套的各层组件

比如在要在orange组件中添加一个子路由，可以通过配置`children`来实现：

比如我编写了一个组件叫`RedOrange`,代码如下：

```html
<template>
  <div class="orange">
    我是红色的橙子
  </div>
</template>
<script type="text/javascript">

</script>
```

想把他作为我orange的子路由，修改`main.js`中关于orange的配置：

```javascript
{
  path:'/orange',
    component:Orange,
      children:[
        {
          //自动拼接为'/orange/red'
          path:'red',
          component:RedOrange
        }
      ]
}
```

`children`接受的是一个数组，就是说在`orange`下可以定义多个子路由，子路由的核心参数就是`path`和`component`定义的就是路径和子组件，**要注意，以 / 开头的嵌套路径会被当作根路径。 这让你充分的使用嵌套组件而无须设置嵌套的路径。**所以`path`中的`red`是不加`/`线的



然后在`orange`需要显示子路由的位置添加`router-view`：

```html
<template>
  <div class="orange">
    我是orange橙子
    <button @click="getQuery">获取参数</button>
    <router-view></router-view>
  </div>
</template>
<script type="text/javascript">
export default {
  methods:{
    getQuery(){
      console.log(this.$route.query)
    }
  }
}
</script>
```

如果想跳转到`RedOrange`页面也是可以通过`router-link`来实现的，比如在`app.vue`中添加一个`router-link`:

```html
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view></router-view>
    <router-link v-bind:to="{path:'/orange',query:{color:'red'}}">跳转到orange</router-link>
    <router-link v-bind:to="{path:'/banana'}">跳转到banana</router-link>
    <router-link v-bind:to="{path:'/'}">返回首页</router-link>
    //这里使用绝对路径
    <router-link v-bind:to="{path:'/orange/red'}">跳转到Redorange</router-link>
  </div>
</template>
```

**注意：路径如果不加/线，那就是个相对路径，默认跳转就是基于当前路径开始的,比如如果跳转orange的path没加/，那在RedOrange中点跳转到orange的时候路径是`localhost:8080/orange/orange?color=red,`**





### 重定向

```javascript
{
  path:'/',
  redirect:'/orange'
}
```

redirect：重定向地址

### 为页面跳转添加动画

为页面跳转添加动画的方式跟为组件加动画的方法是一样的:

```html
<!-- transition添加过渡 -->
    <transition name="fade">
      <!-- 缓存已访问过的组件 -->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
```

```css
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
```

也可以结合`animate.css`来丰富切换的效果

```vue
<template>
	<div class="cart">
		<cart-tab-bar></cart-tab-bar>
		<h1>{{title}}</h1>
		<div class="cart-router-wrap">
			<transition name="bounce">
				<keep-alive>
					<router-view class="cart-router"></router-view>
				</keep-alive>
			</transition>
		</div>
	</div>
</template>
<script type="text/javascript">
import CartTabBar from './CartTabBar'
export default {
	data(){
		return {
			title: '橙子'
		}
	},
	components:{
		CartTabBar
	}
}	
</script>
<style>
@import '../style/animate.css';

.cart>h1{
	color: blue;
}	
/*.fade-enter-active, .fade-leave-active {
  transition: opacity 2.5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}*/
.cart-router-wrap{
	position: relative;
}
.cart-router{
	position: absolute;
	width: 100%;
}

.bounce-enter-active{
	animation: rotateIn 1s;
}
.bounce-leave-active {
  animation: rotateOut 1s;
}
</style>
```

关键代码解析：

引入aniate.css

`@import '../style/animate.css';`

指定动画方法:

```css
.bounce-enter-active{
	animation: rotateIn 1s;
}
.bounce-leave-active {
  animation: rotateOut 1s;
}
```

在模板中使用：

```html
<transition name="bounce">
  <keep-alive>
    <router-view class="cart-router"></router-view>
  </keep-alive>
</transition>
```

并可以通过路由的导航钩子来切换动画方案(建议在vuex后讲解-对应案例day05中的gouzi文件夹)：

[导航钩子](https://router.vuejs.org/zh-cn/advanced/navigation-guards.html)

```javascript
beforeRouteUpdate (to, from, next) {
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    next()
}
```



