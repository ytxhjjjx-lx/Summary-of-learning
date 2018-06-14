###传统回调函数
```javascript
	function sleep(time, cb) {
        console.log('sleep')
        setTimeout(function () {
          	cb()
        }, time)
    }

    var start = function () {
        console.log('start')
        sleep(2000, function () {
          	console.log('sleep-time')
        })
        console.log('end')
    }
    start()


//start
//sleep
//end
2秒后输出
//sleep-time
```


###promise
作为更好, 更合理的解决方案
```javascript
	function sleep(time) {
        console.log('sleep')
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
            	//成功的回调
              	resolve()
            }, time)
        })
    }

    var start = function () {
        console.log('start')
        sleep(2000).then(function () {
            console.log('sleep-time')
        })
        console.log('end')
    }
    start()


//start
//sleep
//end
2秒后输出
//sleep-time
```

###  async
比promise更简洁的解决方案

```javascript
	function sleep(time) {
        console.log('sleep')
        return new Promise(function (resolve, reject) {

            setTimeout(function () {
              	resolve('asycn done')
            }, time)
        })
    }
    // async声明这个函数内部会有一些异步操作
    var start = async function () {
        // await等待这个异步的完成
        // await外面必须有async函数
      	//	可以直接获取返回值
        let result = await sleep(2000)
        console.log(result)
        await sleep(3000)
        // 这里就是异步请求完成之后要执行的内容
        // 在这里使用起来就像同步代码那样直观
        console.log('sleep-time')
    }
    console.log('start')
    start()
    console.log('end')



//start
//sleep
//end
2秒后输出
//asycn done
//sleep
3秒后输出
//sleep-time	
```

async的一些基本规则:

1. async 表示`这是一个async函数`，`await只能用在这个函数里面`。
2. await 表示在这里`等待promise返回结果`了，再继续执行后面的代码, 使得看上去就如同同步一样。
3. await 后面跟着的`应该是一个promise对象`（当然，其他返回值也没关系，只是会立即执行，不过那样就没有意义了…）
4. await等待的虽然是promise对象，但不必写`.then(..)`，直接可以得到返回值。
5. 可以直接用标准的`try catch`语法捕捉错误。





###错误捕获
`promise`

```javascript
function async(a,b){
	//resolve异步操作成功调用
	//reject失败调用
	return new Promise(function(resolve,reject){
	
		if (typeof a !== "number" ||typeof b !== "number"){
			reject(new Error("不是一个number"));
		}
		setTimeout(function (){
			resolve(a+b);
		},1000)
	})
}
//不管是成功或者失败都会调用then这个方法
//然后接受两个函数作为参数，第一个是成功的
asycn(1, 2)
		.then(function (result) {
			console.log(result)
			return asycn(result, '3')
		})
		.then(function (result) {
			console.log(result)
			return asycn(result, 4)
		})
		.then(function (result) {
			console.log(result)
			return asycn(result, 5)
		})
		//catch用于捕获错误
		.catch(function(error){
			console.error(error)
		})

//输出结果
//3
// Error: 不是一个number
```


`async`
```javascript
function async(a, b) {
    return new Promise(function (resolve, reject) {
        if (typeof a !== 'number' || typeof b !== "number") {
          	reject(new Error('类型错误'))
        }
        setTimeout(function () {
          	resolve(a + b)
        }, 2000)
    })
}
async function fn() {
    try {
        var result = await async(1, 2)
        console.log(result)
        var result = result > 2 ? await async(result, '2') : result
        console.log(result)
        var result = result > 4 ? await async(result, 3) : result
        console.log(result)
    } catch (error) {
      	console.error(error)
    }
}
fn()


2秒后输出
//3
//Error:类型错误
```

