### MVC & MVVM

Mode View Controller

Mode View ViewModel

针对客户端应用开发AngularJS吸收了传统的MVC基本原则。

MVC(Model-View-Controll)设计模式针对不同的人可能意味不同的东西 ,AngularJS并不执行传统意义上的MVC，更接近于MVVM。



MVVM模式是Model-View-ViewMode模式的简称。

由视图(View)、视图模型(ViewModel)、模型(Model)三部分组成，通过这三部分实现UI逻辑、呈现逻辑和状态控制、数据与业务逻辑的分离。

Model将和ViewModel互动(通过$scope对象)，将监听Model的变化。这些可以通过View来发送和渲染，由HTML来展示你的 代码。



Model与MVC模式一样，Model用于封装与应用程序的业务逻辑相关的数据以及对数据的处理方法。

它具有对数据直接访问的权利，例如对数据库的访问，Model不依赖于View和ViewModel，也就是说，模型不关心会被如何显示或是如何被操作，模型也不能包含任何用户使用的与界面相关的逻辑。

ViewModel是一个用来提供特别数据和方法从而维护指定view的对象,。ViewModel是$scope的对象，只存在于AnguarJS的应用中。$scope只是一个简单的js对象，这个对象使用简单的API来侦测和广播状态变化。

Controller负责设置初始状态和参数化$scope方法用以控制行为。需要指出的controller并不保存状态也不和远程服务互动。

View是AngularJS解析后渲染和绑定后生成的HTML。这个部分帮助你创建web应用的架构。$scope拥有一个针对数据的参考，controller定义行为，view处理布局和互动。