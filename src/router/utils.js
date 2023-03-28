import * as _ from 'lodash'
import store from '@/store'

import { DEF_DATA, ROUTE_DATA } from './router-data'
import { setCustomZhCn } from '@/locale'
import { dingdingLogin } from '@/api/users'

/**
 * 钉钉登录
 * @param {*} data 
 */
export const ddingLogin = data => new Promise((resolve, reject) => {
  dingdingLogin(data).then(res=>{
    // 钉钉登录后获取返回token值
    const token = (res.headers.token||'').substr(14)
    
    // 将token塞入vuex中
    _.isEmpty(token)?reject('获取token失败'):store.dispatch('handleLogin', {token}).then(()=>{
      // 获取用户登录信息
      store.dispatch('getUserInfo').then(()=>{
        resolve()
      }).catch(e=>{
        reject('查询用户信息异常')
      })
    }).catch(e=>{
      reject('获取token异常')
    })
  }).catch(e=>{
    reject('登录异常', e)
  })
})
/**
 * 解析路由信息
 * @param {*} data 
 */
export const getRoute = data => {
  const loopMenu = (menuArr, branch="") => {
    return _(menuArr).chain().map(o => {
      let access = o.resourceCode, 
          title = o.resourceName, 
          name = o.resourceEnName,
          icon = o.icon,
          sortNo = o.sortNo,
          children = _.filter(data, _d => _d.parentId == o.id)
      let isLeaf = _.isEmpty(children)
      let menuData = ROUTE_DATA[name]||{}
      let { path, component, ...options } = menuData
      return !_.isEmpty(menuData)?{
        path,
        name,
        sortNo,
        meta: _.assign({title, icon, access: [access]}, options),
        component: component||(()=>import('@/components/main')),
        children: isLeaf?[]:loopMenu(children, path),
        _path: `${branch}/${path}`
      }:null
    }).compact().sortBy(o=>o.sortNo).value()
  } 
  // 
  let locale = _.reduce(data, (acc, o)=>{
    let name = o.resourceEnName, title = o.resourceName
    let olocale = {}
    olocale[name] = title;
    return _.isEmpty(name)?acc: _.assign(acc, olocale)
  },{})
  
  // 更新菜单名称至中文国际化文件
  setCustomZhCn(locale)

  return loopMenu(_.filter(data, o=>0==o.parentId))
}
export const getDefault = () => DEF_DATA