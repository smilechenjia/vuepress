---
title: 如何使用vue-cli 3.0搭建多页面应用
---
# 如何使用vue-cli 3.0搭建多页面应用
```2019-9-29```
## 初始化项目
使用vue-cli 3.0创建一个项目，项目默认是单页面应用，目录如下：
```
|—node_modules

|—public                //模板文件

    |—favicon.ico

    |—index.html    

|—src

     |—assets            //图片，样式等共用文件

     |—components        //共用组件

     |—App.vue           //首页文件

     |—main.js

|—babel.config.js

|—package.json

|—README.md

|—yarn.lock
```
## 修改目录成多页面应用
1.（必选）在src文件下新增文件夹，每个文件夹代表一个独立的页面，文件夹里都含有App.vue,main.js,router.js文件

2.（必选）在src文件下新增配置文件vue.config.js

3.（可选）在src文件下新增文件store.js，可存储数据，被每个独立页面都可取到

4.（可选）删除原先src文件下的App.vue，main.js文件

最终文件目录如下：
```
|—node_modules

|—public                //模板文件

    |—favicon.ico

    |—index.html    

|—src

     |—assets            //图片，样式等共用文件

     |—components        //共用组件

     |—store.js          //共用数据     

     |—page1             //页面1

          |—App.vue

          |—main.js

          |—router.js     

     |—page2              //页面2   

          |—App.vue

          |—main.js

          |—router.js 

|—babel.config.js

|—package.json

|—README.md

|—yarn.lock

|—vue.config.js        //配置文件
```
## 配置vue.config.js
在该文件下添加每个页面的入口、出口、模版文件，具体配置如下
```
module.exports = {

     pages: {

         page1: {         

            entry: 'src/page1/main.js',                   //页面的入口文件

            template: 'public/index.html',                //页面的模板文件

            filename: 'page1.html'                        //页面的出口名称，即build生成的文件名称

        },

       page2: {

          entry: 'src/page2/main.js',

          template: 'public/index.html',

          filename: 'page2.html'

      }

   }

}
```
## 打包&运行
使用yarn bulid打包文件之后，生成dist文件夹，文件下有每个页面生成的html文件
```
|—dist

     |—page1.html

     |—page2.html
```
使用yarn serve运行项目后，在浏览器下输入http://localhost:8080/page1.html  即可访问page1页面

