const env = 'dev'
const configs = {
  dev: {
    BASEURL: 'https://zhair.hfsmrz.cn/fowebserver',
    imgUrl: '',
  }
}
const config = configs[env]
module.exports = {
  config
}
