---
title: Mac下搭建react-native环境(ios)
---
# Mac下搭建react-native环境(ios)
```2019-8-17```
## 安装home-brew
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
## 安装node
brew安装的是10以上，有可能会出现下面两个错误
1. 会报错如下：
```
Error: The following directories are not writable by your user:
/usr/local/etc/bash_completion.d
/usr/local/lib/pkgconfig
/usr/local/share/info
/usr/local/share/locale
/usr/local/share/man/man3
/usr/local/share/man/man8
```
针对上述问题：
* 改变文件拥有者：sudo chown -R $(whoami) /usr/local
* 继续安装：brew install node 
2. 安装的node版本过高，可安装node指定版本
针对上述问题：
* 安装n模块：sudo npm i -g n --force
* 安装指定版本或稳定版本：n 10.0.0 stable
## 设置npm镜像
```
npm config set registry https://registry.npm.taobao.org --global
npm config set disturl https://npm.taobao.org/dist --global
```
## 安装yarn, react-native-cli
```
npm install -g yarn react-native-cli
```
## 设置镜像源
```
yarn config set registry https://registry.npm.taobao.org --global
yarn config set disturl https://npm.taobao.org/dist --global
```
## 安装Xcode：
在App Store上下载即可

记得要在xcode->preferences->locations里把command line tools选上
## 安装Xcode命令行工具：
```
xcode-select —install
```
## 安装watchman
```
sudo chown -R $(whoami) /usr/local
brew install watchman
```
## 初始化一个项目
```
react-native init AwesomeProject
```
## 运行
```
react-native run-ios
```
