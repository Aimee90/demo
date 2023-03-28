import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '@/store'
import iView from 'iview'
import { getRoute, ddingLogin } from '@/router/utils'
import { getToken, canTurnTo, setTitle } from '@/libs/util'
import config from '@/config'
const { homeName } = config



Vue.use(Router)
//
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
// 获取路由缓存
const getSessionRouters = () => {
  if(window.sessionStorage){
    let routes = sessionStorage.getItem('__ROUTES')
    return _.isEmpty(routes)?null:getRoute(JSON.parse(routes))
  }
}
// 静态路由
const getStaticRoute = () => {
  const routersFromSession = getSessionRouters()
  if(null==routersFromSession){
    return routes
  }else{
    return _.concat(routes, routersFromSession)
  }
}
//
const router = new Router({
  routes: getStaticRoute(),
  mode: 'history'
})
const LOGIN_PAGE_NAME = 'login'
// 
const turnTo = (to, access, next) => {
  const _routes = !_.isEmpty(store.state.user.routers)?store.state.user.routers: getSessionRouters() 
  if (canTurnTo(to, access, _routes)) { // 有权限，可访问 
    if(!!to.name){
      store.dispatch('setTargetRoute', to)
      next()
    }else{
      next({replace: true, path: to.path})
    }
  } else {
    next({ replace: true, name: homeName })
  }
}
// 
const referTo = (to, next) => {
  const refer = to.query.refer
  to.name === LOGIN_PAGE_NAME?next(!!refer?{path: refer}:{name: homeName}):turnTo(to, store.state.user.access, next)
}
// 路由前置
router.beforeEach((to, from, next) => {
  iView.LoadingBar.start() 
  let token = getToken(), hasGetInfo = store.state.user.hasGetInfo, refer = to.path, inMock = 'true'==process.env.VUE_APP_MOCK
  // 判断是否存在unionId，若存在则需要调用接口生成对应TOKEN
  const unionId = to.query.unionId
  // mock 环境
  if(inMock){
    token = "mock"
  }
  if(!!unionId){
    // 异常则退出登录并跳转登录页面
    store.dispatch('handleLogOut').then(()=>{
      // next({name: LOGIN_PAGE_NAME, query: {refer}})
      ddingLogin({unionId}).then(()=>{
        referTo(to, next)
      }).catch(()=>{
        to.name === LOGIN_PAGE_NAME?next():next({name: LOGIN_PAGE_NAME, query: {refer}})
      })
    })
  }else if (!token) {
    to.name === LOGIN_PAGE_NAME?next():next({name: LOGIN_PAGE_NAME, query: {refer}})
  }else if(!hasGetInfo){
    // 拉取用户信息，通过用户权限和跳转的页面的name来判断是否有权限访问;access必须是一个数组
    // 已登录且要跳转的页面是登录页
    store.dispatch('getUserInfo').then(() => {
      referTo(to, next)
    }).catch(() => {
      // 异常则退出登录并跳转登录页面
      store.dispatch('handleLogOut').then(()=>{
        next({name: LOGIN_PAGE_NAME, query: {refer}})
      })
    })
  }else{
    turnTo(to, store.state.user.access, next)
  }
})

router.afterEach(to => {
  setTitle(to, router.app)
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})
// 更新路由
export const updateRoutes = routes => {
  const routersFromSession = getSessionRouters()
  if(_.isEmpty(routersFromSession)){
    router.addRoutes(routes)
  }
}
export const setSessionRouters = routes => {
  if(window.sessionStorage){
    sessionStorage.setItem('__ROUTES', JSON.stringify(routes))
  }
}
export default router
