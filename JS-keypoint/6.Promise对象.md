# 6.Promise对象
## 1. Promise的含义
Promise 是异步编程的一种解决方案,它比传统的解决方案:回调函数和事件,更合理;

---

## 2.基本用法
**Promise对象是一个构造函数,用来生成Promise实例;**        

```
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```
##### 1. Promise构造函数的参数
**Promise构造函数只有一个参数,该参数是一个函数,被称作执行器,执行器有2个参数,分别是resolve()和reject(): 一个表示成功的回调,一个表示失败的回调**

###### resolve函数的作用
在异步操作成功时调用,并将异步操作的结果,作为参数传递出去;      

###### eject函数的作用
在异步操作失败时调用,并将异步操作报出的错误,作为参数传递出去;

###### 注意
`Promise实例,只能通过resolve或者reject函数来返回,并且使用then()或者catch()获取,不能在new Promise里面直接return,这样是获取不到Promise返回值的`

##### 2. Promise实例
Promise实例生成后,可以用then方法,分别指定resolved状态和rejected状态的回调函数;

```
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
```
######  Promise实例的方法

Promise实例的then方法,可以接受两个回调函数作为参数:     
第一个回调函数,是Promise对象的状态变为resolved时调用;       
第二个回调函数,是Promise对象的状态变为rejected时调用;

```
function pro(){
	return new Promise((resolve,reject)=>{
		setTimeout(()=>{
			resolve(1)
		},100)
	})
}

pro().then(value=>{
	console.log(value) // 1
})
```

---

## 3. Promise对象所具有的方法
### 1. Promise.prototype.then()
Promise 实例具有then方法,它的作用是为 Promise实例添加状态改变时的回调函数;         
then方法的第一个参数是resolved状态的回调函数,第二个参数(可选)是rejected状态的回调函数;      

**then方法返回的是一个新的Promise实例,因此可以采用链式写法,即then方法后面再调用另一个then方法;**

###### 使用then方法,依次指定的回调函数,的执行流程:
第一个回调函数完成后,会将返回结果作为参数,传入第二个回调函数

```
function pro(){
	return new Promise((resolve,reject)=>{
		setTimeout(()=>{
			resolve(2)
		},100)
	})
}

pro().then(value=>{
	console.log(value) // 2
	return value*value
}).then(value=>{
	console.log(value) // 4
	return value*value
})
```

### 2. Promise.prototype.catch()

```
getJSON('/posts.json').then(function(posts) {
  // ...
}).catch(function(error) {
  // 处理 getJSON 和 前一个回调函数运行时发生的错误
  console.log('发生错误！', error);
});
```

### 3. Promise.all()

Promise.all方法,用于将多个 Promise 实例,包装成一个新的 Promise 实例;

```
const p = Promise.all([p1, p2, p3]);
p.then(arr=>{
    console.log(arr)
})
```
Promise.all方法,接受一个数组作为参数,p1、p2、p3都是 Promise 实例;

```
let p=Promise.all([
	new Promise((resolve,reject)=>{
		setTimeout(()=>{
			let a1=1,b1=2
			resolve(a1+b1)
		},100)
	}),
	new Promise((resolve,reject)=>{
		setTimeout(()=>{
			let a2=10,b2=20
			resolve(a2+b2)
		},100)
	})
])
p.then(arr=>{
	console.log(arr) // [3,30]
})
```

### 4. Promise.resolve()
Promise.resolve方法,可以将对象,转为 Promise 对象;

```
const jsPromise = Promise.resolve($.ajax('/whatever.json'));
```

---

## 4.使用Promise的注意点
##### 1.Promise 构造函数是同步执行的,promise.then 中的函数是异步执行的;

```
const promise = new Promise((resolve, reject) => {
  console.log(1) // 1步:1
  resolve()
  console.log(2) // 2步:2
})
promise.then(() => {
  console.log(3) // 4步:3
})
console.log(4) // 3步:4
```
##### 2.构造函数中的 resolve 或 reject 只有第一次执行有效,多次调用没有任何作用,promise 状态一旦改变则不能再变;

```
const promise = new Promise((resolve, reject) => {
  resolve('success1')
  reject('error')
  resolve('success2')
})

promise
  .then((res) => {
    console.log('then: ', res)
  })
  .catch((err) => {
    console.log('catch: ', err)
  })
  

// 运行结果
then: success1
```

##### 3.promise 可以链式调用,promise 每次调用 .then 或者 .catch 都会返回一个新的 promise,从而实现链式调用

```
Promise.resolve(1)
  .then((res) => {
    console.log(res) // 1
    return 2
  })
  .catch((err) => {
    return 3
  })
  .then((res) => {
    console.log(res) // 2
  })
```
##### 4.promise 的 .then 或者 .catch 可以被调用多次,但Promise 构造函数只执行一次; 或者说 promise 内部状态一经改变,并且有了一个值,那么后续每次调用 .then 或者 .catch 都会直接拿到该值;


```
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('once') // 1步:once
    resolve('success')
  }, 1000)
})

const start = Date.now()
promise.then((res) => {
  console.log(res, Date.now() - start) // 2步:success 1005
})
promise.then((res) => {
  console.log(res, Date.now() - start) // 3步:success 1007
})
```
`Promise本身不是异步的,只有他的then()或者catch()方法才是异步,也可以说Promise的返回值是异步的;`      

`Promise通常被使用在node,或者是前端的ajax请求、前端DOM渲染顺序等地方;`

---

## 5.Promise对象的应用
### 1. 用Promise对象实现的 Ajax 操作

```
const getJSON = function(url) {
  const promise = new Promise(function(resolve, reject){
    const handler = function() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    const client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();

  });

  return promise;
};

getJSON("/posts.json").then(function(json) {
  console.log('Contents: ' + json);
}, function(error) {
  console.error('出错了', error);
});
```
### 2.加载图片

```
const preloadImage = function (path) {
  return new Promise(function (resolve, reject) {
    const image = new Image();
    image.onload  = resolve;
    image.onerror = reject;
    image.src = path;
  });
};
```
