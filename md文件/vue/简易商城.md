# store

在创建好vue项目后，引入bootstrap.css并编写组件：

## 组件

### app.vue

```html
<template>
  <div id="app">
    <store-head></store-head>
    <router-view></router-view>
  </div>
</template>

<script>
import storeHead from "./components/header"

export default {
  name: 'app',
  components:{
    storeHead
  }
}
</script>

<style>
@import "assets/css/bootstrap.min.css";
</style>

```



### header.vue

```html
<template>
	<div class="container-fluid">
		<div class="navbar navbar-inverse">
			<a class="navbar-brand" href="/">商店</a>
			<div class="navbar-right">
				<div class="navbar-text">
					<b>你的购物车</b>
					0 件,￥0.00
				</div>
				<a href="/checkout" class="btn btn-default navbar-btn">checkout</a>
			</div>
		</div>
	</div>
</template>
<style>
.navbar-right{
	float: right !important;
	margin-right: 5px;
}
.navbar-text{
	margin-right: 10px;
}	
</style>
```

### products.vue

```html
<template>
	<div class="container-fluid">
		<div class="panel panel-default row">
			<div class="col-xs-3">
				<a class="btn btn-block btn-default btn-lg" href="###">所有商品</a>
				<a class="btn btn-block btn-default btn-lg" href="###">分类1</a>
				<a class="btn btn-block btn-default btn-lg" href="###">分类2</a>
			</div>
			<div class="col-xs-8">
				<div class="well">
					<h3>
						<strong>商品1</strong>
						<span class="pull-right label label-primary">￥100.00</span>
					</h3>
					<div class="description">
						<span class="lead">商品描述</span>
						<button class="btn btn-success pull-right">添加到购物车</button>
					</div>
				</div>
				<div class="well">
					<h3>
						<strong>商品2</strong>
						<span class="pull-right label label-primary">￥200.00</span>
					</h3>
					<div class="description">
						<span class="lead">商品描述</span>
						<button class="btn btn-success pull-right">添加到购物车</button>
					</div>
				</div>
				<div class="pull-right btn-group">
					
					<a class="btn btn-default btn-primary">
						1
					</a>
					<a class="btn btn-default">
						2
					</a>
				</div>
			</div>
		</div>
	</div>
</template>
<style type="text/css">
	
</style>
```

### checkout.vue

```html
<template>
<div class="container-fluid">
	<h2>你的购物车</h2>
	<div class="alert alert-warning">
		这个购物车中没有任何商品
		<a href="/" class="alert-link">点击这里返回购物</a>
	</div>
	<div>
		<table class="table">
			<thead>
				<tr>
					<th>数量</th>
					<th>商品名称</th>
					<th class="text-right">单价</th>
					<th>小计</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td class="text-center store-number">
						<div class="input-group">
						  <div class="input-group-btn">
						    <button type="button" class="btn btn-default">-</button>
						  </div>
						  <input type="text" class="form-control">
						  <div class="input-group-btn">
						    <button type="button" class="btn btn-default">+</button>
						  </div>
						</div>
					</td>
					<td class="text-left">商品名称</td>
					<td class="text-right">￥单价</td>
					<td class="text-right">小计</td>
					<td>
						<button class="btn btn-sm btn-warning">删除</button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
</template>
<style type="text/css">
.store-number{
	width: 20%;
}	
</style>
```

### 设置路由

```javascript
import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import products from "@/components/products"
import checkout from "@/components/checkout"

Vue.use(Router)

export default new Router({
	mode: 'history',
  routes: [
    {
      path: '/',
      component: products
    },
    {
      path: '/checkout',
      component: checkout
    }
  ]
})

```

### 创建模拟数据

安装`vue-resource`,`vuex`，并使用：

vuex文件夹内容：

```javascript
//引入vue及vuex
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {

}
const mutations = {

}
const actions = {
	
}

export default new Vuex.Store({
	state,
	mutations,
	actions
})
```

main.js内容：

```javascript
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'
import Resource from 'vue-resource'

//使用vue-resourece
Vue.use(Resource)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

```

安装`json-server`并设置代理:

创建`db.json`并放置在根目录下:

