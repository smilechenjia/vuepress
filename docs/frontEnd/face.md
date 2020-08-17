---
title: 人脸识别前端 demo
---
# 人脸识别前端 demo
```2019-11-18```
::: tip 
本文使用h5、css、jquery做一个人脸识别前端demo，主要用于移动端。demo共有四个页面：首页、注册页、拍照登陆页、实时登陆页
:::
## demo使用
1. 进入demo就是首页，首页有三个引导框，点击进入其他页面

![avatar](./index.png)

2. 进入注册页
点击首页的“注册”即可跳转到注册页，注册页采用人脸注册方式，上传人脸的方式是使用拍照功能或者直接从相册里选择。在上传好照片后，demo会调用人脸检测接口，在照片上标出人脸轮廓。照片上传好以及信息填好后点击提交，demo会调用人脸注册接口，接口将照片存入后台图库，注册成功后跳转到首页

![avatar](./regist.png)

3. 进入拍照登陆页
在首页点击“拍照登陆”即可进入拍照登陆页，还是采用人脸登陆方式，上传人脸的方式是使用拍照功能或者直接从相册里选择。上传好照片后，demo会调用人脸检测接口，在照片上标出人脸轮廓。点击提交，demo会调用人脸检索接口，接口将上传的照片与后台图库进行对比，如果相似度大于90%就返回登陆成功。当登陆成功后，界面显示个人注册的信息。

![avatar](./login1.png)

![avatar](./login2.png)

4. 进入实时登陆页
在首页点击“实时登陆”进入实时登陆页，点击“开始识别”则开启摄像头，每两秒绘制图像并调用人脸检索接口，直至匹配成功，停止识别并返回注册的信息。识别中途用户点击“停止识别”也可以停止调用接口

![avatar](./realtime.png)

## 技术点拆分
1. 实现上传照片：手机拍照或从相册选择

方法：使用h5的input标签，type属性设置为file，accept属性设置为image/*

代码：
```
html:

<input id="file" name="file" type="file" accept="image/*"/>
```
2. input file自带样式不满足要求

方法：把input在页面上隐藏了，并且使用div自己定义一个“拍照”按钮的样式，当点击这个div时，调用input的点击事件

代码:
```
html:

<div id="cambtn" class="btn">拍照/相册</div> 
<input id="file" name="file" type="file" accept="image/*"/>
```
```
css:

#file {
  display: none;
}

#cambtn {
  /*自定义样式*/
}
```
```
javascript:

$('#cambtn').click(function(){
  $('#file').click();
})
```
3. iphone手机拍照后照片会顺时针旋转90度，需要在调用接口前将照片正过来

方法：使用exif.js和canvas

canvas绘制图像，利用它把图片逆时针旋转90度

exif可以读取拍摄的照片的具体信息，其中Orientation表示旋转角度，具体取值如下： 
照片旋转角度 | 值
:-: | :-: 
0度 | 1 
顺时针90度 | 6
逆时针90度 | 8
180度 | 3

可以前往exif下载exif.js，之后在script标签中引用，当Orientation值为6时更正图片位置

代码：
```
html:

<input id="file" name="file" type="file" accept="image/*"/>    <!--上传照片-->
<canvas id="myCanvas" style="display: none"></canvas>   <!--辅助用-->
<img src="" id="ago" style="display: none;"/>

```
```
javascript:

var $files = document.querySelector("#file");
var file = $files.files[0];  //获取上传的照片
var agoimg = document.querySelector("#ago");//用于保存上传的原始图片
var Orientation = null;

//获得图片旋转角度
EXIF.getData(file, function() {
  Orientation = EXIF.getTag(this, 'Orientation');
});
var reader = new FileReader();  //创建filereader对象
reader.readAsDataURL(file);     //转换数据
reader.onload = function(e){    //加载成功时触发的事件
  var image = new Image();
  image.src = e.target.result;
  agoimg.src = e.target.result;
  agoimg.onload = function() {
    var canvas = document.getElementById('myCanvas');
    canvas.width = this.naturalWidth;
    canvas.height = this.naturalHeight;
    var ctx = canvas.getContext("2d");
    //ios拍摄出来的照片：Orientation属性为6 
    if (Orientation === 6) {
      ctx.save(); //保存状态
      ctx.translate(canvas.width/2, canvas.height/2);  //设置画布上的(0,0)位置，也就是旋转的中心点
      ctx.rotate(90 * Math.PI / 180);  //把画布旋转90度
      //把图片绘制在画布translate之前的中心点
      ctx.drawImage(image, -(canvas.width/2), -(canvas.height/2), canvas.width, 
      canvas.height);   
      ctx.restore();    //恢复状态
    }
    else {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    }
    var base64 = null;
    base64 = canvas.toDataURL("image/jpeg");  //转化成base64字符串
  }
}
         
```

4. 由于后台接口接收的图片的格式是二进制流的，所以需要把现有的base64字符串转化成二进制流

解决方法：先把base64字符串解码，再把字符串中的每一个字符转化成Unicode编码，最后再基于此创建一个blob对象

代码：
```
javascript:

var bytes = window.atob((base64).split(',')[1]);   //字符串解码
var array = [];
for(var i = 0; i < bytes.length; i++){    //每一个字符转化成unicode编码
  array.push(bytes.charCodeAt(i));
}
var blob = new Blob([new Uint8Array(array)],{type:'image/jpeg'}); //创建二进制流blob对象
```

5.调用摄像头实时识别

解决方法：使用navigator.mediaDevices.getUserMedia获取用户设备，并将视频流设置为video元素的源，最后使用canvas绘制video的成像

代码：
```
html: 

<video id="video" width="300" height="300" autoplay></video>
<canvas id="canvas" style="display:none;" width="300" height="300"></canvas>
```
```
javascript:


var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var video = document.getElementById("video");

if (navigator.mediaDevices === undefined) {
  navigator.mediaDevices = {};
}
      
if (navigator.mediaDevices.getUserMedia === undefined) {
  navigator.mediaDevices.getUserMedia = function (constraints) {
    var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    if (!getUserMedia) {
      return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
    }
    return new Promise(function (resolve, reject) {
      getUserMedia.call(navigator, constraints, resolve, reject);
    });
  }
}
var constraints = { audio: false, video: {width: 720,height:720} }
navigator.mediaDevices.getUserMedia(constraints)
        .then(function (stream) {
          var video = document.querySelector('video');
          if ("srcObject" in video) {
            video.srcObject = stream;
          } else {
            video.src = window.URL.createObjectURL(stream);
          }
          video.onloadedmetadata = function (e) {
            video.play();
          };
        })
        .catch(function (err) {
          console.log(err.name + ": " + err.message);
        });
      
context.drawImage(video, 0, 0, 300, 300);
```
> 具体源代码可至[我的github](https://github.com/smilechenjia/face)查看