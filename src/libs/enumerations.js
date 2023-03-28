// 发放途径
export const COUPON_SEND_TYPE = [
  {label: '系统发放', value: 1},
  {label: '客维发放', value: 3},
  {label: '自主购买', value: 5},
  {label: '新手奖励', value: 6},
  {label: '交易行为奖励', value: 7},
  {label: '商城兑换', value: 8},
  {label: '会员礼遇', value:9}, 
]
// 有效期类型
export const COUPON_EXPIRE_TYPE = [
  {label: '设定固定天数', value: 1},
  {label: '设定失效日期', value: 2},
]
export const EXTRA_EXPIRE_TYPE = [
  {label: '设定固定天数', value: 1},
  {label: '设定截止日期', value: 2},
]
// 券类型  过期常量 请使用"ENUMS.getAllKinds()"
export const COUPON_TYPE = [
  {label: '议价券', value: 1},
  {label: '高级数据券', value: 3},
  {label: '返豆券', value: 10},
  {label: '返现券', value: 11},
  {label: '奖励券', value: 12},
  {label: '成交奖励券', value: 13}, 
  {label: '充豆优惠券', value: 14}, 
  {label: '购物优惠券', value: 17}, 
  {label: '刷新券', value:7}, 
  {label: '额外奖励券', value: 19}, 
  // {label: '通道券', value: 4},
  // {label: '满减券', value: 5}
]
// 券分类
export const COUPON_TYPE_GROUPS = [
  {label: '功能券', value: [1, 3], category: 'func', type: 2, sort: 1, load: true},
  {label: '交易券', value: [10, 11], category: 'trade',type: 1, sort: 0, load: true},
]
// 适用范围
export const USE_SCOPE = [
  {label: '商票', value: 1},
  {label: '银票', value: 2},
  {label: '财票', value: 3}
]
export const PAY_CHANNELS = [
  // {label: '兴业', value: 1},
  {label: '苏宁', value: 2},
  // {label: '宝付', value: 3},
  // {label: '亿联', value: 4},
  {label: '天金登', value: 5},
  {label: '富民', value: 7},
  {label: '苏宁银行', value: 8},
  {label: '支付宝', value: 6},
  {label: '新网', value: 9},
]
export const INVEST_CHANNELS = [
  {label: '苏宁', value: 2},
  {label: '支付宝', value: 6},
]
// 券状态
export const COUPON_STATUS = {
  1: "未使用", 
  2: "部分使用",
  3: "已使用",
  4: "已过期"
}
export const RESP_CODE = {
  SUCC: '0',
  ERROR: '-1'
}
export const EXPIRE_TYPE = {
  BY_DAY: '1',
  BY_TIME: '2'
}
/***
 * 奖励类型标签
 */
export const REWARD_LABEL=[
  {label:'效率A', value:'user_efficiency_A', sort: '1'},
  {label:'效率B', value:'user_efficiency_B', sort: '2'},
  {label:'效率C', value:'user_efficiency_C', sort: '3'},
  {label:'效率AB', value:'user_efficiency_AB', sort: '4'},
  {label:'信誉A', value:'user_credit_A', sort: '5'},
  {label:'信誉B', value:'user_credit_B', sort: '6'},
  {label:'信誉C', value:'user_credit_C', sort: '7'},
  {label:'信誉AB', value:'user_credit_AB', sort: '8'}
]

/**
 * 参照交易量
 */
export const REFERENCES =[{label: '计算参照数X',value: 'base_clc_x'}]


