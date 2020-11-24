// Page()由小程序原生提供，它是一个函数，用于初始化一个页面实例。
// 它的参数是一个配置对象，用于设置当前页面的行为属性。

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
  changeModal(){
    const that = this;
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