<template>
  <div class="order__info-block">
    <Row>
      <Col span="8"><div label-title="订单号" :title="orderId"><span>{{orderId}}</span></div></Col>
      <Col span="8"><div label-title="订单状态">{{...[TRADE_STATUS,data.tradeStatus,`text`]|getProperty}}</div></Col>
      <Col span="8"><div label-title="发布时间">{{data.publishTime|formatDate}}</div></Col>
      <Col span="8"><div label-title="票号">{{data.ticketNo}}</div></Col>
      <!-- <Col span="8"><div label-title="发布方式">&nbsp;</div></Col> -->
      <Col span="8"><div label-title="到期日">{{...[data.endTime, `yyyy-MM-dd`]|formatDate}}</div></Col> 
      <Col span="8"><div label-title="审核员">{{data.auditor}}</div></Col>
      <!-- <Col span="8"><div label-title="跟单员">&nbsp;</div></Col> -->
      <Col span="8"><div label-title="票面金额(万元)">{{data.ticketPrice}}</div></Col>
      <Col span="8"><div label-title="支付渠道">{{...[PAY_PASS_TYPE,ticketPaypass]|getProperty}}</div></Col>
      <Col span="8"><div label-title="承兑人">{{data.bankName}}</div></Col>
      <!-- <Col span="8"><div label-title="承兑人类型">&nbsp;</div></Col> -->
      <Col span="8"><div label-title="承兑人开户行行号">{{data.bankNo}}</div></Col>
      <Col span="8"><div label-title="电票所在户">{{data.signBankName}}</div></Col>
      <Col span="8"><div label-title="瑕疵情况">{{...[FLAW_STATUS, data.flawStatus]|getProperty}}</div></Col>
      <Col span="8"><div label-title="瑕疵描述">{{data.flawNote}}</div></Col>
      <Col span="8"><div label-title="背书次数">{{data.endorseStatus}}</div></Col>
      <Col span="8"><div label-title="签收户">{{data.signName||''}}</div></Col>
      <Col span="8"><div label-title="回款户"><span>{{data.returnMoneyAccount||''}}</span></div></Col>
      <Col span="8"><div label-title="付款户">{{data.payMoneyAccount||''}}</div></Col>
      <Col span="8"><div label-title="报价方式">{{quotationMethod}}</div></Col><!--【每十万扣息：1000元】-->
      <Col span="8"><div label-title="保证金(元)">{{data.defaultAmount}}</div></Col>
      <Col span="8"><div label-title="卖家名称">{{data.sellerName}}</div></Col>
      <Col span="8"><div label-title="买家名称">{{data.BuyName||''}}</div></Col>
      <Col span="8"><div label-title="客户经理（卖）">{{data.clientManagerSell}}</div></Col>
      <Col span="8"><div label-title="客户经理（买）">{{data.clientManagerBuy}}</div></Col>
      <Col span="8"><div label-title="价格">&nbsp;</div></Col><!--每10万扣息1000/年息4.0909%-->
      <Col span="8"><div label-title="成交金额（元）">{{data.totalPrice}}</div></Col>
      <Col span="8"><div label-title="平台服务费（元）">{{data.ServiceF||data.buyerServiceFee}}</div></Col>
      <Col span="8"><div label-title="同城豆抵扣（元）">&nbsp;</div></Col>
      <Col span="8"><div label-title="优惠券使用">&nbsp;</div></Col>
      <Col span="8"><div label-title=" ">&nbsp;</div></Col>
      <Col span="8"><div label-title=" ">&nbsp;</div></Col>

      <Col span="24">
        <div label-title="票据图片">
          <span label-title="正面图片" v-for="img in data.frontImageUrlList" :key="img.resourceId" >
            <img :src="img.imageUrl" @click="showImg(img.imageUrl)"/>
          </span>
          <span label-title="背面图片" v-for="img in data.backImageUrlList" :key="img.resourceId" >
            <img :src="img.imageUrl" @click="showImg(img.imageUrl)"/>
          </span>
        </div>
      </Col>
    </Row>
  </div>
</template>
<script>
  import { getOrderDetail } from '@/api/order'
  import { TRADE_STATUS, FLAW_STATUS, PAY_PASS_TYPE } from '@/libs/enumerations'
  export default {
    name: 'orderDetail',
    data(){
      return {
        TRADE_STATUS,
        FLAW_STATUS,
        PAY_PASS_TYPE,
        orderId: null,
        userId: null,
        data: {}
      }
    },
    mounted(){
      this.orderId = this.$route.params.id
      this.userId = this.$route.params.userId
      this.getDetail()
    },
    methods: {
      getDetail(){
        let param = {
          orderType: 1,
          userId: this.userId,
          orderId: this.orderId
        }
        getOrderDetail(param).then(res=>{
          if(0 == res.data.code){
            this.data = res.data.data
          }
        })
      },
      showImg(url){
        this.$Modal.info({
          width: 706,
          scrollable: false,
          okText: '关闭',
          render: h=>{
            return h('img',{
              attrs: {
                src: url
              },
              style: {
                width: '668px',
                height: '500px'
              }
            })
          }
        })
      }
    },
    computed: {
      ticketPaypass(){
        let payPass = this.data.ticketPaypass||'0'
        return payPass.split('|')
      },
      flawInfo(){
        return _.isEmpty(this.data.flawDescription)?{}:JSON.parse(this.data.flawDescription)
      },
      buyerName(){
        return this.data.buyerName||''
      },
      //报价方式
      quotationMethod(){
        const QUOTATION_METHOD = ['每十万扣息','年化+手续费', '直扣', '年化+手续费+延期天数']
        return QUOTATION_METHOD[this.data.quotationMethod]||''
      }
    }
  }
</script>
<style lang="less" scoped>
  @import './detail-info.less';
</style>