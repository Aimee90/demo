import { invoke } from '@/libs/util'
import { getProp } from '@/view/social/columns'
import * as statics from '@/view/social/statics'
import * as $api from '@/api/member/social'
import { PersistencePool } from '@/libs/util'
/**
 * API统一调用
 * @param {*} fn 
 * @param {*} data 
 */
export const $sendRequest = (fn, data) => invoke.call($api, fn, data)
/**
 * 获取所有礼物
 * @param {*} params 
 */
export function getWeapons(params={}){
  this.weaponPersistence = new PersistencePool($sendRequest.bind(this, 'weaponKindList', params))
  return new Promise(resolve=>{
    this.weaponPersistence.getData().then(res=>{
      resolve(res.collectionData||[])
    }).catch(msg=>{
      resolve([])
    })
  })
}
/**
 * 获取默认的
 */
export const getDefault = (isItem=false)=>{
  let getItem = ()=> {
    return {
      _rkey: generateKey(),
      isNew: true,
      weaponId: null,
      num: 1
    }
  }
  return isItem?getItem():{
    id: null,
    collectionName: null,
    collectionDetailList: [
      getItem()
    ]
  }
}

const delRequest = id => $sendRequest('propertyDel', {id})
const updateRequest = data => $sendRequest('propertyUpdate', data)
const addRequest = data => $sendRequest('propertyAdd', data)
const generateKey = ()=> Math.floor(Math.random()*1E8)
// 数据处理
let handler = {
  __persists: null,
  __ts: {},
  /**
   * 新增
   */
  doAdd(index){
    if(undefined!==index){
      this.data[index].collectionDetailList.push(getDefault(true)) 
    }else{
      this.data.unshift(getDefault())
    }
    return Promise.resolve(this.data)
  },
  /**
   * 编辑
   */
  doEdit(index, itemIndex){
    if(undefined===index) return
    if(undefined===itemIndex){
      // 编辑礼物包
      this.data[index].__editable = 1
    }else{
      //  编辑单个礼物
      this.data[index].collectionDetailList[itemIndex].__editable = 1
    }
    return Promise.resolve(this.data)
  },
  /**
   * 删除
   */
  doDel(index, itemIndex){ 
    if(undefined===index) return
    if(undefined===itemIndex) {
      // 删除整个礼物包
      // 调用删除接口
      return delRequest(this.data[index].id)
    }else{
      // 删除单个礼物
      // 在当前礼物包中删除单个礼物
      // 若当前礼物包只有单个礼物 则删除整个礼物包
      // 调用礼物包更新接口
      this.data[index].collectionDetailList.splice(itemIndex, 1)
      return 0 == _.size(this.data[index].collectionDetailList)?delRequest(this.data[index].id):updateRequest(this.data[index])
    }
  },
  /**
   * 取消编辑
   */
  doCancel(index, itemIndex){
    if(undefined===index) return
    if(undefined===itemIndex){
      // 取消当前礼物包的编辑状态
      // 当前礼物礼物包为新增，将其从数据列表中删除
      // 当前礼物包非新增，将其数据恢复初始
      if(null==this.data[index].id){
        this.data.splice(index, 1)
      }else{
        let ndata = this.data[index]
        ndata.__editable = 0
        _.assign(ndata, {collectionDetailList: _.filter(ndata.collectionDetailList, o=>!o.isNew)})
      }
    }else{
      // 取消当前礼物的编辑状态
      // 当前礼物为新增，则将其从礼物包中删除，若删除当前礼物后礼物包内礼物数量为0，则删除整个礼物包
      // 若礼物非新增，则置状态为非编辑将数据恢复
      if(this.data[index].collectionDetailList[itemIndex].isNew){
        this.data[index].collectionDetailList.splice(itemIndex, 1)
        0==_.size(this.data[index].collectionDetailList)&&this.data.splice(index, 1)
      }else{
        this.data[index].collectionDetailList[itemIndex].__editable = 0
      }
    }
    return Promise.resolve(this.data)
  }, 
  /**
   * 保存
   * @param {*} data 
   */
  doSave(data){
    return null===data.id?addRequest(data):updateRequest(data)
  },
  /**
   * 数据缓存
   * @param {*} k 
   * @param {*} v 
   */
  setTemporary(k, f, v){
    this.__ts = _.assign(this.__ts, _.set({}, `${k}-${f}`, v))
  },
  /**
   * 
   * @param {*} k 
   * @param {*} f 
   */
  getTemporary(key){
    return _.reduce(this.__ts, (summ, v, k)=>{
      let [rk, field] = k.split('-')
      return key==rk?_.assign(summ, _.set({}, field, v)):summ
    }, {})
  },
  /**
   * 
   * @param {*} key 
   */
  clearTemporary(key){
    if(undefined === key){
      this.__ts = {}
    }else{
      this.__ts = _.reduce(_.cloneDeep(this.__ts), (summ, v, k) => {
        let [rk] = k.split('-')
        return key!=rk?_.assign(summ, _.set({}, k, v)):summ
      }, {})
    }
  },
  /**
   * 数据处理
   */
  handle(data){
    let inc = 0 
    undefined == data&&(data = _.cloneDeep(this.data))
    return _.reduce(data, (summ, item, __index)=>{
      return _.concat(summ, _.map(item.collectionDetailList, (o, itemIndex)=>{
        let _rkey = o._rkey
        let tmp = this.getTemporary(_rkey) 
        let __editable = (null==item.id||item.__editable)?1:(o.isNew||o.__editable)?2:  0 
        let weaponId = __editable?tmp.weaponId||o.weaponId:o.weaponId,
            num = __editable?tmp.num||o.num:o.num,
            weaponName = getProp(statics.WEAPONS, weaponId),
            weaponType = getProp(statics.WEAPONS, weaponId, 'type')||tmp.weaponType,
            weaponTypeName = getProp(statics.WEAPON_TYPES, weaponType)
        
        return _.assign(null, o, {
          id: item.id,
          collectionName: item.collectionName||tmp.collectionName,
          _rkey,
          weaponId,
          weaponName,
          weaponType,
          weaponTypeName,
          num,
          __editable,
          __index,
          __itemIndex: inc++,
          __detailIndex: itemIndex,
          __merge: itemIndex==0,
          __mergeNum: _.size(item.collectionDetailList)
        })
      }))
    }, [])
  }
}
Object.defineProperty(handler, 'data', {
  get(){
    return this.__persists
  },
  set(v){
    this.__persists = _.reduce(v, (summ, o)=>{
      let collectionDetailList = o.collectionDetailList
      summ.push(_.assign(o, {collectionDetailList: _.map(collectionDetailList, item=>_.assign(item, {_rkey: generateKey()}))}))
      return summ
    }, [])
  }
})
export { handler }