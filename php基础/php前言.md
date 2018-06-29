# php认知于基础语法

## 环境搭建

### 发展史

- php 1.0      1994年
- php2.0      1995年   PHP/FI(From Interpreter), PHP加入了对mysql的支持
- php3.0      1997年   开发小组加入了 Zeev Suraski 及 Andi Gutmans
- php4.0      2000年
- php5.x      现在用的最多
- php7.0      最新

### php的优势

- 开放源代码
- 跨平台的服务器脚本语言
- 容易学习，大量的借用C，Java，Perl语言的语法
- 完全免费

### 网页服务器语言占比(2016)

* PHP 81.2% 
* ASP.NET 16.7% 
* Java 3.0%(从业人员最多,主要在各类软件开发中用的多)

### Apache简介

- Apache是Web服务器软件
- 它可以运行在几乎所有的计算机平台上面
- 这是最流行的Web服务器软件之一
- Apache的官网地址：<http://www.apache.org>

### MySQL简介

- MySQL是关系型数据库管理系统

  ​

- 拥有体积小，速度快，开放源码等优点

  ​

- MySQL官网地址：<http://www.mysql.com>

### XAMPP简介

- XAMPP是一个功能强大的建 (Apache+MySQL+PHP+Perl) 软件站集成软件包

  ​

- 引入XAMPP的目的：手动安装Apache＋MySQL＋PHP环境过于复杂，而XAMPP帮我们集成了这个环境，只需点击安装即可

## php基础语法

### PHP标记

- 1 , <?php echo “hello php”; ?>
- 2, <? echo “hello php”; ?>     //短标记
- 3, <script language=“php”>echo “hello php”</script>
- 4, <% echo “hello php”; %>  //asp风格

**注: 1,3可以直接使用，但是2，4需要修改php.ini的配置文件才能使用,只做了解**

### php的注释

```php
1，多行注释
/*
注释的内容
注释的内容
*/
2，单行注释
 // 被注释的内容
3，文档注释
/**
  *被注释的文档
  *被注释的文档
  */
```

### 变量

####变量的声明

- 变量以$开头，后面跟变量名
- 变量字母，数字，下划线组成，不以数字开头
- 变量名区分大小写
- php于javascript类似是弱类型语言，不需要实现声明变量的数据类型

```php
 例：$age = 28;
 $color = “red”;
 $sum = 15+”12”;   //$sum = 27;
```

####变量的赋值

(1),值赋值：即将赋值表达式的值复制给变量(直接赋值)

(2),引用赋值：php4引用了引用赋值，创建的一个变量与另一个变量引用的内容相同

例：

$var_1 = “hello”;

$var_2 = &$var_1; //把变量var_l的内存地址赋值给var_2，即引用赋值

#### 超全局变量

- php提供了很多有用预定意的变量，用于提供大量与环境有关的信息
- 打印/输出超全局变量:parent_r($_SERVER)
- (1)，$_SERVER 服务器变量, 该全局变量包含着服务器和客户端配置及当前请求环境的有关信息

$_SERVER['SERVER_NAME']; : 当前运行脚本所在的服务器的主机名

$_SERVER['REMOTE_ADDR']	: 客户端IP地址

$_SERVER['REQUEST_URI']	: URL的路径部份

$_SERVER['HTTP_USER_AGENT']  :  操作系统和浏览器的有关信息

(2),$_GET  该变量包含使用 GET 方法传递的参数的有关信息

例：

​	url: <http://localhost/test.php?id=100&page=2>

​	$id = $_GET['id'];

​	$page = $_GET[‘page’];

(3). $_POST  该变量包含使用 POST 方法传递的参数的有关信息;

例：html:

```html
<form name="reg" action="test.php" method="post">

		用户名：<input type="text" name="username" />

		密码: <input type="password” name="passwd"/>

		<input type="submit" value="提交" />

 </form>
```

php:	

​	$username = $_POST[‘username’];

​	$passwd = $_POST[‘passwd’];

(4). $_REQUEST   该变量记录着通过各种输入方法传递给脚本的变量，如GET POST,但不要用这个超级全局变量，因为它不安全而且速度比较慢;

(5). $_COOKIE            cookie变量数组

(6). $_SESSION           会话变量数组

(7). $_FILES             与上传文件有关的变量数组

(8). $_ENV               环境变量数组

(9). $GLOBALS           所有全局变量数组