// 订单侧-订单状态
export const TRADE_STATUS = [
  {code: 'UN_BIDDED',value: -1 , label: '未中标', text: '未中标'},
  {code: 'BIDDING', value: 1, label: "竞价中", text: "待接单"},
  {code: 'CONFIRM_TRANSACTION', value: 2, label: "确认交易", text: "待确认"},
  {code: 'PAYMENT_FREEZE', value: 4, label: "支付冻结", text: "待打款"},
  {code: 'TICKET_HOLDER_ENDORSES', value: 8, label: "持票人背书", text: "待背书"},
  {code: 'CANCEL_CONFIRMATION', value: 10, label: "取消确认", text: "取消确认"},
  {code: 'REFUSE_TO_CANCEL', value: 11, label: "拒绝取消", text: "拒绝取消"},
  {code: 'SIGN_FOR_THAWING', value: 16, label: "签收解冻", text: "待签收"},
  {code: 'BANK_VERIFICATION', value: 32, label: "银行校验", text: "待校验"},
  {code: 'BANK_VERIFICATION_ENDORSES', value: 40, label: "待背书取消银行校验", text: "待校验"},
  {code: 'BANK_VERIFICATION_CONFIRMATION', value: 42, label: "取消确认银行校验", text: "待校验"},
  {code: 'BANK_VERIFICATION_SIGN',value: 48, label: "待签收取消银行校验", text: "待校验"},
  {code: 'TRANSACTION_COMPLETED', value: 64, label: "交易完成",text: "交易完成"},
  {code: 'ALL_CANCEL', value: 65, label: "所有取消交易", text: "所有取消交易"},
  {code: 'TRANSACTION_FAILURE',value: 128,label: "交易失败",text: "交易取消"},
  {code: 'TRANSACTION_FAILURE_ENDORSES',value: 136,label: "待背书取消",text: "交易取消"},
  {code: 'TRANSACTION_FAILURE_CONFIRMATION',value: 138,label: "取消确认取消",text: "交易取消"},
  {code: 'TRANSACTION_FAILURE_SIGN',value: 144,label: "待签收取消",text: "交易取消"},
  {code: 'TERMINATION_OF_TRANSACTION',value: 256,label: "终止交易",text: "中止交易"},
  {code: 'TERMINATION_OF_TRANSACTION_BIDDING',value: 257,label: "待接单下终止交易",text: "待接单下终止交易"},
  {code: 'TERMINATION_OF_TRANSACTION_CONFIRM',value: 258,label: "待确认下终止交易",text: "待确认下终止交易"},
  {code: 'TERMINATION_OF_TRANSACTION_PAY',value: 260,label: "待打款下终止交易",text: "待打款下终止交易"},
  {code: 'TERMINATION_OF_TRANSACTION_ENDRSE',value: 264,label: "待背书下终止交易",text: "待背书下终止交易"},
  {code: 'TERMINATION_OF_TRANSACTION_BIDSIGNCANCEL',value: 266,label: "待签收资金方终止交易",text: "待签收资金方终止交易"},
  {code: 'TERMINATION_OF_TRANSACTION_UNFRESSEE',value: 272,label: "待签收下终止交易",text: "待签收下终止交易"},
  {code: 'BANK_AMOUNT_CONFIRM',value: 3,label: "银行确认额度",text: "银行锁定额度"},
  {code: 'ENTERPRISE_BILL_OF_LADING',value: 5,label: "快贴待企业提票",text: "待贴现"},
  {code: 'TICKET_FAILURE', value: 7,label: "快贴提票失败",text: "贴现失败"},
  {code: 'PENDING_SERVICE_CHARGES',value: 9,label: "待支付服务费",text: "待支付服务费"},
  {code: 'TO_BE_AUDIT',value: null, value: "没有审核通过的订单状态为null",text: "没有审核通过的订单状态为null"},
  {code: 'BANK_AMOUNT_CONFIRM_CANCEL',value: 259,label: "银行确认额度",text: "银行锁定额度"},
  {code: 'ENTERPRISE_BILL_OF_LADING_CANCEL',value: 261,label: "快贴待企业提票",text: "快贴待企业提票"},
  {code: 'TICKET_FAILURE_CANCEL',value: 263,label: "快贴提票失败",text: "快贴提票失败"},
  {code: 'PENDING_SERVICE_CHARGES_CANCEL',value: 265,label: "待支付服务费取消",text: "待支付服务费取消"}
]

//订单侧-承兑人类型
export const BANK_TYPE=[
  {label: '国股', value: 1},
  {label: '城商', value: 2},
  {label: '三农', value: 3},
  {label: '财务公司', value: 4},
  {label: '村镇', value: 6},
  {label: '外资', value: 7},
  {label: '商票', value: 8},
  {label: '大商', value: 9},
  {label: '民营', value: 10}
]

//订单侧-汇票瑕疵
export const FLAW_STATUS = [
  {label: '无瑕疵', value: '0'},
  {label: '回头', value: '1'},
  {label: '重复', value: '2'},
  {label: '质押', value: '3'},
  {label: '保证', value: '4'},
  {label: '上下不一致', value: '5'},
  {label: '其他', value: '6'},
  {label: '保理', value: '7'},
]
 
//订单侧-支付渠道
export const PAY_PASS_TYPE = [
  {code: 'XY', value: 1, label: '兴业'},
  {code: 'SU', value: 2, label: "苏宁"},
  {code: 'BF', value: 3, label: "宝付"},
  {code: 'TJD', value: 4, label: "天金登"}
]


import { queryAllKind, queryAllBasicInfos, queryAllUseRules } from "@/api/coupon-setting"
// 券包相关常量
export const ENUMS = {
  // 券包类别-全量数据
  allKinds: [],
  allBasics:[],
  allUseRules: [],
  // 获取券类型
  getCouponKind(kind){
    if(10 == kind) return '返豆券'
    else if(11 == kind) return '返现券'
    else if(4 == kind) return '交易券'
    else if(5 == kind) return '功能券'
    else if(12 == kind) return '奖励券'
    else if(13 == kind) return '成交奖励券'
    else if(14 == kind) return '充豆优惠券'
    else if(17 == kind) return '购物优惠券'
    else if(19 == kind) return '额外奖励券'
    else return (_.find(this.allKinds, o=>o.id == kind)||{}).kindName
  },
  clear(prop){
    this[prop] = []
  },
  getAllKinds(){
    let self = this
    return new Promise((resolve, reject) => {
      if(!_.isEmpty(self.allKinds)){
        resolve(self.allKinds)
      }else{
        queryAllKind().then(res => {
          let list = res.data.data||[]
          self.allKinds = list
          resolve(list)
        })
      }
    })
  },
  getAllBasics(){
    let self = this
    return new Promise((resolve, reject) => {
      if(!_.isEmpty(self.allBasics)){
        resolve(self.allBasics)
      }else{
        queryAllBasicInfos().then(res => {
          let list = res.data.data||[]
          self.allBasics = list
          resolve(list)
        })
      }
    })
  },
  getAllUseRules(){
    let self = this
    return new Promise((resolve, reject) => {
      if(!_.isEmpty(self.allUseRules)){
        resolve(self.allUseRules)
      }else{
        queryAllUseRules().then(res => {
          let list = res.data.data||[]
          self.allUseRules = list
          resolve(list)
        })
      }
    })
  }
}
