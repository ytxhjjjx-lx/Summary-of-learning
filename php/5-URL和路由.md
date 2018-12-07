# URL和路由

## 入口文件

### 单入口文件

简介：应用程序的所有http请求都由某一个文件接受并由这个文件转发到功能代码中.

### 单入口的优势

安全监测：单入口文件更安全,如果是多入口的话，我们需要在每个入口都进行安全监测.而单入口就只需在这个入口文件进行处理就可以了。

请求过滤：我们可以过滤掉无效的请求

默认的入口文件位置：`public/index.php`,`.htaccess`是改写`apache`配置的文件

关键代码：

`RewriteEngine on`:表示开启 Rewrite 规则开关

```
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-f 
```

这两行的意思是如果请求不是一个目录或者不是文件的话就执行`RewriteRule`

`RewriteRule ^(.*)$ index.php/$1 [L]`

它的意思就是转向到`index.php`也就是入口文件去执行

在`index.php`中定义了一些配置的常量，这些常量定义的文件是:`thinkphp/base.php`,至于各个常量的意思,可以通过访问[文档](https://www.kancloud.cn/manual/thinkphp5/118137)来了解

另外关于安全方面在'加载框架引导文件'中`require __DIR__ . '/../thinkphp/start.php';`已经帮我做好了关于安全的设置

### 入口文件绑定

如果我们需要给某个入口文件绑定模块:

#### 入口绑定模块

只需要入口文件添加`BIND_MODULE`常量，即可把当前入口文件绑定到指定的模块或者控制器，例如：

```php
// 定义应用目录
define('APP_PATH', __DIR__ . '/../application/');
// 绑定到admin模块
define('BIND_MODULE','admin');
// 加载框架引导文件
require __DIR__ . '/../thinkphp/start.php';
```

还可以设置访问模块那个控制器:

```php
// 绑定到admin模块中的index控制器
define('BIND_MODULE','admin/index');
```

但需要注意，如果设置绑定了控制器，那么其他控制器就无法访问了,比如我们在`admin`模块中再创建一个`User.php`的控制器,然后访问`http://localhost/tp/public/admin/user/index`是会报错的

当然如果删除了控制的绑定，我们就可以直接通过控制器和方法来及进行访问.

```php
define('BIND_MODULE','admin');
```

然后通过访问`http://localhost/tp/public/user/index`就可以访问了.

除了手动配置我们还可以通过修改配置文件来自动绑定入口文件.

```php
// 入口自动绑定模块
'auto_bind_module'       => true
```

## 配置路由

设置路由参数(`application/index/controller/Index.php`)，新建一个`info`函数：

```php
<?php 

namespace app\index\controller;

class Index
{
  public function index()
  {
    return "index index index";
  }
  public function info($id)
  {
      return "{$id}";
  }
}
```

默认访问的方式是通过:`http://localhost/tp/public/index/index/info/id/5`来访问的，但这样路径会比较长，臃肿，我们可以通过设置路由来美化路径.

路由注册可以采用方法动态单个和批量注册，也可以直接定义路由定义文件的方式进行集中注册。

`Thinkphp`默认是开启了路由的，如果要开启可以设置：

```php
// 是否开启路由
'url_route_on'           => true,
// 路由配置文件（支持配置多个）
'route_config_file'      => ['route'],
// 路由使用完整匹配
'route_complete_match'   => false,
// 是否强制使用路由
'url_route_must'         => false
```

路由的默认配置文件是`route.php`,在`conf/route.php`中：

```php
<?php 
  return [
    'news/:id'  => 'index/index/info'
  ];
```

就可以通过`http://localhost/tp/public/news/6`来访问并传参.

