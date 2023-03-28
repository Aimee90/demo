<template>
  <div class="watermark">
    <span class="watermark--item" v-for="i in 100" :key="`item-${i}`">{{company}}{{userName}}</span>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'watermark',
    computed: {
      company(){
        return '同城票据网'
      },
      ...mapGetters(['userName'])
    }
  }
</script>
<style lang="less" scoped>
  @import './index.less';
</style>