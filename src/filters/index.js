import {formatDate} from './format'
import getProperty from './getProperty'
import i18n from '@/locale'
const importFilters = Vue => {
  Vue.filter('formatDate', (time, fmt) => {
    return formatDate(new Date(Number(time)), fmt)
  })
  Vue.filter('getProperty', (prop, o, hitp, hitv) => {
    return getProperty(prop, o, hitp, hitv)
  })
  Vue.filter('translate', (key) => {
    return key;//i18n.t(key);
  })
  Vue.filter('toString', (arr, split="、") =>{
    if(!Array.isArray(arr)||arr.length==0) return ''
    return arr.join(split)
  })
}

export default importFilters
