## RESTful是什么

设计概念和准则

网络上的所有事物都可以被抽象为资源

每一个资源都有唯一的资源标识，对资源的操作不会改变这些标示

所有的操作都是无状态的



## http协议

http协议是一个属于应用层的协议，特点是简捷、快速

结构：`schema://host[:port]/path[?query-string][#auchor]`

schema:协议

host: 服务器地址

port:端口

path:访问的资源路径

query-string: 发送给http服务器的查询字符串

auchor: 锚

### 请求

组成格式：请求行、消息报头、请求正文

请求行格式：Method Request-URI HTTP-Version CRLF

例子：GET / HTTP/1.1 CRLF

### 请求方式

GET 请求获取Request-URI所标识的资源

POST 在Request-URI所标识的资源后附加新的数据

HEAD 请求获取由Request-URI所标识的资源的响应消息报头(如果不需要获取资源的响应体，只需要获取资源的简要介绍，比如资源的创建时间，最后修改时间)

PUT 请求服务器存储一个资源，并用Request-URI作为其标识

DELETE 请求服务器删除Request-URI所标识的资源

OPTIONS 请求查询服务器的性能，获取查询与资源相关的选项和需求(获取服务器允许我对资源执行哪些操作)

### 响应

组成格式：状态行、消息报头、响应正文

状态行:HTTP-Version Status-Code Reason-Phrase CRLF

HTTP/1.1 200 OK

常用的状态码(记得越多越好)

200 OK 客户端请求成功

400 Bad Request 客户端请求有语法错误，不能被服务器所理解

401 Unauthorized 服务器收到请求，但是拒绝提供服务

404 Not Found 请求资源不存在

500 Internal Server Error 服务器发生不可预期的错误

503 Server Unavailable 服务器当前不能处理客户端的请求(达到服务器性能瓶颈)

## RESTful跟其他架构的区别

SOAP

SOAP由于各种需求不断扩充其本身协议的内容，导致在SOAP处理方面的性能有所下降。同时在易用性方面以及学习成本上也有所增加。

RESTful对于资源型服务接口来说很合适，同时特别适合对于效率要求很高(快速)，但是对于安全要求不高的场景。

SOAP的成熟性可以给需要提供给多开发语言的，对于安全性要求较高的接口设计带来便利。所以纯粹说什么设计模式会占主导地位没什么意义，关键还是看应用场景

## RESTful API设计

[RESTful API 设计指南](http://www.ruanyifeng.com/blog/2014/05/restful_api.html)

###资源路径(URI)  

RESTful API核心就是面向资源.在RESTful架构中，每个网址代表一种资源，所以网址中不能有动词，只能有名词。一般来说API中的名词应该使用复数

例子：有一个API提供动物园(zoo)的信息，还包括各种动物和雇员的信息，则它的路径应该设计成下面这样

`https://api.example.com/v1/zoos`动物园资源

`https://api.example.com/v1/animals`动物资源

###HTTP动词

- GET（SELECT）：从服务器取出资源（一项或多项）。
- POST（CREATE）：在服务器新建一个资源。
- PUT（UPDATE）：在服务器更新资源（客户端提供改变后的完整资源）。
- PATCH（UPDATE）：在服务器更新资源（客户端提供改变的属性）。
- DELETE（DELETE）：从服务器删除资源。

例子：

- GET /zoos：列出所有动物园
- POST /zoos：新建一个动物园
- GET /zoos/ID：获取某个指定动物园的信息
- PUT /zoos/ID：更新某个指定动物园的信息（提供该动物园的全部信息）
- PATCH /zoos/ID：更新某个指定动物园的信息（提供该动物园的部分信息）
- DELETE /zoos/ID：删除某个动物园
- GET /zoos/ID/animals：列出某个指定动物园的所有动物
- DELETE /zoos/ID/animals/ID：删除某个指定动物园的指定动物

###过滤信息

如果记录数量很多，服务器不可能都将它们返回给用户。API应该提供参数，过滤返回结果。

下面是一些常见的参数。

> - ?limit=10：指定返回记录的数量
> - ?offset=10：指定返回记录的开始位置。
> - ?page=2&per_page=100：指定第几页，以及每页的记录数。
> - ?sortby=name&order=asc：指定返回结果按照哪个属性排序，以及排序顺序。
> - ?animal_type_id=1：指定筛选条件

参数的设计允许存在冗余，即允许API路径和URL参数偶尔有重复。比如，GET /zoo/ID/animals 与 GET /animals?zoo_id=ID 的含义是相同的。

###状态码

服务器向用户返回的状态码和提示信息，常见的有以下一些（方括号中是该状态码对应的HTTP动词）。

> - 200 OK - [GET]：服务器成功返回用户请求的数据，该操作是幂等的（Idempotent）。
> - 201 CREATED - [POST/PUT/PATCH]：用户新建或修改数据成功。
> - 202 Accepted - [*]：表示一个请求已经进入后台排队（异步任务）
> - 204 NO CONTENT - [DELETE]：用户删除数据成功。
> - 400 INVALID REQUEST - [POST/PUT/PATCH]：用户发出的请求有错误，服务器没有进行新建或修改数据的操作，该操作是幂等的。
> - 401 Unauthorized - [*]：表示用户没有权限（令牌、用户名、密码错误）。
> - 403 Forbidden - [*] 表示用户得到授权（与401错误相对），但是访问是被禁止的。
> - 404 NOT FOUND - [*]：用户发出的请求针对的是不存在的记录，服务器没有进行操作，该操作是幂等的。
> - 406 Not Acceptable - [GET]：用户请求的格式不可得（比如用户请求JSON格式，但是只有XML格式）。
> - 410 Gone -[GET]：用户请求的资源被永久删除，且不会再得到的。
> - 422 Unprocesable entity - [POST/PUT/PATCH] 当创建一个对象时，发生一个验证错误。(比如注册用户需要2个字段，但是前端只提供了一个，就应该返回422错误)
> - 500 INTERNAL SERVER ERROR - [*]：服务器发生错误，用户将无法判断发出的请求是否成功。

状态码的完全列表参见[这里](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html)。

###错误处理

如果状态码是4xx，就应该向用户返回出错信息。一般来说，返回的信息中将error作为键名，出错信息作为键值即可。

> ```
> {
>     error: "Invalid API key"
> }
> ```

###返回结果

针对不同操作，服务器向用户返回的结果应该符合以下规范。

> - GET /collection：返回资源对象的列表（数组）
> - GET /collection/resource：返回单个资源对象
> - POST /collection：返回新生成的资源对象
> - PUT /collection/resource：返回完整的资源对象
> - PATCH /collection/resource：返回完整的资源对象
> - DELETE /collection/resource：返回一个空文档

## php restFul接口开发

###Apache配置

首先需要配置Apache，创建一个`.htaccess`文件

```
RewriteEngine on
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^(.*)$ index.php/$1 [L]
```

关键代码：

`RewriteEngine on`:表示开启 Rewrite 规则开关

```
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-f 
```

这两行的意思是如果请求不是一个目录或者不是文件的话就执行`RewriteRule`

`RewriteRule ^(.*)$ index.php/$1 [L]`

它的意思就是转向到`index.php`去执行

然后可以在`index.php`中随意执行一些内容，比如打印`$_SERVER`这个变量

然后当你在浏览器中访问不存在的路径的时候都会执行`index.php`中的内容



 ### 接口处理类

然后接下来我们编写处理客户端请求的`Restful`类

