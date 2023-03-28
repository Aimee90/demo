import Main from '@/components/main' 
const INTEGRAL_MALL_BASE = `@/view/tcm-mall`
 // 登录页、首页、错误页面
export const DEF_DATA = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '/404',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]

// 风控相关路由
const MRS_ROUTES = {
  // 风控管理
  "mrs_manage":{
    path:"/mrs"
  },
  // 风控配置
  "mrs_rules": {
    path: "rules",
    component: () => import('@/view/mrs/rule')
  },
  // 风控命中记录
  "mrs_hit": {
    path:"hit",
    component: () => import ('@/view/mrs/hit')
  },
  // 用户命中列表
  "mrs_hit_list":{
    path:"hit_list",
    component: () => import('@/view/mrs/hit-list')
  },
  // 风控命中明细
  "mrs_hit_detail":{
    path:"hit_detail/:userId/:day/:riskControlledType",
    component: () => import('@/view/mrs/hit-detail'),
    props: {
      userId: null,
      day: null,
      riskControlledType:null
    },
  },
  // 风控类型一览
  "mrs_hit_type":{
    path:"hit_type",
    component: () => import('@/view/mrs/hit-type')
  },
  // 风控策略配置
  "mrs_policy":{
    path:"mrs_policy",
    component: () => import('@/view/mrs/policy-setting')
  },
}
// 统计相关
const STATISTICS_ROUTES = {
  // 统计信息
  "statistics":{
    path:"/statistics",
    showAlways: true
  },
  // 操作记录
  "statistics_operate":{
    path:"/operate",
    component: () => import('@/view/statistics/operate')
  },
  // 拉新用户
  "statistics_new":{
    path:"statistics_new",
    component: () => import('@/view/statistics/pull-new')
  },
}
// 券相关路由
const COUPON_ROUTES = {
  // 券管理
  "coupon_manage":{
    path:"/coupon_manage"
  },
  // 券列表
  "coupon_list":{
    path:"list",
    component: () => import('@/view/coupon/package-setting-v2')
  },
  // 券包维护
  "coupon_edit":{
    path:"edit/:isEdit/:id",
    hideInMenu:true,
    props: {
      id: null
    },
    component: () => import('@/view/coupon/package-setting-v2/edit.vue')   
  },
  // 券包查看
  'coupon_view': {
    path: 'view/:isEdit/:id',
    hideInMenu:true,
    notCache: true,
    props: {
      id: null,
    }, 
    component: () => import('@/view/coupon/package-setting-v2/edit.vue')   
  },
  // 券包组合
  "pack_comb_setting":{
    path:"pack_comb",
    component: () => import('@/view/coupon/pack-comb-setting')
  },
  // 券包类型管理
  "coupon_type":{
    path:"type",
    component: () => import('@/view/coupon/type-manage')
  },
  // 券包基本信息管理
  "coupon_basic_info":{
    path:"basic",
    component: () => import('@/view/coupon/basic-info-tpl')
  },
  // 券包使用条件管理
  "coupon_use_condition":{
    path:"use_condition",
    component: () => import('@/view/coupon/use-condition-tpl')
  },
  // 砸蛋
  "smash_eggs": {
    path: 'smash_eggs',
    component: () => import('@/view/coupon/smash-eggs')
  },
  //用户券信息
  "used_info": {
    path: 'used_info',
    component: () => import('@/view/coupon/used-info')
  },
  //发券
  "manual": {
    path: 'manual',
    component: () => import('@/view/coupon/manual')
  },
  //当时实时监控
  "monitor": {
    path: 'monitor',
    component: () => import('@/view/coupon/monitor')
  },
  // 券使用记录
  "used_record":{
    path:"used",
    component: () => import('@/view/coupon/used-record')
  },
  // 券发放记录
  "grant_record":{
    path:"grant",
    component: () => import('@/view/coupon/grant-record')
  },
  // 领取记录
  "receive_record":{
    path:"receive_record",
    component: () => import('@/view/coupon/receive-record')
  },  
  // 自主购买
  "coupon_buy":{
    showAlways: true,
    path:"/coupon_buy"
  },
  "coupon_buy_setting":{
    path:"setting",
    component: () => import('@/view/coupon-buy/buy-setting')
  },
  // 券购买记录
  "coupon_by_record": {
    path: 'record',
    component: () => import('@/view/coupon-buy/record')
  },
}
// 方案相关路由
const PLAN_ROUTES = {
  // 发放方案
  "grant_plan":{
    path:"/grant_plan"
  },
  // 方案管理
  "scheme_setting":{
    path:"setting",
    component: () => import('@/view/scheme')
  },
  // 校正规则
  "grant_plan_rules":{
    path:"rules",
    component: () => import('@/view/coupon-grant-plan/plan-rules')
  },
  //  
  "grant_verification_rules":{
    path:"verifications",
    component: () => import('@/view/coupon-grant-plan/verification-rules')
  },
  // 排除名单
  "remove_list":{
    path:"remove",
    component: () => import('@/view/coupon-grant-plan/remove')
  },
  // 发券结果
  "coupon_result":{
    path:"send",
    component: () => import('@/view/coupon-grant-plan/send')
  },
}
// 信用分
const CREDIT_ROUTES = {
  V1: {
    // 信用分
    "credit":{
      path:"/credit/v1",
      showAlways: true, 
    },
    // 信用分公式
    "credit_formula":{
      path:"formula",
      component: () => import('@/view/credit/v1/formula')
    },
    // 信用分记录
    "credit_record":{
      path:"record",
      component: () => import('@/view/credit/v1/record')
    },
    // 信用分记录详情
    "credit_record_detail":{
      path:"detail/:userId/:date",
      hideInMenu:true,
      props: {
        userId: null,
        date: null
      },
      component: () => import('@/view/credit/v1/record/detail')
    },
    // 信用分手动调分
    "credit_score-manually": {
      path: 'manually',
      component: () => import('@/view/credit/v1/score-manually')
    },
    // 信用分数据统计
    "credit_stats": {
      path: 'stats',
      component: () => import('@/view/credit/v1/stats')
    },
    // 低信用查询
    "credit_low": {
      path: 'low',
      component: () => import('@/view/credit/v1/low-credit')
    },
  },
  V2: { 
    // 信用分
    "credit_v2":{
      path:"/credit/v2",
      showAlways: true, 
    },
    // 信用分公式
    "credit_formula_v2":{
      path:"formula",
      component: () => import('@/view/credit/v2/formula')
    },
    // 信用分记录
    "credit_record_v2":{
      path:"record",
      component: () => import('@/view/credit/v2/record')
    },
    // 信用分记录详情
    "credit_record_detail_v2":{
      path:"detail/:userId/:date",
      hideInMenu:true,
      props: {
        userId: null,
        date: null
      },
      component: () => import('@/view/credit/v2/record/detail')
    },
    // 信用分手动调分
    "credit_score-manually_v2": {
      path: 'manually',
      component: () => import('@/view/credit/v2/score-manually')
    },
    // 信用分数据统计
    "credit_stats_v2": {
      path: 'stats',
      component: () => import('@/view/credit/v2/stats')
    },
    // // 低信用查询
    // "credit_low_v2": {
    //   path: 'low',
    //   component: () => import('@/view/credit/v2/low-credit')
    // },
  } 
}
// 标签管理
const LABEL_ROUTES = {
  "label_list":{
    path:"/label_setting",
    showAlways: true
  },
  "label_setting":{
    path:"setting",
    component: () => import('@/view/label-setting/label')
  },
}
// 订单管理
const ORDER_ROUTES = {  
  "order_manage":{
    path:"/order",
    showAlways: true
  },
  // 评价记录
  "appraisal":{
    path:"appraisal",
    component: () => import('@/view/order/appraisal')
  },
  "order_detail":{
    path:"detail/:userId/:id",
    hideInMenu:true,
    component: () => import('@/view/order/detail')
  },
}
// 任务管理
const TASK_ROUTES = {
  "task_manage":{
    path:"/task"
  },
  "task_config":{
    path:"config",
    component: () => import('@/view/task-manage/config')
  },
  "task_relate":{
    path:"relate",
    component: () => import('@/view/task-manage/relate')
  },
  "task_record":{
    path:"record",
    component: () => import('@/view/task-manage/record')
  },
  "task_detail":{
    path:"detail",
    component: () => import('@/view/task-manage/detail')
  },
}
// 系统管理
const SYS_ROUTES = {
  "system_manage":{
    path:"/system"
  },
  "usr_manage":{
    path:"usr",
    component: () => import('@/view/system-manage/usr')
  },
  "role_manage":{
    path:"role",
    component: () => import('@/view/system-manage/role')
  },
  "menu_manage":{
    path:"menu",
    component: () => import('@/view/system-manage/menu')
  },
  "role_setting":{
    path:"role/setting/:roleId?",
    hideInMenu:true,
    component: () => import('@/view/system-manage/role/setting.vue')
  },
}
// 营销
const PMS_ROUTES = { 
  "_invitation": {
    path: '/_invitation',
    showAlways: true,
  },
  // 
  "invitation": {
    path: "/invitation",
    component: () => import('@/view/invitation')
  },// 营销活动管理
  'pms': {
    path: '/pms',
    component: Main,
  },
  // 活动列表
  'pms_list': {
    path: 'list',
    component: () => import('@/view/pms/list'),
  },
  // 活动查看
  'pms_view': {
    path: 'view/:isEdit/:id',
    hideInMenu:true,
    notCache: true,
    props: {
      id: null,
    }, 
    component: () => import('@/view/pms/list/edit'),
  },
  // 活动编辑
  'pms_edit': {
    path: 'edit/:isEdit/:id',
    hideInMenu:true,
    notCache: true,
    props: {
      id: null,
    }, 
    component: () => import('@/view/pms/list/edit'),
  },
  // 参与进度
  'pms_participation_schedule': {
    path: 'participation',
    component: () => import('@/view/pms/participation-schedule'),
  },
  // 活动结算明细
  'pms_settle_detail': {
    path: 'settle/detail',
    component: () => import('@/view/pms/settle-detail'),
  },
  // 用户参与明细
  'pms_participation_detail': {
    path: 'participation/detail',
    component: () => import('@/view/pms/participation-detail'),
  },
  'pms_remind':{
    path: 'remind',
    component: () => import('@/view/pms/remind'),
  }
}
// 积分商城
const INTEGRAL_MALL_ROUTES = {
  "integral": {
    path: "/integral"
  },
  // 积分商城-商品配置
  "integral_setting": {
    path: "setting",
    component: () => import(`@/view/tc-mall/setting`)
  },
  // 积分商城-商品管理
  "integral_manage": {
    path: "manage",
    component: () => import(`@/view/tc-mall/manage`)
  },
  // 积分商城-商品详情&编辑
  "integral_manage_detail": {
    path: "goods/detail/:goodsId" ,
    hideInMenu:true,
    props: {
      goodsId: 0, 
    }, 
    component: () => import(`@/view/tc-mall/manage/edit/index.vue`)
  },
  // 积分商城-订单信息
  "integral_order": {
    path: 'order',
    component: () => import(`@/view/tc-mall/order`)
  },
  // 积分商城-代办事项
  "integral_todo": {
    path: 'todo',
    component: () => import(`@/view/tc-mall/todo`)
  },
  // 积分商城专题
  "integral_subpage": {
    path: 'subpage',
    component: () => import(`@/view/tc-mall/subpage-manage`)
  },
  // 供应商基础数据
  'integral_basedata': {
    path:"/supplier",
    component: () => import(`@/view/tc-mall/supplier`)
  },
}

