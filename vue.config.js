module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/nobrainer-js/'
    : '/',
  configureWebpack: config => {
    config.optimization = {
      minimize: false
    }
  }
}
