## http-网络请求

安装`axios`

`cnpm install axios --save`

使用：

```javascript
import http from 'axios'

http.get("http://h5.yztctech.net/api/axf/apihomehot.php")
	.then(function (data){
		console.log(data)
	})
```

安装`json-server`和`mockjs`

`cnpm install json-server mockjs`

配置`package.json`:

```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "start": "webpack-dev-server --progress --inline",
  "build": "webpack --env production",
  "mock": "node mock.js",
  "db": "json-server db.json --port 8081",
  "dev": "npm run db & npm run start"
}
```

`mockjs`中的代码:

```javascript
// 使用 Mock,梳理需求
var Mock = require('mockjs')
var fs = require('fs')
var data = Mock.mock({
  'list|1-10': [{
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      'id|+1': 1
  }]
})
// 写入到db.json
fs.writeFile('db.json', JSON.stringify(data, null, 4),  function(err) {
   if (err) {
       return console.error(err);
   }
   console.log("数据写入成功！");
});
```



## react-router

安装：

`cnpm install react-router-dom --save`

引入模块：

```react
import {
  HashRouter as Router, (相当于vue: router-view)
  Route, (配置)
  Link (相当于vue: router-link)
} from 'react-router-dom'
```

编写3个组件并引入：

```javascript
import Home from './components/home'
import Cart from './components/cart'
import Mine from './components/mine'
```

设置路由：

```react
export default class App extends React.Component{
	
	render(){
		
		return (
			<Router>
				<div>
					{/* Link类似vue的router-link */}
                    <Link to="/">Home</Link><br/>
                    <Link to="/cart">Cart</Link><br/>
                    <Link to="/mine">Mine</Link><br/>
                  	// 路由配置表
                  	// 	完全匹配
					<Route exact path="/" component={Home}/>
        			<Route path="/cart" component={Cart}/>
        			<Route path="/mine" component={Mine}/>
				</div>
			</Router>
			)
	}
}



//显示结果:
<div>
  	<a>Home</a>
    ...
    ...
  	//路由信息
  	<div>home</div>
</div>
```

> 在上面的基础示例中，子组件均使用了extends 去继承React.Component，如果只是简单的视图内容，可以使用简单的函数去书写

```react
// import Mine from './components/mine'
// 简写
const Mine = ()=>(
  <div>
  	<h1>我的页面</h1>
  </div>
)
```

**代码解析**

1. `<Link/> `     配置路由访问 ，将被渲染为a标签
2. to 点击链接要跳转到的路由路径
3. path   匹配的路径  与 link to 匹配
4. component    当匹配规划成立时，要渲染的组件
5. exact     *Boolean*   是否完全匹配（参照下文中isExact）注意：当没有设置具体路径名称时，比如上面示例中的  /   ，exact必须添加，否则会发生模糊匹配



### 嵌套路由

在基础示例中的app.js中补充一个items路由配置:

Items.js

```javascript
import React from 'react'
import {HashRouter as Router, Link, Route} from "react-router-dom"
import Item from './item'

export default class ComponentItems extends React.Component{

	render(){
		return (
			<div>
	            <h1>商品</h1>
	            <Link to={`${this.props.match.url}/TV`}>电视</Link>
	            <Route path={`${this.props.match.url}/TV`} component={Item}></Route>
	            <Route exact path={this.props.match.url} render={() => (
	                <h3>请选择一类商品</h3>
	            )}/>
	        </div>
			)
	}
}
```

item.js

```javascript
import React from 'react'

export default class ComponentTv extends React.Component{

	render(){
		return (
			<div>
				<h1>详情商品</h1>
			</div>
			)
	}
}
```



**代码解析**

