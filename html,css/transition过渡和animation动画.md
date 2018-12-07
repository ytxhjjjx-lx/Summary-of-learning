### transition过渡和animation动画

animation属性类似于transition，他们都是随着时间改变元素的属性值，其主要区别在于：

1.transition过渡效果需要触发事件；animation在不需要触发任何事件的情况下，也可以达到一种动画的效果,也可以通过事件触发
2.transition属性定义一个元素两种状态之间的过渡,不同的状态可以通过伪类像:hover、:active来定义。也可以通过js代码来动态的改变。
3.transition实现动画的时候只能指定要改变的属性的开始值和结束值,因此不能实现比较复杂的动画效果,​ 而animation通过定义多个关键帧( keyframes )以及定义每个关键帧中元素的属性值来实现更为复杂的动画效果。

注意点:
>1.scale:对元素进行缩放,但元素实际宽高尺寸不变,只是一种视觉上的效果
>2.transform属性复合写法时的注意事项:
>同时有多种转换效果时,后一种转换效果在前一种基础上完成,例如同时设置rotate,translate则完成旋转后相对旋转后的元素的坐标轴进行平移
>例如:
```html
	div{
        width: 200px;
        height: 200px;
        background-color: #0ff;
        transition: all 0.6s;
	}
	div:hover{
        transform: rotateZ(45deg) translateX(200px);     /*相当于之前位置的右下方*/
	}
```


