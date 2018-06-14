### 迭代器(iterator)和for...of循环
>传统循环的代码写起来简单，但是实际使用的过程中，我们需要自己去控制变量，如果有嵌套的情况下，还要控制多个变量，很容易出错。由此引出了**迭代器**的概念

首先介绍迭代器的基本概念.
1.迭代器是一个对象
2.迭代器提供一个方法next() 这个方式总是能够返回迭代到的对象。
3.next返回的对象中，至少有两个属性：done 是一个boolean值(表示数据是否迭代完,true表示迭代完成)。 value：具体的数据(迭代到的具体数据)

>这里先用es5的知识手动创建一个迭代器

```javascript
	function createIterator(arr){
        var index = 0;
        return {    //这里返回一个迭代器对象
            next(){
                var done = index >= arr.length;
                var value = arr[index];
                return {done, value}
            }
        }
	}
	var iterator = createIterator([1, 2]);
	console.log(iterator.next()); // { value: 1, done: false }
	.......
	console.log(iterator.next()); //{value: undefined, done:}, true },迭代完成返回true
```

从以上的示例来看，根据 ECMAScript 6 规范模拟实现的迭代器还是有些复杂。
幸运的是，ECMAScript 6 还提供了生成器，使得迭代器对象的创建容易了许多


>生成器函数:  返回迭代器的函数, 由 function 关键字和*标识，使用新的 yield 关键字。


```javascript
	function * createIterator(arr) {  //生成器函数,会自动返回一个迭代器,可以迭代数组中的元素
        for (var i = 0; i < arr.length; i++) {
            //每调用一次next，碰到yield程序就会停止，并返回迭代到的对象 {value : arr[i], done : true},直到下次调用next方法，会从上次停止的地方继续执行。
            yield arr[i];
        }
    }
    var it = createIterator([10, 29, 34);
    console.log(it.next());   // {value: 10, done: false}
    console.log(it.next().done);  //false
    console.log(it.next().value);  //34
```

**注意: 不能使用箭头函数(=>)创建生成器** es6新增函数,有兴趣可以自己查资料

有了迭代器, 我们就能理解for..of循环的工作原理了
与迭代器紧密相关的是，可迭代类型是指那些包含 Symbol.iterator 属性（方法）的对象, 该属性值为一个生成器函数,可迭代类型是为for-of 循环而设计的。

>在 ECMAScript 6 中，所有的集合对象（数组，set 和 map）与字符串都是可迭代类型，因此它们都有默认的迭代器,所以都可以使用for...of循环遍历他们的元素



这里举例使用 for…of 迭代Map:

```javascript
	var map = new Map([["name", "lisi"],["sex", "男"],["age", 20]]);
    map.set("aaa", "bbb")
    for(var item of map){
        console.log(item);  //注意：这里迭代到的是由key和value组成的数组。
    }
```

>既然Symbol.iterator是可迭代类型的一个方法，调用这个方法就可以获取到他的默认迭代器。

```javascript
	let s = "abcd";
    let it = s[Symbol.iterator]();  //调用字符串的Symbol.iterator方法
    console.log(it.next());  //返回迭代器迭代到的第一个对象
```







