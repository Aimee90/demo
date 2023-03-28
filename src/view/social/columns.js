
import ToggleCell from '_c/toggle-cell'
import * as statics from '@/view/social/statics'
import cacher from './cache'
import { handler } from './dataset'
const rowEditable = row => 1 == row.__editable
const rowItemEditable = row => 1 == row.__editable||2 == row.__editable

export const getProp = (STATICS, v, prop="label") => _(STATICS).chain().find(o=>o.value==v).get(prop).value()
// 
const itemListOpCell = {
  props: ['data'],
  render(h){
    return !rowItemEditable(this.data)?(<div>
      <a onClick={this.onEvent.bind(this, 'to-edit-item')}>编辑</a>
      <a onClick={this.onEvent.bind(this, 'to-del-item')}>&nbsp;&nbsp;删除</a>
      <a onClick={this.onEvent.bind(this, 'to-add-item')}>&nbsp;&nbsp;新增</a> 
    </div>):(<div>
      <a onClick={this.onEvent.bind(this, 'do-cancel-item')} class={rowEditable(this.data)?'disabled':''}>取消</a>
      <a onClick={this.onEvent.bind(this, 'do-save-item')}  class={rowEditable(this.data)?'disabled':''}>&nbsp;&nbsp;保存</a>
      <a onClick={this.onEvent.bind(this, 'to-add-item')}>&nbsp;&nbsp;新增</a> 
    </div>)
  },
  methods: {
    onEvent(event, e){
      if(e.target.classList.contains('disabled')) return
      this.$emit('on-event', event)
    },
  }
}
// 
const packOpCell = {
  props: ['data'],
  render(h){
    return !rowEditable(this.data)?(<div>
      <a onClick={this.onEvent.bind(this, 'to-edit')}>编辑</a> 
      <a onClick={this.onEvent.bind(this, 'to-del')}>&nbsp;&nbsp;删除</a>
    </div>):(<div>
      <a onClick={this.onEvent.bind(this, 'do-cancel')}>取消</a> 
      <a onClick={this.onEvent.bind(this, 'do-save')}>&nbsp;&nbsp;保存</a>
    </div>)
  },
  methods: {
    onEvent(e){
      this.$emit('on-event',e)
    },
  }
}
export default function(){ 
  let getKey = data => data._rkey
  return [
    {title: '礼物包名称', render: (h, data)=>(
      <ToggleCell key={getKey(data)} text={data.row.collectionName} readonly={!rowEditable(data.row)}>
        <Input value={data.row.collectionName} v-on:on-change={this.changeHandler.bind(this, data.row._rkey, 'collectionName')}/>
      </ToggleCell>
    )},
    {title: '类型', render: (h, data)=>(
      <ToggleCell key={getKey(data)} text={data.row.weaponTypeName} readonly={!rowItemEditable(data.row)}>
        <Select value={data.row.weaponType} v-on:on-change={this.changeHandler.bind(this, data.row._rkey, 'weaponType')}>
          {
            _.map(statics.WEAPON_TYPES, o=><Option value={o.value}>{o.label}</Option>)
          }
        </Select>
      </ToggleCell>
    )},
    {title: '物品', render: (h, data)=>(
      <ToggleCell key={getKey(data)} text={data.row.weaponName} readonly={!rowItemEditable(data.row)}>
        <Select value={data.row.weaponId} v-on:on-change={this.changeHandler.bind(this, data.row._rkey,'weaponId')}>
          {
            _(statics.WEAPONS).chain().filter(o=>data.row.weaponType==o.type).map(o=><Option value={o.value}>{o.label}</Option>).value()
          }
        </Select>
      </ToggleCell>
    )},
    {title: '数量', render: (h, data)=>( 
      <ToggleCell key={getKey(data)} text={data.row.num} readonly={!rowItemEditable(data.row)}> 
        <InputNumber value={data.row.num} v-on:on-change={this.changeHandler.bind(this, data.row._rkey, 'num')}/>
      </ToggleCell>
    )},
    {title: '操作', render: (h, data)=>(
      <itemListOpCell key={getKey(data)} data={data.row} v-on:on-event={this.eventHandler.bind(this, data.row)}></itemListOpCell>
    )},
    {title: '操作', render: (h, data)=>(
      <packOpCell key={getKey(data)} data={data.row}  v-on:on-event={this.eventHandler.bind(this, data.row)}></packOpCell>
    )},
  ]
}