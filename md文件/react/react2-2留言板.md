## todolist组件

编写留言板组件基础结构

```react
import React from 'react'

export default class Message extends React.Component{

	constructor(){

		super()
		this.state = {
			user: '',
			items: []
		}
	}

	componentWillMount(){
		/*this.setState({
			user: this.props.user,
			items: this.props.items
		})*/
	}
	render(){

		return (
	<div className="container">
		<div className="page-header">
			<h1>
				tangcaiye代办事项
				<span className='label label-default label-warning'>3</span>
			</h1>
		</div>
		<div className="input-group">
	      <input type="text" className="form-control" placeholder="添加任务"/>
	      <span className="input-group-btn">
	        <button className="btn btn-default btn-success" type="button">添加</button>
	      </span>
	    </div>
	    <table className="table table-striped">
	    	<thead>
	    		<tr>
	    			<th>详细内容</th>
	    			<th>是否完成</th>
	    		</tr>
	    	</thead>
	    	<tbody>
	    		<tr>
	    			<td>买牙膏</td>
	    			<td>
	    				<input type="checkbox"/>
	    			</td>
	    			<td>true</td>
	    		</tr>
	    	</tbody>
	    </table>
	</div>
			)
	}
}
```

从父组件中获取数据

```react
import React from 'react'

import Message from './components/Message'

// 留言板原始数据
var messageBoard = {
		user:'唐菜也',
		items:[{action:"买牙膏",done:false,id:1},
			{action:"给张三发邮件",done:false,id:2},
			{action:"给李四打电话",done:true,id:3},
			{action:"还信用卡",done:false,id:4}]
	}
// 组件的模板内容跟vue一样，只能有一个顶级元素
export default class App extends React.Component{

	render(){
		return (
			<div>
				<Message user={messageBoard.user} items={messageBoard.items}/>
			</div>
			)
	}
}
```

留言板组件代码：

```react
import React from 'react'
import cs from 'classnames'//引入classnames依赖库

export default class Message extends React.Component{

	constructor(){

		super()
		this.state = {
			user: '',
			items: []
		}
	}

	componentWillMount(){
		this.setState({
			user: this.props.user,
			items: this.props.items
		})
	}
	addTodo(){
		// 获取某个真实dom
		// console.log(this.refs.inputEl.value)
		var items = this.state.items
		var actionObj = {
			action: this.refs.inputEl.value,
			done: false,
			id: items[items.length-1].id+1
		}
		
		items.push(actionObj)
		this.setState({
			items: items
		})
		this.refs.inputEl.value = ""
	}
	changeDone(index){
		var items = this.state.items
		items[index].done = !items[index].done

		this.setState({
			items: items
		})
	}

	render(){

		var count = this.state.items.filter(item=>!item.done).length
		var actions = this.state.items.filter(item=>!item.done)

		return (
	<div className="container">
		<div className="page-header">
			<h1>
				{ this.state.user }代办事项
				<span className={cs('label label-default',{'label-warning':count>2,'label-success':count<=2})}>{ count }</span>
			</h1>
		</div>
		<div className="input-group">
	      <input type="text" ref="inputEl" className="form-control" placeholder="添加任务"/>
	      <span className="input-group-btn">
	        <button className="btn btn-default btn-success" type="button" onClick={ this.addTodo.bind(this) }>添加</button>
	      </span>
	    </div>
	    <table className="table table-striped">
	    	<thead>
	    		<tr>
	    			<th>详细内容</th>
	    			<th>是否完成</th>
	    		</tr>
	    	</thead>
	    	<tbody>
	    		{actions.map((item,index)=>{
	    			return (
	    				<tr key={ item.id }>
			    			<td>{ item.action }</td>
			    			<td>
			    				<input type="checkbox" checked={ item.done } onChange={ this.changeDone.bind(this,index) } />
			    			</td>
			    			<td>{ item.done.toString() }</td>
			    		</tr>
	    				)
	    		})}
	    		
	    	</tbody>
	    </table>
	</div>
			)
	}
}
```

