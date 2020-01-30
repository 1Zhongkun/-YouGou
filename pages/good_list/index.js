// pages/good_list/index.js
import { request } from '../../request/index.js';
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
       tabs:[
         {
           id:0,
           value:"综合",
           isActive:true
         },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
       {
        id: 2,
        value: "价格",
         isActive: false
      }
       ],
       goodsList:[]
  },
  QueryParmas:{
     query:"",
     cid:"",
     pagenum:1,
     pagesize:10
  },
  //总页数
  totalPage:1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParmas.cid = options.cid||"";
    this.QueryParmas.query = options.query||"";
    this.getGoodsList();
   
    
  },
  //获取商品列表数据
   async getGoodsList(){
     const res = await request({ url:"/goods/search",data:this.QueryParmas})
     const total=res.total; 
     this.totalPage=Math.ceil(total/this.QueryParmas.pagesize)
     this.setData({
       goodsList: [...this.data.goodsList,...res.goods]
       })
       //关闭刷新的窗口
       wx.stopPullDownRefresh();
         
    },
  handletabsItemChange(e){
    //获取被点击的标题索引
    const { index } = e.detail;
    let{tabs}=this.data
    tabs.forEach((v,i) => {
      i===index?v.isActive=true:v.isActive=false;
    });
       this.setData({
          tabs
       })
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
        //需要现在json文件中开启全局下拉，配置下拉图片颜色
        this.setData({
          goodsList:[]
        })
        this.QueryParmas.pagenum=1;
    this.getGoodsList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
      //判断当前yema
      if(this.QueryParmas.pagenum>=this.totalPage){
           wx.showToast({
             title: '滑到底了',
            
           });
      }else{
        this.QueryParmas.pagenum++;
        this.getGoodsList();
      }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})