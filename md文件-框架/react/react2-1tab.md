## tab切换组件

tab切换这个组件的设计思路就是通过想组件传递数据，创建结构及功能

原始数据结构：

```javascript
var tabs = [
  {btn:"home",content:"HOME",id:1},
  {btn:"cart",content:"CART",id:2},
  {btn:"mine",content:"MINE",id:3},
  {btn:"bb",content:"BB",id:4}
]
```

### 结构

首先编写组件结构及样式，结构由传递的参数来生成.

```react
import React from 'react'

export default class Tab extends React.Component{

	constructor(){
		// super->就是调用基类的所有初始化方法
		super()
		this.state = {
          	// 初始化数据结构
			tabs: []
		}
	}
  	// 在获取到props，组件即将被装载的时候将tabs设置为传递过来的tabs属性
	componentWillMount(){
		this.setState({
			tabs: this.props.tabs
		})
	}
  	// 根据state的值来循环生成结构
	render(){
		return (
			<div className='tab'>
				{this.state.tabs.map((item,index)=>{
					return <button key={item.id}>{item.btn}</button>
				})}
				{this.state.tabs.map((item,index)=>{
					return <div key={item.id}>{item.content}</div>
				})}
			</div>
			)
	}
}


```

### 样式

样式是只属于tab组件,所以也需要模块化，另外我还想使用`less`来编写样式

1. 首先安装所需的模块`cnpm install style-loader css-loader less-loader less --save`


2. 在`webpack.config.js`中配置：

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
        query: {
          presets: ['react', 'es2015']
        }
      },
      { test: /\.(css|less)$/, loader: 'style-loader!css-loader!less-loader'}
    ]
  },
  // 输出设置
  output: {
    path: __dirname,
    filename: "src/bundle.js"
  },
  // 需要手动刷新页面
  // watch: true
};
```

关键代码,配置less文件处理方式：

```javascript
 { test: /\.(css|less)$/, loader: 'style-loader!css-loader!less-loader'}
```

3. 在`tab.js`同级目录创建`tab.less`并编写less代码：

```less
@size:200px;
.tab{
	button{
		&.active{
			background-color: yellow;
		}
	}
	div{
		width: @size;
		height: @size;
		background-color: #ccc;
		display: none;
		&.active{
			display: block;
		}
	}
}
```

在`tab.js`组件中引入:

```javascript
import './tab.less'
```

### 添加动态class

初始化一个`activeIndex`并给`tab.js`中的jsx代码添加class:

```react
import React from 'react'
import './tab.less'

export default class Tab extends React.Component{


	constructor(){
		// super->就是调用基类的所有初始化方法
		super()
		this.state = {
			tabs: [],
			activeIndex:0
		}
	}
	componentWillMount(){
		this.setState({
			tabs: this.props.tabs
		})
	}
	render(){

		return (
			<div className='tab'>
				{this.state.tabs.map((item,index)=>{
					return <button key={item.id} className={this.state.activeIndex==index?"active":""}>{item.btn}</button>
				})}
				{this.state.tabs.map((item,index)=>{
					return <div key={item.id} className={this.state.activeIndex==index?"active":""}>{item.content}</div>
				})}
			</div>
			)
	}
}
```

关键代码：

```react
{this.state.tabs.map((item,index)=>{
  return <button key={item.id} className={this.state.activeIndex==index?"active":""}>{item.btn}</button>
})}
```

判断`activeIndex`是不是等于`index`，如果是就返回`active`

### 添加交互

给`button`添加交互

```react
{this.state.tabs.map((item,index)=>{
  return <button key={item.id} className={this.state.activeIndex==index?"active":""} onClick={this.changeIndex.bind(this,index)}>{item.btn}</button>
})}
```

并添加对应的方法：

```react
changeIndex(index){
  this.setState({
    activeIndex: index
  })
}
```

完整代码：

```react
import React from 'react'
import './tab.less'

export default class Tab extends React.Component{


	constructor(){
		// super->就是调用基类的所有初始化方法
		super()
		this.state = {
			tabs: [],
			activeIndex:0
		}
	}
	componentWillMount(){
		this.setState({
			tabs: this.props.tabs
		})
	}
	changeIndex(index){
		this.setState({
			activeIndex: index
		})
	}
	render(){

		return (
			<div className='tab'>
				{this.state.tabs.map((item,index)=>{
					return <button key={item.id} className={this.state.activeIndex==index?"active":""} onClick={this.changeIndex.bind(this,index)}>{item.btn}</button>
				})}
				{this.state.tabs.map((item,index)=>{
					return <div key={item.id} className={this.state.activeIndex==index?"active":""}>{item.content}</div>
				})}
			</div>
			)
	}
}
```

然后你就可以在任意地方使用这个tab组件了.

```react
import React from 'react'

import Tab from './components/tab'
// 组件的模板内容跟vue一样，只能有一个顶级元素
export default class App extends React.Component{

	render(){
		
		var tabs = [
				{btn:"home",content:"HOME",id:1},
				{btn:"cart",content:"CART",id:2},
				{btn:"mine",content:"MINE",id:3},
				{btn:"bb",content:"BB",id:4}
			]
		var tabs2 = [
				{btn:"home2",content:"HOME2",id:5},
				{btn:"cart2",content:"CART2",id:6},
				{btn:"mine2",content:"MINE2",id:7},
				{btn:"bb2",content:"BB2",id:8}
			]

		return (
			<div>
				<Tab tabs={tabs} />
				<Tab tabs={tabs2} />
			</div>
			)
	}
}
```

效果：

<img src="https://ooo.0o0.ooo/2017/06/19/59479fc1e0e4d.png" width="300"/>