// 积分运营
const INTEGRAL_SCORE_ROUTES = {
  "integral_score_manage": {
    path: "/integral_score"
  },
  // 积分有效期管理
  "integral_score_validity": {
    path: 'validity',
    component: () => import(`@/view/tc-integral/validity`)
  }, 
  // 积分过期记录
  "integral_score_past": {
    path: "past",
    component: () =>import('@/view/tc-integral/past-due')
  }
}
// 城长值与会员等级
const GRADE_ROUTES = {  
  "grade": {
    path: "/grade"
  },
  // 城长值与会员等级-计分与等级
  "grade_scoring": {
    path: "scoring",
    component: () => import('@/view/user-grade/scoring')
  },
  // 城长值与会员等级-城长值记录
  "grade_record": {
    path: "record",
    component: () => import('@/view/user-grade/record')
  },
  // 城长值与会员等级-城长值继承
  "grade_inherit": {
    path: 'inherit',
    component: () => import('@/view/user-grade/inherit')
  },
  // 城长值与会员等级-手动调整等级
  "grade_adjust": {
    path: 'adjust',
    component: () => import('@/view/user-grade/adjust')
  },
  // 城长值与会员等级-勋章管理
  "grade_medal": {
    path: 'medal',
    component: () => import('@/view/user-grade/medal')
  },
  // 城长值与会员等级-数据统计
  "grade_statistics": {
    path: 'statistics',
    component: () => import('@/view/user-grade/statistics')
  },
  // 城长值记录详情
  "grade_record_detail":{
    path:"detail/:userId/:date",
    hideInMenu:true,
    props: {
      userId: null,
      date: null
    }, 
    component: () => import('@/view/user-grade/record/detail')
  },
}
// 权益
const PROFIT_ROUTES = {  
  "profit_list": {
    path: '/profit/list',
    component: () => import('@/view/user-profit/list')
  },
  // 权益模板
  "profit_temp": {
    path: '/profit/template',
    component: () => import('@/view/user-profit/template')
  },
}
// 画像
const PORTRAINT_ROUTES = {  
  // 用户画像
  'user_portrait': {
    path: '/portrait',
    component: Main,
  },
  // 标签管理
  'portrait_label': {
    path: 'label',
    notCache: true,
    component: () => import('@/view/user-portrait/label'),
  },
  // 精准画像
  'portraint_list': {
    path: 'list',
    component: () => import('@/view/user-portrait/precision-portraint/list'),
  },
  // 精准画像详情
  'portraint_detail': {
    hideInMenu:true,
    path: 'detail/:userId',
    props: {
      userId: null, 
    }, 
    component: () => import('@/view/user-portrait/precision-portraint/detail/index.vue'),
  },
  // 人群包
  'portraint_crowd_pack': {
    path: 'crowd_pack',
    component: () => import('@/view/user-portrait/crowd-pack')
  },
  // 人群包
  'portraint_crowd_pack_detail': {
    path: 'crowd_pack/detail',
    hideInMenu:true,
    props: {
      id: null, 
    }, 
    component: () => import('@/view/user-portrait/crowd-pack/detail')
  },
  'portraint_crowd_pack_edit': {
    path: 'crowd_pack/edit',
    hideInMenu:true,
    props: {
      id: null, 
    },
    component: () => import('@/view/user-portrait/crowd-pack/edit')
  },
  // 客维任务
  'portraint_customer': {
    path: 'customer',
    component: () => import('@/view/user-portrait/customer')
  },  
  // 任务执行队列
  'task_carry_list': {
    path: 'task_carry',
    component: () => import('@/view/user-portrait/task-carry/index.vue'),
  },
  'portraint_indexs_home': {
    path: 'index',
    component: () => import('@/view/user-portrait/indexs')
  },
  // 指标管理首页
  // 'portraint_indexs_home': {
  //   path: 'index',
  //   component: () => import('@/view/user-portrait/indexs/home')
  // },
  // 指标管理列表页
  'portraint_indexs_manage': {
    path: 'list',
    hideInMenu:true,
    component: () => import('@/view/user-portrait/indexs/manage')
  },
  // 客维任务
  'kw_remark': {
    path: 'remark',
    component: () => import('@/view/user-portrait/remark')
  },  
}
// 汇承画像
const HC_ROUTES = {  
  // 用户画像
  'hc_portrait': {
    path: '/hc_portrait',
    component: Main,
  },
  // 标签管理
  'hc_portrait_label': {
    path: 'label',
    notCache: true,
    component: () => import('@/view/hc-portrait/label'),
  },
  // 精准画像
  'hc_portraint_list': {
    path: 'list',
    component: () => import('@/view/hc-portrait/precision-portraint/list'),
  },
  // 精准画像详情
  'hc_portraint_detail': {
    hideInMenu:true,
    path: 'detail/:enterpriseId',
    props: {
      enterpriseId: null, 
    }, 
    component: () => import('@/view/hc-portrait/precision-portraint/detail/index.vue'),
  },
  'hc_portraint_indexs_home': {
    path: 'index',
    component: () => import('@/view/hc-portrait/indexs')
  },
  // 指标管理列表页
  'hc_portraint_indexs_manage': {
    path: 'list',
    hideInMenu:true,
    component: () => import('@/view/hc-portrait/indexs/manage')
  }, 
}
// 收票助手-额度
const QUOTA_ROUTES = {
  // 收票额度管理
  "quota_manage":{
    path:"/quota"
  },
  // 额度包配置
  "quota_pack_setting": {
    path: "pack",
    component: () => import('@/view/quota/pack-setting')
  },
  // 额度活动配置
  "quota_act_setting": {
    path: "setting",
    component: () => import('@/view/quota/act-setting')
  },
  // 额度发放记录
  "quota_grant_list": {
    path: "grant",
    component: () => import('@/view/quota/grant-list')
  },
  // 额度领取记录
  "quota_receive_list": {
    path: "receive",
    component: () => import('@/view/quota/receive-list')
  },
  // 购买记录
  "quota_sell_list": {
    path: 'sell',
    component: ()=> import('@/view/quota/sell-list')
  },
  // 额度使用记录
  "quota_use_list": {
    path: "use",
    component: () => import('@/view/quota/use-list')
  },
  // 额度直塞
  "quota_extend": {
    path: "extend",
    component: () => import('@/view/quota/extend')
  },
  // 额度活动信息
  "quota_act_edit":{
    path:"edit/:isEdit/:id",
    hideInMenu:true,
    props: {
      id: null
    },
    component: () => import('@/view/quota/act-setting/edit.vue')   
  },
  // 额度活动信息
  'quota_act_view': {
    path: 'view/:isEdit/:id',
    hideInMenu:true,
    notCache: true,
    props: {
      id: null,
    }, 
    component: () => import('@/view/quota/act-setting/edit.vue'),
  },
}
// 社交体系管理
const SOCIAL_ROUTES={
  // 收票额度管理
  "social_sys_manage": {
    path:"/social/present"
  },
  "social_present_record": {
    path:"record", 
    component: () => import('@/view/social/present-record.vue')
  },
  "social_present_pack": {
    path:"pack", 
    component: () => import('@/view/social/present-pack.vue')
  } 
}
// 菜单选项
export const ROUTE_DATA = {
  ...MRS_ROUTES,
  ...STATISTICS_ROUTES,
  ...COUPON_ROUTES,
  ...PLAN_ROUTES,
  ...CREDIT_ROUTES.V1,
  ...CREDIT_ROUTES.V2,
  ...LABEL_ROUTES,
  ...ORDER_ROUTES,
  ...TASK_ROUTES,
  ...SYS_ROUTES,
  ...PMS_ROUTES,
  ...INTEGRAL_MALL_ROUTES,
  ...INTEGRAL_SCORE_ROUTES,
  ...GRADE_ROUTES,
  ...PROFIT_ROUTES,
  ...PORTRAINT_ROUTES,
  ...QUOTA_ROUTES,
  ...HC_ROUTES,
  ...SOCIAL_ROUTES, 
}
