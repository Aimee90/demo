<template>
  <div class="present-pack"> 
    <search-container ref="searchCon" :search-params="paramSetting" :table-config="config" @on-search="search"></search-container>
  </div>
</template>
<script> 
  import { dateFmt } from '@/utils/date-utils' 
  import SearchContainer from '_c/sf-search-container' 
  import { $sendRequest } from '@/view/social/dataset'
  import * as statics from './statics'
  export default {
    name: 'presentRecord',
    components: {SearchContainer},
    data() {
      return { 
        tmp: {},
        config: {
          current: 1,
          pageSize: 10,
          showIndex: false,
          data: [],
          total: 0,
          columns: [
            {title: '赠送用户ID', key: 'userId'} ,
            {title: '被赠送用户ID', key: 'targetUserId'},
            {
              title: '物品',  
              render: (h, data) => h('span', this.$flts.getProperty(statics.WEAPONS, data.row.weaponId))
            },
            {
              title: '类型',
              render: (h, data)=>h('span', this.$flts.getProperty(statics.WEAPON_TYPES, data.row.weaponType))
            },
            {title: '数量', key: 'num'},
            {title: '时间', key: 'createTime'},
            {title: '订单', key: 'tradeNo'},
            {title: '备注', key: 'procedure'}
          ]
        },
      }
    },
    mounted() {
      SearchContainer.event.$on('searcher-set', v=>{
        this.$set(this.tmp, 'weaponType', v.weaponType)
      })
      SearchContainer.event.$on('searcher-reset', (cb=_.noop)=>{
        this.$refs.searchCon.setPage()
        this.$nextTick(()=>{
          _.isFunction(cb)&&cb.call(this)
        })
      })
    },
    methods: { 
      dfmt(v, fix=''){
        return `${dateFmt({date: v, fmt: 'YYYY-MM-DD'})}${fix}`
      },
      search(params){
        let [startTime, endTime] = params.timeDur||[null, null]
        !!startTime&&(startTime = this.dfmt(startTime, ' 00:00:00'))
        !!endTime&&(endTime = this.dfmt(endTime, ' 23:59:59'))
        let query = {
          ...params,
          startTime,
          endTime,
        }
        $sendRequest('presentList', _.omit(query, ['timeDur'])).then(res=>{ 
          this.$set(this.config, 'data', res.data.list)
          this.$set(this.config, 'total', res.data.total)
        }).catch(msg=>{
          this.$set(this.config, 'data', [])
          this.$set(this.config, 'total', 0) 
        })
      },
    },
    computed: {
      paramSetting(){
        let weaponType = this.tmp.weaponType||null
        return [
          {title: '赠送用户id', key: 'userId', span: 4},
          {title: '被赠送id', key: 'targetUserId'}, 
          {title: '时间', key: 'timeDur', span: 4, el: 'date-range', value: [null, null]}, 
          {title: '类型', key: 'weaponType', span: 3, el: 'select', options: {enums:_.map(statics.WEAPON_TYPES, o=>_.assign({id: o.value, label: o.label}))}}, 
          {el: '_blank', span: 1},
          {title: '物品', key: 'weaponId', span: 3, el: 'select', options: {enums: _(statics.WEAPONS).chain().filter(o=>_.isNumber(weaponType)?o.type==weaponType:true).map(o=>_.assign({id: o.value, label: o.label})).value()}},  
        ]
      }
    },
    watch: {
      'config.data': {
        deep: true,
        handler(nv){
          // console.log(nv)
        }
      }
    },
    beforeDestroy () {
      this.event.$off('searcher-reset') 
      this.event.$off('searcher-set')
    }
  }
</script>
<style style lang="less" scoped>
  .present-record {
  }
</style>
