<template>
  <div class="sf-tab-simple" ref="tableContainer">
    <slot name="actions-1"></slot>
    <Table 
      ref="simpleTable"
      :columns="ncolumns" 
      :data="data" 
      :loading="loading" 
      :row-key="rowKey" 
      :no-data-text="noData" 
      :span-method="spanMethod" 
      :load-data="loadData"
      :row-class-name="rowClassName"
      :disabled-hover="disabledHover" border >
      <template v-for="item in slotColumn" :slot="item.slot" slot-scope="{row,column,index}">
        <slot :name="item.slot" :row="row" :column="column" :index="index"></slot>
      </template>
    </Table>
    <div class="pager" v-if="showPager&&total>0" ref="pager" style="margin-bottom: 10px">
      <div class="left">
        <Select :value="pageSize" style="width:60px;margin-right: 5px" size="small"
            @on-change="onpagesizechange($event)">
          <Option v-for="item in pageSizeOptions" :value="item" :key="item">{{ item }}</Option>
        </Select>
        <Page
          simple
          @on-change="onchange($event)"
          @on-page-size-change="onpagesizechange($event)"
          :current="current" :total="total" :page-size="pageSize" :show-elevator="showElevator" show-sizer show-total/>
      </div>
      <div class="right">
        {{'显示从'|translate}}{{FromPager}}{{'到'|translate}}{{EndPager}}，{{'总'|translate}}{{total}}{{'条'|translate}}，{{'每页显示：'|translate}}{{pageSize}}
      </div>
    </div>
    <slot name="tips"></slot>
    <slot name="actions-2"></slot>
  </div>
</template>
<script>
  import {char2Unicode, unicode2Char} from '@/libs/util'
  import * as _ from 'lodash'
  export default {
    name: 'SfTableSimple',
    props: {
      columns: {
        type: Array,
        default: ()=>new Array()
      },
      data: {
        type: Array, 
        default: ()=>new Array()
      },
      current: {
        type: Number,
        default: 1
      },
      total: {
        type: Number,
        default: 0
      },
      showHead: {
        type: Boolean,
        default: false
      },
      showFoot: {
        type: Boolean,
        default: false
      },
      showTip: {
        type: Boolean,
        default: false
      },
      showPager: {
        type: Boolean,
        default: false
      },
      emptyText: {
        type: String,
        default: '暂无数据'
      },
      loading: {
        type: Boolean,
        default: false
      },
      rowKey: {
        type: String,
        default: 'id'
      },
      pageSize: {
        type: Number,
        default: 10
      },
      disabledHover: {
        type: Boolean,
        default: false
      },
      loadData: {
        type: Function,
        default: ()=>{}
      },
      spanMethod: {
        type: Function,
        default: ()=>{}
      },
      rowClassName: {
        type: Function,
        default: ()=>{}
      },
      showElevator: {
        type: Boolean,
        default: true
      },
      minHeight: {
        type: Number,
        default: null
      }
    },
    data(){
      return{
        pageSizeOptions: [10, 15, 30, 50, 100, 200]
      }
    },
    methods: {
      onchange($event){
        this.$emit('on-change', $event)
      },
      onpagesizechange($event){
        this.$emit('on-page-size-change', $event)
        this.$refs.tableContainer.parentNode.scrollTop = 0
      },
      setHeight(){
        let cminHeight = this.minHeight
        if(null === cminHeight){
          let clientHeight = document.body.clientHeight
          let boundingClientRect = this.$refs.simpleTable.$el.getBoundingClientRect()
          let elTop = Math.max(boundingClientRect.top, 100)
          cminHeight = clientHeight-elTop-46
        }
        this.$refs.simpleTable.$el.style.minHeight = `${cminHeight}px`
      }
    },
    computed: {
      ncolumns(){
        return _.map(this.columns, o=>_.assign(o, {tooltip: false}))
      },
      slotColumn() {
        return this.ncolumns.filter(item => item.slot)
      },
      FromPager() {
        return (this.current - 1) * this.pageSize + 1
      },
      EndPager() {
        let page = (this.current - 1) * this.pageSize + this.pageSize
        return page > this.total ? this.total : page
      },
      noData() {
        if (this.loading) {
          return ''
        } else {
          return this.emptyText
        }
      }
    },
    mounted(){
      this.setHeight()
    },
    updated(){
      this.setHeight()
    }
  }
</script>
<style lang="less" scoped>
  @import './sf-table-simple.less';
</style>