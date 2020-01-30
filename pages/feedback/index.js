import { request } from "../../request/index.js";

// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "体验问题",
        isActive: true
      },
      {
        id: 1,
        value: "商品商家投诉",
        isActive: false
      }
    ],
    //选中的图片路径数组
    chooseImgs:[],
    textValue:""
  },
  handleText(e){
   
      this.setData({
        textValue:e.detail.value
      })
  },
  handleFormSubmit(){
      const {textValue,chooseImgs}=this.data;
      //验证
      if(!textValue.trim()){
          wx.showToast({
            title: '输入不合法',
            icon: 'none',
       
            mask: true
          });
          return;
      }
      wx.showLoading({
        title: "正在上传中",
        mask: true,
  
      });
        
      //准备上传到专门 的服务器
      chooseImgs.forEach((v,i)=>{

         wx.uploadFile({
        url: 'https://images.ac.cn/Home/Index/UploadAction/',
        filePath: v,
        name:"file" ,
        formData: {},
        success: (result) => {
          let url=JSON.parse(request.data).url;
          this.uploadFile.push(url)
         
        },
        fail: () => {},
        complete: () => {}
      });
        
      })
     
  },
  handletabsItemChange(e) {
    //获取被点击的标题索引
    const { index } = e.detail;
    let { tabs } = this.data
    tabs.forEach((v, i) => {
      i === index ? v.isActive = true : v.isActive = false;
    });
    this.setData({
      tabs
    })
  },
  handleRemoveImg(e){
   const{index}=e.currentTarget.dataset;
    let {chooseImgs}=this.data;

     chooseImgs.splice(index,1);
     this.setData({
       chooseImgs
     })
  },
  handleChooseImg(){
    //调用小程序内置的图片api
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {

        this.setData({
          chooseImgs: [...this.data.chooseImgs,...result.tempFilePaths]
        })
       
      },
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