### 常量

1.常量的定义

​	常量是指在程序执行中无法修改的值。如 PI (3.1415926);

​	在脚本执行期间该值不能改变;

​	常量对大小写敏感，通常常量名总是大写;

​	常量是全局的，可以在脚本的任何地方引用;

​	常量分为内置常量和自定义常量;

​	常量使用define()函数定义;

​	例：	define('PI', 3.1415926);

​		echo PI;     //3.1415926

1，内置常量

   PHP_OS   php所在操作系统的名称

   PHP_VERSION   当前php的版本号

2，魔术常量

​     `__LINE__`	文件中的当前行号;

​	`__FILE__`	文件的完整路径和文件名;

​	`__FUNCTION__`	函数名称;

​	`__CLASS__`	类的名称;

​	`__METHOD__`	类的方法名;	

### 数据类型

####标量数据类型

1,字符串

字符串有三种定义方式：单引号，双引号，定界符(heredoc);

​	单引号字符串中出现的变量不会被变量的值替代;

​	双引号字符串中最重要的一点是其中的变量会被变量值替代;

​	如果遇到美元符号($),解析器会尽可能多地取得后面的字符以组成一个合法的变量名,如果想明确的指定名字的结束，用花括号把变量名括起来。可加可不加

​	 例：

​	$beer = "Heineken";

​	echo "He drank some {$beer}s";

字符串转义

\n  换行

\r  回车

\t  水平制表符(tab键)

\\  \(反斜杠)

\$  $(美元符)

\”   “(双引号)

2.整型(integer)

​	$age = 25;

3.浮点型(float, double)

$num = 5.39;

4.布尔型（bool）

​	$bo = TRUE;

​	$bo = FALSE;

#### 复合数据类型

1.数组

