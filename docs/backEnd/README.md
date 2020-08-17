---
title: git使用
---
# git使用   
```2019-8-15```
## 从git上克隆项目到本地
```
git clone url
```
## 连接远程仓库并提交代码到github
* 配置用户名和邮箱
```
git config --global user.name "your name"
git config --global user.email "your email address"
```

* 创建空的本地仓库
```
git init 
```

* 连接远程仓库
```
git remote add origin https://github.com/smilechenjia/vuepress.git
```

* 将项目所有文件添加到缓存中
```
git add .
```
* 将缓存中的代码提交到本地仓库
```
git commit -m "注释"
```
* 上传代码到远程库
```
git push --set-upstream origin master
```
* 从仓库拉取代码到本地
cd 到文件夹
```
git pull origin master 
```
## 生成ssh key并添加到github
* 生成公钥和私钥
```
ssh-keygen -t rsa -C "github用户名"
```
* 查看公钥
```
cat ~/.ssh/id_rsa.pub
```
* 添加ssh key
登陆github,依此点击头像->settings->new SSH

把新生成的公钥复制粘贴到这里
## 新建分支
```
git checkout -b branchname
git push origin branchname:branchname
```
## 删除分支
```
git push origin --delete branchname
```
## 切换分支
```
git checkout branchname
```
## 合并分支
```
git merge branchname
```
