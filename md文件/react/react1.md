# react

## React简介

<img src="http://ww4.sinaimg.cn/large/006tKfTcly1ff9m6lm8eij30dw0daacn.jpg" width="300">

#### React是什么

> A JAVASCRIPT LIBRARY FOR BUILDING USER INTERFACES

> a javascript library for building user interfaces

> 为了构建用户界面的javascript库

React原本是Facebook内部的项目，本来是用来架设instagram网站的。后来感觉很棒，便在2013年5月开源了。

[官网地址](https://facebook.github.io/react/docs/installation.html)

#### 学习React需要什么

- JavaScript
- DOM

#### React学习路线

1. JSX + React + React-router(路由)
2. Redux(状态管理)



## react安装

或者使用npm进行安装(使用npm init初始化项目, 初始化完成自动生成package.json文件)

`cnpm install react react-dom --save`  

因为react使用的是jsx的语法，所以还需要babel进行转换

`cnpm install babel-preset-react babel-core --save-dev`

如果你是使用的es6，那还要再装一个es6转es5的：

`cnpm install babel-preset-es2015 --save-dev`

### webpack配置

在安装完成后我们首先编写一段react语法的代码

main.js:

```javascript
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
	<h1>Hello react!</h1>,
	document.getElementById("app")
)
```

index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<div id="app">hello vue!</div>
</body>
</html>
```

全局安装`webapck`:

`cnpm install webpack -g`

在项目根目录安装`webpack`:

`cnpm install webpack --save-dev`

然后在配置`webpack.config.js`:

```javascript
module.exports = {
  // 入口文件
  entry: "./src/main.js",
  // 文件的处理方式
  module: {
    loaders: [
      {
        test: /\.js$/,
        // 排除文件目录 
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        //转换jsx和react语法
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  // 输出设置
  output: {
    path: __dirname,
    filename: "src/bundle.js"
  }
};
```

然后执行`webpack`打包就可以了,  生成bundle.js文件,

最后在index.html文件中引入即可.



如果要热更新的话可以再安装:

`cnpm install webpack-dev-server --save`

然后执行：`webpack-dev-server --progress --inline`来**启动热更新的服务器**

当然也可以将这个命令写到`package.json`的`scripts`里,然后通过`npm run dev`来启动

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server --progress --inline",
    "build": "webpack --env production"
 }
```

或者一次性安装所有的：

`cnpm install babel-core babel-loader babel-preset-es2015 babel-preset-react(转换jsx语法) react react-dom webpack webpack-dev-server(热更新) --save`

### react调试工具

安装`react developer tools `,谷歌商店搜索安装


### 虚拟DOM

github地址：[virtual-dom](https://github.com/Matt-Esch/virtual-dom)

> 性能问题出在 DOM 对象的操作上，比如读写，创建，插入等等。之所以原生 DOM 性能低，是因为 DOM 的规范迫使浏览器在实现的时候为每一个 DOM 元素添加了非常多的属性，然而这其中很多我们都用不到——这一部分就是翻译文章里所揭示的“原因”。具体到 React 主要是做了两点，其一是 VD，一个很简化的虚拟文档对象模型系统，你可以操作类似 DOM 的对象，但是非常轻量化（这就是为啥 JSX 看起来是在 JS 代码里写 XML 的缘故，这是一层语法糖，方便开发者编写模板，但实际上还是 JS 对象，而不是真实的 DOM 对象）；其二则是当数据变化的时候，不直接去修改 DOM（因为变化的只是个别属性，但是修改 DOM 往往却要替换一整个 DOM 对象），而是先用一个类似 git diff 的算法比较前后的差异，最后只把变化的部分一次性应用到真实的 DOM 树上去。

 [Facebook React 和 Web Components（Polymer）对比优势和劣势](https://segmentfault.com/a/1190000000753400)

[Comparing React.js performance vs. native DOM](https://objectpartners.com/2015/11/19/comparing-react-js-performance-vs-native-dom/)

## 组件

组件化开发是react开发中最重要的功能，可以简单的认为react就是开发组件的.

**vue综合angular的数据绑定和react的组件特性.**

组件系统react的重要概念，因为它是一种抽象，允许我们使用小型、自包含和通常可复用的组件构建大型应用。仔细想想，几乎任意类型的应用界面都可以抽象为一个组件树：

<img src="http://cn.vuejs.org/images/components.png" >

而以像`element-ui`,`mint-ui`这样的ui框架，其实也被叫做组件库.

### react中组件的定义

比如我们编写一个叫`header`的组件

```javascript
import React from 'react'

// 编写一个Header类继承自React.Component类
export default class Header extends React.Component{
	render(){
		return (
			<header>
				<h1>我是头部</h1>
			</header>
			)
	}
}
```

然后在`mian.js`中去引用它

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import Header from './components/header'

// 组件的模板内容跟vue一样，只能有一个顶级元素
class App extends React.Component{
	render(){
		return (
			<Header/>
			// <main>页面的主体内容</main>
			)
	}
}

// 定义app组件渲染的位置，相当于入口
ReactDOM.render(<App/>,document.getElementById("app"))
```

### 多个组件及嵌套

跟在vue中一样，在react的组件化中也是可以嵌套子组件的，只是不需要使用`components`属性声明子组件，只要引用了，就可以直接使用:

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
// 引用子组件
import Header from './components/header'
import ComponentBody from './components/body'
import ComponentFooter from './components/footer'

// 组件的模板内容跟vue一样，只能有一个顶级元素
class App extends React.Component{
	render(){
		return (
			<div>
				<Header/>
				<ComponentBody/>
				<ComponentFooter/>
			</div>
			)
	}
}

// 定义app组件渲染的位置，相当于入口
ReactDOM.render(<App/>,document.getElementById("app"))

```

### render函数中编写js

然后在组件定义的`render`函数中除了可以定义模板意外，还可以写一些js代码：

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
// 未登录的头
import Header from './components/header'
import ComponentBody from './components/body'
import ComponentFooter from './components/footer'
// 已登录的头
import ComponentLoginFooter from './components/LoginHeader'

// 组件的模板内容跟vue一样，只能有一个顶级元素
class App extends React.Component{
	render(){
		// 在render函数中可以编写js代码
		var loginBol = Math.random()>0.5?true:false
		var componentLogin = null
		if (loginBol){
			componentLogin = <Header/>
		}else{
			componentLogin = <ComponentLoginFooter/>
		}

		return (
			<div>
				{componentLogin}
				<ComponentBody/>
				<ComponentFooter/>
			</div>
			)
	}
}

      
// 在main.js中定义app组件渲染的位置，相当于入口
ReactDOM.render(
  <App/>,
  document.getElementById("app")
)
```

`ComponentLoginFooter`中的代码：

```javascript
import React from 'react'

export default class LoginHeader extends React.Component{
	render(){
		return (
			<header>
				<h1>我是已经登录的头部</h1>
			</header>
			)
	}
}
```

## jsx语法

在上个例子中的render函数中所编写的`{componentLogin}`就是jsx语法中的表达式。跟`angular`和`vue`中的表达式是一个概念，只是写法是**单`{}`大括号**,比如我们可以在编写一些运算及条件判断，当然是用3元运算。

我们将之前改写为如下的代码：

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
// 未登录的头
import Header from './components/header'
import ComponentBody from './components/body'
import ComponentFooter from './components/footer'
// 已登录的头
import ComponentLoginFooter from './components/LoginHeader'

// 组件的模板内容跟vue一样，只能有一个顶级元素
class App extends React.Component{
	render(){
		// 在render函数中可以编写js代码
		/*var loginBol = ?true:false
		var componentLogin = null
		if (loginBol){
			componentLogin = <Header/>
		}else{
			componentLogin = <ComponentLoginFooter/>
		}*/

		return (
			<div>
				{Math.random()>0.5?<Header/>:<ComponentLoginFooter/>}
				<ComponentBody/>
				<ComponentFooter/>
			</div>
			)
	}
}

// 定义app组件渲染的位置，相当于入口
ReactDOM.render(<App/>,document.getElementById("app"))
```

jsx语法的基本规则就是：

遇到 HTML 标签（以 `<` 开头），便以HTML 规则解析；

遇到代码块（以 `{` 开头），便以 JavaScript 规则解析；

{}中的规则是跟ng或者vue中的表达式规则一样, 只能为一行代码.



### jsx中给属性绑定变量

我们项目中经常需要动态修改标签属性的值，比如按钮的禁用状态`disabled`,比如有个变量叫`disabledBol`在vue中我们的写法是:

`<input :disabled='disabledBol' value='按钮'>`

我们在`react`中一样写入，比如写成：

```javascript
render(){
  var disabledBol = true
  return (
    <main>
    <h1>页面的主体内容</h1>
    <input type='button' disabled='{disabledBol}' value='按钮' />
    </main>
  )
}
```

会没效果,不管true还是false都是禁用的，因为在react的`jsx`语法中绑定属性是不用加引号和冒号的：

`<input type='button' disabled={disabledBol} value='按钮' />`



### jsx中的注释

在jsx里面是**不允许直接写注释**的, 应该写在大括号内,比如：

```javascript
export default class ComponentBody extends React.Component{
	render(){
		var disabledBol = false
		return (
			<main>
				<h1>页面的主体内容</h1>
				// 在jsx中属性值不用加引号
				<input type='button' disabled={disabledBol} value='按钮' />
			</main>
			)
	}
}
```

`// 在jsx中属性值不用加引号`这个注释内容会被直接渲染进页面中.需要写成这样:

```javascript
export default class ComponentBody extends React.Component{
	render(){
		var disabledBol = false
		return (
			<main>
				<h1>页面的主体内容</h1>
				{/*在jsx中属性值不用加引号*/}
				<input type='button' disabled={disabledBol} value='按钮' />
			</main>
			)
	}
}
```

### jsx中插入html内容

比如现在从后端获取了一段html代码想插入页面中：

```javascript
export default class ComponentBody extends React.Component{
	render(){
		var disabledBol = false
		// 比如这是从后端返回一段string类型的html代码
		var html = "<a href='###'>你好&nbsp;育知</a>"
		return (
			<main>
				<h1>页面的主体内容</h1>
				{/*在jsx中属性值不用加引号*/}
				<input type='button' disabled={disabledBol} value='按钮' />
				<p>{html}</p>
			</main>
			)
	}
}
```

然后你会发现它在页面中被直接渲染，并未变成html内容.

这个时候我们可以使用一个属性：[`dangerouslySetInnerHTML`](https://facebook.github.io/react/docs/dom-elements.html)

```javascript
export default class ComponentBody extends React.Component{
	render(){
		var disabledBol = false
		// 比如这是从后端返回一段html代码
		var html = "<a href='###'>你好&nbsp;育知</a>"
		return (
			<main>
				<h1>页面的主体内容</h1>
				{/*在jsx中属性值不用加引号*/}
				<input type='button' disabled={disabledBol} value='按钮' />
				<p>{html}</p>
				<p dangerouslySetInnerHTML={{__html: html}}></p>
			</main>
			)
	}
}
```
这是官网对于dangerouslySetInnerHTML的解释：
>dangerouslySetInnerHTML is React's replacement for using innerHTML in the browser DOM. In general, setting HTML from code is risky because it's easy to inadvertently expose your users to a cross-site scripting (XSS) attack. So, you can set HTML directly from React, but you have to type out dangerouslySetInnerHTML and pass an object with a __html key, to remind yourself that it's dangerous.
>
>翻译： `dangerouslySetInnerHTML`是React的替代`innerHTML`在浏览器DOM中使用。一般来说，从代码设置HTML是有风险的，因为它很容易无意中暴露您的用户[跨站点脚本（XSS）](https://en.wikipedia.org/wiki/Cross-site_scripting)攻击。因此，您可以直接从React设置HTML，但是您必须输入`dangerouslySetInnerHTML`并使用`__html`键传递对象，以提醒自己这是危险的

如果要使用这种方式，后台需要处理（过滤）

## 生命周期

组件会被创建，也会被销毁。在整个显示的过程中，会有各种状态，就是所谓的生命周期。

[生命周期](https://facebook.github.io/react/docs/state-and-lifecycle.html)

- 初始化
- - getDefaultProps：设置默认属性的值
  - getInitialState：设置初始的状态
  - componentWillMount(组件即将被装载)
  - render（渲染）
  - componentDidMount:组件已经被装载，只会在第一个组件被调用的时候触发


- 运行中
- - componentWillReceiveProps
  - - 在组件在将要接收到属性的时候，接收属性前
  - shouldComponentUpdate
  - - 在接收到新的 props 或者 state，将要渲染之前调用。该方法在初始化渲染的时候不会调用
    - componentWillUpdate
  - - render触发之前，更新
  - render
  - - 渲染
  - componentDidUpdate
  - - 在渲染完成后触发


- 销毁
- - componentWillUnmount
  - - 在组件从 DOM 中移除的时候立刻被调用

![](http://static.codeceo.com/images/2016/03/ajs-life.png)

## 组件的state属性

react组件的state属性，类似于vue中组件的data属性,表示的就是model（数据）层.当state更新的时候它会反应到`virtual-dom`,`virtual-dom`再去更新dom结构, react为单向数据绑定

state的写法：

```javascript
import React from 'react'

  export default class ComponentBody extends React.Component{
	constructor(){
		// super->就是调用基类的所有初始化方法
		super()
		this.state = {
			username: 'tangcaiye'
		}	
	}

	render(){
		return (
			<main>
				<h1>页面的主体内容</h1>
				<p>{this.state.username}</p>
			</main>
			)
	}
}
```

### 更新state

只要更改了state的值，页面也会自动更新, 就会调用render()函数重新渲染, 比如我们在render函数中设置一个定时器，去自动更新:

```javascript
setTimeout(()=>{
  // 更改 state 
  this.setState({username: '育知'})
},3000)
```

当然也可以通过触发一个事件去更改state的值

```javascript
import React from 'react'

export default class ComponentBody extends React.Component{

  // 构造函数
  constructor () {
    super()
    this.state = {
      username: 'tangcaiye',
      num: 0
    }
  }
  // 每次更改state,将要渲染之前调用
  componentWillUpdate () {
    console.log('componentWillUpdate')
  }
  // 每次更改state会重新渲染
  render () {
    // console.log(this.state.num)
    setTimeout(()=>{
      let num = this.state.num
      num++
      this.setState({
        num: num
      })
    },2000)
    return (
        <main>
          <h1>页面的主体内容</h1>
          <p>{this.state.username}</p>
          <p>{this.state.num}</p>
        </main>
      )
  }
}
```

## 组件的props

父子组件如果需要传递参数可以使用一个props的属性.比如在`main.js`中想要传递一个参数给`body.js`，可以这么写：

main.js:

```javascript
let userId = 123
render(){
  return (
    <div>
    {Math.random()>0.5?<Header/>:<ComponentLoginFooter/>}
    <ComponentBody userid={userId}/>
    <ComponentFooter/>
    </div>
  )
}
```

body.js中接收：

```javascript
return (
  <main>
  <h1>页面的主体内容</h1>
  <p>{ this.state.username }</p>
  <p>{ this.props.userid }</p>
  {/*
					通过bind方法更改this指向
				*/}
  <button onClick={ this.changeValue.bind(this,event) }>点击切换username</button>
  </main>
)
```

传递多个属性直接写就可以了:

```javascript
<ComponentBody userid={123} username={'张三'}/>
```

### 子组件更改父组件的state

首先编写了一个`body.js`的子组件叫`bodyChild.js`，在更改里面的input标签的时候也更改父组件中的age

```react
import React from 'react'

export default class ComponentBodyChild extends React.Component{
	constructor(){
		// super->就是调用基类的所有初始化方法
		super()
	}
	render(){
		return (
			<div>
				<h2>我是body的子组件</h2>
            	// 类似vue中自定义事件($emit)
				新的age:<input type='text' onChange={ this.props.childChangeAge } 
                value={this.props.age}/>	// 更改父组件数据, 会调用render()方法, 从而子组件数据也会更新
			</div>
			)
	}
}
```

然后在父组件`body.js`中编写：

```react
import React from 'react'
import ComponentBodyChild from './bodyChild'

export default class ComponentBody extends React.Component{
	constructor(){
		// super->就是调用基类的所有初始化方法
		super()
		this.state = {
			// 初始值
			username: 'tangcaiye',
			age: 18
		}	
	}
	changeValue(event){

		// 更改 state
		this.setState({
			username:'育知'
		})
	}
	bodyChangeAge(event){

		this.setState({
			age: event.target.value
		})
	}

	render(){
		return (
			<main>
				<h1>页面的主体内容</h1>
				<p>{ this.state.username }</p>
				<p>{ this.props.userid } { this.props.username }</p>
				{/*
					通过bind方法更改this指向
				*/}
				
            	<p>我是父组件body的age:{ this.state.age }</p>
				<ComponentBodyChild childChangeAge={ this.bodyChangeAge.bind(this) }
                  age={this.state.age}/>
			</main>
			)
	}
}
```

关键代码解释：

引入`bodyChild`

```java
import ComponentBodyChild from './bodyChild'
```

在`body.js`中调用并给`ComponentBodyChild`绑定自定义事件`childChangeAge`，调用`bodyChangeAge`方法：

```react
<p>我是父组件body的age:{ this.state.age }</p>
<ComponentBodyChild childChangeAge={ this.bodyChangeAge.bind(this) }/>
```

如果要双向绑定的话，就将age作为props传到`bodyChild.js`中

```react
<ComponentBodyChild age={ this.state.age } childChangeAge={ this.bodyChangeAge.bind(this) }/>
```

然后在`bodyChild`中接收

```react
新的age:<input type='text' value={ this.props.age } onChange={ this.props.childChangeAge } />
```

### 子组件给父组件传递参数

因为在子组件中调用的是一个自定义事件，所以是无法直接传递参数的，如果要传递参数可以通过在子组件中定义`data-`属性:

```react
render(){
  return (
    <div>
      <h1>我是页面的主体部分的子组件</h1>
      <p>bodychild子组件{ this.props.userage }</p>
      <input data-num='56' data-title="react" type="text" onChange={ this.props.childChangeAge } />
    </div>
  )
}
```

关键代码：` data-num='56'`语法为`data-`加上你要传递的参数键名

然后在父组件中接收是通过dataset接收:

```react
bodyChangeAge(event){
  // console.log(event.target.dataset)
  console.log(event.target.dataset.num)
  this.setState({
    age: event.target.value
  })
}
```

关键代码： `console.log(event.target.dataset.num)`

`dataset`为data参数的集合

### 设置props的默认值

```react
import React from 'react'

export default class ComponentBodyChild extends React.Component{
	constructor(){
		// super->就是调用基类的所有初始化方法
		super()
	} 

	render(){
		return (
			<div>
				<h2>我是body的子组件</h2>
				新的age:<input type='text' value={ this.props.age } onChange={ this.props.childChangeAge } />
			</div>
			)
	}
}
// 设置默认props
ComponentBodyChild.defaultProps = {
	age: 13
}
```

关键代码，设置默认props：

```react
// 设置默认props
ComponentBodyChild.defaultProps = {
	age: 13
}
```

### 设置class

不能写class得写成`className`:

```react
<p className='red'>我是父组件body的age:{ this.state.age }</p>
```

