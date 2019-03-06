# 移动端_Day05-Flexbox Layout

参考文章：

[flexbox 完全指导](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

[w3c规范](https://www.w3.org/html/ig/zh/css-flex-1/)

# 一、背景

​	`Flextbox Layout`(弹性盒布局或伸缩盒布局)，提供了一种更加有效的方式去布局、对齐和给容器中的子元素分配空间，即使他们的尺寸未知或者是动态改变的。  看看里面有个`flex`就能想象出来。

​	`Flexbox layout`背后的设计理念：赋予容器去改变他的子元素的宽、高、排列顺序的能力，从而可以更好的填充可用空间，尤其对各种各样的设备和屏幕尺寸提供了便利的方式去布局。一个具有flex特性的容器可以去拉伸他的子元素去填充可用的自由空间，也可以收缩他的子元素防止溢出。

​	更重要的一点，`flextbox layout` 的布局方向也是不固定的。这点与我们以前的布局是不同的。比如：`block`是垂直布局的，而`inline`是水平布局的。 对那些可以工作良好的页面来说，他们在支持庞大或者复杂的应用方面缺乏灵活性。尤其当面对设备的方向、尺寸、缩放等等方面发生改变的时候，这种缺点更加明显。

# 二、基本知识

​	`flexbox`是一个完整的模块，而不是一个单一的属性。 

​	`flexbox`加入了大量的属性。这些属性一部分用在容器上(父元素，一般称之为 `flex container`),而另外的一些是用在子元素上(一般称之为 `flex items`.  弹性项目, 包含文本)。

> 下面介绍一些基本概念：

这张图来自w3c规范。

![](http://o7cqr8cfk.bkt.clouddn.com/17-5-24/10640272.jpg)

一般情况下，`flex itmes` 要么沿着 `main axis` 布局(从主轴起点到主轴重点)，要么沿着 `cross axis` 布局(从侧轴起点到侧轴重点)。

- **主轴(main axis)** : 弹性容器的主轴是最主要的轴，flex items会沿着这条轴被布局。有一点需要注意：主轴不一定总是水平的，他的方向由 `flex-direction` 属性的值来决定。(后面后细讲)
- **主轴起点(main start)和主轴终点(main end)**：弹性容器中的 flex items 会从 主轴起点 开始 到主轴重点结束 布局。
- **主轴长度(main size)**：flex item的宽或高就是主轴长度。到底是宽还是高，由谁沿着主轴的方向来决定。
- **侧轴(cross axis)**：垂直于主轴的轴就是侧轴。侧轴的方向由主轴来决定。
- **侧轴起点(cross start )和侧轴终点(cross end)**：弹性行(flex lines)从侧轴起点开始到侧轴重点结束。
- **侧轴长度(cross size)**：伸缩项目的在侧轴方向的宽度或高度就是项目的侧轴长度，伸缩项目的侧轴长度属性是「`width`」或「`height`」属性，由哪一个沿着着侧轴方向决定。

# 三、flex container的属性

![](http://o7cqr8cfk.bkt.clouddn.com/17-5-24/8759372.jpg)

## 3.1	display

​	这个属性把一个元素定义成为 flex container。可以设置为 `flex` 或 `inline-flex`。设置为`flex`容器就是块级容器，设置为 `inline-flex` 就是行内元素。  这个容器就会成为他们的**直接子元素**的 `flex context`

```css
.container {
	display: flex; /* or inline-flex */
}
```

## 3.2	flex-direction

​	这个属性创建主轴，定义了 `flex items` 在弹性容器中布局的方向。主轴要么水平方向，要么垂直方向。

```css
.container {
	flex-direction: row | row-reverse | column | column-reverse;
}
```

- row : 主轴水平，方向从左向右。**（默认值）**
- row-reverse：主轴水平，方向从右向左
- column : 主轴垂直，方向从上向下
- column-reverse：主轴垂直，方向从下向上

![](http://o7cqr8cfk.bkt.clouddn.com/17-5-25/56696626.jpg)

## 3.3	flex-wrap

​	默认情况下，所有的`flex items` 都会试图在一行。通过修改这个属性的值，可以让 `flex items`按照要求多行排列。其实这个属性**可以定义 `flex items` 在侧轴方向的排序方式**。

```css
.container{
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

- nowrap	：所有的 `flex items` 在一行。**(默认值)**
- wrap ：允许 `flex items` 自动换行在多行，方向是从上向下。
- wrap-reverse : 允许 `flex items` 自动换行在多行，方向是从下向上。 

html:

```html
<div class='container'>
    <p></p>
    <p></p>
    <p></p>
    <p></p>
</div>
```

css:

```css
* {
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
  width: 700px;
  height: 500px;
  background-color: gray;
  flex-direction: row;
  flex-wrap: nowrap;
}
p{
  width : 200px;
  height : 200px;
  background-color : pink;
}
p:nth-child(2n){
  background-color: cornflowerblue;
}
```
**效果1：**

![](http://o7cqr8cfk.bkt.clouddn.com/17-5-25/33422693.jpg)

**效果2：**

![](http://o7cqr8cfk.bkt.clouddn.com/17-5-25/26943325.jpg)

**效果3：**

![](http://o7cqr8cfk.bkt.clouddn.com/17-5-25/80870562.jpg)

**效果4：**

![](http://o7cqr8cfk.bkt.clouddn.com/17-5-25/68686976.jpg)

**效果5：**

![](http://o7cqr8cfk.bkt.clouddn.com/17-5-25/86813761.jpg)

**效果6：**

![](http://o7cqr8cfk.bkt.clouddn.com/17-5-25/32692631.jpg)

## 3.4	flex-flow

​	`flex-flow`是`flex-direction` 和 `flex-wrap`两个属性的合并简写方式。一次性的定义了主轴和侧轴，他的默认值是：`row nowrap`

```css
flex-flow: <‘flex-direction’> || <‘flex-wrap’>
```

## 3.5	justify-content

​	该属性定义了主轴方向`flex items`的对齐方式。也能把多余的自由空间，分配给`flex-items`。

```css
.container {
	justify-content: flex-start | flex-end | center | space-between | space-around;
}
```

- flex-start：`flex-items`从主轴起点开始排列。默认

![](http://o7cqr8cfk.bkt.clouddn.com/17-5-25/21454457.jpg)

- flex-end：`flex-items`从主轴终点开始排列。

![](http://o7cqr8cfk.bkt.clouddn.com/17-5-25/72039231.jpg)

- center：`flex-items`在主轴方向居中排列。

![](http://o7cqr8cfk.bkt.clouddn.com/17-5-25/68296087.jpg)

- space-between：把 free space 平局分布在 `flex-items`之间。第一个 item紧挨着主轴起点，最后一个item紧挨着主轴终点。

![](http://o7cqr8cfk.bkt.clouddn.com/17-5-25/69815781.jpg)

- space-around：把 `free space`平均分布在每个item的周围。所以中间空白会比边上的空白大一倍。

  ![](http://o7cqr8cfk.bkt.clouddn.com/17-5-25/41495995.jpg)



## 3.6	align-items

​	**该属性定义了`flex-items`在侧轴上的对齐方式(flex-wrap定义排列方式)**。可以看成是`justify-content`在侧轴上的版本。

**如果是单行`flex-items`的情况使用比较好  **

```css
.container {
	align-items: flex-start | flex-end | center | baseline | stretch;
}
```

- flex-start：从侧轴起点开始排列
- flex-end：从侧轴的终点开始排列
- center：沿着侧轴方向居中
- baseline：沿着内容的基线对齐
- **stretch：在侧轴方向拉伸`flex-items`。(默认值)**。但是他的优先级**比设定了具体的`heigth`和`max-height`低，但是比auto高**。

![](http://o7cqr8cfk.bkt.clouddn.com/17-5-25/26736671.jpg)

## 3.7	align-content

​	该属性定义了当有多行`flex items`时，`free-space`如何分布，类似于主轴的`justify-content`

**单行无效**

```css
.container {
	align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```

- flex-start：从侧轴起点开始排列
- flex-end：从侧轴的终点开始排列
- center：沿着侧轴方向居中
- **stretch：在侧轴方向拉伸`flex-items`。(默认值)**。但是他的**优先级比设定了具体的`heigth`和`max-height`低**，但是比auto高。
- space-between：把 free space 平局分布在 `flex-items`之间。第一个 item紧挨着侧轴起点，最后一个item紧挨着侧轴终点。
- space-around：把 `free space`平均分布在每个item的周围。所以中间空白会比边上的空白大一倍。

![](http://o7cqr8cfk.bkt.clouddn.com/17-5-25/56214136.jpg)

# 四、flex-items的属性

![](http://o7cqr8cfk.bkt.clouddn.com/17-5-26/49578220.jpg)

## 4.1order

​	默认情况下，`flex-items`安装源码的属性布局。然后，通过 `order`属性可以改变他们在弹性容器中的出现的顺序。

```css
.item {
    order: <integer>; //默认值是 0
}
```

​	**值越大，布局越靠后; 反之，越小，布局越靠前**。

```css
.child:nth-child(2){
    order: 2;
}
.child:nth-child(3){
    order: 1;
}
```

![](http://o7cqr8cfk.bkt.clouddn.com/17-5-26/1447655.jpg)

## 4.2	flex-grow

​	该属性设置 `flex-item` 在主轴方向，有空余空间的时候可以占据空余空间。他的值是一个没有单位的值，表示**占据空余空间的比例**。	

​	**剩余空间是正的时候起作用**。

​	**默认值是 0**。负值无效

```css
.item {
	flex-grow: <number>; /* default 0 */
}
```

比如：

1. 如果有2个item都设置为 1， 则他们会把剩余的平分，  因为分别是： 1 / (1 + 1) * 剩余空间、1 / (1 + 1) * 剩余空间

2. 如果3个item 分别设置为 2、1、3  。则他们分别分的剩余空间的 2 / (2 + 1 + 3) * 剩余空间、1 / (2 + 1 + 3)* 剩余空间、3 / (2 + 1 + 3)* 剩余空间

**总结： flex-grow / 所有的flex-grow之和 * 剩余空间**

```css
.item:nth-child(1){
    flex-grow: 1;
}
.item:nth-child(2){
    flex-grow: 1;
}
```

![](http://i4.buimg.com/588926/1f50704a78b4fb4b.png)

```css
.item:nth-child(1){
    flex-grow: 1;
}
.item:nth-child(3){
    flex-grow: 2;
}
```

![](http://i4.buimg.com/588926/3c4f362cc50964b5.png)

## 4.3	flex-shrink

​	该属性让 `flex-item`具有收缩的功能。当**一行放不下，并且不允许换行的时候**，允许 flex-item收缩。

​	值是一个数字，来表示收缩比率。默认值是1。 如果是0表示不允许收缩。

​	**一行放不下的时候，其实表示的是剩余空间为负，计算方法同 `flex-grow`是一样的，只是现在是减去相应的值而已(加负)**

```css
.container{
  height : 200px;
  width: 600px;
  background-color : gray;
  display: flex;
}
```

```css
.item{
    height:100px;
    width: 300px;
    background-color: pink;
    margin: 50px 0 0 0px;
    
    font-size: 60px;
    text-align: center;
    line-height: 100px;
}
.item:nth-child(2n){
    background-color: cornflowerblue;
}
.item:nth-child(1){
    flex-shrink: 2;
}
.item:nth-child(3){
    flex-shrink: 3;
}
```

计算：

剩余空间：  600 - 3 * 300 = -300

剩余空间每份：  -300 / (2 + 1 + 3) = -50

item1宽度：  300 - 50 * 2 = 200

item1宽度：  300 - 50 * 1 = 250

item1宽度：  300 - 50 * 3 = 150

![](http://o7cqr8cfk.bkt.clouddn.com/17-5-26/80235033.jpg)

##4.4	flex-basis

​	这个属性指定在剩余空间分配之前，`flex-item`的尺寸。**优先级比设置的width属性高**

```css
.item {
	flex-basis: <length> | auto; /* default auto */
}
```

- 可以指定具体的长度 `px、em、百分比`
- auto：意思是参考这个item的宽或高。 默认值是auto

```css
.container{
    width: 900px;
    display: flex;
}
.item{
  width: 200px;
  background-color: pink;
}
.item:nth-child(1){
  flex-grow: 1;
  flex-basis: auto;  // 这里意思是分配空间时以该元素自身宽度为基础，在该基础上改变
}
.item:nth-child(3){
  flex-grow: 1;
  flex-basis: 60px;  // 分配空间时该元素尺寸为60，在该基础上改变
}
```

剩余空间：  900 - 200 - 200 - 60 = 440

item1 ： 200 + 220 = 420

item2：200

item3：60 + 220 = 280

![](http://o7cqr8cfk.bkt.clouddn.com/17-5-26/80243796.jpg)

## 4.5	flex

​	是`flex-grow、flex-shrink、flex-basis`的简写。 `flex-shrink、flex-basis`这2个参数是可选的。  **默认值是：`0 1 auto(参考这个item的宽或高)`**

```css
.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```

***强烈建议使用这个简写的形式来代替3个独立的属性。 简写可以智能设置其他的值。***

## 4.6	align-self

​	单独的设置某个 item 的对齐方式，来覆盖align-items或align-content的设置。

```css
.container {
    height: 200px;
    width: 900px;
    background-color: gray;
    display: flex;
    align-items: flex-start;
}
.item:nth-child(3) {
  flex-grow: 1;
  flex-basis: 0px;
  align-self: flex-end;
}
```

![](http://o7cqr8cfk.bkt.clouddn.com/17-5-26/29407749.jpg)

