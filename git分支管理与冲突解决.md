## git分支管理与冲突解决

#### 1.创建、合并分支

每提交一个新版本，Git就会把它们自动串成一条时间线，这个时间线就是一个分支，默认只有一个分支也就是主分支、master分支（远程仓库创建完成就会默认有一个主分支），每次提交就是本地的master分支提交到远程的master分支。head指向当前分支，此时master指向最新的提交（每次提交，master都会向前移动一步），head指向master，当前的分支以及当前分支的提交点都确定了。

<p align="center">
    <br/>
    <img src="./git-img/branch1.png">
    <br/>
</p>

(1)  创建分支

创建一个新分支（例如branch_1）时，git会生成一个指针branch_1指向最新的提交，再把head指向branch_1,即branch_1为当前的分支，此时对于本地工作区的提交就是针对branch_1分支

<p align="center">
    <br/>
    <img src="./git-img/branch2.png">
    <br/>
</p>


(2)  分支上做更新提交

branch_1指针指向最新提交，而master指针不变,此时切换回master分支，看不到在branch_1分支上添加的内容,master分支的提交点没有变化

<p align="center">
    <br/>
    <img src="./git-img/branch3.png">
    <br/>
</p>


(3)  合并分支

branch_1分支上的提交完成，把master指向最新的提交（即branch_1指向的提交）即可完成合并

<p align="center">
    <br/>
    <img src="./git-img/branch4.png">
    <br/>
</p>


(4)  删除分支

将branch_1分支删除，也就是删除branch_1指针,此时head指向master分支


<p align="center">
    <br/>
    <img src="./git-img/branch5.png">
    <br/>
</p>


**下面为实际操作**： Fast-forward 模式

```shell
创建并切换分支
$ git checkout -b branch_1 （等同于$ git branch dev,  $ git checkout dev）
Switched to a new branch 'branch_1'

查看分支
$ git branch
* branch_1 （head指向的当前分支）
  master
 
branch_1分支上做提交
$ git add test.txt 
$ git commit -m "添加文件"

切换回master分支
$ git checkout master
Switched to branch 'master'

把branch_1分支的工作成果合并到master分支上
$ git merge branch_1
Updating ...
Fast-forward (快进模式，直接把master指向branch_1的当前提交，所以合并速度非常快。)
 test.txt | 1 +
 1 file changed, 1 insertion(+)

删除branch_1分支
$ git branch -d branch_1
Deleted branch branch_1 (was ...)

查看新的分支结构
$ git branch
* master
  
```

**--no-ff模式**：

fast-forward模式合并后，删除分支会丢掉分支提交信息，--no-ff模式表示禁用`Fast forward`模式，Git就会在merge时生成一个新的commit，这样，从分支历史上就可以看出分支提交信息

```powershell
...前几步同上

把dev分支的工作成果合并到master分支上
$ git merge --no-ff -m 'merge with no-ff' dev  (本次合并要创建一个新的commit，加上-m参数，把commit描述写进去)
 Merge made by the 'recursive' strategy.
 test.txt | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)

删除dev分支
$ git branch -d dev
Deleted branch dev (was ...)

查看历史git log
$ git log --graph --pretty=oneline --abbrev-commit
*   547f605 (HEAD -> master, origin/master, origin/HEAD) merge with no-ff
|\
| * 6953abd update file in branch dev  (可以看到分支信息)
|/
*   de8ecfe fix conflict and commit
|\
| * 46ff6f2 update in branch branch_2
* | 65ed5c2 update in master
|/
*   81cc733 fix conflict and commit
|\
| * 6331f76 update file in branch_2
* | 74438dc update in branch master
|/
* 93ce32a 添加test.txt文件
* d398d67 Initial commit


查看新的分支结构
$ git branch
* master
```

这种模式合并后如下图：

<p align="center">
    <br/>
    <img src="./git-img/branch8.png">
    <br/>
</p>



#### 2. 冲突解决

合并分支并不会那么顺利，当我们在分支上做了提交后，再回到master分支做了提交，此时就会出现冲突，需要先解决冲突再提交

**实际操作如下**：

创建并切换至branch_2分支:
``` shell
$ git checkout -b branch_2
Switched to a new branch 'branch_2'
```

在branch_2上修改test.txt文件并提交，
文件内容修改为：这里添加测试内容(update in branch branch_2)
``` shell
$ git add test.txt
$ git commit -m 'update in branch branch_2'
[branch_2 46ff6f2] update in branch branch_2
 1 file changed, 1 insertion(+), 1 deletion(-)
```

