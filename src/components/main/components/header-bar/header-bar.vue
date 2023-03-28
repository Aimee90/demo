<template>
  <div class="header-bar">
    <sider-trigger :collapsed="collapsed" icon="md-menu" @on-change="handleCollpasedChange"></sider-trigger>
    <custom-bread-crumb show-icon style="margin-left: 30px;" :list="breadCrumbList"></custom-bread-crumb>
    <div class="custom-content-con">
      <slot></slot>
    </div>
    <div class="db">
      <Icon class="tips" type="md-notifications-outline" size="24" color="#fff" />
      <div class="num-back" v-if="num > 0">
        <span class="num">{{num}}</span>
      </div>
    </div>
    <div class="showDate">{{nowtime | today}} {{nowtime | updatetime}}</div>
  </div>
</template>
<script>
import * as moment from 'moment'
moment.locale('zh-cn')
import siderTrigger from './sider-trigger'
import customBreadCrumb from './custom-bread-crumb'
import './header-bar.less'
import VueEvent from '@/view/single-page/home/event'
export default {
  name: 'HeaderBar',
  data(){
  return {
     nowtime:new Date(),
     num:null
  }
  },
  filters: {
    updatetime:function(value){
      return moment(value).format('LTS');
    },
    today:function(value){
      return moment(value).format('ll');
    }
  },
  components: {
    siderTrigger,
    customBreadCrumb
  },
  props: {
    collapsed: Boolean
  },
  computed: {
    breadCrumbList () {
      return this.$store.state.app.breadCrumbList
    }
  },
  methods: {
    handleCollpasedChange (state) {
      this.$emit('on-coll-change', state)
    }
  },
   mounted(){//生命周期模板挂载之后
     let _this=this;
     this.timer=setInterval(()=>{
          _this.nowtime=new Date();
      },1000)
     VueEvent.$on('info',data =>{
       this.num = data
     })
  },
  beforeDestroy(){//生命周期实例销毁之前
     if(this.timer){
         clearInterval(this.timer);
     }
}  
}
</script>
<style lang="less">
.showDate{
  color: #fff;
  float: right;
} 
.db{
  float: right;
  padding: 0 0.7em;
  position: relative;
  .num-back{
    width: 15px;
    height: 15px;
    background: #e24d33;
    position: absolute;
    right: 6px;
    top: 19px;
    border-radius: 10px;
    .num{
      color: #fff;
      position: absolute;
      right: 4px;
      top: -25px;
      font-size: 14px;
    }
  }
}
</style>
