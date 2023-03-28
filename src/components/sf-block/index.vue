<template>
  <div class="sf-info-block" :title="title">
    <div class="sf-info">
      <slot v-for="($slot, index) in $slots"></slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'sfBlock',
    props: {
      title: {
        type: String, 
        default: '默认标题'
      }
    }
  }
</script>
<style lang="less" scoped>
  @import './index.less';
</style>
