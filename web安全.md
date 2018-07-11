##跨域

浏览器的同源策略导致了跨域,同源策略限制了从同一个源加载的文档或脚本如何与来自另一个源的资源进行交互。这是一个用于隔离潜在恶意文件的重要安全机制。
浏览器是从两个方面去做同源策略，一是针对接口的请求，二是针对Dom查询。

##几种web攻击方式

1.  csrf（cross-site request forgery）跨站请求伪造

    可以理解为攻击者盗用了你的身份，以你的名义发送恶意请求，

    即当用户浏览器同时打开危险网站和正常网站，危险网站利用图片隐藏链接，或者js文件操纵用户生成错误请求给正常网站。此时因为用户会携带自己的session验证。危险网站发出的请求得以执行。

    下图简单阐述了CSRF攻击的思想

    ![https://segmentfault.com/img/bV8Bxx?w=526&h=297]()

    造成这种攻击的根本原因：

    源于WEB的**隐式身份验证机制**！WEB的身份验证机制虽然可以保证一个请求是来自于某个用户的浏览器，但却无法保证该请求是用户批准发送的！

    csrf攻击的防御措施：

    -   使用验证码

    -   随机token： 为每一个提交的表单生成一个随机token， 存储在session中，每次验证表单token，检查token是否正确。

        ​

2.  xss(cross site script）跨站脚本攻击

    网站对提交的数据没有转义或过滤不足，导致一些代码存储到系统中，其他用户请求时携带这些代码，从而使用户执行相应错误代码

    ![https://segmentfault.com/img/bV8BCn?w=500&h=380]()

    解决办法： 转移和过滤用户提交的信息

    ​

3.  session攻击，会话劫持

    用某种手段得到用户session ID，从而冒充用户进行请求

    产生原因：由于http本身无状态，同时如果想维持一个用户不同请求之间的状态，session ID用来认证用户

    ​

    获取用户session ID：

    1.  会话劫持： URL参数传递sessionID； 隐藏域传递sessionID；比较安全的是cookie传递。但同样可以被xss攻击取得sessionID
    2.  会话固定： 诱骗用户使用指定的sessionID进行登录，这样系统不会分配新的sessionID

    ​

    防御方法：

    -   每次登陆重置sessionID
    -   设置HTTPOnly，防止客户端脚本访问cookie信息，阻止xss攻击
    -   关闭透明化sessionID
    -   user-agent头信息验证（[用户代理](https://baike.baidu.com/item/%E7%94%A8%E6%88%B7%E4%BB%A3%E7%90%86/1471005)，简称 UA，它是一个特殊字符串头，使得服务器能够识别客户使用的[操作系统](https://baike.baidu.com/item/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/192)及版本、CPU 类型、[浏览器](https://baike.baidu.com/item/%E6%B5%8F%E8%A7%88%E5%99%A8/213911)及版本、浏览器渲染引擎、浏览器语言、[浏览器插件](https://baike.baidu.com/item/%E6%B5%8F%E8%A7%88%E5%99%A8%E6%8F%92%E4%BB%B6/8330255)等。一些网站常常通过判断 UA 来给不同的[操作系统](https://baike.baidu.com/item/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F)、不同的[浏览器](https://baike.baidu.com/item/%E6%B5%8F%E8%A7%88%E5%99%A8)发送不同的页面，因此可能造成某些页面无法在某个浏览器中正常显示，但通过伪装 UA 可以绕过检测。）
    -   token校验

    ​