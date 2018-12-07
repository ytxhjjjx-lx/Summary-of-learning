# 搭建环境

## 安装vue-cli并初始化

项目效果预览：

[notes](https://coligo-io.github.io/notes-app-vuejs-vuex/)

`npm install vue-cli -g`安装到全局

安装成功以后`vue init webpack notes`

* `webpack`是vue-cli的webpack模板
* notes是项目名称
* 然后配置信息
* 进入目录执行`npm isntall`安装依赖
* `npm run dev`运行项目

## 安装vuex

进入到项目目录执行`npm install vuex --save `安装vuex并保存到package.json的依赖中



# 编写组件结构与样式

## App.vue

```html
<template>
  <div id="app"> 
    <toolbar></toolbar>  
  </div>
</template>

<script>
  //引入Toolbar.vue组件文件
import Toolbar from './components/Toolbar'

export default {
  components:{
    Toolbar
  }
}
</script>
<style type="text/css">
html, #app {
  height: 100%;
}

body {
  margin: 0;
  padding: 0;
  border: 0;
  height: 100%;
  max-height: 100%;
  position: relative;
}
</style>
```



## Toolbar.vue

```html
<template>
  <div id="toolbar">
    <i class="glyphicon glyphicon-plus"></i>
    <i class="glyphicon glyphicon-star"></i>
    <i class="glyphicon glyphicon-remove"></i>
  </div>
</template>

<script>
	
</script>
<style type="text/css">
	
#toolbar {
  float: left;
  width: 80px;
  height: 100%;
  background-color: #30414D;
  color: #767676;
  padding: 35px 25px 25px 25px;
}
#toolbar i {
  font-size: 30px;
  margin-bottom: 35px;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.5s ease;
}

#toolbar i:hover {
  opacity: 1;
}
</style>
```



运行效果：

![](http://i1.piimg.com/567571/277451653f86acf0.png)

## NoteList

首先更改app.vue中的内容：

```html
<template>
  <div id="app"> 
    <toolbar></toolbar>
    <note-list></note-list>  
  </div>
</template>

<script>
import Toolbar from './components/Toolbar'
import NoteList from './components/NoteList'

export default {
  components:{
    Toolbar,
    NoteList
  }
}
</script>
```

编写NoteList.vue的内容

```html
<template>
  <div id="notes-list">
    <div id="list-header">
      <h2>Notes</h2>
      <div class="btn-group btn-group-justified" role="group">
        <!-- All Notes button -->
        <div class="btn-group" role="group">
          <button type="button" class="btn btn-default active">
            All Notes
          </button>
        </div>
        <!-- Favorites Button -->
        <div class="btn-group" role="group">
          <button type="button" class="btn btn-default">
            Favorites
          </button>
        </div>
      </div>
    </div>
    <!-- render notes in a list -->
    <div class="container">
      <div class="list-group">
        <a class="list-group-item active" href="#">
          <h4 class="list-group-item-heading">
            noteText
          </h4>
        </a>
        <a class="list-group-item" href="#">
          <h4 class="list-group-item-heading">
            noteText
          </h4>
        </a>
      </div>
    </div>

  </div>
</template>

<script>
	
</script>
<style type="text/css">
#notes-list {
  float: left;
  width: 300px;
  height: 100%;
  background-color: #F5F5F5;
  font-family: 'Raleway', sans-serif;
  font-weight: 400;
}

#list-header {
  padding: 5px 25px 25px 25px;
}

#list-header h2 {
  font-weight: 300;
  text-transform: uppercase;
  text-align: center;
  font-size: 22px;
  padding-bottom: 8px;
}

#notes-list .container {
  height: calc(100% - 137px);
  max-height: calc(100% - 137px);
  overflow: auto;
  width: 100%;
  padding: 0;
}

#notes-list .container .list-group-item {
  border: 0;
  border-radius: 0;
}
</style>
```

运行效果：

![](http://i1.piimg.com/567571/61f2aab72774b1fa.png)

## Editor.vue

首先更改app.vue的内容

```html
<template>
  <div id="app"> 
    <toolbar></toolbar>
    <note-list></note-list> 
    <editor></editor> 
  </div>
</template>

<script>
import Toolbar from './components/Toolbar'
import NoteList from './components/NoteList'
import Editor from './components/Editor'

export default {
  components:{
    Toolbar,
    NoteList,
    Editor
  }
}
</script>
```

其次编写Editor.vue中的内容:

```html
<template>
  <div id="note-editor">
    <textarea class="form-control"></textarea>
  </div>
</template>

<script>

</script>
<style type="text/css">  
#note-editor {
  height: 100%;
  margin-left: 380px;
}

#note-editor textarea {
  height: 100%;
  border: 0;
  border-radius: 0;
}
</style>
```

运行效果：

![](http://i2.muimg.com/567571/fa8a8ae40a40f486.png)



# 编写交互及vuex处理

## store.js

在完成组件结构样式的编写后，我们开始编写交互效果

首先保证项目中已经安装了vuex，然后在根目录下新建一个vuex/store.js用于存放vuex相关内容

```javascript
//引入vue及vuex
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	/*
		notes:存储note项
		activeNote:当前正在编辑的note项
	*/
	notes:[],
	activeNote:{}
}

const mutations = {
	//ADD_NOTE添加一个note项
	ADD_NOTE(state){
		const newNote = {
			/*
				text:默认文字内容
				favorite:收藏
			*/
			text:"new Note",
			favorite:false
		}

		state.notes.push(newNote)
		console.log(state.notes);
		state.activeNote = newNote
	}
}

const actions = {
	/*
		actions处理函数接受一个 context 对象
		{
		  state,     // 等同于 store.state, 若在模块中则为局部状态
		  rootState, // 等同于 store.state, 只存在于模块中
		  commit,    // 等同于 store.commit
		  dispatch,  // 等同于 store.dispatch
		  getters    // 等同于 store.getters
		}
	*/
	addNote({commit}){

		commit('ADD_NOTE')
	}
}
const getters = {
	/*
		Getters 接受 state 作为其第一个参数
		state => state.notes为箭头函数等价于：
		function (state){
			return state.notes
		}
	*/
	notes: state => state.notes,
    activeNote: state => state.activeNote
}

export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})
```

并在main.js中引入这个store.js并注入到vue实例中

```javascript
import Vue from 'vue'
import App from './App'
import store from '../vuex/store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})
```

## Tool.vue增加交互

为Toolbarr.vue组件增加事件及处理

```html
<template>
  <div id="toolbar">
    <i @click="addOne" class="glyphicon glyphicon-plus"></i>
    <i class="glyphicon glyphicon-star"></i>
    <i class="glyphicon glyphicon-remove"></i>
  </div>
</template>

<script>
export default {
  methods:{
    addOne(){
      //通过dispatch分发到actions中的addNote
      this.$store.dispatch('addNote')
    }
  }
}
</script>
```

## NoteList增加交互

为NoteList增加交互

```html
<template>
  <div id="notes-list">
    <div id="list-header">
      <h2>Notes</h2>
      <div class="btn-group btn-group-justified" role="group">
        <!-- All Notes button -->
        <div class="btn-group" role="group">
          <button type="button" class="btn btn-default active">
            All Notes
          </button>
        </div>
        <!-- Favorites Button -->
        <div class="btn-group" role="group">
          <button type="button" class="btn btn-default">
            Favorites
          </button>
        </div>
      </div>
    </div>
    <!-- render notes in a list -->
    <div class="container">
      <div class="list-group">
        <a v-for="item in notes" class="list-group-item" v-bind:class="{active:activeNote == item}" href="#">
          <h4 class="list-group-item-heading">
            {{item.text}}
          </h4>
        </a>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  computed:{
    notes(){
      return this.$store.getters.notes
    },
    activeNote(){
      return this.$store.getters.activeNote
    }
  }
}
</script>
```

代码解释：

获取notes和activeNote

```java
export default {
  computed:{
    notes(){
      return this.$store.getters.notes
    },
    activeNote(){
      return this.$store.getters.activeNote
    }
  }
}
```

在模板中对列表进行循环并增加动态class

```html
<a v-for="item in notes" class="list-group-item" v-bind:class="{active:activeNote == item}" href="#">
  <h4 class="list-group-item-heading">
    {{item.text}}
  </h4>
</a>
```



## Editor.vue添加交互

获取激活note的文本

```javascript
export default {
  computed:{
    activeNoteText(){
      return this.$store.getters.activeNote.text
    }
  }
}
```

在模板中使用

```html
<template>
  <div id="note-editor">
    <textarea v-bind:value="activeNoteText" class="form-control"></textarea>
  </div>
</template>
```

完整代码：

```html
<template>
  <div id="note-editor">
    <textarea v-bind:value="activeNoteText" class="form-control"></textarea>
  </div>
</template>

<script>
export default {
  computed:{
    activeNoteText(){
      return this.$store.getters.activeNote.text
    }
  }
}
</script>
```

添加事件，当editor.vue中的内容发生修改的时候也会影响到notelist组件内容

```html
<template>
  <div id="note-editor">
    <textarea v-bind:value="activeNoteText" v-on:input="editNote" class="form-control"></textarea>
  </div>
</template>

<script>
export default {
  computed:{
    activeNoteText(){
      return this.$store.getters.activeNote.text
    }
  },
  methods:{
  	editNote(e){
      
  		this.$store.dispatch('editNote',e.target.value)
  	}
  }
}
</script>
```

在store.js的actions中添加editNote

```java
editNote({commit},text){

  commit("EDIT_NOTE",text)
}
```

在store.js的mutations中添加EDIT_NOTE

```javascript
EDIT_NOTE(state,text){
  state.activeNote.text = text
}
```

## NoteList增加切换选项

给所选项添加事件更改切换activeNote

```html
<a v-for="item in notes" class="list-group-item" v-bind:class="{active:activeNote == item}" v-on:click="updateActiveNote(item)" href="#">
  <h4 class="list-group-item-heading">
    {{item.text}}
  </h4>
</a>
```

并添加事件

```javascript
updateActiveNote(note){
  console.log(note)
  this.$store.dispatch('updateActiveNote',note)
}
```

在store.js中添加

actions:

```javascript
updateActiveNote({commit},note){
  commit('SET_ACTIVE_NOTE',note)
}
```

mutations:

```javascript
SET_ACTIVE_NOTE(state,note){
  state.activeNote = note
}
```



## 给Toolbar增加功能

###给收藏按钮添加事件及激活后的class

```html
<i @click="toggleFavorite" class="glyphicon glyphicon-star" v-bind:class="{starred:activeNote.favorite}"></i>
```

添加style:

```css
.starred {
  color: #F7AE4F;
}
```

事件处理：

```javascript
toggleFavorite(){
  this.$store.dispatch('toggleFavorite')
}
```

store.js中的处理：

actions:

```java
toggleFavorite({commit}){
  commit('TOGGLE_FAVORITE')
}
```

mutations:

```javascript
TOGGLE_FAVORITE(state){

  state.activeNote.favorite = !state.activeNote.favorite
}
```

### 删除note项

模板：

```html
<i @click="deleteNote" class="glyphicon glyphicon-remove"></i>
```

事件处理js:

```javascript
deleteNote(){
  this.$store.dispatch('deleteNote')
}
```

store.js中的actions:

```javascript
deleteNote({commit}){
  commit('DELETE_NOTE')
}
```

store.js中的mutations:

```javascript
DELETE_NOTE(state){

  for (var i=0; i<state.notes.length; i++){
    if (state.notes[i] == state.activeNote){
      state.notes.splice(i, 1)
    }
  }
  state.activeNote = state.notes[0]
}
```

## NoteList组件all和favorite切换

首先给NoteList组件添加一个show的data属性

```javascript
data(){
  return {
    show:'all'
  }
}
```

给模板添加动态class并绑定事件切换show:

```html
<button @click="show='all'" type="button" class="btn btn-default" v-bind:class="{active:show=='all'}">
  All Notes
</button>
```

```html
<button @click="show='favorites'" type="button" class="btn btn-default" v-bind:class="{active:show=='favorites'}">
  Favorites
</button>
```

最后修改一下notes这个计算属性：

```javascript
notes(){
  if (this.show=='all'){
    return this.$store.getters.notes
  }else if(this.show=='favorites'){
    return this.$store.getters.notes.filter(note=>note.favorite)
  }
}
```