​	$week = array(‘星期一','星期二','星期三');

2.对象

​	$db = new db;

#### 特殊数据类型

1.资源

​	$fh = fopen("test.txt","r");

2.null

​	null 无，表示没有值，null不表示空格，也不表示0;

​	以下情况，则认为是null:

​	没有设置为任何预定义的变量;

​	明确的赋值为null;

​	使用函数unset()清除;

#### 自动类型转换

因为php对于类型定义非常的松散，所以有时会根据引用变量的环境，将变量自动转换为最适合的类型;

例1： $num = 5;

​	 $str = “15”;

​	 echo $num + $str;	

例2： $str = “100 hello”;

​	 $num = 200;

​	 echo $num + $str;

例3：

​		$str = '1.2';

​		if($str){  //if 判断为 true

​		    echo 'hello world';

​	      }

### 类型相关函数

1.gettype() 返回变量的类型，共有8个可能的值 string、integer、float、boolean、array、object、null、unknow

​      例: $str = ‘hello’;

​		 echo gettype($str);

2.is_type() 查看变量是否属于某个类型,是返回 TRUE ,否返回 FALSE;

​	例: $arr = array(1);

​	     echo is_array($arr);

​	     $num = 5;

​	     echo is_int($num);

3.var_dump()  获取变量的值和类型的详细信息

​     例: $str = ‘hello’;

​	     var_dump($str);

​          $arr = array(‘A’, ‘B’, ‘C’);

​	    var_dump($arr);
###面向对象

1.构造、析构函数

构造函数：在创建对象时初始化对象， 即为对象成员变量赋初始值，总与new运算符一起使用在创建对象的语句中。

析构：当对象结束其生命周期时（例如对象所在的函数已调用完毕），系统自动执行析构函数。

php不支持多继承

2.访问控制

类属性必须定义为公有，受保护，私有之一。如果用 *var* 定义，则被视为公有。

类中的方法可以被定义为公有，私有或受保护。如果没有设置这些关键字，则该方法默认为公有。

同一个类的对象即使不是同一个实例也可以互相访问对方的私有与受保护成员。

案例： 访问同一个对象类型的私有成员

```php 
class Test {
    private $foo;

    public function __construct($foo)
    {
        $this->foo = $foo;
    }
    private function bar()
    {
        echo 'Accessed the private method.';
    }
    public function baz(Test $other)
    {
        // We can change the private property:
        $other->foo = 'hello';
        var_dump($other->foo);

        // We can also call the private method:
        $other->bar();
    }
}
$test = new Test('test');
$test->baz(new Test('other'));

输出：
  string(5) "hello"
  Accessed the private method.
```


## 运算符

一，算术运算符

算术运算符用语完成各种运算；

+        加法运算符                                        $a+$b;

-        加法运算符                                        $a-$b;

\*         乘法运算符                                        $a*$b;

/         除法运算符                                        $a/$b;

%       取模运算符(求余数)                          $a%$b;

二，赋值运算符

赋值运算符，将一个数据值赋给一个变量;

组合赋值运算符，在赋值之前会完成某个运算;

​          $a = 5	          赋值

​	$a += 5		加法赋值  	$a = $a + 5

​	$a -= 5		减法赋值		$a = $a – 5

​	$a *= 5		乘法赋值		$a = $a * 5

​	$a /= 5		除法赋值		$a = $a / 5

​	$a .= 5		拼接赋值		$a = $a.5

三，字符串运算

字符串运算符用于拼接字符串, 拼接表示将两个或多个对象组合起来;

​	例：

​	$a = "hello";

​	$b = $a . “world";    //.表示拼接前后两个字符串

​	echo $b;

​	$b = "Hello";

​	$b .= “World!";    //.=  表示 $b = $b.”World”;

​	echo $b;

四，递增(++)和递减(—)运算符

递增和递减运算符将变量的当前值加1或减1，可以使代码更简洁;

​	++$i		先加	$i的值加1，然后再返回$i的值;

​	$i++		后加	先返回$i的值，然后再将$i的值加1;

​	--$i		先减	$i的值减1，然后再返回$i的值;

​	$i--		后减	先返回$i的值，然后再将$i的值减1;

五，逻辑运算符

​	利用逻辑运算符可以根据多个变量的值进行判断，这使得控制程序的流程成为可能，逻辑

操作符常用于控制结构中，如if条件和while及for循环;

​	&&，AND	         逻辑与		

​	||，   OR		逻辑或

​	!,       NOT		逻辑非	

六，比较运算符

​	比较运算符，返回一个布尔值 TRUE 或 FALSE;

​	>	大于

​	<	小于

​	>=	大于或等于

​	<=	小于或等于

​	!=	不等于

​	<>	不等于

​	==	等于

​	===	全等于  （两个比较的内容里，类型也要一样）

​	!== 	全不等

七，三元运算符

​	语法：expression1 ? expression2 : expression3

​	例：$a = 5;

​	       $b = 2;

​	       $res = $a > $b ? "yes":"no"; 

​	       echo $res;

##流程控制

### 判断语句

1. If 语句

if(expression ){

​	//statement

}else if(expression){

​	 //statement

}else{

​	 //statement

}

If语句用括号中的表达式返回值（true 或 false )来控制是否执行指定的代码程序;

表达式为数字0、空、未定义的字符串，内置常量false都会返回false;

2. Switch 语句

  ​switch 语句可以看作是if-else组合的一种变体，如果需要比较有限值的变量，通常会使用switch语句;

  ​语法格式：

  ​switch (expression){

  ​	case value:

  ​           //statements

  ​	     break;

  ​	default:

  ​	  //statements

  ​}	

  ​在每个case块的末尾处都有break语句，如果没有break语句，就会执行所有后续的case块，直到遇到break语句为止;

### 循环语句

1.While

语法格式：

​	while(expression){

​		//statements

​	}

例：	$count = 1;

​	While ($count < 5) {

​		echo "$count 平方 = ".pow($count, 2)."<br />";

​	$count++;

}

2. for循环

语法格式：

for(expression1; expression2; expression3){

​	//statements

}

第一个表达式expression1在第一次循环时计算;

第二个表达式expression2在每次循环时进行计算，这个表达式确定循环是否继续执行;

第三个表达式exprression3在每次循环结束时计算;

例：for($i = 1; $i <= 5; $i++){

​	   echo "$i squared = ".pow($count, 2)."<br/>";

}

3. foreach 循环

  ​foreach循环用来遍历数组，每次循环都将指针后移一位;

  ​语法格式1：

  ​foreach(array_expr as $value){

  ​	//statements

  ​}

  ​

  ​语法格式2：

  ​foreach(array_expr as $key=>$value){

  ​	//statements

  ​}

### 跳出循环

1. break

  ​如果包含一个break语句，将立即结束 while、do…while、for、foreach、switch的执行。

2. continue

  ​continue语句使当前循环执行结束，并从下一次循环开始执行;