切换到master分支：
``` shell
$ git checkout master
Switched to branch 'master'
    若上一次更新未提交到origin，git提示当前master分支比远程的master分支要超前1个提交：
    Your branch is ahead of 'origin/master' by 1 commit.
      (use "git push" to publish your local commits)
    上一次更新已经提交到origin，git提示当前master分支与远程的master分支已同步：
    Your branch is up to date with 'origin/master'.
```

在master分支上修改test.txt文件并提交，
文件内容修改为：这里添加测试内容(update in master)
``` shell
$ git add test.txt
$ git commit -m 'update in master'
[master 65ed5c2] update in master
 1 file changed, 1 insertion(+), 1 deletion(-)
```

此时master分支和branch_2分支各自都有新的提交,Git无法执行“快速合并”，如下图：

<p align="center">
    <br/>
    <img src="./git-img/branch7.png">
    <br/>
</p>


这种合并就可能会有冲突，
这里尝试合并，git通知test.txt文件存在冲突，

``` shell
$ git merge branch_2
Auto-merging test.txt
CONFLICT (content): Merge conflict in test.txt
Automatic merge failed; fix conflicts and then commit the result.
```
此时master分支出现这种标志： (master|MERGING)，此时无法切换分支,会报错如下：
``` shell
$ git checkout branch_2
error: you need to resolve your current index first
test.txt: needs merge
```


需要先解决冲突再实现合并：git status命令也可以告诉我们冲突的文件
``` shell
$ git status
On branch master
Your branch is ahead of 'origin/master' by 1 commit.
  (use "git push" to publish your local commits)

You have unmerged paths.
  (fix conflicts and run "git commit")
  (use "git merge --abort" to abort the merge)

Unmerged paths:
  (use "git add <file>..." to mark resolution)

        both modified:   test.txt

no changes added to commit (use "git add" and/or "git commit -a")
```


查看test.txt文件如下：

```
<<<<<<< HEAD
这里添加测试内容(update in master)
=======
这里添加测试内容(update in branch branch_2)
>>>>>>>branch_2
```

Git用<<<<<<<，=======，>>>>>>>标记出不同分支的内容，我们修改如下后保存：
这里添加测试内容

``` shell
$ git add test.txt
$ git commit -m 'fix conflict and commit'
[master de8ecfe] fix conflict and commit
```

此时如下图：

<p align="center">
    <br/>
    <img src="./git-img/branch6.png">
    <br/>
</p>


用带参数的`git log`也可以看到分支的合并情况：

```shell
$ git log --graph --pretty=oneline --abbrev-commit
*   de8ecfe (HEAD -> master) fix conflict and commit  (解决冲突提交)
|\
| * 46ff6f2 (branch_2) update in branch branch_2
* | 65ed5c2 update in master
|/
*   81cc733 (origin/master, origin/HEAD) fix conflict and commit  (解决冲突提交)
|\
| * 6331f76 update file in branch_2
* | 74438dc update in branch master
|/
* 93ce32a 添加test.txt文件
* d398d67 Initial commit

```

最后删除branch_2分支

```shell
$ git branch -d branch_2
Deleted branch branch_2 (was 46ff6f2).
```

#### 小结:

当Git无法自动合并分支时，就必须首先解决冲突。解决冲突后，再提交，合并完成。

解决冲突就是把Git合并失败的文件手动编辑为我们希望的内容，再提交。

用`git log --graph`命令可以看到分支合并图。



#### 3. 多人协作

多人协作的工作模式通常是这样：

1. 首先，可以试图用`git push origin <branch-name>`推送自己的修改；

2. 如果推送失败，则因为远程分支比你的本地更新，需要先用`git pull`抓取远程最新的提交；

    如果`git pull`提示`There is no tracking information for the current branch.
    Please specify which branch you want to merge with.`则说明本地分支和远程分支的链接关系没有创建，用命令`git branch --set-upstream-to <branch-name> origin/<branch-name>`来创建连接。

3. 如果合并有冲突，则解决冲突(类似于上面的方式进行修改)，并在本地提交；

4. 没有冲突或者解决掉冲突后，再用`git push origin <branch-name>`推送就能成功！

#### 小结：

1. 查看远程库信息，使用`git remote  ` / `git remote -v` (显示更详细的信息,包括可以抓取和推送的origin地址)；
2. 本地新建的分支如果不推送到远程，对其他人就是不可见的；
3. 从本地推送分支，使用`git push origin branch-name`，如果推送失败，先用`git pull`抓取远程的新提交；
4. 在本地创建和远程分支对应的分支(创建完成会互相关联)，使用`git checkout -b branch-name origin/branch-name`，本地和远程分支的名称最好一致；
5. 建立本地已有的分支和远程分支的关联，使用`git branch --set-upstream branch-name origin/branch-name`；
6. 从远程抓取分支，使用`git pull`，如果有冲突，要先处理冲突。

#### 

