// pages/good_detail/index.js
import { request } from '../../request/index.js';
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:[],
    isCollect:false
  },

  GoodsInfo:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
         const {goods_id}=options;
          this.getGoodsDetail(goods_id);
  },
  handlePrevewImage(e){
      const urls = this.GoodsInfo.pics.map(v=>v.pics_mid);
      const current=e.currentTarget.dataset.url;
     wx.previewImage({
       current,
       urls
      
     });
       
  },
  async getGoodsDetail(goods_id){
    const res = await request({ url: "/goods/detail" ,data:{goods_id}})
    this.GoodsInfo=res;

    let collect = wx.getStorageSync("collect") || [];
    let isCollect = collect.some(v => v.goods_id === this.GoodsInfo.goods_id)


    this.setData({
      goodsObj:{
        goods_name:res.goods_name,
        goods_price:res.goods_price,
        //iphone手机不识别 webp图片格式
        //最好找到后台让他修改
        goods_introduce: res.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics:res.pics
      },
      isCollect
    })
  },
  handleCarAdd(){
      //点击加入购物车
      //1 获取购物车中的本地数据
       let cart=wx.getStorageSync("cart")||[];
       //2判断商品对象是否存在于购物中
       let index=cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
       if(index===-1){
             //不存在
             this.GoodsInfo.num=1;
            this.GoodsInfo.checked = true;
             cart.push(this.GoodsInfo);
       }else{
          //存在 数据++
          cart[index].num++;
       }
       wx.setStorageSync("cart", cart);
       wx.showToast({
         title: '加入成功',
         icon: 'success',
         mask:true
       });
         
  },
  //点击商品图片收藏
  handleCollect(){
    let isCollect=false;
    let collect = wx.getStorageSync("collect")||[];
    let index=collect.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id)

    //当index不等于-1就一家收藏了
    if(index!==-1){
         collect.splice(index,1);
         isCollect=false;
         wx.showToast({
           title: '取消成功',
           icon: 'success',
           mask: true,
        
         });
    }else{
      collect.push(this.GoodsInfo);
      isCollect = true;
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true,

      });
    }
    wx.setStorageSync("collect", collect);
          this.setData({
            isCollect
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
    let pages= getCurrentPages();   
    let currentPages = pages[pages.length-1];
    let options = currentPages.options;
    const {goods_id}=options;
    this.getGoodsDetail(goods_id);       
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