```json
{
	"products":[
		{"id":"1","name":"商品1","description":"一个商品","category":"category #1","price":100},
		{"id":"2","name":"商品2","description":"一个商品","category":"category #1","price":110},
		{"id":"3","name":"商品3","description":"一个商品","category":"category #2","price":210},
		{"id":"4","name":"商品4","description":"一个商品","category":"category #3","price":202}
	]
}
```

配置`json-server`服务器：

在dev-server.js中添加代码：

```javascript
const jsonServer = require('json-server')
const apiServer = jsonServer.create()
const apiRouter = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

apiServer.use(middlewares)
apiServer.use(apiRouter)
apiServer.listen(port+1, () => {
  console.log('JSON Server is running')
})
```

设置代理：

在`config/index.js`中的设置proxyTable的值为：

```javascript
proxyTable: {
  '/products': {
    target: 'http://127.0.0.1:8081/'
  }
}
```

### 添加交互

从`json-server`中读取数据，在products.vue中添加一个data为products

```javascript
data(){
  return {
    products:[]
  }
}
```

然后发请求获取数据：

```javascript
created(){
  this.$http.get("/products")
    .then(data=>{
    this.products = data.body
  })
}
```

在页面将数据循环输出：

```html
<div class="well" v-for="(item,index) in products">
  <h3>
    <strong>{{item.name}}</strong>
    <span class="pull-right label label-primary">￥{{item.price}}</span>
  </h3>
  <div class="description">
    <span class="lead">{{item.description}}</span>
    <button class="btn btn-success pull-right">添加到购物车</button>
  </div>
</div>
```

但我们这个列表应该是根据左边的分类来显示的，所以还要将左边的分类显示出来：

```javascript
categorys(){
  var results = [];
  var keys = {};
  for (var i=0; i<this.products.length; i++){
    var val = this.products[i]["category"];
    if (!keys.hasOwnProperty(val)){
      keys[val] = true;
      results.push(val);
    }
  }
  return results;
}
```

categorys是一个计算属性，用于返回分类，然后在页面中显示：

```html
<a class="btn btn-block btn-default btn-lg" href="###" v-for="(item,index) in categorys" @click="changeCategory(item)" v-bind:class="{active:item==selectedCategory}">{{item}}</a>
```

并给按钮绑定事件，如果修改category的话，列表也要发生变化，在data中添加了selectedCategory用于保存选择的分类,acitveIndex用于保存现在选择的页数：

```javascript
data(){
  return {
    products:[],
    acitveIndex:0,
    selectedCategory:null
  }
}
```

changeCategory和changeIndex方法：

```javascript
methods:{
		changeIndex(newIndex){
			this.acitveIndex = newIndex
		},
		changeCategory(category){
			if (category=="all"){
				this.selectedCategory = null
			}else{
				this.selectedCategory = category
			}
		}
	}
```

然后添加一个计算属性，用于返回根据分类选择的列表：

```javascript
productList(){

  if (this.selectedCategory == null){
    return this.products
  }else{
    return this.products.filter(item=>this.selectedCategory == item.category)
  }
}
```

然后再添加分页的功能代码：

首先要先获取到页面,通过pageNum这个计算属性获取：

```javascript
pageNum(){
  return Math.ceil(this.productList.length/pageSize)
}
```

然后在页面中循环输出：

```html
<a class="btn btn-default" v-for="(item,index) in pageNum" v-bind:class="{'btn-primary':acitveIndex==index}" @click="changeIndex(index)">
  {{item}}
</a>
```

同时列表依赖的属性也变成nowProducts这个计算属性：

```javascript
nowProducts(){
  // console.log(this.productList)
  var start = this.acitveIndex*pageSize;
  return this.productList.slice(start,start+pageSize)
}
```

## vuex设置

### state

```javascript
const state = {
	products:[
		/*{
			id:1,
			name:"商品1",
			price:112,
			num:1
		}*/
	]
}
```

### mutations

```javascript
const mutations = {
	//添加一个商品到购物车
	addStore(state,item){
		var product = {
			id:item.id,
			name:item.name,
			price:item.price,
			num:1
		}
		var products = state.products
		if (products.length==0){
			products.push(product)
			return
		}
		for (var i=0; i<products.length; i++){
			if (products[i].id == product.id){
				products[i].num++;
				return;
			}
		}
		if(i==products.length){
			products.push(product)
		}
	}
}
```

