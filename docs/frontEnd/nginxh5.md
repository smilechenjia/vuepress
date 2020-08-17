---
title: 如何使用nginx解决前端跨域问题
---
# 如何使用nginx解决前端跨域问题
```2019-11-1```
> 注：前端项目是用h5写的，在浏览器运行，因为浏览器的同源策略，调用接口时会出现跨域问题，现使用nginx解决这个问题（开发环境是在mac端）
## 安装nginx
```
brew install nginx 
```
nginx安装完之后可以使用nginx -v 来验证是否安装成功，如果出现版本信息则安装成功
## 修改nginx.conf
* mac一般在/usr/local/etc/nginx目录下
```
cd /usr/local/etc/nginx/
```
* 打开nginx.conf 
```
vim nginx.conf
```
* 编辑nginx.conf文件：找到 http 下的 server，修改配置如下
```
server {

        listen   5000;                      //监听端口

        server_name   localhost     //主机名称

        location   / {

           root    /Users/unicom/chenjia/face;        //文件根目录

           index   index.html  index.htm;                //默认起始页

        }

        location   /apis {    //前端请求/apis都转到http://192.168.191:8080

           rewrite  ^.+apis/?(.*)$ /$1 break;

           include  uwsgi_params;

           proxy_pass  http://192.168.191.1:8080;

        }

 }
```
## 修改请求路径
```
$.ajax({

   type:  'post',

   url:  '/apis/ttface/detectlandmark'

})
```
浏览器打开页面：localhost:5000/index/html 。请求成功，不再提示跨域
