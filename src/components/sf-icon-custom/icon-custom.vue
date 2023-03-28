<template>
  <i :class="`iconfont-custom icon-${type}`" :style="`font-size: ${this.size}; color: ${this.color}`"></i>
</template>
<script>
  export default {
    name: 'iconCustom',
    props: {
      type: {
        type: String,
        default: ()=>'edit2'
      },
      size: {
        type: Number,
        default: ()=>16
      },
      color: {
        type: String,
        default: ()=>'#888'
      }
    },
    mounted(){
      console.log('font-size:',this.size)
    }
  }
</script>
<style lang="less" scoped>
.iconfont-custom:hover{
  color: #2b85e4 !important;
}
</style>
