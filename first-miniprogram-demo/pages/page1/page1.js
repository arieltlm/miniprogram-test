Page({
  data:{
    names:'张三',
    dtItems: ['事项A', '事项B', '事项C'],
    //  {currentSize: 1,keys: [],limitSize: 10240}
    // eventItems: ['事项A', '事项B', '事项C'], 
    items:[1,2,3,4],
    userList:[
      {id:1,name:'Ariel'},
      {id:2,name:'Tom'},
      {id:3,name:'Lili'}
    ],
    item:{
      index: 0,
      msg: 'this is a template',
      time: '2020-11-24'
    },
    inputValue:'',
  },
  inputHandler(event){
    this.setData({
      inputValue:event.detail.value || ''
    })
  },
  buttonHandler(event){
    const newItem = this.data.inputValue.trim();
    const dtItems = this.data.dtItems; // {currentSize: 1,keys: [],limitSize: 10240}
    console.log(dtItems,'dtItems')
    if(!newItem) return 
    const itemArr = [...dtItems,newItem];
    // wx.setStorageSync将数组存储在客户端
    // 除非用户主动删除或因存储空间原因被系统清理，否则数据都一直可用。单个 key 允许存储的最大数据长度为 1MB，所有数据存储上限为 10MB
    // 同步wx.setStorageSync
    // 异步wx.setStorage
    // 客户端储存是不可靠的，随时可能消失（比如用户清理缓存）。用户换了一台手机，或者本机重装微信，原来的数据就丢失了。所以，它只适合保存一些不重要的临时数据，最常见的用途一般就是作为缓存，加快页面显示
    wx.setStorageSync('eventItem', itemArr)
    this.setData({
      dtItems:itemArr
    })
  },
  // onLoad该方法属于页面的生命周期方法，页面加载后会自动执行该方法。它只执行一次，用于页面初始化
  onLoad() {
    // wx.setStorageSync()方法属于小程序的客户端数据储存 API，用于将数据写入客户端储存
    // 同步
    const itemArr = wx.getStorageInfoSync('dtItems') || []
    console.log(itemArr,'itemArr')
    this.setData({
      dtItems:itemArr
    })
  }
})