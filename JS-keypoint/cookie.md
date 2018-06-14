# cookie
## 1.对于cookie的认识
cookie 是存储于访问者的计算机中的变量;     
每当同一台计算机通过浏览器请求某个页面时,就会发送cookie;      
可以使用 JavaScript 来创建和取回 cookie 的值;


---

## 2.对于cookie的操作
### 1.设置cookie
每个cookie都是一个名/值对: 可以将"key=value"形式的字符串,赋值给document.cookie;
###### 基本语法
```
document.cookie="key="+value;
```

###### 实例
```
<script type="text/javascript">

    document.cookie="userId=123";
    document.cookie="userName=张三";

</script> 
```
这时浏览器将维护两个cookie,分别是userId和userName;

###### 如果要改变一个cookie的值,只需重新赋值:

```
document.cookie="userId=456";
```


### 2.获取cookie的值
cookie的值,可以由document.cookie直接获得
#### 1.原生方法
###### 基本语法
```
var cookieStr = document.cookie;
```

###### 实例
```
<script type="text/javascript">

    document.cookie="userId=123";
    document.cookie="userName=张三";
    var strCookie=document.cookie;
    
    console.log(strCookie); //userId=123; userName=张三;

</script> 
```
这样获得了所有的cookie,是一个字符串,根据需要选取:

```
var username=document.cookie.split(";")[0].split("=")[1];

var password=document.cookie.split(";")[1].split("=")[1];
```

##### 1.获取cookie的值,需要在服务器环境下运行,因为是获取当前域名下的cookie


##### 2.获取cookie的有效权限
如果在某个页面创建了一个cookie,那么该页面所在目录中的其他页面也可以访问该cookie;       
如果这个目录下还有子目录,则在子目录中也可以访问;       
###### 为了控制cookie可以访问的目录,需要使用path参数设置cookie:

```
document.cookie="name=value; path=cookieDir";
```
cookieDir,表示可访问cookie的目录;


```
document.cookie="userId=320; path=/shop";
```
表示当前cookie仅能在shop目录下使用;     

如果要使cookie在整个网站下可用,可以将cookie_dir指定为根目录

```
document.cookie="userId=320; path=/";
```

### 3.删除cookie

```
document.cookie = "key=value;expires=" + new Date(0);        
//时间可以是现在以及现在之前
```

## 3.对cookie原生方法的封装
###### cookie.js
```
// 设置cookie
function setCookie(name, value, day) {
  var d = new Date()
  d.setTime(d.getTime() + day * 24 * 60 * 60 * 1000)
  var expires = d.toUTCString()
  document.cookie = name + "=" + value + "; expires=" + expires
}

// 获取cookie
function getCookie(name) {
  var cookie = document.cookie
  var arr = cookie.split('; ')
  for (var i = 0; i < arr.length; i++) {
    var arr2 = arr[i].split('=')
    if (arr2[0] === name) {
      return arr2[1]
    }
  }
  return false
}

// 删除cookie
function removeCookie(name) {
  setCookie(name, '.', -1)
}
```

---


## 4. jQuery cookie的使用
JQuery没有封装cookie方法,需要下载基于JQuery的插件jquery.cookie.js

##### 1. 首先引入jquery与jquery.cookie


```
<script type="text/javascript" src="js/jquery-1.6.2.min.js"></script>  

<script type="text/javascript" src="js/jquery.cookie.js"></script>
```

##### 2.操作方法

```
//新增cookie：  
$.cookie('cookieName', 'cookieValue');    
//注：如果没有设置cookie的有效期,则cookie默认在浏览器关闭前都有效,故被称为"会话cookie"; 
  
// 创建一个cookie并设置有效时间为7天:  
$.cookie('cookieName', 'cookieValue', { expires: 7 });  
  
// 创建一个cookie并设置cookie的有效路径：  
$.cookie('cookieName', 'cookieValue', { expires: 7, path: '/' });  
  
//读取cookie：  
$.cookie('cookieName'); // 若cookie存在则返回'cookieValue'；若cookie不存在则返回null   
  
//删除cookie：把ncookie的值设为null即可  
$.cookie('the_cookie', null); 
```
### 1.设置cookie

```
$.cookie('key','value',{
    expires：7,
    path：'/',
    domain: 'xxx.com',
    secure: false
});
```
### 2.获取cookie

```
$.cookie('key');
```
### 3.删除cookie

```
$.cookie(‘key’,null);
```

---

## 5. cookie的优缺点
### 1.优点
1.只在cookie中存放不敏感数据,即使被盗也不会有重大损失;     
2.控制cookie的生命期,使之不会永远有效;     
3..cookie帮助服务端承担了很大的压力,可以利用cookie在和客户端做很多判断而不应经过服务端;       
### 2.缺点
1.cookie数量和长度的限制.       
每个cookie长度不能超过4KB,否则会被截掉

2.安全性问题        

3.有些状态不可能保存在客户端

---

## 6.cookie应用实例(原生)

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <form id="form1" action="#" method="get">
    用户名:<input type="text" id="user"><br>
    密码: <input type="password" id="pass"><br>
    是否记住用户名：<input type="checkbox" id="saveUser"><br>
    是否保存密码：<input type="checkbox" id="savePass"><br>
    <input type="submit" value="登陆">
  </form>
</body>
<script src="cookie.js"></script>
<script>
var user = document.querySelector('#user')
var pass = document.querySelector('#pass')
var saveUser = document.querySelector('#saveUser')
var savePass = document.querySelector('#savePass')
var form1 = document.querySelector('#form1')
// 获取用户名和密码（如果保存了的话）
if (getCookie('user')) {
  user.value = getCookie('user')
  saveUser.checked = true
}
if (getCookie('pass')) {
  pass.value = getCookie('pass')
  savePass.checked = true
}

form1.onsubmit = function () {

  if (saveUser.checked) {
    // 保存用户名
    setCookie('user', user.value, 30)
  } else {
    // 删除
    if (getCookie('user')) {
      removeCookie('user')
    }
  }
  if (savePass.checked) {
    // 保存密码
    setCookie('pass', pass.value, 30)
  } else {
    if (getCookie('pass')) {
      removeCookie('pass')
    }
  }
}
</script>
</html>
```
