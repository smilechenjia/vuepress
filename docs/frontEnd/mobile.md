---
title: 用H5开发移动端页面的两三事
---
# 用H5开发移动端页面的两三事
```2019-9-29```
> 本文旨在记录下移动端开发中遇到的问题及解决方法
::: tip 环境
开发语言：H5、CSS、JavaScript

开发工具：vscode

部署环境：移动端ios、android
:::
## 适配移动端设备
meta写法如下：
```
<meta
     name="viewport"
     content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
/>
```
## 制作0.5px的边框 
利用到伪类，例如要给一个类名为block的块元素添加一个0.5px的边框，给.block相对定位，伪类绝对定位，并给伪类一个1px的border，但是transform设置0.5
```
.block{

    position: relative;

}

.block::after {

     content: "";

     display: block;

     position: absolute;

     left: 0%;

     top: 0%;

     width: 200%;

     height: 200%;

     border: 1px solid #e8e8e8;

     transform-origin: 0 0;

     transform: scale(0.5);

}
```
## 在ios上滑动不流畅
在基本样式文件中添加如下：
```
-webkit-overflow-scrolling: touch
```
在基本样式文件中去掉以下：
```
height: 100% 
```
## 如何在手机端调试
使用yarn bulid打包文件之后，生成dist文件夹，文件下有每个页面生成的html文件
* 在vscode里安装扩展live server，之后在vscode里运行就会打开127.0.0.1:5500/index
* 在终端里输入ifconfig得到ip地址
* 用上一步的ip替换掉127.0.0.1
* 手机和电脑连一个局域网，即可访问
 
