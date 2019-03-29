## git分支管理与冲突解决

#### 1.创建、合并分支

每提交一个新版本，Git就会把它们自动串成一条时间线，这个时间线就是一个分支，默认只有一个分支也就是主分支、master分支（远程仓库创建完成就会默认有一个主分支），每次提交就是本地的master分支提交到远程的master分支。head指向当前分支，此时master指向最新的提交（每次提交，master都会向前移动一步），head指向master，当前的分支以及当前分支的提交点都确定了。

```html
<p align="center">
    <br/>
    <img src="./git-img/branch1.png">
    <br/>
</p>
```

(1)  创建分支

创建一个新分支（例如branch_1）时，git会生成一个指针branch_1指向最新的提交，再把head指向branch_1,即branch_1为当前的分支，此时对于本地工作区的提交就是针对branch_1分支

```html
<p align="center">
    <br/>
    <img src="./git-img/branch2.png">
    <br/>
</p>
```

(2)  分支上做更新提交

branch_1指针指向最新提交，而master指针不变,此时切换回master分支，看不到在branch_1分支上添加的内容,master分支的提交点没有变化

```html
<p align="center">
    <br/>
    <img src="./git-img/branch3.png">
    <br/>
</p>
```

(3)  合并分支

branch_1分支上的提交完成，把master指向最新的提交（即branch_1指向的提交）即可完成合并

```html
<p align="center">
    <br/>
    <img src="./git-img/branch4.png">
    <br/>
</p>
```

(4)  删除分支

将branch_1分支删除，也就是删除branch_1指针,此时head指向master分支

```html
<p align="center">
    <br/>
    <img src="./git-img/branch5.png">
    <br/>
</p>
```



**下面为实际操作**：

```shell
创建并切换分支
$ git checkout -b branch_1 （等同于$ git branch dev,  $ git checkout dev）
Switched to a new branch 'branch_1'

查看分支
$ git branch
* branch_1 （head指向的当前分支）
  master
 
branch_1分支上做提交
$ git add readme.txt 
$ git commit -m "添加文件"

切换回master分支
$ git checkout master
Switched to branch 'master'

把branch_1分支的工作成果合并到master分支上
$ git merge branch_1
Updating ...
Fast-forward (快进模式，直接把master指向branch_1的当前提交，所以合并速度非常快。)
 readme.txt | 1 +
 1 file changed, 1 insertion(+)

删除branch_1分支
$ git branch -d branch_1
Deleted branch branch_1 (was ...)

查看新的分支结构
$ git branch
* master
  
```

