import { request, getPromiseInstance, wxlogin, tooltips} from './request'
console.log(getApp)
const __API = {
  initJsCode:() => {
    return getPromiseInstance((resolve,reject) => {
      wx.checkSession({
        success:function() {
          const jsCode = wx.getStorageSync('jsCode')
          if(!jsCode){
            wxlogin()
              .then(res =>  {
                wx.setStorageSync('jsCode', res.code)
                resolve(res.code)
              })
          }else{
            resolve(jsCode)
          }
        },
        fail:function () {
          wxlogin()
            .then(res =>  {
              wx.setStorageSync('jsCode', res.code)
              resolve(res.code)
            })
        }
      })
    })

  },
  getPhone:(jsCode, encryptedData, iv ) => {
    return getPromiseInstance( (resolve,reject) => {
      request.post('/oauth/token',)
        .then(res => resolve(res))
        .catch(res => reject(res))
    })
  },
  getJsCode: () => {
    return getPromiseInstance((resolve,reject) => {
      __API.initJsCode()
          .then(jsCode => resolve(jsCode))
      // resolve(wx.getStorageSync('jsCode'))
      // wxlogin()
      //   .then(res => { resolve(res.code)})
    })
  },
  login: (jsCode, encryptedData, iv) => {
    return getPromiseInstance((resolve,reject) => {
      const data = {
        // encryptedData:encryptedData,
        jsCode:jsCode,
        // iv:iv,
      }
      request.post('/of/miniprog/login', data, { 'content-type': 'application/x-www-form-urlencoded'})
        .then(res => resolve(res))
        .catch(res => reject(res))
    })
  }
}

const API = {
  initJsCode:__API.initJsCode,
  logout: () => {
    wx.removeStorageSync('userInfo')
    wx.removeStorageSync('token')
  },
  login: ({encryptedData,iv}) => {
    return getPromiseInstance((resolve,reject) => {
      try {
        // 获取wx登录code
        __API.getJsCode()
          .then(jsCode => {
            __API.login(jsCode, encryptedData, iv)
              .then(res => {
                resolve(res)
              }).catch(err => {
              reject(err)
            })
          })
      }catch (e) {
        tooltips(e)
        reject(e)
      }
    })
  },
  register:(data) => {
    return getPromiseInstance((resolve,reject) => {
      request.post('/of/register',data)
          .then(res => resolve(res))
    })
  },
  getMerchantList:() => {
    return getPromiseInstance((resolve,reject) => {
      request.get('/food/bus')
          .then(res => resolve(res))
    })
  },
  getFoodList:(data) => {
    return getPromiseInstance((resolve,reject) => {
      request.post('/food/index',data)
          .then(res => resolve(res))
    })
  },
  getMenuList:(data) => {
    return getPromiseInstance((resolve,reject) => {
      request.post('/food/menu',data)
          .then(res => resolve(res))
    })
  }
}


module.exports = API