在products中编写点击添加到购物车按钮时候的操作

```javascript
//添加商品到vuex状态中
addStore(item){
  this.$store.commit("addStore",item)
}
```

### header.vue组件设置

header.vue这个组件中需要获取总金额和商品的总数，在vuex的getters中：

```javascript
const getters = {
	//返回总金额
	total(state){
		var products = state.products
		var result = 0
		for (var i=0; i<products.length; i++){
			//productPrice小计
			var productPrice = products[i].price*products[i].num
			result += productPrice
		}
		return result
	},
	//返回购买商品的总数
	sum(state){
		var products = state.products
		var result = 0
		for (var i=0; i<products.length; i++){
			result += Number(products[i].num)
		}
		return result
	},
	products(state){
		return state.products
	}
}
```

在header.vue中获取并设置

```html
<template>
	<div class="container-fluid">
		<div class="navbar navbar-inverse">
			<!-- <a class="navbar-brand" href="/">商店</a> -->
			<router-link to="/" class="navbar-brand">商店</router-link>
			<div class="navbar-right">
				<div class="navbar-text">
					<b>你的购物车</b>
					{{sum}} 件,￥{{total}}.00
				</div>
				<router-link to="/checkout" class="btn btn-default navbar-btn">checkout</router-link>
				<!-- <a href="/checkout" class="btn btn-default navbar-btn">checkout</a> -->
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
export default {
	computed:{
		//获取总价
		total(){
			return this.$store.getters.total
		},
		//获取数量
		sum(){
			return this.$store.getters.sum
		}
	}
}	
</script>
<style>
.navbar-right{
	float: right !important;
	margin-right: 5px;
}
.navbar-text{
	margin-right: 10px;
}	
</style>
```

### checkout.vue组件设置

获取sum，然后在页面中根据sum的数量来决定该显示table还是提醒：

```html
<template>
<div class="container-fluid">
	<h2>你的购物车</h2>
	<div class="alert alert-warning" v-show="sum==0">
		这个购物车中没有任何商品
		<router-link to="/" class="alert-link">点击这里返回购物</router-link>
	</div>
	<div v-show="sum>0">
```

获取products，在table循环显示，并添加对数量的处理方法

```html
<template>
<div class="container-fluid">
	<h2>你的购物车</h2>
	<div class="alert alert-warning" v-show="sum==0">
		这个购物车中没有任何商品
		<router-link to="/" class="alert-link">点击这里返回购物</router-link>
	</div>
	<div v-show="sum>0">
		<table class="table">
			<thead>
				<tr>
					<th>数量</th>
					<th>商品名称</th>
					<th class="text-right">单价</th>
					<th>小计</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item,index) in products">
					<td class="text-center store-number">
						<div class="input-group">
						  <div class="input-group-btn">
						    <button type="button" class="btn btn-default" @click="reduce(item)">-</button>
						  </div>
						  <input type="number" class="form-control" v-model="item.num" min="0">
						  <div class="input-group-btn">
						    <button type="button" class="btn btn-default" @click="add(item)">+</button>
						  </div>
						</div>
					</td>
					<td class="text-left">{{item.name}}</td>
					<td class="text-right">￥{{item.price}}</td>
					<td class="text-right">{{item.price*item.num}}</td>
					<td>
						<button class="btn btn-sm btn-warning" @click="del(item)">删除</button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
</template>
<script type="text/javascript">
export default {
	methods:{
		// 减数量
		reduce(item){
			var products = this.products;
			for (var i=0; i<products.length; i++){
				if (products[i].id == item.id){
					if (products[i].num>0){
						products[i].num--;
					}
					break;
				}
			}
		},
		// 加数量
		add(item){
			var products = this.products;
			for (var i=0; i<products.length; i++){
				if (products[i].id == item.id){
					products[i].num++;
					break;
				}
			}
		},
		// 移除
		del(item){
			var products = this.products;
			for (var i=0; i<products.length; i++){
				if (products[i].id == item.id){
					products.splice(i, 1)
				}
			}
		}
	},
	computed:{
		sum(){
			return this.$store.getters.sum
		},
		products(){
			return this.$store.getters.products
		}
	}	
}
</script>
<style type="text/css">
.store-number{
	width: 20%;
}	
</style>
```

