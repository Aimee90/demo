<template>
  <Page :total="total" @on-change="onchange" :size="size" simple></Page>
</template>
<script>
  export default {
    name: 'SfConcisePage',
    props: {
      total: {
        type: Number,
        default: 0
      },
      size: {
        type: String,
        default: ''
      }
    },
    methods: {
      onchange($event){
        this.$emit('onchange', $event)
      }
    }
  }
</script>
<style lang="less" scoped>
  @import './index.less';
</style>