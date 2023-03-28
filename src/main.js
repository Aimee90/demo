// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@babel/polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// import iView from 'iview'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

import i18n from '@/locale'
import config from '@/config'
import importDirective from '@/directive'
import importFilters from '@/filters'
import { directive as clickOutside } from 'v-click-outside-x'
// import installPlugin from '@/plugin'
import './index.less'
import '@/assets/icons/iconfont.css'
import '@/assets/icon-custom/iconfont.css'

import VOrgTree from 'v-org-tree'
import 'v-org-tree/dist/v-org-tree.css'

import VueRx from 'vue-rx'
import Rx from 'rxjs/Rx'

import SfTable from '_c/sf-table'
import SfContainer from '_c/sf-container'
import '_c/sf-modal'
// 实际打包时应该不引入mock
/* eslint-disable */
// if (process.env.NODE_ENV !== 'production') require('@/mock')

Vue.use(ViewUI, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(VOrgTree)
Vue.use(VueRx, Rx);
/**
 * @description 注册admin内置插件
 */
// installPlugin(Vue)
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
config.appId = process.env.VUE_APP_APPID
config.portalDomain = process.env.VUE_APP_PORTAL
Vue.prototype.$config = config 
/**
 * 注册指令
 */
importDirective(Vue)
importFilters(Vue)
Vue.directive('clickOutside', clickOutside)
Vue.component('SfTable', SfTable)
Vue.component('SfContainer', SfContainer)
//组件重写
import { componentFactory } from '@/libs/tools'
const sfModal = componentFactory(ViewUI.Modal)
Vue.component('Modal', sfModal)


Vue.prototype.$flts = {
  getProperty: Vue.filter('getProperty')
}
/**
 * 
 */
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app")
