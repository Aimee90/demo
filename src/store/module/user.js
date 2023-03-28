import * as _ from 'lodash'
import {updateRoutes, setSessionRouters}  from '@/router'
import { getRoute, getDefault } from '@/router/utils'
import { setToken, getToken, setUserName, getMenuByRouter } from '@/libs/util'
import { queryUser } from '@/api/users'
import { getResource } from '@/api/sys-manage' 

export default {
  state: {
    routers: [],
    targetRoute: null,
    userName: '',
    userId: '',
    avatarImgPath: '',
    token: getToken(),
    access: '',
    hasGetInfo: false,
    routerMounted: false,
  },
  mutations: {
    setAvatar (state, avatarPath) {
      state.avatarImgPath = avatarPath
    },
    setUserId (state, id) {
      state.userId = id
    },
    setUserName (state, name) {
      state.userName = name
      setUserName(name)
    },
    setAccess (state, access) {
      state.access = access
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setHasGetInfo (state, status) {
      state.hasGetInfo = status
    },
    setRouters (state, routers) {
      let routes = getRoute(routers)
      state.routers = _.concat(getDefault(), routes)
      state.routerMounted = true
      updateRoutes([...routes, {path: '*', redirect: '/404'}])
    },
    setTargetRoute(state, route) {
      state.targetRoute = route
    },
  },
  getters: {
    menuList: (state, getters, rootState) => getMenuByRouter(state.routers, rootState.user.access),
    userName: state => state.userName,
    userId: state => state.userId
  },
  actions: {
    // 登录
    handleLogin ({ commit }, { token }) {
      return new Promise((resolve, reject) => {
        const data = { token: token }
        commit('setToken', data.token)
        resolve('success')
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        commit('setToken', '')
        commit('setAccess', [])
        resolve()
      })
    },
    // 获取用户相关信息
    getUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        Promise.all([queryUser(), getResource()]).then(result=>{
          let ures = result[0], rres = result[1]
          if(200 == ures.status && 200 == rres.status){
            let udata = ures.data.data, rdata = rres.data.data
            let buttons = _(rdata.buttons).chain().map(_.property('resourceCode')).value(), 
                menus = _(rdata.menus).chain().map(_.property('resourceCode')).value(),
                tabs = _(rdata.tabPages).chain().map(_.property('resourceCode')).value()
            commit('setAvatar', '')
            commit('setUserName', udata.userName)
            commit('setUserId', udata.jobNum)
            commit('setAccess', _.concat(buttons, menus, tabs))
            commit('setHasGetInfo', true)
            
            commit('setRouters', rdata.menus)
            // 解决页面刷新store重载造成的页面暂无权限问题
            setSessionRouters(rdata.menus)

            resolve(udata)
          }else{
            reject()
          }
        }).catch(e=>{
          reject(e)
        })
      })
    },
    setTargetRoute({ commit }, route) {
      commit('setTargetRoute', route)
    },
  }
}
