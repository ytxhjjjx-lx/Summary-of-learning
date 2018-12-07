## ThinkPHP的配置

ThinkPHP提供了灵活的全局配置功能，采用最有效率的PHP返回数组方式定义，支持惯例配置、公共配置、模块配置、扩展配置、场景配置、环境变量配置和动态配置。

对于有些简单的应用，你无需配置任何配置文件，而对于复杂的要求，你还可以扩展自己的独立配置文件。

系统的配置参数是通过静态变量全局存取的，存取方式简单高效。

在ThinkPHP中，一般来说应用的配置文件是自动加载的，加载的顺序是：

> #### 惯例配置->应用配置->扩展配置->场景配置->模块配置->动态配置

以上是配置文件的加载顺序，因为后面的配置会覆盖之前的同名配置（在没有生效的前提下），所以配置的优先顺序从右到左。

### 默认配置(惯例配置)

系统默认的配置文件目录就是应用目录（`APP_PATH`），也就是默认的`application`下面，并分为应用配置（整个应用有效）和模块配置（仅针对该模块有效）。

```
├─application         应用目录
│  ├─config.php       应用配置文件
│  ├─database.php     数据库配置文件
│  ├─route.php        路由配置文件
│  ├─index            index模块配置文件目录
│  │  ├─config.php    index模块配置文件
│  │  └─database.php  index模块数据库配置文件
```

如果不希望配置文件放到应用目录下面，可以在入口文件(`pubilc/index.php`)中定义独立的配置目录，添加`CONF_PATH`常量定义即可(默认是`config`目录)，例如：

```
// 定义配置文件目录和应用目录同级
define('CONF_PATH', __DIR__.'/../conf/');
```

`__DIR__`返回的是文件所在的绝对路径但是没有文件自身的名字在内

配置目录下面的结构类似如下：

```
├─application         应用目录
├─config              配置目录
│  ├─config.php       应用配置文件
│  ├─database.php     数据库配置文件
│  ├─route.php        路由配置文件
│  ├─index            index模块配置文件目录
│  │  ├─config.php    index模块配置文件
│  │  └─database.php  index模块数据库配置文件
```

我们也可以通过`config()`函数来查看`ThinkPHP`的默认配置.更改`application/index/controller/Index.php`中的`Index`类下的`index`方法的内容为:

```php
<?php 

namespace app\index\controller;

class Index
{
  public function index()
  {
    // dump为tp用于打印输出的,跟var_dump是一样的
    // config函数也是tp的助手函数,获取和设置配置参数
    // 助手函数说明地址:https://www.kancloud.cn/manual/thinkphp5/144731
    dump(config());
  }
}
```

在没有进行任何应用配置的时候，默认输出的是`thinkphp/convention.php`下的配置.也可以对这个文件的内容进行修改.比如添加一个`'app_author'             => 'tangcaiye',`然后刷新浏览器,就会发现多了一个`app_author`的选项,

比如默认：

```
// 应用调试模式
'app_debug'              => true,
```

是为`false`的，可以更改为`true`，使程序在出问题的时候可以报出详细的错误信息

### 应用配置

一般我们不会去更改`Thinkphp`的配合文件，主要不利于后期对框架的升级.`Thinkphp`推荐的是使用应用配置,应用配置是对整个应用的配置，对整个应用有效,也就是在当前应用下的所有模块都可以使用这个配置.

那如何配置，首先在项目根目录下创建一个`conf`的文件夹，也就是你在入口文件中配置的那个配置文件目录,然后在`conf`文件夹下创建一个`config.php`的文件:

```php
<?php 
  return [
    'app_email'     => '641418330@qq.com',
    'app_author'    => 'tangcaiye',
  ];
```

我们之前更改了`thinkphp/convention.php`下`app_debug`的配置，但前面也说了，我们应该尽量避免修改默认配置，我们可以在`conf/config.php`中添加一个`app_debug`的选项，然后设置为`true`，覆盖掉`thinkphp/convention.php`中的配置

### 扩展配置

`5.0.1`开始增加了扩展配置目录的概念，在应用配置目录或者模块配置目录下面增加`extra`子目录，下面的配置文件都会自动加载，无需任何配置。

