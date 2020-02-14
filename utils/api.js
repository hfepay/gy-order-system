import { request, getPromiseInstance, wxlogin, tooltips, getToken} from './request'

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
        username:123456,
        password:123456,
        grant_type:'password',
        scope:'app',
        client_id:'app',
        client_secret:'app@2018',
        auth_type:'weixin',
        encryptedData:encryptedData,
        jsCode:jsCode,
        iv:iv,
      }
      request.post('/oauth/token', data, { 'content-type': 'application/x-www-form-urlencoded'})
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
  getUserInfo: () => {
    return getPromiseInstance((resolve,reject) =>{
      const token = getToken()
      let responce = {}
      if(token){
        request.get('/beAccount/user/current')
          .then(res => {
            responce = res
            res && wx.setStorageSync('userInfo', res)
            resolve( responce)
          })
      }
    })
  },
  login: ({encryptedData,iv}) => {
    return getPromiseInstance((resolve,reject) => {
      try {
        // 获取wx登录code
        __API.getJsCode()
          .then(jsCode => {
            __API.login(jsCode, encryptedData, iv)
              .then(res => {
                const token = res.token_type + ' '+ res.access_token
                wx.setStorageSync('token', token)
                resolve(API.getUserInfo())
              }).catch(err => {
              reject(err)
            })
          })
      }catch (e) {
        tooltips(e)
        reject(e)
      }
    })
  }
}


module.exports = API
