<template>
  <sf-container>
    <template slot="sel-1">
      <Row class="searchLine">
        <Col span="2"><span class="titleClass">{{'订单号'|translate}}</span></Col>
        <Col span="4">
          <sf-muti-input
          v-model="queryParam.orderIds"></sf-muti-input>
        </Col> 
        <Col span="2"><span class="titleClass">{{'订单状态'|translate}}</span></Col>
        <Col span="4">
          <Select v-model="queryParam.orderStatus">
            <Option value="">全部</Option>
            <Option v-for="status in ORDER_STATUS" :key="status.value" :value="status.value">{{status.label}}</Option>
          </Select>
        </Col> 
        <Col span="2"><span class="titleClass">{{'是否有留言'|translate}}</span></Col>
        <Col span="4">
          <Select v-model="queryParam.hasMessage">
            <Option value="">全部</Option>
            <Option value="0">否</Option>
            <Option value="1">是</Option>
          </Select>
        </Col> 
        <Col span="2"><span class="titleClass">{{'是否默认'|translate}}</span></Col>
        <Col span="3">
          <Select v-model="queryParam.isDefault">
            <Option value="">全部</Option>
            <Option value="0">否</Option>
            <Option value="1">是</Option>
          </Select>
        </Col> 
        <Col span="2"><span class="titleClass">{{'评价类型'|translate}}</span></Col>
        <Col span="4">
          <Select v-model="queryParam.appraiseType">
            <Option value="">全部</Option>
            <Option v-for="type in APPRAISAL_TYPE" :key="`t-${type.value}`" :value="type.value">{{type.label}}</Option>
          </Select>
        </Col> 
        <Col span="2"><span class="titleClass">{{'评价类别'|translate}}</span></Col>
        <Col span="4">
          <Select v-model="queryParam.appraiseCategory">
            <Option value="">全部</Option>
            <Option v-for="type in APPRAISAL_GATE" :key="`t-${type.value}`" :value="type.value">{{type.label}}</Option>
          </Select>
        </Col> 
        <Col span="2"><span class="titleClass">{{'评价时间'|translate}}</span></Col>
        <Col span="6" class="picker-type-combin">
          <Select v-model="queryParam.orderType"  style="width: 30%;" @on-change="orderTypeChange">
            <Option :value="1">近三天</Option>
            <Option :value="0">历史</Option>
          </Select>
          <DatePicker :value="datetime" type="daterange" 
            @on-change="datePickerChange"
            format="yyyy-MM-dd" 
            placeholder="生效日期" 
            :editable="false" :options="pickerOptions" style="width: 70%"/>
        </Col>
        <Col span="2"></Col>
        <Col span="2"><span class="titleClass">{{'评价人'|translate}}</span></Col>
        <Col span="4">
          <Input v-model="queryParam.appraiseId" />
        </Col> 
        <Col span="2"><span class="titleClass">{{'被评价人'|translate}}</span></Col>
        <Col span="4">
          <Input v-model="queryParam.appraisedId" />
        </Col> 
        <Col span="4" class="query">
          <Button type="primary" @click="search">{{'查询'|translate}}</Button>
          <Button @click="reset"> {{'重置'|translate}}</Button>
        </Col>
      </Row>
    </template>
    <template slot="sel-2">
      <sf-table
        :loading="loading"
        :current="current"
        :pageSize="pageSize"
        :columns="columns"
        :data="data"
        :total="total"
        @on-change="onchange($event)"
        @on-page-size-change="onpagesizechange($event)">
        <template slot-scope="{row, column, index}" slot="rate">
          <div class="rates">
            <p><Rate disabled :value="row.appraiseDimension1|toNumber"></Rate></p>
          </div>
        </template>
    </sf-table>
    </template>
  </sf-container>