如果你定义了`CONF_PATH`常量为config目录为例，扩展配置目录如下

```
├─application         应用目录
├─config              配置目录
│  ├─config.php       应用配置文件
│  ├─database.php     数据库配置文件
│  ├─route.php        路由配置文件
│  ├─extra            应用扩展配置目录
│  ├─index            index模块配置文件目录
│  │  ├─extra         index模块扩展配置目录
│  │  ├─config.php    index模块配置文件
│  │  └─database.php  index模块数据库配置文件
```

> 扩展配置文件的文件名（不含后缀）就是配置参数名，并且会和应用配置文件中的参数进行合并

比如我们创建一个文件`conf/extra/email.php`,内容：

```php
<?php 
  return [
    'host'      => 'smtp@qq.com',
    'name'      => '641418330@qq.com'
  ];
```

然后再次刷新页面会发现在输出的配置表就增加了

```php
["app_email"] => string(16) "641418330@qq.com"
["app_author"] => string(9) "tangcaiye"
["email"] => array(2) {
  ["host"] => string(11) "smtp@qq.com"
  ["name"] => string(16) "641418330@qq.com"
}
```

一个叫`email`的选项，而值就是`email.php`中的内容.另外需要注意的是`extra`中配置的内容必须是在默认,

如果要更改某个`database`的设置，你可以在`extra`中新建一个`database.php`然后编写配置，也可以在`conf`目录下新建`database.php`来配置,比如我将`database`中的数据库名(`database`)更改为`tangcaiye`，数据库密码(`password`)更改为`root`:

```php
<?php 
  return [
        // 数据库类型
        'type'            => 'mysql',
        // 数据库连接DSN配置
        'dsn'             => '',
        // 服务器地址
        'hostname'        => '127.0.0.1',
        // 数据库名
        'database'        => 'tangcaiye',
        // 数据库用户名
        'username'        => 'root',
        // 数据库密码
        'password'        => 'root',
        // 数据库连接端口
        'hostport'        => '',
        // 数据库连接参数
        'params'          => [],
        // 数据库编码默认采用utf8
        'charset'         => 'utf8',
        // 数据库表前缀
        'prefix'          => '',
        // 数据库调试模式
        'debug'           => false,
        // 数据库部署方式:0 集中式(单一服务器),1 分布式(主从服务器)
        'deploy'          => 0,
        // 数据库读写是否分离 主从式有效
        'rw_separate'     => false,
        // 读写分离后 主服务器数量
        'master_num'      => 1,
        // 指定从服务器序号
        'slave_no'        => '',
        // 是否严格检查字段是否存在
        'fields_strict'   => true,
        // 数据集返回类型
        'resultset_type'  => 'array',
        // 自动写入时间戳字段
        'auto_timestamp'  => false,
        // 时间字段取出后的默认时间格式
        'datetime_format' => 'Y-m-d H:i:s',
        // 是否需要进行SQL性能分析
        'sql_explain'     => false,
    ];
```

### 场景配置

每个应用都可以在不同的情况下设置自己的状态（或者称之为应用场景），并且加载不同的配置文件。

举个例子，你需要在公司和家里分别设置不同的数据库测试环境。那么可以这样处理，在公司环境中，我们在应用配置文件中配置：

```
'app_status'=>'office'
```

那么就会自动加载该状态对应的配置文件（默认位于`application/conf/office.php`）。

如果我们回家后，我们修改定义为：

```
'app_status'=>'home'
```

那么就会自动加载该状态对应的配置文件（位于`application/conf/home.php`）。

比如`application/conf/home.php`中的内容：

```php
<?php 
  return [
    'app_address'   => 'home'
  ];
```

> 状态配置文件是可选的

另外，场景配置的内容会覆盖扩展配置,比如我们在场景配置(`office`场景下)设置了`database`的密码为`12345`

```php
<?php 
  return [
    'app_address'   => 'office',
    'database'      => [
      'password'    => '12345'
    ]
  ];
```

