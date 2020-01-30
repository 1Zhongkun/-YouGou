// pages/card/index.js
import { getSetting, shouTost, shouMoadl, chooseAddress, openSetting} from "../../utils/asyncWx.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
         address:{},
         cart:[],
         allCheck:false,
         totalPrice:0,
         totalNum:0

  },
  //获取用户地址 
  //1要绑定事件
  //2 调用小程序内置api 获取地址
  async handleAddress(){       
      try {
        const res1 = await getSetting();
        const scopeAddress = res1.authSetting["scope.address"];
        if (scopeAddress === false) {
          await openSetting();
        }
        let address = await chooseAddress();
        address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
        //把地址存入缓存中
        wx.setStorageSync("address", address);
      } catch (error) {
         console.log(error)
      }
  },

  handleChange(e){
            const goods_id=e.currentTarget.dataset.id;
            let{cart}=this.data;
            let index=cart.findIndex(v=>v.goods_id=goods_id);
            cart[index].checked=!cart[index].checked;
            this.setCart(cart);  
  },


  //设置购物车状态重新计算工具栏数据
  setCart(cart){

  
    let allCheck = true;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      } else {
        allCheck = false;
      }
    });
    allCheck = cart.length != 0 ? allCheck : false;
    this.setData({
      cart,
      totalPrice,
      totalNum,
      allCheck
    });
    //let变量可以更改 const不可以  
    wx.setStorageSync("cart", cart);
  },
  ItemAllChecked(e){
         let{cart,allCheck}=this.data;
         allCheck=!allCheck;
         cart.forEach(v=>{
                v.checked=allCheck;
         });
         this.setCart(cart);
  },

 async handleNum(e){
   
       
      const{id,operation}=e.currentTarget.dataset;
    
       let { cart }=this.data;
   

      const index=cart.findIndex(v=>v.goods_id===id);
       if(cart[index].num===1 && operation===-1){
         const res = await shouMoadl({content:"是否要删除?"});
           if(res.confirm){
              cart.splice(index,1);
              this.setCart(cart);
           }
       }else{
           cart[index].num+=operation;
           this.setCart(cart);
       }
  
  },
  //结算
 async handlepay(){
      //c
   const { address,totalNum}=this.data;
       if (!address.userName){
        await shouTost({title:"你还没有选择收获地址"})
        return;
      }
   if (totalNum===0){
     await shouTost({ title:"您的购物车为空"})
     return;
   }
   wx.navigateTo({
     url: '/pages/pay/index',
   
   });
     
        
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
        const address=wx.getStorageSync("address");
        
        //获取购物车
        const cart=wx.getStorageSync("cart")||[];
        //确保每一个函调函数都为对 就全是对 有一个是错 就全是错
        this.setData({
          address
        })
        this.setCart(cart);
      
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