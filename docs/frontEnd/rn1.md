---
title: 说说react-native那些事儿
---
# 说说react-native那些事儿
```2019-9-29```
::: tip 
react-native对我来说就是一个词 “new"，现在就记录下这段时间对这块新大陆的探索之路吧
:::
## flexbox布局
在react-native中使用flexbox布局，以适用于不同屏幕尺寸。

在父元素标明flex是1，flexDirection表示主轴方向，justifyContent表示主轴对齐方式，alignItems表示次轴对齐方式

当justifyContent，alignItems的值都为center时，且父元素里只有一个子元素，则这个子元素居中
## TouchableOpacity 
TouchableOpacity特别好用，每次需要跳转的时候都可以用TouchableOpacity，它的onPress属性就是处理跳转参数的
```
<TouchableOpacity 
   onPress={() => that.props.navigation.navigate('test', { id: id })}
>
</TouchableOpacity>
```
## TextInput
把secureTextEntry属性设置为true即可显示密码

把autoCapitalize属性改为none则取消首字母大写
## 样式
react-native里的样式都是驼峰式，样式总结有三种写法：
1. 直接写在style属性里：
```
<Text style={{fontSize:14}}></Text> 
```
2. 创建stylesheet
```
<Text style={styles.textstyle}></Text>
const styles = StyleSheet.create({
     textstyle: {
       color: '#000'
     }
})
```
3. 混合
```
<View style={[styles.textstyle, {backgroundColor: 'red'}]}><View> 
```
## 在react-native里添加表格
使用react-native-table-component

1. 在package.json里添加，之后使用yarn install重新安装即可

2. 引入react-native-table-component
```
import { Table, Row, Rows } from 'react-native-table-component';
```
3. 使用如下：
```
//表格使用的数据格式如下
options: {
   tableHead: ['id', '姓名', '年龄'],        //表头
   tableData: [                            //表内容
      [1, '陈小', '23'],
      [2, '王王', '32'],
      [3, '刘大', '12']
   ]
}

<Table borderStyle={{borderWidth: 1, borderColor: '#e8e8e8'}}>     //表格外框 
    <Row data={options.tableHead} />               //表头
    <Rows data={options.tableData} />             //表格内容
</Table>   
```
## 监听键盘事件，获得键盘高度
```
import Keyboard from 'react-native'        //引入keyboard

componentWillMount() {      //添加监听事件，监听“键盘出现”，“键盘隐藏”
  this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow',this._keyboardDidShow.bind(this));
  this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide',this._keyboardDidHide.bind(this));
}

_keyboardDidShow(e) {    //当监听到”键盘出现“时，调用这个函数，
  Platform.OS === 'ios' &&
    this.setState({
      keyBoardHeight: isIphoneX ? e.endCoordinates.height -34 : e.endCoordinates.height     
      //设置键盘高度，其中Platform用来判断当前环境是ios还是android
    });
}

_keyboardDidHide() {       //当“键盘隐藏”时，设置键盘高度为0
  this.setState({
    keyBoardHeight: 0
  });
}

componentWillUnmount(){   //组件销毁时事件也要移除
  this.keyboardDidShowListener.remove();
  this.keyboardDidHideListener.remove();
}
```
## react-native传递信息给h5
使用到了webview

webview里
```
<WebView
   ref={(webview) => {
     this.inweb = webview
   }}
   onLoadEnd={this.onLoadEnd}
   source={{uri: insideurl}}
/>

onLoadEnd =(e)=>{
  let data = {
    name:'adddd'
  };
  this.inweb&&this.inweb.postMessage(JSON.stringify(data));   //发送消息到H5
};
```
h5里：
```
window.document.addEventListener('message', function(e) {        //注册事件 接收数据
   const message = e.data;      //e.data就是接收到的数据
})
```
## 获得当前滚动高度
```
<ScrollView   scrollEventThrottle = {10}   onScroll={this._changeScroll.bind(this)}>
</ScrollView>

_changeScroll(e) {
  const scrollNow = e.nativeEvent.contentOffset.y;    //获得当前滚动高度
}
```
## 获取元素相对位置
```
<View onLayout = {({nativeEvent: { layout: {x, y, width, height}}}) => {
     this._height = { y,height }
}>
```
## 使用navigation跳转页面不更新
使用到DeviceEventEmitter

如果A跳转到B

A:要跳转的时候触发一个事件
```
import DeviceEventEmitter from ‘react-native'
DeviceEventEmitter.emit('UPDATE',9999);
```
B:在componentdidmount里监听这个事件，然后强制刷新，重新调接口 
```
componentDidComponent(){
  this.subscription = DeviceEventEmitter.addListener('UPDATE',
    (param)=>{
       this.forceUpdate();    //强制刷新页面
       this.getClue()           //重新获取接口
    })
}

componentWillUnmount() {     //在组件销毁时移除这个事件
  this.subscription.remove();
};
```
## 下拉刷新
```
 <ScrollView 
   refreshControl={
     <RefreshControl
       refreshing={this.state.refreshing}
       onRefresh={this._onRefresh}
     />
   }
>
</ScrollView>

_onRefresh = () => {
  this.setState({refreshing: true});
  重新获取接口
  this.setState({refreshing: false});
}
```
## 把内容套在一个边框图片里
先写图片，再写被套的内容，保证图片和被套的内容高宽一致，且被套内容最外边的position是absolute
```
<Image source={shadow} style={{width: 100,height: 100}} resizeMode='stretch'></Image>
<View style={{position:'absolute',width:100,height:100}}>
</View>
```
## 如何在google里调试iOS模拟器
* 运行模拟器：react-native run-ios

* command+d => Debug JS Remotely 此时会启动google

* 在chrome里选择视图->开发者->开发者工具
## 如何在一段内容上布置蒙层，左滑后蒙层消失
使用绝对定位，不透明度，以及滑动触发事件
```
<View>   //父组件，相对定位
  <View></View>//被盖住的内容
  {this.state.dim && (    //蒙层，当dim为true时出现
     <View 
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 100,backgroundColor: 'rgba(0,0,0,0.7)'}}> 
        //绝对定位，置于最上，背景模糊（透明度）
        <ScrollView 
          horizontal={true} 
          onScrollEndDrag={(e) => this.dimScrollEndDrag(e)}> 
          //滑动后触发事件
        </ScrollView>
     </View>
  )}
</View>

dimScrollEndDrag = (e) => {   //当滑动后执行该事件，置dim为false，蒙层不展示
  this.setState({
    dim: false
  })
}
```
## 父组件传数据到子组件，子组件修改该数据后传回父组件
父组件
```
<Filtern
  industrytwo={this.state.industrytwo}   //传数据到子组件
  changeindus={elems => this._changeindus(elems)}  //从子组件拿回数据 
/>
```
子组件
```
this.props.industrytwo.    //从父组件拿到数据
this.props.changeindus(options);   //通过父组件的方法把数据传回父组件
```