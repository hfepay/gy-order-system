const env = 'dev'
const configs = {
  dev: {
    BASEURL: 'https://zhair.hfsmrz.cn/fowebserver'
  },
  pro: {
    BASEURL:"https://mp.gzairports.com/fowebserver"
  }
}
const config = configs[env||'pro']
module.exports = {
  config
}
