// pages/card/index.js
import { getSetting, wxpay, shouTost, shouMoadl, chooseAddress, openSetting } from "../../utils/asyncWx.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
import{request} from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0

  },
    onShow: function () {
    const address = wx.getStorageSync("address");

    //获取购物车
    let cart = wx.getStorageSync("cart") || [];

    cart=cart.filter(v=>v.checked);
    //确保每一个函调函数都为对 就全是对 有一个是错 就全是错
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
    });
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address

    });
    //let变量可以更改 const不可以  

  },
 async handleOrderPay(){
    try {
      //判断缓存中有没有token
      const token = wx.getStorageSync("token");
      if (!token) {
        wx.navigateTo({
          url: '/pages/auth/index',

        });
        return;
      }
     // const header = { Authorization: token };
      //准备请求体参数
      const order_price = this.data.totalPrice;
      const address = this.data.address.all;
      let cart = this.data.cart;
      let goods = [];
      cart.forEach(v => {
        goods.push({
          goods_id: v.goods_id,
          goods_num: v.num,
          goods_price: v.goods_price
        })

      })
      const order = { order_price, address, goods }
      //准备发送请求
      const { order_num } = await request({ url: "/my/orders/create", method: "post", data: order,  })
      //发起预支付
      const { pay } = await request({ url: "/my/orders/req_unifiedorder", method: "post", data: { order_num } })
      //发起微信支付
      await wxpay(pay);
      //查询后台是否成功
      const res = await request({ url: "/my/orders/chkOrder", method: "post", data: { order_num } });
       //手动清空购物车
       let newCart=wx.getStorageSync("cart");
       newCart=newCart.filter(v=>!v.checked);
      wx.setStorageSync("cart", newCart);
          


       await shouTost({title:支付成功})
       wx.navigateTo({
         url: '/pages/order/index',
         
       });
         
    } catch (error) {
      await shouTost({ title: 支付失败 });
      console.log(err);
    }
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