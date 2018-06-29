# 1.git基本操作
## 1.注册

```
git config --global user.name 'xyd'

git config --global user.email 861703490@qq.com
```
## 2.有关版本库的基本操作
版本库又名仓库,可以理解为一个文件目录,这个目录里面的所有文件都可以被Git管理起来:      
每个文件的修改/删除,Git都能跟踪,以便任何时刻都可以追踪历史,或者在将来某个时刻还可以将文件还原;

### 1.创建版本库的基本操作
```
cd newgit

git init  //将newgit文件夹创建为版本库,  创建后会在该目录下创建一个.git文件夹, 默认为隐藏文件

ls  // 查看newgit文件夹下的文件
git add a.txt  // 将a.txt文件添加到newgit版本库中的暂存区

git commit -m 'a.txt提交到仓库'  // 将a.txt正式提交到newgit仓库（本地仓库）
```

![image](https://i.loli.net/2017/11/21/5a14232f903f2.png)

### 2.为版本库服务的辅助操作

```
git status // 查看版本库下,是否还有文件未提交


git diff a.txt  // 查看a.txt修改的内容

cat a.txt  // 查看文件内容

```

```
// 修改文件后,将文件重新添加到仓库,需再次执行
git add a.txt
git commit -m '注释'
```

![image](https://i.loli.net/2017/11/21/5a1428712a0e5.png)
![image](https://i.loli.net/2017/11/21/5a142a124f79b.png)


```
// 查看被操作文件的历史记录

git log
```
![image](https://i.loli.net/2017/11/21/5a142fcf6ee67.png)

### 3.版本回退和恢复
回退版本之后,被操作的文件内容回到回退的那个版本
#### 1.版本回退
```
// 将操作的文件退回到上个版本
git reset --hard HEAD^

git reset --hard HEAD~1 //后面的参数为回退到第几个版本
```
![image](https://i.loli.net/2017/11/21/5a1432e1caa09.png)

#### 2.版本恢复

```
// 恢复到某个版本
git reset  --hard 版本号

// 获取文件的版本号
git reflog
```
![image](https://i.loli.net/2017/11/22/5a14c1066b9a5.png)

### 4.撤销修改和删除文件
#### 1.撤销修改
对修改的文件,如果未提交到版本库,可以使用撤销命令,来撤销修改
```
git checkout -- a.txt
```
![image](https://i.loli.net/2017/11/22/5a14cc18cfbe5.png)

#### 2.删除文件
###### 不彻底删除
```
rm x.txt // 删除文件
git checkout -- x.txt // 恢复删除的文件

```
###### 彻底删除

```
rm x.txt // 删除文件
git commit // 执行此命令后,将彻底删除文件
```

![image](https://i.loli.net/2017/11/22/5a14e84fc11ff.png)

## 3.远程仓库
### 1.注册git账号

### 2.有关本地仓库与远程仓库进行连接的密钥
#### （1）.获取(生成)密钥

```
// git终端

ssh-keygen -t rsa -C "邮箱"
```
![image](https://i.loli.net/2017/11/22/5a152942d19f5.png)
###### 生成的密钥文件
![image](https://i.loli.net/2017/11/22/5a152bfb07a09.png)

#### （2）.在git账号内设置密钥
![image](https://i.loli.net/2017/11/22/5a15302edbf5f.png)

![image](https://i.loli.net/2017/11/22/5a1532500c775.png)

#### （3）.查看密钥是否添加成功

```
ssh -T git@github.com
```
![image](https://i.loli.net/2017/11/22/5a1534fd5434d.png)

### 3.将远程仓库与本地仓库进行关联
#### 1.创建远程仓库（这里创建一个空的）

创建完成后，可以看到官方推荐的几种不同做法

1.  创建一个本地仓库与该远程仓库进行关联并推送其内容到该远程仓库
2.  将已有的本地仓库与该远程仓库进行关联并推送其内容到该远程仓库
3.  导入另一个远程仓库的代码至该仓库中

![image](https://i.loli.net/2017/11/22/5a15379d0915f.png)

![image](https://i.loli.net/2017/11/22/5a153bd09d345.png)

#### 2.将本地仓库的文件添加到远程仓库中

```
// 1.在某个本地仓库中执行
git remote add origin https://github.com/xieyiduo93/newstore.git

// 2.将本地仓库中的文件推送到远程仓库中(由于新建的远程仓库是空的，没有readme.md文件所以要加上-u这个参数，等远程仓库里有内容后，以后再推送就不需要-u参数)
git push -u origin master
```
![image](https://i.loli.net/2017/11/22/5a15408d24285.png)

###### 本地仓库中的文件已被添加到远程仓库中
![image](https://i.loli.net/2017/11/22/5a1542882a972.png)

从本地仓库提交到github远程仓库有两种方式，一种是通过ssh，另一种是https，这两种方式的本质是一样的，那就是要让远程仓库知道你是谁？，这里介绍ssh，它的优点是在每次提交的时候不需要输入用户名和密码，很方便



#### 3.将远程仓库与本地仓库进行同步

将本地仓库的文件添加到远程仓库中后(即进行了关联后),每次本地仓库中有文件更改,只需将本地仓库中的文件保存到版本库后(即git add .....,  git commit -m .......),

再执行`git push origin master`命令,便可将本地仓库与远程仓库进行同步;

```
git push origin master
```
![image](https://i.loli.net/2017/11/22/5a15487b61dfd.png)

这里有个坑需要注意一下，就是在创建远程仓库的时候，如果你勾选了Initialize this repository with a README（就是创建仓库的时候自动给你创建一个README文件），那么到了将本地仓库内容推送到远程仓库的时候就会报一个failed to push some refs to https://github.com/guyibang/TEST2.git的错,

可以执行如下命令将内容合并(如果每次提交之前在远程仓库中手动添加了文件，则需要执行此命令)

```
git pull --rebase origin master
```



#### 4.将远程仓库下载到本地

```
git clone 远程仓库的url filename(生成的文件夹的名称)
```
![image](https://i.loli.net/2017/11/22/5a15537e8a234.png)

###### 在本地下载远程仓库
![image](https://i.loli.net/2017/11/22/5a1554c625454.png)
![image](https://i.loli.net/2017/11/22/5a1555894703b.png)
