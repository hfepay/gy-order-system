import { request, getPromiseInstance, wxlogin, tooltips, logout} from './request'
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
  logout:(data) => {
    return getPromiseInstance((resolve,reject) => {
      logout()
      resolve()
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
  },
  getAddressList:(data) => {
    return getPromiseInstance((resolve,reject) => {
      request.get('/ofMember/addr',data)
          .then(res => resolve(res))
    })
  },
  addAddress:(data) => {
    return getPromiseInstance((resolve,reject) => {
      request.post('/ofMember/newAddr',data)
          .then(res => resolve(res))
    })
  },
  updateAddress:(data) => {
    return getPromiseInstance((resolve,reject) => {
      request.post('/ofMember/modifAddr',data)
          .then(res => resolve(res))
    })
  },
  getAddress:(id) => {
    return getPromiseInstance((resolve,reject) => {
      request.get('/ofMember/addrDetail/'+id)
          .then(res => resolve(res))
    })
  },
  delAddress:(id) => {
    return getPromiseInstance((resolve,reject) => {
      request.post('/ofMember/delAddr/'+id)
          .then(res => resolve(res))
    })
  },
  getUnfinishedOrders:() => {
    return getPromiseInstance((resolve,reject) => {
      request.get('/ofMemberOrder/unfinished')
          .then(res => resolve(res))
    })
  },
  getFinishedOrders:() => {
    return getPromiseInstance((resolve,reject) => {
      request.get('/ofMemberOrder/done')
          .then(res => resolve(res))
    })
  },
  getOrder:(id) => {
    return getPromiseInstance((resolve,reject) => {
      request.get(`/ofMemberOrder/details/${id}`)
          .then(res => resolve(res))
    })
  },
  cancelOrder:(id) => {
    return getPromiseInstance((resolve,reject) => {
      request.post(`/food/cancelOrder/${id}`)
          .then(res => resolve(res))
    })
  },
  addOrder:(data) => {
    return getPromiseInstance((resolve,reject) => {
      request.post(`/food/aMeal`, data)
          .then(res => resolve(res))
    })
  },
  calculatePrice:(data) => {
    return getPromiseInstance((resolve,reject) => {
      request.post(`/food/calculatePrice`, data)
          .then(res => resolve(res))
    })
  },
  pay:(data) => {
    return getPromiseInstance((resolve,reject) => {
      request.post(`/food/pay`, data)
          .then(res => resolve(res))
    })
  },
  getMyInfo: () => {
    return getPromiseInstance((resolve,reject) => {
      request.get(`/ofMember/info`)
          .then(res => resolve(res))
    })
  },
  feedback: (data) => {
    return getPromiseInstance((resolve,reject) => {
      request.post(`/ofMember/feedback`, data)
          .then(res => resolve(res))
    })
  },
  verifyMemberNo: (no) => {
    return getPromiseInstance((resolve,reject) => {
      request.post(`/of/verifyMemberNo/${no}`)
          .then(res => resolve(res))
    })
  },
  updateInfo:(data) => {
    return getPromiseInstance((resolve,reject) => {
      request.post(`/ofMember/modifInfo`, data)
          .then(res => resolve(res))
    })
  },
}


module.exports = API
