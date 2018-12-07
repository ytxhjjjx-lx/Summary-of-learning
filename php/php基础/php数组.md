# php2

## 数组

###数组的概念：

​	数组可以理解为有序的（键-值)对组成的数据值的集合;

​	如果我们把变量理解为单个值的容器，那么数组就是可以包含多个值的容器;

​	根据索引值的不同数组分为：索引数组和关联数组;

​				     

​	例：$day = array(“a”,”a”,”a”);     //索引数组

​               $week = array("a"=> "星期一", "b"=>"星期二", "c"=> “星期三");      //关联数组

（key=>value,,,,）

key 可以是 [integer](http://php.net/manual/zh/language.types.integer.php) 或者 [string](http://php.net/manual/zh/language.types.string.php)。value 可以是任意类型。

此外 key 会有如下的强制转换：

-   包含有合法整型值的字符串会被转换为整型。例如键名 *"8"* 实际会被储存为 *8*。但是 *"08"* 则不会强制转换，因为其不是一个合法的十进制数值。
-   浮点数也会被转换为整型，意味着其小数部分会被舍去。例如键名 *8.7* 实际会被储存为 *8*。
-   布尔值也会被转换成整型。即键名 *true* 实际会被储存为 *1* 而键名 *false* 会被储存为 *0*。
-   [Null](http://php.net/manual/zh/language.types.null.php) 会被转换为空字符串，即键名 *null* 实际会被储存为 *""*。
-   数组和对象*不能*被用为键名。坚持这么做会导致警告：*Illegal offset type*。

### 数组的创建

1. 使用array()函数

  ​array **array** ( [mixed ...] )

  ​例：$arr = array();

  ​       $fruits = array("orange", "apple", "banana");

  ​       $languages = array("en"=> "english", "cn"=> "china"）;

  ​	

与其它语言的数组实现方式不同，php不需要在创建数组时指定其大小;

因为php是一种松散类型的语言，所以甚至不需要在使用前先声明;

索引可以是整型数字或者是字符串;

索引数组：没有指定key, 索引为整数,如果没有指定索引值则默认为零，依次递增;

关联数组：索引为字符串的数组;

2. 直接对数组变量赋值

  ​$arr[*key*] = *value*; 

  例：$fruits[] = "orange";

  ​        $fruits[] = "apple";

  ​        $languages["en"] = "english";

  ​        $languages["cn"] = "china";

  如果方括号中没有指定索引，则取当前最大整数索引值，新的键名将是    该值 + 1。如果当前还没有整数索引，则键名将为0。如果指定的键名已经有值了，该值将被覆盖。

  ​

  $array = array(

  ​      10,

  ​      "foo"=>"bar",

  ​      "foo",

  ​      100=>-100,

  ​      101

  ​    );

  ​    var_dump($array);

  输出结果为：

  array(5) {

  ​	[0]=> int(10) 

  ​	["foo"]=> string(3) "bar" 

  ​	[1]=> string(3) "foo" 

  ​	[100]=> int(-100) 

  ​	[101]=> int(101) 

  } 

  ​

3. 使用函数创建数组

  ​range() 建立一个包含指定范围单元的数组

  ​例：$num = range(1, 100);

  ​       print_r($num);

  ​       $letter = range('a','I');

  ​       print_r($letter);

### 数组的常用操作

1. unset() 释放给定的变量 :[unset()](http://php.net/manual/zh/function.unset.php) 函数允许删除数组中的某个键。但要注意数组将*不会*重建索引(会保留索引)。如果需要删除后重建索引，可以用[array_values()](http://php.net/manual/zh/function.array-values.php) 函数。
2. print_r() 打印数组:  打印基本信息,和var_dump区别在于,var_dump打印结构信息，包括表达式的类型与值
3. count() 取得数组大小
4. in_array() 检查数组中是否包含某个值

### 遍历数组

1. for 循环遍历数组

2. foreach 循环遍历数组：这里和js一样，调用foreach()不会改变原数组

  在 *$value* 之前加上 &(表示对当前元素的引用) 来修改数组的元素

  $arr = array(1, 2, 3, 4);
  foreach ($arr  as   &$value) {
  ​    $value = $value * 2;
  }
  // $arr is now array(2, 4, 6, 8)
  unset($value); // 最后取消掉引用,因为数组最后一个元素的引用在 *foreach* 循环之后仍会保留

  3.  each： 返回数组中当前的键／值对并将数组指针向前移动一步

### 数组排序

1.sort() 、 rsort() 对数组进行升序和降序

例：$fruits = array("lemon", "orange", "banana", "apple"); 

​        sort($fruits);

​        print_r($fruits);

2.ksort()、krsort() 对数组按索引进行升序或降序, 并保持索引关系

例：$fruits = array("l"=>"lemon", "o"=>"orange", "b"=>"banana",            "a"=>"apple"); 

​        ksort($fruits);

​        print_r($fruits);

### 数组字符串转换

1.explode() 返回由字符串组成的数组 

例：$str = "1,2,3,4,5,6";

​	$arr = explode(',', $str);

​	print_r($arr);

2.implode() 将数组元素连接成字符串

例：$arr = array('a','b', 'c', 'd');

​	$str = implode('|', $arr );

​	echo $str;

## 字符串



###echo

​	void **echo** ( string arg1 [, string ...] )
是一个语法 ，不是函数

​	echo 没有返回值;

​	echo 可以输出多个值，使用逗号分隔;

​	例： 	$val = "world";

​		echo "hello", $val;

### 查找与替换

1.strpos()

​	int **strpos** ( string haystack, mixed needle [, int offset] )

​	strpos()函数在 haystack 中以区分大小写的方式找到 needle 第一次出现的位置;如果没有找到则返回FALSE;

​	可选参数offset 指定开始查找的位置;

​        例：echo strpos("Hello world!","wo"); 

2.stripos()

​	stripos()与strpos()功能相同，只是查找时不区别大小写;

3.str_replace()

​	mixed str_replace ( mixed search, mixed replace, mixed subject [, int &count] )

​	str_replace()函数在subject中以区分大小写的方式搜索 search ，用replace替换找到的所有内容; 如果没有找到search,则subject保持不变;

​	如果定义了可选参数 count 则只替换subject中count个search

例：$str = "test@163.com";

​	  $email = str_replace("@", "(at)", $str);

​	  echo $email;

4.str_ireplace()

​	str_ireplace()与str_replace()功能相同，只是不区分大小写;

### 截取字符串

1.substr()

string **substr** ( string string, int start [, int length] )

从start位置取出length长度的字符，字符串位置开始值为零;

如果没有指定length，那么默认一直到字符串末尾;

例：echo substr("Hello world", 6);

​       echo substr("hello world", 6, 5);

2.strstr()

string **strstr** ( string haystack, string needle )

strstr() 函数搜索一个字符串在另一个字符串中的第一次出现。

该函数返回字符串的其余部分（从匹配点）。如果未找到所搜索的字符串，则返回

 false。

例： echo strstr("Hello world!","world"); 

3.stristr()

stristr()与strstr()功能相同，只是不区分大小写;

例：  echo strstr("Hello world!","WORLD");

### 其他处理函数

1. strlen() 获取字符串长度

例：$passwd = "123456";

​	if(strlen($passwd) < 8){

​		echo "密码不能少于8位";

​	}

2. strtolower() 将字符串转换为小写字母

例：$url = "HTTP://WWW.baidu.COM/ ";

​	echo strtolower($url);

3. strtoupper() 将字符串转换为大写字母

例：$str = "中文 hello world";

​	echo strtoupper($str);

4. strrev() 反转字符串

例： $str = "hello world";

​	echo strrev($str);

5. nl2br() 将字符串中换行 (\n) 转换成 HTML 换行标签 (<br />)

例： $str = "hello

​	 world";

​	 echo nl2br($str);

6. strip_tags() 删除字符串中HTML XML PHP 标签

string strip_tags ( string str [, string allowable_tags] ) 

可选参数 allowable_tags 指定要保留的标签;

例：$str = "test <a href="http://www.163.com">163</a>";

  echo strip_tags($str);

7. htmlspecialchars() 函数把一些预定义的字符转换为 HTML 实体

预定义的字符是：

& （和号）   成为  &amp; 

" （双引号） 成为  &quot; 

' （单引号） 成为  &#039; 

< （小于）   成为  &lt; 

\> （大于）   成为  &gt; 

例：$str = "<p> 这是一个段落 </p>";

  echo htmlspecialchars($str);

## 函数

### 函数概念

​	函数是用来完成某种特定任务的可重用代码块;

​	函数可以使程序更具模块化,拥有良好的结构;

​	函数定义后在程序中可以重复调用;

​	函数分为内置函数和自定义函数

​	

### 函数分类

1. 内置函数

  ​PHP系统提供了大量功能强大的函数，帮助我们解决各种问题;

2. 创建自定义函数

function function_name(parameters) {

​	//function body

}

例：function sayhello(){

​		echo 'hello';

​	}

### 函数简介

函数用function关键字来声明;

函数名称是由字母或下划线开始,中间可以包含数字；

函数名不区分大小写,不过在调用函数的时候，通常使用其在定义时相同的形式;

php不支持函数重载, 所以自定义函数不能和内置函数重名;

不能在一个文件中自定义同名的函数;

参数出现在括号中,如果有多个参数用逗号分隔;

函数调用

​	    语法格式：

​	    fun_name(parameters);

​	    例：$val = pow(4, 2);

​		     echo pow(3, 3);

### 参数传递

值传递(传值)

​	函数内对参数值的改变不会影响函数外部的值;

引用传递(传址)

​	有些情况下，可能希望在函数体内对参数的修改在函数体外也能反映;

​	使用引用传递参数要在参数前加上&符号;

​	变量本身传入，传入后的变量与原变量建立联系;

​	函数体内变量的变化，会影响到原变量本身;

例： function sum($num_1, $num_2){

​		$res = $num_1 + $num_2;

​		return $res;

   }

默认参数值：可以为参数指定默认值，在没有提供其他值的情况下，则将默认值自动赋给该参数;

可选参数：可以指定某个参数为可选参数，这些参数需要放在参数列表的末尾，需且要指定其默认值为空;

​	如果指定了多个可选参数，可以选择性地传递某些参数;

### 返回值

通常情况下，只依靠函数做某些事情还不够; 需要将函数的执行结果返回给调用者，这时可以使用 return 语句返回结果;

​	return 语句变执行后，将使得函数立即结束运行，并且将控制权返回被调用的行;

​	例：function mysquare($num){

​	    if($num == ‘’){

​		        return;

​		    }

​		    $res = $x * $x;

​		    return $res;

​	       }

​	       echo mysquare(4);

### 变量作用域和生命周期

**由于引入了函数，程序中变量的能见度发生了变化，即变量的作用范围发生了改变;**

**变量分为:全局变量，局部变量，静态变量;**

****

局部变量，函数体内定义的变量为局部变量，只在函数体内可见;

局部变量的作用域：从声明它的那条语句开始到函数结束;

例：$str = 'hello php';

​	echo '1:'.$str.'<br />';

​		function change(){

​			$str = 'hello everyone';

​			echo '2:'.$str.'<br />';

​		}

​		change();

​		echo '3:'.$str;

### include和require

1.include()	

​	include()语句将在其被调用的位置处包含一个文件。

​	例：	include(“init.php");

2.include_once()

​	include_once()的作用与include()相同，不过它会首先验证是否已经包含了该文件，如果已经包含，则不再执行include_once();

3.require() 与include() 一样，只不过require()我们通常放在php程序的最前面；

4.require_once() 与include_once() 一样，但是也要放在php程序的最前面；

5.include和require的区别

​     require一个文件存在错误的话，那么程序就会中断执行了，并显示致命错误 

​     include一个文件存在错误的话，那么程序不会中端，而是继续执行，并显示一个警告错误。