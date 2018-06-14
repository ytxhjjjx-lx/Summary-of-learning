### jQuery DOM 元素方法 - index() 方法在轮播图中的应用!!!


>该方法返回指定元素相对于其他指定元素的index位置, 默认从0开始, 这里的其他指定元素可通过 jQuery 选择器或 DOM 元素来指定。


>用法一: $(selector).index()

获得匹配元素相对于其同胞元素的 index 位置。也可以理解为该元素在其父元素中的位置

```
  $(function(){
  	$("li").click(function(){
    	alert($(this).index());  //点击第一个li,弹出0; 点击第一个li,弹出1;
  });
  
  <ul>
	<li>Coffee</li>
  	<li>Milk</li>
  	<li>Soda</li>
  </ul>
```



> 用法二: $(selector).index(element)

获得匹配元素element相对于选择器selector的 index 位置。该元素element可以通过 DOM 元素或 jQuery 选择器来指定。

```
   $(function(){
  	  $("button").click(function(){
    	alert($(".hot").index($("#favorite"))); // 1
  	  }); 
   });
  
  <button>获得 index</button>
  <ul>
  	<li>Milk</li>
  	<li class="hot">Tea</li>
 	<li class="hot" id="favorite">Coffee</li>
  </ul>
```





在轮播图中的应用, 原理就是**根据点击的按钮下标来显示对应位置的图片**(个人感觉真的很好用, 之前都是分开写,给每个按钮添加一个点击事件, 现在想想真的是够麻烦),  此处只考虑点击切换图片效果

```html
	<div>
		<img src="imgs/1.jpg" alt="">
		<img src="imgs/2.jpg" alt="">
		<img src="imgs/5.jpg" alt="">
		<img src="imgs/4.jpg" alt="">
	</div>
	<div>
		<button>1</button>
		<button>2</button>
		<button>3</button>
		<button>4</button>
	</div>
```

```css
	div{
		width: 300px;
		height: 300px;
		position: relative;
	}
	img{
		position: absolute;
		opacity: 0;
	}
	img:first-child {
		opacity: 1;
	}	
	button{
		width: 50px;
		height: 20px;
	}
```

```javascript	
	var imgs = document.querySelectorAll("img");
	$("button").click(function () {
		$("img").css("opacity", 0);
		//记录点击的li的下标, 显示与li下标对应的内容
		var n = $("button").index(this);   //也可以写成 var n = $(this).index()或者var n = $("button").index($(this))
		$(imgs[n]).animate({opacity : 1}, 500);
	})
	
```
