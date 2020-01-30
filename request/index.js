
let ajaxTimes=0;
export const request=(params)=>{

  //判断url中是否有my
    let header = { ...params.header};
    if(params.url.includes("/my/")){
        header["Authorization"]=wx.getStorageSync("token");
          
    }

    ajaxTimes++;
    wx.showLoading({
        title: '加载中',
        mask:true
    })

    setTimeout(function () {
        wx.hideLoading()
    }, 3000)
    //定义公共的url
    const baseUrl ="https://api.zbztb.cn/api/public/v1"
     return new Promise((resolve,reject)=>{
            wx.request({
                ...params,
                header: header,
                url:baseUrl+params.url,
              success:(result)=>{
                  resolve(result.data.message);
              },
              fail:(err)=>{
                  reject(err);
              },
              complete:()=>{
                 
                  ajaxTimes--;
                  if (ajaxTimes===0){
                       wx.hideLoading();
                  }
                     
                  
              },
            });
              
     })
}