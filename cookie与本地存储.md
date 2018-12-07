# cookie与本地存储


##什么是cookie
- 用来保存页面信息的，如用户名、密码
- cookie的特性：同一个网站中所有的页面共享一套cookie；数量、大小限制；过期时间
- js中使用cookie：document.cookie

##如何设置cookie？

在js中，使用`document.cookie = "键=值"`即可，但是这种方式设置的cookie由于没有添加过期时间，所以关闭浏览器，cookie就丢失，我们要在后边继续加上`expires=时间`设置上过期时间即可.

```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>

	<script type="text/javascript">
		// 获取系统当前时间
		var oDate = new Date();
		// 设置距离当前时间多少天后cookit过期
		oDate.setDate(oDate.getDate() + 30);
		// 设置cookie及过期时间
		document.cookie = "userName=hello;expires=" + oDate;
		document.cookie = "password=123456;expires=" + oDate;

		alert(document.cookie);

	</script>
</head>
<body>
	
</body>
</html>

```


##如何从cookie中取值

设置cookie我们是直接给cookie赋值，取cookie中的值，方法和设置高度相似。我们首先来看下cookie是一个什么类型的值:

```
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
	</head>
	<body>
		
	</body>
	<script type="text/javascript">
//		alert(document.cookie);
		var cookie1 = document.cookie;
		alert(typeof cookie1);
	</script>
</html>
```

运行这段程序，我们发现他是一个`string`类型的值。这样我们就可以把这个字符串按照特定的字符进行截取，截取的结果放进数组，最终遍历这个数组就可以拿到我们想要的值了。

```
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
	</head>
	<body>
		
	</body>
	<script type="text/javascript">
	function getCookie(name){
		var cookie1 = document.cookie;
		
		//user=tangcaiye; pass=12345; xx=343;
		//user,tangcaiye; pass,12345
		// 由于存放时是按照分号加一个空格进行划分的，所以在这里使用`; `作为分割符
		var arr = cookie1.split("; ");
		
		for (var i=0; i<arr.length; i++){
			var arr2 = arr[i].split("=");
			//arr2[0]->user,arr2[1]->tangcaiye;  arr2[0]->pass,
			if (arr2[0]==name){
				return arr2[1];
			}
		}
//		alert(arr);
		return false;
	}
	
	function setCookie(name,value,day){
		var date1 = new Date();
		
		var nowDate = date1.getDate();
		date1.setDate(nowDate+day);
		
		document.cookie = name+"="+value+"; expires="+date1;
	}
	
	function removeCookie(name){
		
		setCookie(name,".",-1);
	}
//		alert(getCookie("xx"));
//		alert(document.cookie);
//		var cookie1 = document.cookie;
//		alert(typeof cookie1);
	setCookie("xx","235",5);
	</script>
</html>
```

## 练习：cookie实现记住用户名功能

```
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
	</head>
	<body>
		<form id="form1" action="">
			用户名:<input type="text" id="user" /><br />
			密&nbsp;&nbsp;&nbsp;码: <input type="password" id="pass" /><br />
			<input type="checkbox" id="ch1" />记住用户名<br />
			<input type="checkbox" id="ch2" />记住密码<br />
			<input type="submit" />
		</form>
	</body>
</html>
<!-- 引入外部的读写cookie函数 -->
<script src="cookie.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript">
	var form1 = document.querySelector("#form1");
	var user = document.querySelector("#user");
	var pass = document.querySelector("#pass");
	var ch1 = document.querySelector("#ch1");
	var ch2 = document.querySelector("#ch2");
	
	if (getCookie("user")){
		user.value = getCookie("user");
		ch1.checked = true;
	}
	if (getCookie("pass")){
		pass.value = getCookie("pass");
		ch2.checked = true;
	}
	
	form1.onsubmit = function (){
		
		if (ch1.checked){
			//记录用户名
			setCookie("user",user.value,15);
		}else{
			
			removeCookie("user");
		}
		if (ch2.checked){
			
			setCookie("pass",pass.value,15);
		}else{
			removeCookie("pass");
		}
	}
</script>
```

外部js函数的写法：

```
function getCookie(name){
		var cookie1 = document.cookie;
		
		//user=tangcaiye; pass=12345; xx=343;
		//user,tangcaiye; pass,12345
		var arr = cookie1.split("; ");
		
		for (var i=0; i<arr.length; i++){
			var arr2 = arr[i].split("=");
			//arr2[0]->user,arr2[1]->tangcaiye;  arr2[0]->pass,
			if (arr2[0]==name){
				return arr2[1];
			}
		}
//		alert(arr);
		return false;
	}
	
	function setCookie(name,value,day){
		var date1 = new Date();
		
		var nowDate = date1.getDate();
		date1.setDate(nowDate+day);
		
		document.cookie = name+"="+value+"; expires="+date1;
	}
	
	function removeCookie(name){
		
		setCookie(name,".",-1);
	}
```


​	

