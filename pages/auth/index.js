// pages/auth/index.js
import { getSetting, wxlogin, shouTost, shouMoadl, chooseAddress, openSetting } from "../../utils/asyncWx.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  async handlegetUserInfo(e){
    //获取用户信息
  
     try {
       const { encryptedData, rawData, iv, signature } = e.detail;

       //获取用的的code
       const { code } = await wxlogin();
       const loginParams = { code, encryptedData, rawData, iv, signature }
       const { token } = await request({ method: "post", url: "/users/wxlogin", data: loginParams })
       wx.setStorageSync("token", token);
       wx.navigateBack({
         delta: 1
       });
     } catch (error) {
       console.log(err);
     }
      

  },
  onLoad: function (options) {

  },

  
 
})