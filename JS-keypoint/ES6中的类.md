### ES6中的类
> ES6之前,和类这个概念及行为最接近的是创建一个构造函数并在构造函数的原型上添加方法，这种实现也被称为**自定义的类型创建**

ES6中基本的类声明:
```javascript
	class PersonClass {  
	
    // 等效于构造函数
    constructor(name) {  //这个表示类的构造函数。constuctor也是关键字必须小写
        this.name = name;  //自有属性
    } 
    sayName() {   // 等效于 PersonType.prototype.sayName
        console.log(this.name);
    }
}
let person = new PersonClass("Nicholas");
person.sayName();   // Nicholas
console.log(person instanceof PersonClass);     // true
console.log(typeof PersonClass);                    // "function"
```

>注意点: 

1. 在类的内部, 不能直接书写语句, 只能声明方法
2. 直接在类中给原型添加方法
3. 任何的类都有一个默认的无参的 constructor, 如果手动添加 constructor,
  则默认的 constructor 不再存在
4. 如果用 typeof 对 类名进行测试,则结果是 function.  es6中的类, 仅仅是一种
  语法糖, 本质仍然是构造函数+原型的方法,PersonClass 声明实际上创建了一个行为和 constructor 方法相同的构造函数，这也是 typeof PersonClass 返回 "function" 的原因
5. 类不会声明提前, 须先声明再使用
6. 在类的内部，类名是作为一个常量存在的

具名类表达式 
```javascript
	var Person1 = class Person2{
    	say(){
        	console.log(Person2); // PersonClass2这个类名只能在类的内部访问到
        }
	}
	var p1 = new Person1();
	p1.say()
	var p2 = new Person2() // Person2 is not defined
```

类的静态方法:
在ES5中，我们可以直接给构造函数添加属性或方法来模拟静态成员。例如:
// 静态方法。  直接添加到构造方法上。  (其实是把构造函数当做一个普通的对象来用。)
```javascript
	PersonType.create = function(name) {
		return new PersonType(name);
	};
```
ES6使用static关键字创建静态方法
```javascript
	class Person{
    	static foo(){
        	console.log("foo... 静态方法");
    	}
	}
	Person.foo()
	new Person().foo();  //通过实例对象不能访问，只能通过类名访问
```

> 静态方法可以继承, 此时通过子类调用父类的静态方法和直接通过父类名调用是一样的。