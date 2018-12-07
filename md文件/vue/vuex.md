# vuex是什么

Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式**。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

状态为驱动应用的数据源

[github](https://vuex.vuejs.org/zh-cn/)



# 为什么使用vuex


### 组件的问题

* 当我们的应用遇到**多个组件共享状态**时，单向数据流的简洁性很容易被破坏
* 多个视图依赖于同一状态。
* 来自不同视图的行为需要变更同一状态

一般的解决办法：使用多层嵌套来解决第一个问题，但是兄弟组件间就无能为力。

我们经常会采用父子组件直接引用或者通过事件来变更和同步状态的多份拷贝来解决第二个问题.但是以上方法都会使代码难以维护

### 最好的解决办法

将组件的共享状态(state)(即**跨组件使用的数据**)抽取出来，统一管理, **vuex在需要的时候使用**

我们的组件树构成了一个巨大的“视图”，不管在树的哪个位置，任何组件都能获取状态或者触发行为！

- Actions(响应在 **view** 上的用户输入导致的状态变化)去执行异步的操作-比如ajax, 定时器等,

  actions通过**dispatch触发**


- Mutations(处理同步操作, 如果没有异步操作, 可直接跳转到这一步)

  同步更改状态的方法, 通过**commit触发**, 不能直接触发mutation, 要以相应的type(即下面例子中的‘increment’) 调用 **store.commit** 方法

  - 还可以跟一些devtools的方法进行交互



- state(**驱动应用的数据源**)

  状态更改后影响视图



- vue组件通过dispath去发actions


- 数据是单向流动的


<img src="http://i4.buimg.com/567571/846ee636ea068725.jpg" width="500"> 


# 使用vuex

- 安装vuex

- - `cnpm install vuex --save`
  - 安装vuex并保持到package.json文件依赖中


- 在项目中引入vuex

- 使用vuex

- 初始化

  import vuex from 'vuex'

  Vue.use(vuex)

  const store = new vuex.Store({})

- 在vue实例中添加store(Vuex 通过 `store` 选项，提供了一种机制将状态从根组件“注入”到每一个子组件中（需调用 `Vue.use(Vuex)`) 子组件能通过 `this.$store`访问到, 同前面讲到的this.$store一致)



- 设置state




每一个 Vuex 应用的核心就是 store（仓库）。“store”基本上就是一个容器，它包含着你的应用中大部分的**状态 (state)**

不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地**提交 (commit) mutation**。这样使得我们可以方便地跟踪每一个状态的变化



- 编写两个组件：

- - Banana.vue

  - ```html
    - <template>
    - 	<div class=“banana”>
    - <h2>{{msg}}</h2>
    - <button @click=“addOne”>添加一个苹果</button>
    -     <button @click=“minusOne”>减少一个苹果</button>
    - 	</div>
    - </template>
    - 
    - <script>
    - export default {
    -   data(){
    -     return {
    -       msg:’i am Banana’,
    -       price:5
    -     }
    -   },
    -   methods:{
    -     addOne(){
    -       this.$store.dispatch(‘increase’,this.price);
      	
      		//以载荷形式
    -       // this.$store.commit(‘increment’,this.price);
      
      		//以对象形式
    -       // this.$store.commit({
        		type: 'increment',
                price: this.price
    		});
      		或
            this.$store.commit('increment', {
                price: this.price
    		});
    -     },
    -     minusOne(){
    -       this.$store.commit(‘decrement’,this.price);
    -     }
    -   }
    - }
    - </script>
    - 
    - <style scoped>
    - 	
    - </style>
    ```

  - Orange.vue

  - ```html
     <template>
     - 	<div class=“banana”>
       <h2>{{msg}}</h2>

     - <button @click=“addOne”>添加一个橙子</button>
     - <button @click=“minusOne”>减少一个橙子</button>
       - </div>
     - </template>
     - 
     - <script>
     - export default {
     - data(){
     - return {
     - msg:’i am Orange’,
     - price:3
     - }
     - },
     - methods:{
     - addOne(){
     - this.$store.dispatch(‘increase’,this.price);
     - // this.$store.commit(‘increment’,this.price);
     - },
     - minusOne(){
       //默认只能传递一个参数
     - this.$store.commit(‘decrement’,this.price);
     - }
     - }
     - }
     - </script>
     - 
     - <style scoped>
       - 
     - </style>
     ```


- 在最外层组件app.vue中使用它们

  ```html
  - <script>
  - import Banana from “./components/Banana”
  - import Orange from “./components/Orange”
  - export default {
  -   name: ‘app’,
  -   components:{Banana,Orange},
  -   computed:{
  -     totalPrice(){
  -       //获取store中的totalPrice作为计算属性
  -       return this.$store.state.totalPrice
  -     }
  -   }
  - }
  - </script>
  ```

  ​


- 在store中设置mutations和actions

- ```javascript
  - //如果是同步操作直接使用mutations就可以了
  - 	mutations:{
  - increment(state,price){
  - 	state.totalPrice += price
  - },
  - decrement(state,price){
  - 	state.totalPrice -= price
  - }
  - 	},
  - 	//actions只能是调用mutations，不能操作state
  - 	//处理一些异步的操作
  - 	actions:{
  - //Action 函数接受一个与 store 实例具有相同方法和属性的对象，因此你可以调用 context.commit 提交一个 mutation
  - increase(context,price){
  - 	context.commit(‘increment’,price)
  - }
  - 	}
  ```



- getters

- ```javascript
  - //获取状态集里的数据
  - 	getters:{
  - //获取totalPrice
  - getTotal(state){
  - 	//默认注入了一个state状态集
  - 	return state.totalPrice;
  - }
  - 	}
  - export default {
  -   name: ‘app’,
  -   components:{Banana,Orange},
  -   computed:{
  -     totalPrice(){
  -       //获取store中的totalPrice作为计算属性
  -       return this.$store.getters.getTotal
  -     }
  -   }
  - }
  ​
  ```
