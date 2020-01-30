// pages/order/index.js
import { getSetting, wxpay, shouTost, shouMoadl, chooseAddress, openSetting } from "../../utils/asyncWx.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
import { request } from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "全部订单",
        isActive: true
      },
      {
        id: 1,
        value: "代付款",
        isActive: false
      },
      {
        id: 2,
        value: "待发货",
        isActive: false
      }
      ,
      {
        id: 3,
        value: "退款/退款",
        isActive: false
      }
    ],
    orders:[]

  },
  //根据标题索引 来选中标题素组
   changeTitleByIndex(index){ 
      let { tabs } = this.data
      tabs.forEach((v, i) => {
      i === index ? v.isActive = true : v.isActive = false;
    });
    this.setData({
      tabs
    })
   },
  handletabsItemChange(e) {
    //获取被点击的标题索引
    const { index } = e.detail;
  
     this.changeTitleByIndex(index);
     this.getOrders(index+1);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const token=wx.getStorageSync("token");
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index',
      
      });
        return;
    }      
     let pages =  getCurrentPages();
     let CurrentPages=pages[pages.length-1];
     const {type} = CurrentPages.options;
     this.changeTitleByIndex(type-1);
     this.getOrders(type)
       
  },
  async getOrders(type){
    const res = await request({ url:"/my/orders/all",data:type});
    this.setData({
      orders: res.orders.map(v => ({ ...v, create_time_cn: (new Date(v.create_time*1000).toLocaleDateString())}))
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})