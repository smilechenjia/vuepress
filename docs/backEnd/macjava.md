---
title: mac上安装配置java
---
# mac上安装配置java
```2019-8-16```
## 安装
前往oracle下载 [jdk-8u221-macosx-x64.dmg](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) 之后直接点击安装  

终端运行以下命令后如果出现版本信息，则安装成功
```
javac -version
```
## 配置
* 打开profile文件
```
sudo vim /etc/profile
```
* 在profile文件中输入
```
JAVA_HOME = "/Library/Java/JavaVirtualMachines/jdk-1.8.0_221.jdk/Contents/Home"
CLASS_PATH = "$JAVA_HOME/lib"
PATH = ".:$PATH:$JAVA_HOME.bin"
```
* 使修改内容生效
```
source /etc/profile
```

