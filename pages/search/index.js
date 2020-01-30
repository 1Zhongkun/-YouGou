// pages/search/index.js
import { request } from '../../request/index.js';
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
         goods:[],
         isFoucs:false,
         //输入框的值
         inpValue:""
  },
  handleCancel(){
     this.setData({
       inpValue:"",
       isFoucs:false,
       goods:[]
     })
  },
  handleiInput(e){
     const{value}=e.detail;
     if(!value.trim()){
       this.setData({
         isFoucs: false,
         goods:[]
       })
        return;
     }
     
    this.setData({
      isFoucs:true
    })
     clearTimeout(this.Timeid)
     this.Timeid=setTimeout(()=>{
            this.qsearch(value);
     },1000)
   

  },
  /**
   * 生命周期函数--监听页面加载
   */
  //输入框的值改变了

  Timeid:-1,
   //获取数据
  async qsearch(query){
       const res=await request({url:"/goods/qsearch",data:{query}});
        this.setData({
          goods:res
        })
  },

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