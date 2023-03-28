<template>
  <div class="present-pack"> 
    <search-container :table-config="config" @on-search="search">
      <template slot="header-btns">
        <Button type="primary" @click="add" ghost>新增</Button>
      </template>
    </search-container>
  </div>
</template>
<script>
  import { $sendRequest, getDefault } from '@/view/social/dataset'
  import Columns from '@/view/social/columns'
  import SearchContainer from '_c/sf-search-container' 

  import { getProp } from '@/view/social/columns'
  import * as statics from '@/view/social/statics'
  import * as dataset from '@/view/social/dataset'
  //
  const packItem = (data, index) => _(data).chain().filter(o=>o.__index == index).reduce((summ, o)=>{
    summ.id = o.id
    summ.collectionName = !summ.hasOwnProperty('collectionName')?o.collectionName:summ.collectionName
    let collectionDetail = {
      weaponId: o.weaponId,
      num: o.num
    }
    !summ.hasOwnProperty('collectionDetailList')?_.assign(summ, {collectionDetailList: [collectionDetail]}):summ.collectionDetailList.push(collectionDetail)
    return summ 
  },{}).value()
  export default {
    name: 'presentPack',
    components: { SearchContainer },
    data() {
      return { 
        config: {
          showIndex: false,
          border: true,
          showPager: false,
          'disabled-hover': true,
          'span-method': this.handleSpan,
          'row-class-name': this.handleRowCls,
          data: [],
          columns: []
        },
      }
    },
    mounted() {
      this.search()
      this.$nextTick(()=>{
        this.$set(this.config, 'columns', Columns.call(this))  
      })
    },
   methods: { 
      add(){
        dataset.handler.doAdd()
        this.$set(this.config, 'data', dataset.handler.handle())
      },
      changeHandler(k, field, e){
        let value = null
        if('object' === typeof e){
          value = e.target.value
        }else{
          value = e
        }
        dataset.handler.setTemporary(k, field, value)
        // 
        if('weaponType' === field){
          let data = _.find(this.config.data, o=>o._rkey == k)||{}
          _.forEach(this.config.data, o=>{
            o._rkey == k&&_.assign(o, {weaponType: value})
          })
        }
      },
      eventHandler(data, event){
        this.debounceEvent&&this.debounceEvent.cancel()
        this.debounceEvent = _.debounce(this.triggerEvent.bind(this, data, event), 50)
        this.debounceEvent()
      },
      triggerEvent(data, event){  
        let dataHandler = Promise.resolve(null);   
        switch(event){
          case 'to-edit-item': 
            dataHandler = dataset.handler.doEdit(data.__index, data.__detailIndex) 
            break;
          case 'to-del-item':  
            this.doDel(data.__itemIndex, false);
            break;
          case 'to-add-item': 
            dataHandler = dataset.handler.doAdd(data.__index)
            break;
          case 'do-cancel-item':  
            dataHandler = dataset.handler.doCancel(data.__index, data.__detailIndex)
            break;
          case 'do-save-item':
            this.doUpdate(data.__itemIndex, false);
            break;
          case 'to-edit':
            dataHandler = dataset.handler.doEdit(data.__index) 
            break;
          case 'to-del':
            this.doDel(data.__itemIndex);
            break;
          case 'do-cancel': 
            dataHandler = dataset.handler.doCancel(data.__index)
            break;
          case 'do-save':
            this.doUpdate(data.__itemIndex);
            break;
        } 

        // 数据处理
        dataHandler.then(data=>{
          null==data?this.search():this.$set(this.config, 'data', dataset.handler.handle())
        })
        // 删除或者取消 则清除该数据缓存
        const clearEvColl = ['to-del-item', 'do-cancel-item', 'to-del', 'do-cancel']
        if(clearEvColl.indexOf(event)!==-1){ 
          dataset.handler.clearTemporary(data._rkey)
        }
      },
      /**
       * 删除操作
       * obj为object类型 执行删除礼物包内礼物操作，即先删除该item, 然后整体更新礼物包
       * obj为number, 执行删除该礼物包操作
       */
      doDel(rowIndex, isPack=true){
        let {__index, __detailIndex, collectionName, weaponName} = this.config.data[rowIndex] 
        this.$modal({
          title: '确认删除',
          content: `确认删除${isPack?('礼物包【' + collectionName):('礼物【' + weaponName)}】？`,
          ok: ()=>{
            let args = isPack?[__index]:[__index, __detailIndex];
            dataset.handler.doDel(...args)
              .then(this.search)
              .catch(msg=>{
                console.log(msg) 
              })
          }
        })
      },
      /**
       * 更新操作
       * obj包含collectionDetailList属性，执行更新礼物包操作
       * obj为number, 则根据number找到对应的礼物包，然后执行更新礼物包操作
       * 否则，执行更新礼物包内礼物操作，即先更新该礼物，然后整体更新礼物包
       */
      doUpdate(rowIndex, isPack=true){
        let {__index, __detailIndex } = this.config.data[rowIndex] 
        // 数据前置处理
        let adata = _.map(_.cloneDeep(this.config.data), o=>_.assign(o, dataset.handler.getTemporary(o._rkey)))
        console.log('fix data:',adata)

        let ndata = {}

        // 数据处理
        if(isPack){
          ndata = packItem(adata, __index)
        }else{
          let detailItem = _.pick(adata[rowIndex], ['weaponId', 'num'])
          ndata = _.cloneDeep(dataset.handler.data[__index])
          ndata.collectionDetailList.splice(__detailIndex, 1, detailItem) 
        }
        // 保存数据
        dataset.handler.doSave(_.assign(ndata, {collectionDetailList: _.filter(ndata.collectionDetailList, o=>!o.isNew) })).then(()=>{
          this.$Message.info(`保存成功`)
          this.search()
        }).catch(msg=>{
          console.log(msg)
          this.$Message.warning(`保存失败 ${msg}`)
        })
      },
      /**
       * 查询礼物包
       */
      search(params){
        dataset.handler.clearTemporary()
        $sendRequest('propertyList', {}).then(res=>{  
          dataset.handler.data = res.collectionData
          this.$set(this.config, 'data', dataset.handler.handle()) 
        }).catch(msg=>{  
          console.log(msg) 
          dataset.handler.data = []
          this.$set(this.config, 'data', []) 
        }) 
      },
      /**
       * 合并表格
       */
      handleSpan({row, column, rowIndex, columnIndex}){ 
        if(columnIndex==0||columnIndex>4){
          return row.__merge?[row.__mergeNum, 1]: [0, 0]
        }
        return [1, 1]
      },
      handleRowCls(row, index){
        if(!row.__merge) return 'without-border-left'
        else return ''
      },
    },
    beforeDestroy(){
      dataset.handler.clearTemporary()()
    }
  }
</script>
<style style lang="less" scoped>
  .present-pack {
    ::v-deep .sf-query-btn{
      background-color: transparent;
      padding-bottom: 0;
      padding-left: 0;
    }
    ::v-deep .ivu-input-number-handler-wrap{
      display: none;
    }
    ::v-deep .ivu-table-border{
      .without-border-left td:first-child{
        border-left: 0;
      }
    }
  }
</style>
