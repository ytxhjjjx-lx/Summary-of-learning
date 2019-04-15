# this的五种不同情形
## 1.默认情况
 **在默认的,纯粹的函数调用时,视作全局性调用,此时的this指向window对象;** 

```
window.x = 'Jackie'

function func() {
  console.log(this.x)
}

func() // Jackie
```
 `在严格模式（"use strict"）下,会禁止this指向全局对象,此时的this会是undefined;` 


## 2.作为对象的方法调用
 **此时,this指向调用这个方法的对象;** 

```javascript
var x = 'Property of Window'

var obj = {}
obj.x = 'Property of obj'
obj.f = function () {
    console.log(this.x)
}

obj.f() // Property of obj

// 值得注意的情况
var f = obj.f
f() // Property of Window, 此处等同于window.f()
```

## 3.call、apply和bind 的显式绑定
 **call、apply和bind,都可以改变一个函数的this指向;**    

### call和apply
 **call和apply,会将它们的调用对象的this,指向它们的第一个参数;** 

```
function f () {
  console.log(this.x)
}

var x = 'Property of Window'

var obj = {
  x: "Property of obj"
}

f.apply(obj)     // "Property of obj"
```
 `当传入的第一个参数为undefined,或者不传入参数时,在非严格模式下,自动会将this指向全局对象Global,在浏览器里是window对象;  严格模式下,则是undefined;` 

```
function f () {
  console.log(this)
}

f.apply()             // window
f.apply(undefined)     // window

function ff () {
  'use strict'
  console.log(this)
}
ff.apply()             // undefined
ff.apply(undefined) // undefined
```
 `call和apply没有本质区别,唯一的区别在于:`     
  `call()方法,接受的是若干个参数的列表;`      
  `apply()方法,接受的是一个包含多个参数的数组;` 


### bind
 **bind,将第一个参数,绑定当调用函数的this上,并将这个函数返回(不执行);**   

```
function f () {
  console.log(this.x)
}

var x = 'Property of Window'

var obj = {
  x: "Property of obj"
}

var ff = f.bind(obj)
ff() // "Property of obj"
```


## 4.构造函数
 **当一个函数被当做构造函数,用new关键字新建一个对象的时候,这个函数内部的this以及原型链上的this,都会指向这个新建的对象;**  

```
function Jackie(para) {
  this.para = para
  console.log(this)
}
Jackie.prototype.log = function(){
  console.log(this)
}

Jackie('hehe')                 // Window
var p = new Jackie('haha')     // Jackie {para: "haha"}
p.log()                     // Jackie {para: "haha"}
```


## 5.其他值得注意的绑定
### 放在超时代码里
 **JavaScript中超时调用的代码,都是在全局作用域中执行的,因此函数中this的值会指向window对象,在严格模式下也一样;     
 因为超时调用的代码,都会有一个隐式绑定:**      `setTimeout(f, time) == setTimeout(f.bind(window), time)` 

```javascript
"use stric"
var x = 'Property of Window'

var obj = {
    x: 'Property of obj',
    ff: function () {
    	var x = 3;
        setTimeout(function () {
        	var x = 1;
            console.log(this.x)
        }, 100)
    }
}
obj.ff()     // Property of Window

// 可以这么解决问题
obj.ff = function () {
    var that = this
    setTimeout(function () {
        console.log(that.x)
    }, 100)
}
obj.ff()     // Property of obj
```

### 事件监听函数中的this
 **事件监听函数中的this,指向监听对象;** 

```javascript
var one = document.getElementById('one')
one.onclick = function () {
  console.log(this)
};

one.click() // <div id="one"></div>
```


### 箭头函数
 **箭头函数中this的指向,在函数定义时即绑定完毕即与定义时所处环境中的this指向相同 ,且后续无法更改;** 

```javascript
var obj = {
  x: 1
}
var f1 = () => {
  console.log(this)
}
f1.apply(obj) // Window


var f2 = function () {
  var f3 = () => {
    console.log(this) //此处this指向与函数f2中this指向相同
  }
  return f3
}
var f4 = f2.apply(obj)
f4() // Object {x: 1}
```

```javascript
function foo() {
  setTimeout(() => {
    console.log('id:', this.id); //此处this指向与函数f2中this指向相同
  }, 100);
}

var id = 21;

foo.call({ id: 42 }); // id: 42
```

## 6.绑定的优先级
```
var obj = {x: 0, name: 'obj'}
var robj = {x: -1, name: 'robj'}
var factory = function (x) {
  this.x = x
  console.log(this)
}

var factoryBind = factory.bind(obj)
robj.factory = factoryBind
robj.factory(2) // Object {x: 2, name: "obj"}，作为方法的绑定的优先级低于bind的显式绑定

factoryBind.call(robj, 3) // Object {x: 3, name: "obj"}，call的优先级低于bind
console.log(robj) // Object {x: -1, name: "robj", factory: function}，未对robj进行修改
console.log(obj) // Object {x: 3, name: "obj"}，修改的是obj，因为this指针指向未变化

var p = new factoryBind(4) // factory {x: 4}
console.log(p) // factory {x: 4}
console.log(obj) // Object {x: 3, name: "obj"}，构造函数绑定的优先级高于bind的显式绑定
```
###### 优先级从高到低:
 `1. new, 构造绑定`      
 `2. bind, 显式绑定`     
 `3. call/apply, 显示绑定`       
 `4. 作为方法绑定`      
 `5. 默认绑定`

 

## 7. 闭包的理解

闭包就是**能够读取其他函数内部变量的函数**。

由于在Javascript语言中，只有函数内部的子函数才能读取局部变量，因此可以把闭包简单理解成"定义在一个函数内部的函数"。

所以，在本质上，闭包就是**将函数内部和函数外部连接起来的一座桥梁**

```
	function f1(){
　　　　var n=999;
　　　　function f2(){
　　　　　　alert(n); 
　　　　}
　　　　return f2;
　　}
　　var result=f1();
　　result(); // 999
```
在该示例中, 将f2作为返回值, 就能实现在f1外部访问变量n



闭包的最大用处有两个，一个是前面提到的可以读取函数内部的变量，另一个就是让这些变量的值始终保持在内存中,请看下面的代码

```
	function f1(){
　　　　var n=999;
　　　　nAdd=function(){n+=1}
　　　　function f2(){
　　　　　　alert(n);
　　　　}
　　　　return f2;
　　}
　　var result=f1();
　　result(); // 999
　　nAdd();
　　result(); // 1000
```

**使用闭包的注意点**

1）由于闭包会使得函数中的变量都被保存在内存中，**内存消耗很大**，所以不能滥用闭包，否则**会造成网页的性能问题**，在IE中可能导致内存泄露。解决方法是，在退出函数之前，将不使用的局部变量全部删除。

2）闭包会在父函数外部，改变父函数内部变量的值。