1. match 匹配对象

   - params 动态设置的路由参数

   - isExact 是否完全匹配（没有后面的斜线）

     设置匹配路径               实际地址路径                              exact                                 是否匹配                      

   | `/one` | `/one/two` | `true`  | no   |
   | ------ | ---------- | ------- | ---- |
   | `/one` | `/one/two` | `false` | yes  |

   - path 匹配路径（Route中设置的path）

   - url 路径（Link中设置的to）

   - 可在如下场景中获取match对象(最常用的两种)

     - 当使用Component编写时 通过 this.props.match获取（上面的示例中）

     - 当使用普通的render函数

       ```javascript
       const Com = ({match})=>(
           <div>
               <h1>{mathc.url}</h1>
           </div>
       )
       ```

2. render 配合在当前示例中时，表示未匹配子路由时，渲染一个静态内容

### 路由参数

对Items.js进行修改如下：

```javascript
import React from 'react'
import {HashRouter as Router, Link, Route} from "react-router-dom"
import Item from './item'

export default class ComponentItems extends React.Component{
	render(){
		return (
			<div>
	            <h1>商品</h1>
	            <Link to={`${this.match.url}/TV`}>电视</Link><br/>
	            <Link to={`${this.match.url}/phone`}>手机</Link><br/>
            	<Link to={`${this.match.url}/compute`}>电脑</Link>
	            <Route path={`${this.match.url}/:type`} component={Item}></Route>
	            <Route exact path={this.match.url} render={() => (
	                <h3>请选择一类商品</h3>
	            )}/>
	        </div>
			)
	}
}
```

对item.js进行修改如下:

```javascript
import React from 'react'

export default class ComponentItem extends React.Component{

	render(){
      	console.log(this.props.match.params)
		return (
			<div>
				<h1>
					具体详情
					{this.props.match.params.type}
				</h1>
			</div>
			)
	}
}
```

## redux

