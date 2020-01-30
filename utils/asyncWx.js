
export const getSetting=()=>{
     return new Promise((resolve,reject)=>{
                wx.getSetting({
                    success: (result) => {
                        resolve(result)
                    },
                    fail: (err) => {
                        reject(err)
                    },
                    complete: () => {}
                });
                  
     })
}


export const chooseAddress = () => {
    return new Promise((resolve, reject) => {
        wx.chooseAddress({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => { }
        });

    })
}



export const openSetting = () => {
    return new Promise((resolve, reject) => {
        wx.openSetting({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => { }
        });

    })
}

export const shouMoadl = ({content}) => {
    return new Promise((resolve, reject) => {
        wx.showModal({
            title: '提示',
            content: content,

            success: (result) => {
               resolve(result)
            },
            fail: (err) => { 
                reject(err);
            },
            complete: () => { }
        });

    })
}

export const shouTost = ({ title }) => {
    return new Promise((resolve, reject) => {
        wx.showModal({
            title: title,
            icon: 'none',

            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err);
            },
            complete: () => { }
        });

    })
}
//微信登录
export const wxlogin = () => {
    return new Promise((resolve, reject) => {
      wx.login({
          timeout:10000,
          success: (result) => {
              resolve(result)
          },
          fail: (err) => {
              reject(err)
          },
          complete: () => {}
      });
        

    })
}


//微信支付
export const wxpay = (pay) => {
    return new Promise((resolve, reject) => {
       wx.requestPayment({
         ...pay,
           success: (result) => {
               resolve(result);
           },
           fail: (err) => {
               reject(err)
           },
           complete: () => {}
       });
         


    })
}