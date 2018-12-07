# php3

## 文件操作

### 打开关闭文件

1.fopen()

resource **fopen** ( string filename, string mode [, bool use_include_path [, resource zcontext]] )

fopen()函数将resource绑定到一个流或句柄。绑定之后，脚本就可以通过句柄与此资源交互;

例1:以只读方式打开一个位于本地服务器的文本文件

$fh = fopen("test.txt", "r");

例2：以只读方式打开一个远程文件

$fh = fopen("http://www.baidu.com", "r");

2.fclose()

bool **fclose** ( resource handle ) 

将 *handle* 指向的文件关闭 。如果成功则返回 **TRUE**，失败则返回 **FALSE**;

文件指针必须有效，并且是通过 fopen() 或 fsockopen() 成功打开的;

虽然每个请求最后都会自动关闭文件，但明确的关闭打开的所有文件是一个好的习惯;

例：$fh = fopen("test.txt", “r");

​       fclose($fh)；



### 读取文件

php 提供了很多从文件中读取数据的方法，不仅可以一次只读取一个字符，还可以一次读取整个文件。

1.  fread()

string **fread** ( int handle, int length )

fread()函数从handle指定的资源中读取length个字符,当到达EOF或读取到length个字符时

读取将停止。

如果要读取整个文件，使用filesize()函数确定应该读取的字符数;

例：
```php
$file = "test.txt";

$fh = fopen( $file, "r");

$str = fread($fh, filesize($file));

echo $str;

fclose($fh);
```

2.  fgets()

string **fgets** ( int handle [, int length] )

fgets()函数从handle指定的资源中读取一行字符。碰到换行符（包括在返回值中）、EOF 或者已经读取了 length - 1 字节后停止（看先碰到那一种情况）; 

例：逐行读取文件 
```php	
$handle = fopen("data.txt", "r");	

//feof — 测试文件指针是否到了文件结束的位置

while(!feof($handle)){			

  $content = fgets($handle);			

  $content= iconv('gbk','utf-8',$content);					

  echo $content."<br />”;

}	

fclose($handle);
```

**注意**：如果没有指定 length，则默认为 1K，或者说 1024 字节。

3.  fgetc()

    string **fgetc** ( resource `$handle` )

    从文件句柄中读取一个字符。

4.  file()

    array file ( string $filename [, int $flags = 0 [, resource $context ]])

    file()函数将文件内容读取到数组中，各元素由换行符分隔。

    例：$arr = file("test.txt");

    print_r($arr);

5.  file_get_contents()

    string **file_get_contents** ( string filename [, bool use_include_path [, resource

    ,context [, int offset [, int maxlen]]]] )

    file_get_contents()函数将文件内容读到字符串中;

    例：$str = file_get_contents("test.txt");

    echo $str;

    ​

    **fread(),fgets(),fgetc()都是从句柄中读取，file(),	file_get_contents()直接从文件中读取**

    ​



### 写入文件

1.fwrite()

int fwrite ( resource handle, string string [, int length] )

fwrite()函数将string的内容写入到由handle指定的资源中。如果指定length参数，将在写入Length个字符时停止。

例：$str = "test text";

​       $fh = fopen("test.txt", "a");

​       fwrite($fh, $str);

​       fclose($fh);

2.file_put_contents()

int file_put_contents ( string filename, string data [, int flags [, resource context]] )

file_put_contents()函数将一个字符串写入文件，与依次调用

fopen(),fwrite(),fclose()功能一样;

例：$str = "hello";

​       file_put_contents("test.txt", $str);

### 小练习

记录当前页面的访问次数(pv):

​    $count = file_get_contents('test.txt');

​    $count += 1;

​    file_put_contents('test.txt', $count);

​    $fh = fopen('test.txt', 'r');

​    $str = file_get_contents('test.txt');

​    echo '当前网站访问量为:'.$str;

###复制，重命名，删除文件

1.copy()

bool **copy** ( string source, string dest ) 

将文件从 *source* 拷贝到 *dest*。如果成功则返回 **TRUE**，失败则返回 **FALSE**。 

例：Copy("test.txt", "test.txt.bak");

2.rename()

bool **rename** ( string oldname, string newname [, resource context] )

尝试把 *oldname* 重命名为 *newname*。 如果成功则返回 **TRUE**，失败则返回 

**FALSE**。

例：rename("test.txt", “test2.txt”);

3.unlink()

bool **unlink** ( string filename )

删除文件，如果删除成功返回true, 否则返回false;

例1：删除一个文本文件

unlink(“test.txt")；

4. filemtime() 返回文件的最后修改时间;

注："最后改变时间"不同于 "最后修改时间"。最后改变时间指的是对文件inode数据的任何改变，包括改变权限，所属组，拥有者等; 而最后修改时间指的是对文件内容的修改

5. file_exists() 检查文件或目录是否存在，如果存在返回true, 否则返回false;
6. is_readable() 判断文件是否可读，如果文件存在并且可读，则返回true;
7. is_writable() 判断文件是否可写，如果文件存在并且可写，则返回true;

## 读取目录

1.opendir()

resource **opendir** ( string path [, resource context] )

打开目录句柄;

2.closedir()

void **closedir** ( resource dir_handle ) 

关闭目录句柄

3.readdir()

string **readdir** ( resource dir_handle ) 

返回由dir_handle指定目录中的各个元素。可以使用此函数列出给定目录中的所有文件和子目录

例：$dh = opendir(".");

While($file = readdir($dh)){

​	echo $file."<br />";

}

closedir($dh);

4.scandir()

array **scandir** ( string directory [, int sorting_order [, resource context]] )

返回一个包含有 *directory* 中的文件和目录的数组;

5.rmdir()

bool rmdir ( string dirname )

删除目录

6.mkdir()

bool mkdir ( string pathname [, int mode [, bool recursive [, resource context]]] )
尝试新建一个由 pathname 指定的目录。

### 其他文件操作函数

1.filesize()

int **filesize** ( string filename )

取得文件的大小，以字节为单位

2.filectime()

int **filectime** ( string filename )

取得文件的创建时间，以unix时间戳方式返回

例：$t = filectime("test.txt");

echo date("Y-m-d H:i:s", $t);

3.fileatime() 返回文件的最后改变时间;

### 解析目录路径函数

1.basename()

string **basename** ( string path [, string suffix] ) 

返回路径中的文件名部份，当指定了可选参数suffix会将这部分内容去掉;

例：$path = "/home/www/data/users.txt";

   $filename = basename($path);     //user.txt

   $filename2 = basename($path, “.txt");     //user

2.dirname()

string **dirname** ( string path )

返回路径中的目录部份;

3.pathinfo()

array **pathinfo** ( string path [, int options] )

返回一个关联数组，其中包括路径中的四个部份：basename部分，dirname部分，文件名，扩展名

例：$pathinfo = pathinfo($_SERVER["SCRIPT_FILENAME"]);

​       print_r($pathinfo);

//     Array ( 

​		[dirname] => D:/development/xampp/htdocs/php-demo 

​		[basename] => index.php 

​		[extension] => php

​		[filename] => index 

​	)

## 表单处理

### 简介

GET所有表单输入的数据被加载到请求的URL地址后面;

如：test.php?username=free&password=123&content=dfdsfsfd;

GET方式提交数据只能传递文本，能够提交的数据量大小有限，安全性差;

POST提交数据的方式把表单的数据打包放入http请求中; 

POST能够提交更多的数据;

表单提交的数据会自动封装为数组;

用$_GET, $_POST, 或$_REQUEST获得表单提交的数据;

多值表单控件（如复选框和多选框），大大提高了基于web的数据收集能力;

因为这些组件是多值的，所以表单处理函数必须能够识别一个表单变量中可能有

多个值;为了让php识别一个表单变量的多个值（即考虑为数组），需要对表单名

(元素的name属性值）增加一对中括号，如:

<input type="checkbox"name="love[]"/>



下面是一个提交表单数据到当前页面并读取显示的案例:

**//**   $_SERVER['PHP_SELF']提交到当前页面

<form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="post">    

​    	Name: <input type="text" name="fname">

​    	Age: <input type="text" name="age">

​    	<input type="submit">

 </form>

 <?php

​	$name = $age = '';

​	if  ($_SERVER["REQUEST_METHOD"] == "POST") {

​		//   过滤用户输入的数据

​    		function test_input($data){

​			// 去除用户输入数据中不必要的字符 (如：空格，tab，换行)

​      			$data = trim($data);

​			// 去除用户输入数据中的反斜杠 (\)

​      			$data = stripslashes($data);

​      			$data = htmlspecialchars($data);

​      			return $data;

   		 };

​    		$name = test_input($_POST['fname']);

​    		$age = test_input($_POST['age']);

   	 	echo "<h2>您输入的内容是:</h2><br/>	";

​    		echo $name;

​    		echo "<br>	";

​    		echo $age;

​	}

  ?>



### 文件上传的相关配置



**1.表单设置**

要进行文件的上传，需要对form表单进行特殊设置;

(1).设定表单数据的提交方式为POST

(2).设定enctype属性值为: multipart/form-data ,  保证能上传文件

**2.PHP设置(php.ini文件)**

(1)  file_uploads 

是否允许通过HTTP上传文件，默认为ON

(2)  upload_max_filesize 

允许上传文件大小的最大值，默认为2M，此指令必须小于post_max_size;

(3)  upload_tmp_dir

指定上传文件的临时存放路径，这个目录对于拥有此服务器进程的用户必须是可

写的;如果未指定则使用系统默认值;

(4)  post_max_size

控制POST方式提交数据php所能够接收的最大数据量;

(5)  memory_limit

指定单个脚本程序可以使用的最大内存容量;

(6)  max_execution_time

此指令确定php脚本可以执行的最长时间，以秒为单位，默认为30秒;



### $_FILES数组

```php
$_FILES超级全局变量作用是存储各种与上传文件有关的信息;

$_FILES是一个二维数组，数组中共有5项：

$_FILES["userfile"]["name"]	上传文件的名称

$_FILES["userfile"]["type"] 	上传文件的类型

$_FILES["userfile"]["size"] 	上传文件的大小, 以字节为单位

$_FILES["userfile"]["tmp_name"]	文件上传后在服务器端储存的临时文件名, 存储位置在服务器端tmp文件夹

$_FILES["userfile"]["error"] 	文件上传相关的错误代码

注:userfile代表文件上传表单元素的名字(name属性的值); 因此这个值将根据你所给定的名称有所不同;
```

### 上传错误信息

$_FILES[‘userfile’][‘error’]  提供了在文件上传过程中出现的错误：

1.UPLOAD_ERR_OK (value = 0)      如果文件**上传成功返回0**;

2.UPLOAD_ERR_INI_SIZE (value = 1)

如果试图上传的文件大小超出了 upload_max_filesize指令指定的值，则返回1;

3.UPLOAD_ERR_FORM_SIZE (value = 2)

如果试图上传的文件大小超出了MAX_FILE_SIZE指令（可能嵌入在HTML表单中）指定的值，则返回2;

4.UPLOAD_ERR_PARTIAL (value = 3)

如果文件没有完全上传，则返回3; 如网络出现错误，导致上传过程中断;

5.UPLOAD_ERR_NO_FILE (value = 4)

如果用户没有指定上传的文件就提交表单，则返回4

### 文件上传函数

1.is_uploaded_file()

bool **is_uploaded_file** ( string filename )

is_uploaded_file()函数确定参数filename指定的文件是否使用HTTP POST上传;

例：if(is_uploaded_file($_FILES[‘userfile’][‘tmp_name’])){

​	copy($_FILES[‘userfile’][‘tmp_name’], “test.txt”);

​        }else{

​	echo "文件上传失败！";

​        }

2.move_uploaded_file()

bool **move_uploaded_file** ( string filename, string destination )

move_uploaded_file()作用是将上传文件从临时目录移动到目标目录; 虽然copy()也可以实现同样功能，但move_uploaded_file()还提供了一种额外的功能，它将检查由filename输入参数指定的文件确实是通过http post 上传机制上传的。如果所指定的文件并非上传文件，则移动失败，返回false;

例：move_uploaded_file($_FILES['userfile']['tmp_name'], "1/test.jpg");



###上传多个文件
案例如下:

index.php文件：

```
<form action="upload_file.php" method="post" enctype="multipart/form-data">
    <label for="file">Filename1:</label>
    <input type="file" name="file[]" id="file1"><br>
    <label for="file">Filename2:</label>
    <input type="file" name="file[]" id="file2"><br>
    <input type="submit" name="submit" value="提交">
</form><input name="userfile[]" type="file" /><br />
```

upload_file.php文件：

```php
if ($_FILES['file']['error'][0] > 0) {
  	//打印上传错误信息
    echo "error:".$_FILES['file']['error'][0]."<br/>";
} else {
    echo "Upload_file1: ".$_FILES['file']['name'][0]."<br/>";
    echo "Type: ".$_FILES['file']['type'][0]."<br/>";
    echo "Size: ".$_FILES['file']['size'][0]."<br/>";
    echo "Stored in: ".$_FILES['file']['tmp_name'][0]."<br/><br/>";
}

echo "Upload_file2: ".$_FILES['file']['name'][1]."<br/>";
echo "Type: ".$_FILES['file']['type'][1]."<br/>";
echo "Size: ".$_FILES['file']['size'][1]."<br/>";
echo "Stored in: ".$_FILES['file']['tmp_name'][1]."<br/>";
  
```

所有提交的信息都将被储存到以数字为索引的数组中

$_FILES["userfile"]["name"][0],     

$_FILES["userfile"]["name"][1]  分别获取提交的两个文件的文件名,  其他以此类推.  




###对上传文件限制以及保存上传文件

上面的实例在服务器的 PHP 临时文件夹中创建了一个被上传文件的临时副本。

这个临时的副本文件会在脚本结束时消失。要保存被上传的文件，我们需要把它拷贝到另外的位置

例如保存上传的文件：

服务器中创建一个upload文件夹

```php
if (file_exists("../upload/" . $_FILES["file"]["name"])) {
  echo $_FILES["file"]["name"]." already exists.";
} else {
  //将上传文件从临时目录移动到目标目录
  move_uploaded_file($_FILES["file"]["tmp_name"], "../upload/".$_FILES["file"]["name"]);
  echo "Stored in: " . "../upload/";
}
```



