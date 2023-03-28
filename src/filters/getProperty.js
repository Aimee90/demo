import * as _ from 'lodash'

let iteratable = o => {
  return Array.isArray(o)
}

export default function getProperty(o, hitv, ...[prop = "label", hitp = "value"]){
  if(!prop||0 == o.length) return ''; 
  if(iteratable(o)){
    if(undefined == hitv){// 获取数组中对象的某一个属性值集合
      return _.map(o, _.property(prop))
    }else if(iteratable(hitv)){
      let hits = _.filter(o, item=>hitv.indexOf(item[hitp])>=0)
      return _.map(hits, _.property(prop))
    }else{// 获取数组中属性hitp=hitv的对象的某个属性值
      let hitIndex = _(o).chain().map(_.property(hitp)).value().findIndex(item=>hitv == item)
      return _(o[hitIndex]).chain().get(prop).value()
    }
  }
  // 获取对象中某一个属性值
  return _(o).chain().get(prop).value()
};
