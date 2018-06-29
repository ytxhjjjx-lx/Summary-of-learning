# php5

## 数据库

### 相关术语

1.什么是数据库？

​	数据库（database) 就是一个由一批数据构成的有序集合，这个集合通常被保存为一个或多个彼此相关的文件。

2.什么是关系型数据库？

​	数据被分门别类的存放在一些结构化的数据表(table)中，而数据表之间又往往会形成种种内在的交叉关系。存在于数据表之间的这种关系(relation)使数据库又被称为关系型数据库;

3.关系型数据库系统

​	MySQL、Oracle、Microsoft SQL Server 和IBM DB2都是关系型数据库系统(database system)。除了管理数据，一个这样的系统还包括用来管理各种关系数据库的程序。一个合格的关系数据库系统不仅要确保各种数据的存储情况安全可靠，还必须能够处理对现有数据进行查询、分析和排序以及对新数据进行保存等诸多命令。

4.数据表、记录、字段、查询、SQL、索引

​	**数据表**(table)即用来实际存放有关数据的框架结构。

​      这种数据表里的每一行被称为一条数据记录(data record),简称”**记录**”,每条记录的结构和格式是由人们在定义该数据表时决定的。例如，在某个用户表里，每条记录可能包含着用户的姓名，出生日期，注册时间等多个**字段**（field)。每个字段对自己所能存储的信息类型又有着一定的要求（例如，它必须是一个有着某种特定格式的数字或者是一个字符个数不得超过某个预定义最大值的字符串）。

**查询 **是人们用各种SQL指令构造出来的，SQL指令负责具体完成筛选和提取结果数据的工作

**SQL **（Structured Query Lanuage) 结构化查询语言;这种语言已发展为人们在构造数据库查询命令的一个标准。

5.操作数据库前准备工作

启动xampp的apache服务器和mysql服务器，浏览器输入http://localhost/phpmyadmin(或http://127.0.0.1/phpmyadmin)进入mysql数据库管理界面(也可直接点击admin按钮), 进行一系列操作.

可以在D:/xampp/phpMyAdmin文件夹中的config.inc.php文件中修改phpmyadmin配置文件,

例如修改$cfg['Servers'][$i]['auth_type'] = 'config'; 中的config为cookie则通过*http: //localhost/phpmyadmin/*进

入web登陆界面，输入用户名root后直接点击登陆（密码默认为空）即可登录界面





## 数据库操作

### 编程接口

   PHP5开始，PHP向程序员提供了两种MySQL应用程序编程接口:一种是从PHP早期版本一直就有的mysql功能模块;另一种是从PHP5才开始有的mysqli接口;

​	mysql功能模块不是PHP的一个集成组件。要想使用这个功能扩展模块，PHP的Linux版本必须在编译时加上一个—with-mysql选项。PHP的windows版本通过一个DLL文件提供了相应的扩展,不管使用是哪一种操作系统，都必须在php.ini文件里启用这个扩展以确保PHP能够找到所有必要的DLL。

### 链接MYSQL数据库

​      通过mysql功能模块连接MySQL服务器的办法是调用mysql_connect()函数，它需要提供3项信息：MySQL服务器的主机名、MySQL用户名和密码。**如果MySQL服务器与PHP运行在同一台计算机上，可以使用localhost作为它的主机名。**

​	例：$conn = mysql_connect("localhost", "root", "123456");

​	如果连接成功，这个函数将返回一个标识号码。返则将返回FALSE,并向Web服务器发送一条出错消息，这将使PHP脚本所生成的结果HTML文档里也出现一条出错消息。如果不想让最终用户在他们的web浏览器里看到这样的出错消息，就必须在调用mysql_connect()函数的时候在它的前面加上一个@字符。

### 关闭MYSQL数据库

查询MySQL服务器结束后，应当关闭连接。不过关闭连接不是必需的，因为PHP的垃圾回收机制会处理这个问题。mysql_close()函数关闭可选参数link_id对应的连接。如果没有指定link_id,则认为是最近打开的连接。

​	例：mysql_close();

### 选择MYSQL数据库

