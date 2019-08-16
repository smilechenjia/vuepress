---
title: 使用vuepress搭建博客
---
# 使用vuepress搭建博客
```2019-08-15```
## 全局安装vuepress 
```
npm install -g vuepress
```
## 创建项目文件夹
```
mkdir myblog
```
## 初始化项目
```
cd myblog
npm init -y
```
此时，myblog文件夹里多了一个package.json文件。可以在这个里面配置命令，之后会用到。
## 添加文件和文件夹
在myblog里添加docs文件夹，文件夹在docs里添加.vuepress文件夹和README.md文件，在.vuepress里添加public文件夹和config.js文件。在docs里添加自己命名的文件，文件里存储文章，每篇文章以.md后缀存储。最终文件目录和每个文件的作用如下：
```
myblog
|———— docs
|       |———— frontEnd           // 自定义的文件夹，里面每个md文件是一篇文章
|               |———— README.md
|               |———— test.md
|       |———— backEnd           // 自定义的文件夹，里面每个md文件是一篇文章
|               |———— README.md
|               |———— test.md
|       |———— README.md          // 配置博客主页
|       |———— .vuepress      
|               |———— public     // 放置静态资源，如图片
|               |———— config.js  // 配置博客标题、描述、主题等信息
|———— package.json               // 配置命令
```
## 配置docs下的README.md
这里主要配置博客主页布局，本文选择默认布局，即VuePress官网的主页样式。
```
---
home: true                   // home置为true则表示采用默认主题
heroImage: /img/logo.jpeg    // 主页正中央显示的图片
actionText: 进入我的博客       // 主页正中央显示的按钮上的文字
actionLink: /frontEnd/       // 主页按钮点击之后进入的链接
---
```
## 配置config.js
这里主要配置博客的标题，描述，导航栏，侧边栏等信息
```
module.exports = {
  title: '微笑的蛋壳呀',                       // 标题
  description: '饭要一口一口吃，路要一步一步走',  // 描述
  head: [ 
    ['link', { rel: 'icon', href: '/img/head.jpeg' }], // 标签栏里的头像
  ],
  base: '/', 
  markdown: {
    lineNumbers: false      // 代码块显示行号
  },
  themeConfig: {
    nav:[                   // 导航栏配置
      {text: '前端', link: '/frontEnd/'},
      {text: '后台', link: '/backEnd/'},
      {
        text: '链接', 
        items: [            //组，点击链接会弹出csdn和github
          {text: 'csdn', link: 'https://blog.csdn.net/sherry_chan'},
          {text: 'github', link: 'https://github.com/smilechenjia/'}     
        ]
      }
    ],
    sidebar: {              // 侧边栏配置
      '/frontEnd/':[        // 组显示，frontEnd文件里的文章一起显示
        '',                 // 即默认显示的README.md文件
        'test'
      ],
      '/backEnd/': [
        '',
        'test'
       ]
    },
    sidebarDepth: 2,        // 侧边栏显示2级
  }
};
```
## 启动项目
在package.json里添加如下命令：
```
"scripts": {
    "dev": "vuepress dev docs"
}
```
在终端运行以下命令项目即可在本地运行，在浏览器输入localhost:8080便可以看到博客啦
```
npm run dev
```
## 部署项目
本文选择部署在githua pages上面

在github上创建一个仓库，仓库名必须是github的账号名
在项目文件根目录mylog下创建deploy.sh文件，文件内容如下：
```
# 自动部署脚本  
set -e
# 构建项目
npm run build
# 进入到构建输出目录
cd docs/.vuepress/dist
git init
git add -A
git commit -m 'deploy'
# push到新建仓库的 master 分支
git push -f git@github.com:smilechenjia/smilechenjia.github.io.git master
```
在package.json文件里添加如下命令：
```
"scripts": {
    "build": "vuepress build docs",
    "deploy": "bash deploy.sh"
}
```
运行如下命令则部署成功，任何人在浏览器输入smilechenjia.github.io即可看到博客内容啦
```
npm run deploy
```
::: tip 备注：
[项目地址](https://github.com/smilechenjia/vuepress)  
[博客地址](https://smilechenjia.github.io/)
:::

