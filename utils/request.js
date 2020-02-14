import { config } from './config.js'
import { getToken } from './util'
const BASEURL = config.BASEURL
const request = {
  get:function (url,data) {
    return requestDefault(url, data, 'GET')
  },
  post: function (url, data, header) {
    return requestDefault(url, data, 'POST', header)
  },
  put:function (url,data) {
    return requestDefault(url, data, 'PUT')
  },
  del:function (url,data) {
    return requestDefault(url, data, 'DELETE')
  },
  upload:function (url, filePath, success,fail) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    success = success || function(){}
    fail = fail || function(){}
    wx.uploadFile({
      url: url,
      filePath: filePath,
      name: "file",
      success: res => {
        if (res.statusCode === 200) {
          success(res.data)
        } else {
          fail(res);
        }
      },
      fail: error => {
        fail(error);
      },
      complete:function () {
        // 隐藏loading
        wx.hideLoading()
      }
    });
  }
}

const logout = () => {
  // 退出登录 清除token 用户信息
  //app.globalData.userInfo = null
  //app.globalData.token = null
  wx.removeStorageSync('userInfo')
  wx.removeStorageSync('token')
  wx.switchTab({
    url: '/pages/my/index'
  })
}

const requestDefault = function (url = '', data, methods, header){
  wx.showLoading({
    title: '加载中',
    mask: true,
  })
  console.log('请求url:%s', url)
  console.log('请求参数:%o', data)
  const options = {
    url:`${BASEURL}${url}`,
    data:data,
    method:methods,
    header: {}
  }
  options.header = {...header,}
  const token = getToken()
  if(token){
    options.header.baseToken = token
  }
  let msg = ''
  return getPromiseInstance((resolve, reject) => wx.request({
    ...options,
    success:function (res) {
      console.log(`返回数据:`, res.data)
      if(res.statusCode === 200 && res.data.code == 1 ){
        resolve(res.data.data)
      }else{
        if(res.data.code == 698 || res.data.code == 699){
          logout()
        }
        msg = res.data.message
        reject(handleNullToStr(res.data))
      }
    },
    fail:function (err) {
      msg = err
      reject(err)
    },
    complete:function () {
      // 隐藏loading
     wx.hideLoading()
      msg && tooltips(msg)
    }
  }))
}
const handleNullToStr = (data) => {
  for(const key in data){
    const val = data[key]
    if(val === null){
      data[key] = ''
    }
  }
  return data
}
const tooltips = data => {
  wx.showToast({
    title: data,
    icon: 'none',
  })
}
const getPromiseInstance = function(data){
  return new Promise(data)
}

// 微信获取code
const wxlogin = () => {
  return getPromiseInstance((resolve, rej) => {
    wx.login({
      success: function (res) { resolve(res) },
      fail: function (err) { rej(err) }
    })
  })
}

module.exports ={
  request, getPromiseInstance, wxlogin, tooltips
}
