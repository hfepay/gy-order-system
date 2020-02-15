const env = 'dev'
const configs = {
  dev: {
    BASEURL: 'https://zhair.hfsmrz.cn/fowebserver',
    imgUrl: '',
  },
  pro: {
    BASEURL:"https://mp.gzairports.com/fowebserver"
  }
}
const config = configs[env||'pro']
module.exports = {
  config
}
