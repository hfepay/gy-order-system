const env = 'dev'
const configs = {
  dev: {
    BASEURL: 'https://zhair.hfsmrz.cn/mobile',
    imgUrl: '"http://zhair.hfsmrz.cn/mobile/file/imgs/show/"',
  }
}
const config = configs[env]
module.exports = {
  config
}