[中文文档地址](http://cn.redux.js.org/index.html)

[官方文档](http://redux.js.org/)

Redux 是 JavaScript 状态容器，提供可预测化的状态管理。

不要为了使用`redux`而去使用redux

redux作者文章：

[也许你不必使用 Redux](http://qianduan.guru/2016/09/25/you-might-not-need-redux/)

[原文地址](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367)

redux运行流程：

<img src="http://pic.w2bc.com/upload/201705/19/201705191136191899.jpg" width="500"/>

### redux的安装

```
cnpm i react-redux redux
```

为什么会有两个，因为`redux`本身就是一个工作流，不是只能工作于`react`的,比如`angular`中就也可以使用.

### redux简介

#### action

是行为的抽象，功能上类似于vuex的actions,需要返回一个对象，这个对象必须拥有一个type属性.一般是由方法生成的

```js
function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}
```

#### reducer

**Reducers** 指定了应用状态的变化如何响应 [actions](http://cn.redux.js.org/docs/basics/Actions.html) 并发送到 store 的，记住 actions 只是描述了*有事情发生了*这一事实，并没有描述应用如何更新 state。

性质上类似于`vuex`中的`mutations`,传入旧状态和action，返回新状态.

```js
function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      })
    default:
      return state
  }
}
```

注意:

1. **不要修改 state。** 使用 [`Object.assign()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) 新建了一个副本。不能这样使用 `Object.assign(state, { visibilityFilter: action.filter })`，因为它会改变第一个参数的值。你**必须**把第一个参数设置为空对象。你也可以开启对ES7提案[对象展开运算符](http://cn.redux.js.org/docs/recipes/UsingObjectSpreadOperator.html)的支持, 从而使用 `{ ...state, ...newState }` 达到相同的目的。
2. **在 default 情况下返回旧的 state。**遇到未知的 action 时，一定要返回旧的 `state`。
3. Reducer 永远不应该更改原有 state，应该始终返回新的对象，否则，React Redux 觉察不到数据变化。

#### store

我们学会了使用 [action](http://cn.redux.js.org/docs/basics/Actions.html) 来描述“发生了什么”，和使用 [reducers](http://cn.redux.js.org/docs/basics/Reducers.html) 来根据 action 更新 state 的用法。

**Store** 就是把它们联系到一起的对象。Store 有以下职责：

- 维持应用的 state；
- 提供 [`getState()`](http://cn.redux.js.org/docs/api/Store.html#getState) 方法获取 state；
- 提供 [`dispatch(action)`](http://cn.redux.js.org/docs/api/Store.html#dispatch) 方法更新 state；
- 通过 [`subscribe(listener)`](http://cn.redux.js.org/docs/api/Store.html#subscribe) 注册监听器;
- 通过 [`subscribe(listener)`](http://cn.redux.js.org/docs/api/Store.html#subscribe) 返回的函数注销监听器。

再次强调一下 **Redux 应用只有一个单一的 store**。当需要拆分数据处理逻辑时，你应该使用 [reducer 组合](http://cn.redux.js.org/docs/basics/Reducers.html#splitting-reducers) 而不是创建多个 store。

类似于`vuex`中的store对象.

### 案例

main.js:

```javascript
import React from 'react'
import ReactDOM from 'react-dom'

//<Provider store> 使组件层级中的 connect() 方法都能够获得 Redux store。正常情况下，你的根组件应该嵌套在 <Provider> 中才能使用 connect() 方法。
import { Provider } from 'react-redux'
// 引入redux ，并获取它里面一个叫createStore 的方法
import {createStore} from 'redux'
// 引入reducers
import reducers from './redux/reducers'
//初始化
const store = createStore(reducers)

// 引入app组件
import App from './app'

ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('app')
	)
```

app.js:

```javascript
import React from 'react'
import { connect } from 'react-redux'
// 引入actions
import actions from './redux/actions'

// 引入香蕉
import Banana from './components/banana'
// 引入苹果
import Apple from './components/apple'

class App extends React.Component{

	constructor(){
		super()
	}

	render(){
		return (
			<div>
				总数：{this.props.value}
				<Banana/>
				<Apple/>
			</div>
			)
	}
}

// 获取state
const mapStateToProps = (state) => {
	return {
		value: state.count
	}
}

//关联state, 每一个需要操作redux的组件都需要这一步操作, 将该组件与redux进行连接,
//连接操作不会改变原来的组件类。返回一个新的已与 Redux store 连接的组件类。
export default connect(mapStateToProps)(App)
```

reducers.js:

```javascript
//初始化state
const initState = {
  // 所有水果的总数
  count: 0
}

// 设置state的初始默认值为false
export default (state = initState, action)=>{

	// 判断action 传过来的是啥并执行对应的处理
	switch (action.type){
		// 添加
		case "ADD":
       		// 返回新的对象,如果不是新的对象不糊更新视图 	
			return {count: state.count + action.price}
		// 减少
		case "SUB":
			return {count: state.count - action.price}
		default:
			return state
	}
}
```

actions:

```javascript
// 定义一些action的方法
export default {
	increce(price){
		// 异步的操作
		return {type: 'ADD',price: price}
	},
	decrece(price){
		return {type: 'SUB',price: price}
	}
}
```

banana:

```javascript
import React from 'react'

import {connect} from 'react-redux'
import actions from '../redux/actions'

class Banana extends React.Component{

	constructor(){
		super()
		this.state = {
			price: 5
		}
	}
	addOne(){
		this.props.dispatch(actions.increce(this.state.price))
	}
	decOne(){
		this.props.dispatch(actions.decrece(this.state.price))
	}
	render(){
		return (
			<div>
				<h1>香蕉</h1>
				<button onClick={this.addOne.bind(this)}>买一个</button>
				<button onClick={this.decOne.bind(this)}>减一个</button>
			</div>
			)
	}
}

// 获取state
const mapStateToProps = (state) => {
	return {
		value: state.count
	}
}

//关联state
export default connect(mapStateToProps)(Banana)
```

apple.js:

```javascript
import React from 'react'

import {connect} from 'react-redux'
import actions from '../redux/actions'

class Apple extends React.Component{

	constructor(){
		super()
		this.state = {
			price: 3
		}
	}
	addOne(){
		this.props.dispatch(actions.increce(this.state.price))
	}
	decOne(){
		this.props.dispatch(actions.decrece(this.state.price))
	}
	render(){
		return (
			<div>
				<h1>苹果</h1>
				<button onClick={this.addOne.bind(this)}>买一个</button>
				<button onClick={this.decOne.bind(this)}>减一个</button>
			</div>
			)
	}
}

// 获取state
const mapStateToProps = (state) => {
	return {
		value: state.count
	}
}

//关联state
export default connect(mapStateToProps)(Apple)
```

### 异步操作

默认情况下，[`createStore()`](http://cn.redux.js.org/docs/api/createStore.html) 所创建的 Redux store 没有使用 [middleware](http://cn.redux.js.org/docs/advanced/Middleware.html)(中间件)，所以只支持 [同步数据流](http://cn.redux.js.org/docs/basics/DataFlow.html)。

你可以使用 [`applyMiddleware()`](http://cn.redux.js.org/docs/api/applyMiddleware.html)来启用middleware , 来增强 [`createStore`](http://cn.redux.js.org/docs/api/createStore.html)使他支持异步操作.

像 [redux-thunk](https://github.com/gaearon/redux-thunk) 或 [redux-promise](https://github.com/acdlite/redux-promise) 这样支持异步的 middleware 都包装了 store 的 [`dispatch()`](http://cn.redux.js.org/docs/api/Store.html#dispatch) 方法，以此来让你 dispatch 一些除了 action 以外的其他内容，例如：函数或者 Promise。你所使用的任何 middleware 都可以以自己的方式解析你 dispatch 的任何内容

安装: 

cnpm  i  [redux-thunk](https://github.com/gaearon/redux-thunk)  -S

main.js

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.js'

import thunkMiddleware from 'redux-thunk'

// 1.引入redux
import { Provider } from 'react-redux'
// 引入redux ，并获取它里面一个叫createStore 的方法
import { createStore, applyMiddleware } from 'redux'
// 引入reducers
import reducers from './redux/reducers'
//初始化, 扩充store功能, 使他支持异步
const store = createStore(reducers, 
  applyMiddleware(thunkMiddleware))

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById("app")
)
```

actions.js:

```javascript
// 接收操作类型和参数
export default (redit, price) => {
    //console.log(subreddit)
    return function (dispatch) {

        return new Promise((resolve, reject) => {
            setTimeout(function () {
              	resolve({ type: redit, price: price })
            }, 5000)
        })
        .then(res => {
          console.log(res.type)
            // 调用reducers的同步操作,更改state
            dispatch(res)
        })
    } 
}

//也可以写作如下形式
export default (redit, price) => {
    return function (dispatch) {
        setTimeout(() => {
          	console.log(redit)
            dispatch({
                type: redit,
                price: price
            })
        }, 2000)
    }
}
```

apple.js 做如下修改

```javascript
import React from 'react'

import { connect } from 'react-redux'
import { fetchPosts} from '../redux/actions'
// console.log(fetchPostsIfNeeded)

class Apple extends React.Component {
  constructor() {
    super()
    this.state = {
      price: 5
    }
  }
  add () {
    
    this.props.add(this.state.price)
    // this.props.dispatch(fetchPostsIfNeeded(this.state.price))
  }
  sub () {
    this.props.sub(this.state.price)
  }
  // 渲染
  render() {
    return (
      <div>
        <h1>我是apple</h1>
        <button onClick={this.add.bind(this)}>加一个</button>
        <button onClick={this.sub.bind(this)}>减一个</button>
      </div>
    )
  }
}
// 获取state
const mapStateToProps = (state) => {
  return {
    value: state.count
  }
}
// 遍历dispatch然后将它添加到组件的props中
const mapDispatchToProps = (dispatch) => {
  // console.log(arguments)
  return {
    add: (price) => {
      // 将操作类型和参数传递过去
      dispatch(fetchPosts('ADD', price))
    },
    sub: (price) => {
      dispatch(fetchPosts('SUB', price))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Apple)
```

