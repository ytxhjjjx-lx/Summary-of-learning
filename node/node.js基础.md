## 概念

对于写在HTML页面里的JS，浏览器充当了解析器的角色。而对于需要独立运行的JS，NodeJS就是一个
解析器。

运行在浏览器中的JS的用途是操作DOM，浏览器就提供了document之类的内置对象。
而运行在NodeJS中的JS的用途是**操作磁盘文件或搭建HTTP服务器**，NodeJS就相应提供了fs、http等内置对象。



## 模块

编写稍大一点的程序时一般都会将代码模块化。在NodeJS中，一般将代码合理拆分到不同的JS文件中，每一个文件就是一个模块，而文件路径就是模块名。在编写每个模块时，都有require、exports、module三个预先定义好的变量可供使用。**NodeJS使用CMD模块系统，主模块作为程序入口点，所有模块在执行过程中只初始化一次**。 

1.  require 

    require函数用于在当前模块中加载和使用别的模块，传入一个模块名，返回一个模块导出对象。模块名可使用相对路径（绝对路径），模块名中的.js扩展名可以省略。例：

    ```javascript
    var foo3 = require('/home/user/foo'); 
    ```

2.  exports

    exports对象是当前模块的导出对象，用于导出模块公有方法和属性。别的模块通过require函数使用当前模块时得到的就是当前模块的exports对象。以下例子中导出了一个公有方法

    ```javascript
    exports.hello = function () {
    	console.log('Hello World!');
    };
    ```

3.  module

    通过module对象可以访问到当前模块的一些相关信息，但最多的用途是替换当前模块的导出对象。例如模块导出对象默认是一个普通对象，如果想改成一个函数的话，可以使用以下方式。

    ```javascript
    module.exports = function () {
    	console.log('Hello World!');
    };
    ```

4.  模块初始化

    一个模块中的JS代码仅在模块第一次被使用时执行一次，并在执行过程中初始化模块的导出对象。之后，缓存起来的导出对象被重复利用 

5.  主模块

    通过命令行参数传递给NodeJS以启动程序的模块被称为主模块。主模块负责调度组成整个程序的其它模块完成工作。例如通过以下命令启动程序时，main.js就是主模块 

    ```javascript
    node main.js
    ```




## 实例

目录

- /home/user/hello/
  - util/
     counter.js
  - main.js 


counter.js

```
var i = 0;
function count() {
	return ++i;
} 
exports.count = count;
```

main.js

```
var counter1 = require('./util/counter');
var counter2 = require('./util/counter');
console.log(counter1.count());
console.log(counter2.count());
console.log(counter2.count());
```

运行结果，这里counter.js只被初始化一次

```
$ node main.js
1
2
3
```