那么如果`app_status`为`home`的话，`database`的密码就会为`12345`,当然你运行你会发现`database`的其他配置也不见了.也就是说需要我们将`database`中的所有配置粘贴过来，否则会失效

### 模块配置

每个模块会自动加载自己的配置文件（位于`application/conf/当前模块名/config.php`）。

模块还可以支持独立的状态配置文件，命名规范为：`application/conf/当前模块名/应用状态.php`。

> 模块配置文件是可选的

如果你的应用的配置文件比较大，想分成几个单独的配置文件或者需要加载额外的配置文件的话，可以考虑采用扩展配置或者动态配置（参考后面的描述）。

比如我们就创建一个`application/conf/index/config.php`:

```php
<?php 
  return [
    'user_id'   => 'indexUserId'
  ];
```

这个配置就只会在访问`index`这个模块的时候生效

包括我们也可以在这个模块配置目录中添加扩展目录`extra`,比如创建文件`conf/index/extra/demo.php`:

```php
<?php 
  return [
    'demo'    => '123'
  ];
```

### 动态配置

使用`set`方法动态设置参数，例如：

```php
Config::set('配置参数','配置值');
// 或者使用助手函数
config('配置参数','配置值');
```

也可以批量设置，例如：

```php
Config::set([
    '配置参数1'=>'配置值',
    '配置参数2'=>'配置值'
]);
// 或者使用助手函数
config([
    '配置参数1'=>'配置值',
    '配置参数2'=>'配置值'
]);
```

例子，修改`application/index/index.php`：

```php
<?php 

namespace app\index\controller;

class Index
{
  // 默认最先执行的是构造函数，然后再是index函数
  function __construct()
  {
    config('before', 'beforeAction');
  }
  public function index()
  {
    // dump为tp用于打印输出的,跟var_dump是一样的
    // config函数也是tp的助手函数,获取和设置配置参数
    // 助手函数说明地址:https://www.kancloud.cn/manual/thinkphp5/144731
    // 这个只在访问index函数的时候生效
    config('indexAction', 'index');
    dump(config());
  }
  public function demo()
  {
    dump(config());
  }
}
```

访问`index`模块的`index`函数或者`demo`函数都会输出一个`["before"] => string(12) "beforeAction"`,而访问`index`函数会多一个`["indexaction"] => string(5) "index"`

也可以使用`Config`类,`Config`类的位置在`thinkphp/library/think/Config.php`中.

比如我们在`index`模块中调用一下`Config`类中的`get`方法

```php
<?php 

namespace app\index\controller;

class Index
{
  public function index()
  {
    // 调用Config类的get方法
    // \think是根命名空间
    $res = \think\Config::get();
    dump($res);
  }
}
```

当然也可以使用`Config`的命名空间,这样我们在调用的时候就用写路径了：

```php
<?php 

namespace app\index\controller;

use think\Config;
class Index
{
  public function index()
  {
    // 调用Config类的get方法
    $res = Config::get();
    dump($res);
  }
}
```

`get`方法也是`config()`助手函数默认调用的方法

如果需要查看助手函数的源码可以通过:`thinkphp/helper.php`查看.

其他方法使用：

```php
<?php 

namespace app\index\controller;

use think\Config;
class Index
{
  public function index()
  {
    // 调用Config类的get方法
    /*$res = Config::get();
    dump($res);*/
    // dump(config());
    // 获取某个配置的值
    // $res = Config::get('app_address');
    // 设置
    // Config::set('username', 'tangcaicai');
    // 配置作用域(第三个参数)
    /*Config::set('username', 'tangcaiye', 'index');
    // 获取的时候也要加上作用域值
    dump(Config::get('username', 'index'));*/
    // 也可以使用config助手函数实现
    /*config('username', 'tangcaiye_config', 'index');
    dump(Config::get('username', 'index'));*/
    // $res = Config::has('username');
    // config助手函数实现验证
    $res = config('?username');
    dump($res);

  }
}
```

### 环境变量的设置

我们可以通过`$_ENV`这个超全局变量来获取我们环境变量的设置.

```php
<?php 

namespace app\index\controller;

use think\Config;
class Index
{
  public function index()
  {
    dump($_ENV);
  }
}
```