与MySQL服务器建立连接后，就可以使用各种mysql_xxx()函数去执行SQL命令。但为了避免每次调用mysql_xxx()函数都要指定目标数据库，最好先用mysql_select_db()函数（它相当于SQL命令USE databasename )为后续操作选定一个默认数据库。

​	例：mysql_select_db("mycompany");

### 执行SQL命令

为了执行SQL命令，需要把它们作为一个字符串传递给mysql_query()函数。如果想访问的不是当前数据库，就需要调用mysql_db_query()函数来添加SQL命令并明确给出那个数据库名称，这两个函数的最后一个参数（连接的ID号码，即mysql_connect()的返回值）都是可选的，只有与MySQL服务器建立了多个连接的时候才需要给出这个参数。

例：$result = @mysql_query("SELECT * FROM user");

​	   // 自 PHP 4.0.6 起不提倡使用此函数。不要用此函数

​	   $result = @mysql_db_query("mycompany", "SELECT * FROM product");

​	   如果SQL命令执行成功，mysql_query()函数将返回PHP资源的引用指针( 一个Resource      id #2格式的字符串）; 否则将返回FALSE,并生成一条出错消息;

​	   mysql_query()函数可以用来执行任何一种SQL命令，比如 SELECT(查询)、INSERT(插入新记录）、UPDATE(修改现有记录）、DELETE(删除现有记录）、CREATE TABLE（创建新数据表）、ALTER TABLE(修改数据表结构）等。

### 获取显示数据

**1. mysql_fetch_row()**

​	mysql_fetch_row()函数将以一个普通数组的形式返回一条结果，它的各个字段需要以$row[n]的方式进行访问。

**2. mysql_fetch_array()**

​	 mysql_fetch_array()函数将以一个关联数组的形式返回一条结果，它的各个字段需要以$row[n]或$row["colname"]的方式进行访问。

**3. mysql_fetch_assoc()**

​	mysql_fetch_assoc()函数也将以一个关联数组的形式返回一条结果记录，但它的各个字段只能以 $row["colname"]的方式进行访问。 	

**4. mysql_fetch_object()**

​	mysql_fetch_object()函数以一个对象的形式返回一条结果记录，

​	它的各个字段需要以$row->colname的方式进行访问。

​	这4个函数的共同点是：每次调用将自动返回下一条结果记录,但如果已经到达结果数据表的末尾，则返回FALSE。

**5.mysql_free_result()**

​	PHP会把查询的结果一直保存到脚本执行结束。如果要提前释放某次查询结果（例如在某个脚本里已经进行了大量查询），可以用mysql_free_result()函数提前释放它。

**6. mysql_num_rows()**

​	mysql_num_rows()函数用于获取查询返回的记录数;

**7. mysql_insert_id()**

​	mysql_insert_id()函数用于获取INSERT 操作产生的 ID ;

**8.mysql_affected_rows ()**

​	 mysql_affected_rows ()函数用于获取前一次 MySQL 操作所影响的记录数 ;



案例： 提取my_first_db数据库中的users表数据

```php
//链接数据库  
$conn = new mysqli("localhost", "root", "", "my_first-db");
//设置编码
$conn->query("set names utf8");
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error . "<br/><br/><hr>");
} 
echo "Connected successfully<br/><br/><hr>"; 
// $sql = "update users set payment = '3500' where name = '张霞'";
// $sql = "select * from users";
// $sql = "delete from users where name = '张蕾'";
$sql = "insert into users(number, name, sex, age, payment, professional_title) 
values('10000006', '张蕾', '女', '24', '3500', '销售员')";
//查询
$result = $conn->query($sql);
if ($result->num_rows > 0) {
  // 输出每条数据记录
  while ($row = $result->fetch_assoc()) {
    echo "number: ".$row['number']."<br/>";
    echo "name: ".$row['name']."<br/>";
    echo "age: ".$row['age']."<br/>";
    echo "sex: ".$row['sex']."<br/>";
    echo "payment: ".$row['payment']."<br/>";
    echo "professional_title: ".$row['professional_title']."<br/><br/><hr>";
  }
} else {
  echo "there is no results";
}
$conn->close();
```