</template>
<script>
  import Vue from 'vue'
  import * as moment from 'moment'
  import { today as getToday, dateFmt } from '@/utils/date-utils'
  import { queryAppraisalList } from '@/api/order'
  import SfMutiInput from '_c/sf-muti-input'
  // 订单状态
  const ORDER_STATUS = [{label: '交易完成', value: 1},{label:'交易取消', value: 2}]
  // 评价类别
  const APPRAISAL_GATE = [{label: '交易评价', value: 1},{label: '售后服务评价', value: 2},{label: '客户经理评价', value: 3}]
  // 评价类型
  const APPRAISAL_TYPE = [{label: '卖方对买方', value: 1},{label: '买方对卖方', value: 2},{label: '卖方对售后', value: 3},{label: '买方对售后', value: 4},{label: '卖方对客户经理', value: 5},{label: '买方对客户经理', value: 6}]
  export default {
    name: 'OrderAppraisalList',
    components: {SfMutiInput},
    data(){
      return {
        ORDER_STATUS,
        APPRAISAL_TYPE,
        APPRAISAL_GATE,
        datetime:[null,null],
        queryParam: {
          orderType: 1,
          orderIds: [],
          appraiseCategory: null,
          appraiseType: null,
          hasMessage: null,
          isDefault: null,
          orderStatus: null,
          startTime: null,
          endTime: null,
          appraisedId:null,
          appraiseId:null
        },
        tmp:{},
        loading: false,
        current: 1,
        pageSize: 10,
        columns: [],
        data: [],
        total: 0
      }
    },
    mounted(){
      this.timeRangeInit()
      this.columns=[
        {
          title: '订单号',
          key: 'orderId',
          width: 120
        },
        {
          title: '评价类别',
          render(h, data){
            return h('span', Vue.filter('getProperty')(APPRAISAL_GATE, data.row.appraiseCategory))
          },
          width: 110
        },
        {
          title: '评价类型',
          render(h, data){
            return h('span', Vue.filter('getProperty')(APPRAISAL_TYPE, data.row.appraiseType))
          },
          width: 120
        },
        {
          title: '打分',
          slot: 'rate',
          width: 180
        },
        {
          title: '评价人',
          key: 'appraiseId',
          width: 120
        },
        {
          title: '被评价人',
          key: 'appraisedId',
          width: 120
        },
        {
          title: '交易号',
          key: 'tradeNo',
          width: 180
        },
        {
          title: '异常工单号',
          key: 'exceptionId',
          width: 140
        },
        {
          title: '评价描述',
          key: 'appraiseDesc',
          width: 140
        },
        {
          title: '评价时间',
          key: 'appraiseTime',
          width: 150
        },
        {
          title: '是否默认',
          render(h, data){
            return h('span', 1==data.row.isDefault?'是':'否')
          },
        }
      ]
      this.$nextTick(this.search)
    },
    methods: {
      timeRangeInit(){
        let date = getToday()
        this.datetime=[dateFmt({date, offsetDay: -2}), dateFmt({date, fix: true})]
      },
      orderTypeChange(){
        let orderType = this.queryParam.orderType
        if(1 == orderType){
          this.timeRangeInit()
        }else{
          this.datetime =[null, null]
        }
      },
      datePickerChange($v){
        this.datetime = $v
      },
      search(){
        this.current = 1
        this.tmp = _.cloneDeep(this.queryParam)
        this.query()
      },
      query(){
        this.loading = true
        let tmp = _.cloneDeep(this.tmp)
        tmp.pageNum = this.current
        tmp.pageSize = this.pageSize
        queryAppraisalList(tmp).then(res=>{
          this.loading = false
          if(0 == res.data.code&&!!res.data.data){
            this.data = res.data.data.list
            this.total = res.data.data.total
          }else{
            this.data = []
            this.total = 0
          }
        }).catch(e=>{
          this.loading = false
          this.data = []
          this.total = 0
          this.$Message.info(e.data.msg)
        })
      },
      reset(){
        this.queryParam = {
          orderIds: [],
          appraiseCategory: null,
          appraiseType: null,
          hasMessage: null,
          isDefault: null,
          orderStatus: null,
          appraisedId:null,
          appraiseId:null
        }
        this.timeRangeInit()
        this.search()
      },
      // toDetail(row){
      //   this.$router.push({
      //     path: `/order/detail/${row.appraisedId}/${row.orderId}`,
      //     props: true
      //   })
      // },
      onchange(event){
        this.current = event
        this.query()
      },
      onpagesizechange(event){
        this.current = 1
        this.pageSize = event
        this.query()
      },
    },
    filters: {
      toNumber(str){
        let num = Number(str)
        return isNaN(num)?0:num
      }
    },
    computed: {
      pickerOptions(){
        let day = Date.now(), gap = moment(day).add(-3, 'd')
        if(1 == this.queryParam.orderType){
          return {
            disabledDate: date=>{
              return date && (date.valueOf() > day || date.valueOf() < gap);
            }
          }
        }else{
          return {
            disabledDate: date=>{
              return date && (date.valueOf() > gap);
            }
          }
        }
      }
    },
    watch: {
      datetime(nv){
        this.queryParam.startTime = nv[0]?dateFmt({date: nv[0]}):null
        this.queryParam.endTime = nv[1]?dateFmt({date: nv[1], fix: true}):null
      }
    }
  }
</script>
<style lang="less" scoped>
  .rates>p{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .rates>p::before{
    width: 100px;
  }
  .picker-type-combin{
    border: 1px solid #dcdee2;
    border-radius: 4px;
    padding: 0 !important;
    box-sizing: content-box;
    /deep/ *{
      border: 0;
      &.ivu-select{
        border-right: 1px solid #dcdee2;
      }
    }
    
  }
</style>