如果在浏览器中没有显示内容,可能是`php.ini`配置有问题，可以打开`php.ini`,将

```
; variables_order
;Default Value: "EGPCS"
```

中`;Default Value: "EGPCS"`前面的`;`号去掉就可以了.

如果要更改环境变量的值，可以在项目的根目录下创建一个`.env`文件,比如我们在新建的`.env`文件中编写：

```php
email=641418330@qq.com
```

然后刷新输出就多出了个`["PHP_EMAIL"] => string(16) "641418330@qq.com"`

然后`ThinkPHP`也给我们提供了一个叫`Env`的类,专门用来处理环境变量:

```php
<?php 

namespace app\index\controller;

use think\Config;
use think\Env;
class Index
{
  public function index()
  {
    // dump($_ENV['PHP_EMAIL']);
    // 获取,这个更方便
    // $res = Env::get('email');
    // 第二个参数是在没有获取到或者获取的对象没有值的情况下设置一个值
    $res = Env::get('email', 'default');
    dump($res);
  }
}
```

如果在`.env`中配置分组的话:

```
email=641418330@qq.com
[database]
hostname=localhost
username=root
password=root
```

在显示的时候会变成:

```
["PHP_DATABASE_HOSTNAME"] => string(9) "localhost"
  ["PHP_DATABASE_USERNAME"] => string(4) "root"
  ["PHP_DATABASE_PASSWORD"] => string(4) "root"
```

如果用`Env`类获取的话：

```php
$res = Env::get('database_username');
dump($res);
```

同时也支持点语法：

```php
// 同时也支持点语法
$res = Env::get('database.username');
```

#### 常用的环境变量设置

设置开发环境设置:

```
app_status=dev
```

然后设置`conf/config.php`中的`app_status`的值:

```php
'app_status'    => Env::get('app_status', 'dev')
```

获取环境变量中`app_status`的值,如果没有就设置值为`dev` ,然后根据前面场景配置中的设置规则我们知道如果给`app_status`设置了值，默认会去找对应的文件,比如这里是`dev`，那么会去找`dev.php`：

```php
<?php 
  return [
    'app_now_status'    => 'dev'
  ];
```

也可以再添加比如说生产环境:

```
app_status=prod
```

然后创建`prod.php`:

```php
<?php 
  return [
    'app_now_status'  => 'prod'
  ];
```

然后也可以配置`database`：

```
app_status=prod

[database]
username=root_env
```

然后修改`conf\database.php`中的内容:

```php
<?php 

  use think\Env;
    
  return [
        // 数据库类型
        'type'            => 'mysql',
        // 数据库连接DSN配置
        'dsn'             => '',
        // 服务器地址
        'hostname'        => '127.0.0.1',
        // 数据库名
        'database'        => 'tangcaiye',
        // 数据库用户名
        'username'        => Env::get('database.username', 'root'),
        // 数据库密码
        'password'        => 'root',
        // 数据库连接端口
        'hostport'        => '',
        // 数据库连接参数
        'params'          => [],
        // 数据库编码默认采用utf8
        'charset'         => 'utf8',
        // 数据库表前缀
        'prefix'          => '',
        // 数据库调试模式
        'debug'           => false,
        // 数据库部署方式:0 集中式(单一服务器),1 分布式(主从服务器)
        'deploy'          => 0,
        // 数据库读写是否分离 主从式有效
        'rw_separate'     => false,
        // 读写分离后 主服务器数量
        'master_num'      => 1,
        // 指定从服务器序号
        'slave_no'        => '',
        // 是否严格检查字段是否存在
        'fields_strict'   => true,
        // 数据集返回类型
        'resultset_type'  => 'array',
        // 自动写入时间戳字段
        'auto_timestamp'  => false,
        // 时间字段取出后的默认时间格式
        'datetime_format' => 'Y-m-d H:i:s',
        // 是否需要进行SQL性能分析
        'sql_explain'     => false,
    ];
```

核心就是将`username`的值修改为`Env::get('database.username', 'root')`，意思就是获取环境变量中`database`中`username`的值，如果没有设置默认就为`root`；