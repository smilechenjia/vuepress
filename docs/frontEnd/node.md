---
title: 如何将node.js部署到服务器上
---
# 如何将node.js部署到服务器上
```2019-08-16```
> 注：本文只是简易的单个node.js文件(名为server.js)运行，是为了给前端项目写一个数据接口
::: tip 环境
阿里云服务器（ubuntu 64bit）

xshell
:::
1. 首先登录阿里云添加安全组规则，开放程序运行时访问的端口号，本文为8000

2. (以下操作是在xshell里）上传本地文件server.js到阿里云服务器上某一文件夹下，本文为/root文件下

3. 安装node，进入到想要把node下载到的那个文件夹下。本文是/usr/local
```
cd /usr/local
wget https://nodejs.org/dist/v8.9.4/node-v8.9.4.tar.gz
tar xvf node-v8.9.4.tar.gz
cd node-v8.9.4/
./configure
make 
make install
```
4. 配置node环境变量
```
vim /etc/profile
export NODE_HOME=/usr/local/node/8.9.4
export PATH=$NODE_HOME/bin:$PATH
```
5. 验证node安装是否成功，如果出现版本号则成功喽
```
node -v
```
6. 安装express（因为我.js文件中用到了express模块，这个按需安装）
使用淘宝定制的cnpm命令行工具代替默认的npm，下载速度会快
```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```
现在可以使用cnpm命令来安装express模块，进入到放server.js的文件夹下
```
cd /root
cnpm install express --save
```
安装之后会生成node-modules文件夹
7. 使用守护进程开启项目（这样关掉了xshell,程序依然运行）
```
cnpm install pm2 -g   //全局安装
pm2 start server.js
```
8. 至此server.js可以在服务器上成功运行了，在浏览器输入如下命令即可
```
http://ip:port/ 
```