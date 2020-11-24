# 小程序学习记录

[微信小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)

## 1.first-miniprogram-demo

[阮一峰微信小程序入门教程](http://www.ruanyifeng.com/blog/2020/10/wechat-miniprogram-tutorial-part-one.html)

* 在[微信公众平台](https://mp.weixin.qq.com/)注册神奇一个AppID
* 下载[小程序开发工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)


* app.js中：

```js
// App()由小程序原生提供，它是一个函数，表示新建一个小程序实例
// 它的参数是一个配置对象，用于设置小程序实例的行为属性
App({})
```
* app.json中：

```json
{
  "pages": [
    "pages/home/home"
  ]
}
```

pages属性是一个数组，数组的每一项就是一个页面;
小程序会加载页面目录pages/home里面的home.js文件，.js后缀名可以省略，所以完整的加载路径为pages/home/home

* pages/home/home.js中

```js
// Page()由小程序原生提供，它是一个函数，用于初始化一个页面实例。
// 它的参数是一个配置对象，用于设置当前页面的行为属性。
Page({})
```
* pages/home/home.wxml中
WXML 是微信页面标签语言，类似于 HTML 语言，用于描述小程序的页面。

* 基础语法记录：
    + `<view></view>` 相当于`<div></div>`

    + `<text></text>` 相当于 `<span></span>`

    + `<image src=""></image>`图片

    + 轮播

      ```wxml
      <swiper indicator-dots="{{true}}"  autoplay="{{true}}">
      	<swiper-item>
            <image src="https://picsum.photos/200"></image>
         </swiper-item>`
      </swiper>
      ```
* app.json中配置项

```js
{
  "pages": [
    "pages/home/home"
  ],
  "window": {
    "navigationBarBackgroundColor": "#ff0000", // 顶部背景色
    "navigationBarTextStyle": "white", // 顶部字体颜色
    "navigationBarTitleText": "小程序 Demo" // 顶部文字
  }
}
```

* 样式文件为.wxss后缀，其中写法同css

  rpx:rpx是小程序为适应不同宽度的手机屏幕，而发明的一种长度单位。不管什么手机屏幕，宽度一律为750rpx。它的好处是换算简单，如果一个元素的宽度是页面的一半，只要写成width: 375rpx;即可

  ​	

  常用flex布局

  

* 添加样式依然使用`class="page"`

  ```html
  <button class="weui-btn weui-btn_primary">
  主操作
  </button>
  ```

* UI

  腾讯自己封装了一套UI框架[WeUI](https://weui.io/)，[WeUI github仓库](https://github.com/Tencent/weui-wxss)

  

* js数据操作

  （与vue有些相像）

  ```html
  <text>hello {{name}}</text>
  <button bindtap="changeName">改变名字</button>
  <button bindtap="changeModal" >确认Modal</button>
  ```

  ```js
  // app.js
  // 某些数据要在多个页面共享，就需要写到全局配置对象里面
  App({
    globalData:{
      now:(new Date()).toLocaleString()
    }
  });
  ```

  ```js
  // home.js
  // getApp()函数是小程序原生提供的函数方法，用于从页面获取 App 实例对象
  const app = getApp();
  
  Page({
    data:{
      name:'张三',
      now: app.globalData.now
    },
    changeName(){
      this.setData({
        name:'李四'
      },function(){
        // wx是小程序提供的原生对象
        // wx.showToast()会展示微信内置的动态提示框
        wx.showToast({
          title: '操作完成',
          duration:700
        })
      })
    },
    changeModal(){ // 多个事件如此堆砌即可
      const that = this;
      // 弹框
      wx.showModal({
        title:'操作确认',
        content:'你确认要修改吗？',
        success(res){
          console.log(res) // {cancel: false,confirm: true,errMsg: "showModal:ok"}
          if(res.confirm){
            that.setData({
              name:'莉莉'
            },function(){
              wx.showToast({
                title: '操作完成',
                duration:700
              })
            })
          } else if(res.cancel){
            console.log('用户点击取消')
          }
        }
      })
    }
  });
  ```

  

  小程序中的事件在传播上分成两个阶段：先是捕获阶段（由上层元素向下层元素传播），然后是冒泡阶段（由下层元素向上层元素传播）。所以，同一个事件在同一个元素上面其实会触发两次：捕获阶段一次，冒泡阶段一次。

  小程序允许页面元素，通过属性指定各种事件的回调函数，并且还能够指定是哪个阶段触发回调函数。具体方法是为事件属性名加上不同的前缀。小程序提供四种前缀。

  **事件列表**：

  * `tap`：触摸后马上离开。
  * `longpress`：触摸后，超过 350ms 再离开。如果指定了该事件的回调函数并触发了该事件，`tap`事件将不被触发。
  * `touchstart`：触摸开始。
  * `touchmove`：触摸后移动。
  * `touchcancel`：触摸动作被打断，如来电提醒，弹窗等。
  * `touchend`：触摸结束

  **事件四种前缀**：

  - `capture-bind`：捕获阶段触发。
  - `capture-catch`：捕获阶段触发，并中断事件，不再向下传播，即中断捕获阶段，并取消随后的冒泡阶段。
  - `bind`：冒泡阶段触发。
  - `catch`：冒泡阶段触发，并取消事件进一步向上冒泡。

***

* WXML渲染语法

  （写法简直vue)

  * 渲染列表：`wx:for`

    ```html
    <text class="title" wx:for="{{items}}">
      {{index}}、 {{item}}
    </text>
    ```

    还可以设置`wx:key`,`x:for-item:`,`wx:for-index`具体可以参考[官方API`wx-for`](https://developers.weixin.qq.com/miniprogram/dev/reference/wxml/list.html)； 或参考代码中page/page1/page1.wxml

  * 条件渲染：`wx:if`

    确保条件块在切换时销毁或重新渲染

    ```html
    <view wx:if="{{length > 5}}"> 1 </view>
    <view wx:elif="{{length > 2}}"> 2 </view>
    <view wx:else> 3 </view>
    ```

    如果是一组标签被条件控制时，可提供无意义的标签`<block wx:if="">...</block>`     

    当标签频繁的切换使用:`hidden`,`hidden="{{true}}"`

    当标签不是频繁的切换使用 `wx:if`

  * 模板

    [扩展]——Mustache语法：Mustache是一个logic-less（轻逻辑）模板解析引擎；它是为了使用户界面与业务数据（内容）分离而产生的，它可以生成特定格式的文档，通常是标准的HTML文档；`{{userInfo.nickName}}`，这里的`{{ }}`就是Mustache的语法。

    ```html
    定义：
    <template name="msgItem">
      <view>
        <text> {{index}}: {{msg}} </text>
        <text> Time: {{time}} </text>
      </view>
    </template>
    使用：
    <template is="msgItem" data="{{...item}}"/>
    
    数据：
    Page({
      data: {
        item: {
          index: 0,
          msg: 'this is a template',
          time: '2016-09-15'
        }
      }
    })
    ```

    

    

    

  