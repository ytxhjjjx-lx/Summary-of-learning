weinre 的使用很简单，weinre 的使用很简单，weinre 的使用很简单，三遍够了。

# 使用 weinre 调试移动页面

## 安装 weinre

```
cnpm install -g weinre
```

## 启动服务

```
weinre --httpPort 3001 --boundHost -all-
```

指定端口号，当服务启动成功之后，根据提示，在浏览器中打开相应地址：

[![提示](http://7xlolm.com1.z0.glb.clouddn.com/gitblog1.pic.jpg)](http://7xlolm.com1.z0.glb.clouddn.com/gitblog1.pic.jpg)

## 浏览器查看

我的ip是 192.168.45.166，你应该输入你的ip地址：

[![查看](http://7xlolm.com1.z0.glb.clouddn.com/gitblog3.pic_hd.jpg)](http://7xlolm.com1.z0.glb.clouddn.com/gitblog3.pic_hd.jpg)

这里有三个链接需要注意的地方

第一个链接(即 [http://192.168.45.166:8080/client/#anonymous)：](http://192.168.45.166:8080/client/#anonymous)：)

此链接将启动weinre客户端页面，也就是调试器本身。点击此链接将带您进入远程控制面板

第二个连接(即[http://192.168.45.166:8080/doc/)：](http://192.168.45.166:8080/doc/)%EF%BC%9A)

当然就是文档的连接啦

第三个连接(即[http://192.168.45.166:8080/target/target-script-min.js#anonymous](http://192.168.45.166:8080/target/target-script-min.js#anonymous))

这个连接，是一个js脚本，是你要在需要调试的页面引入的一段js脚本：

```
// ip地址要换成你的ip哦
<script src="http://192.168.45.166:8080/target/target-script-min.js#anonymous"></script>

```

## 调试

服务启动了，也在你的页面中引入上述脚本了，那么接下来就可以点击上述第一个链接跳转到调试器页面了：

[![调试](http://7xlolm.com1.z0.glb.clouddn.com/4.pic_hd.jpg)](http://7xlolm.com1.z0.glb.clouddn.com/4.pic_hd.jpg)