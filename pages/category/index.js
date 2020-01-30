// pages/category/index.js
import {request} from '../../request/index.js';
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
     
    leftMenuList:[],
    rightContent:[],
    //被点击的左侧的菜单
    currentIndex:0
  },
   categoryList:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*
    1.先判断本地存储有没有旧数据 如果没有就发送新的数据，如果有旧的数据 也没有过期 就用本地旧数据*/ 
    //1.本地存储获取
     const Cates=wx.getStorageSync("cates");
     if(!Cates){
       //不存在
       this.getCates();
     }else{
          if(Date.now()-Cates.time>1000*60*60*24){
             this.getCates();
          }else{
            this.categoryList=Cates.data;
            let leftMenuList = this.categoryList.map(v => v.cat_name);
            let rightContent = this.categoryList[0].children;
            this.setData({
              leftMenuList,
              rightContent
            })
          }
     }
       
   
  },
  //async 意思是异步
   async getCates(){
    //  request({ url:"/categories"})
    //  .then(result=>{
      
    //     this.categoryList=result.data.message
    //      //再把数据存到本地当中  
    //      wx.setStorageSync("cates",{time:Date.now(),data:this.categoryList})
    //     //map函数会返回一个新的数组
    //    let leftMenuList=this.categoryList.map(v=>v.cat_name)
    //    let rightContent = this.categoryList[0].children
    //    this.setData({
    //      leftMenuList,
    //      rightContent
    //    })
       
    //  })

      //使用es7的async  awict意思是等待
     const result = await request({ url:"/categories"});
          this.categoryList=result
         //再把数据存到本地当中  
         wx.setStorageSync("cates",{time:Date.now(),data:this.categoryList})
        //map函数会返回一个新的数组
       let leftMenuList=this.categoryList.map(v=>v.cat_name)
       let rightContent = this.categoryList[0].children
       this.setData({
         leftMenuList,
         rightContent
       })
   },
   //左侧菜单的
  handleItemTap(e){
   //获取索引  
   const {index}=e.currentTarget.dataset
   //此时赋值可以让rightContent拿到自己对于的下标值
    let rightContent = this.categoryList[index].children
    this.setData({
      currentIndex:index,
      rightContent
   })
  }

  
})