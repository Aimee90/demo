require('babel-polyfill')
const path = require('path')
const resolve = dir => {
  return path.join(__dirname, dir)
}

// 项目部署基础
// 默认情况下，我们假设你的应用将被部署在域的根目录下,
// 例如：https://www.my-app.com/
// 默认：'/'
// 如果您的应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.foobar.com/my-app/
// 需要将它改为'/my-app/'
// iview-admin线上演示打包路径： https://file.iviewui.com/admin-dist/
const BASE_URL = process.env.NODE_ENV === 'production'
  ? '/'
  : '/'
module.exports = {
  // Project deployment base
  // By default we assume your app will be deployed at the root of a domain,
  // e.g. https://www.my-app.com/
  // If your app is deployed at a sub-path, you will need to specify that
  // sub-path here. For example, if your app is deployed at
  // https://www.foobar.com/my-app/
  // then change this to '/my-app/'
  publicPath: BASE_URL,
  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: false,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'))
  },
  // 设为false打包时不生成.map文件
  productionSourceMap: false,
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  devServer: {
    proxy: {
      '/member-service': {
        target: process.env.BASE_URL, // 对应自己的接口
        changeOrigin: true,
        pathRewrite: { '^/member-service': '/member-service' }
      },
      '/coupon-service': {
        target: process.env.COUPON_SERVICE, // 券系统代理
        changeOrigin: true,
        pathRewrite: { '^/coupon-service': '/coupon-service' }
      },
      '/mrs-service': {
        target: process.env.RISK_SERVICE, // 风控系统代理
        changeOrigin: true,
        pathRewrite: { '^/mrs-service': '/mrs-service' }
      },
      '/order-service': {
        target: process.env.ORDER_SERVICE,
        changeOrigin: true,
        pathRewrite: {'^/order-service':'/order-service'}
      },
      '/commodule-service': {
        target: process.env.COMMON_SERVICE,
        changeOrigin: true,
        pathRewrite: {'^/commodule-service':'/commodule-service'}
      },
      '/pms-service': {
        target: process.env.PMS_SERVICE,
        changeOrigin: true,
        pathRewrite: {'^/pms-service':'/pms-service'}
      },
      '/tcm-service': {
        target: process.env.TCM_SERVICE,
        changeOrigin: true,
        pathRewrite: {'^/tcm-service':'/tcm-service'}
      },
      '/crs-service': {
        target: process.env.CRS_SERVICE, 
        changeOrigin: true,
        pathRewrite: { '^/crs-service': '/crs-service' }
      },
      '/activity-service': {
        target: process.env.ACTIVITY_SERVICE, 
        changeOrigin: true,
        pathRewrite: { '^/activity-service': '/activity-service' }
      },
    }
  },
  transpileDependencies: [
    'iview',
    'axios'
  ]
}
