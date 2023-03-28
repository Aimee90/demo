import * as _ from 'lodash'
import store from '@/store'
import { hasOneOf } from '@/libs/tools'
export default {
  inserted(el, binding, vnode){
    let value=binding.value;
    if(value==null)return;
    if(!Array.isArray(value)){
      value=[value];
    }
    if(!hasOneOf(store.state.user.access,value)){
      if(el.classList.contains('ivu-tabs-tabpane')){
        let $el = el.__vue__, 
            elName = $el.currentName, 
            $parent = $el.$parent
        el.__vue__.$destroy()
        el.parentNode.removeChild(el)
        if(elName == $parent._data.activeKey){
          let tabs = $parent.getTabs(), activeKey = tabs.length>0?tabs[0].currentName:-1
          $parent._data.activeKey = activeKey
          $parent.$emit('input', activeKey);
        }
      }else{
        el.classList.add("access-none");
      }
    }
  }
}