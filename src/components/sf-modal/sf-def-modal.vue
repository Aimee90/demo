<template>
  <div>
    <p class="content">{{content}}</p>
    <!-- <div class="opt">
      <Button v-if="showOk" type="primary" @click="sure">确定</Button>
      <Button v-if="showCancel" @click="cancel">取消</Button>
    </div> -->
    <modal-btns @on-ok="sure" @on-cancel="cancel" :btns="btns"/>
  </div>
</template>
<script>
  import * as _ from 'lodash'
  import ModalBtns from './btns'
  export default {
    name: 'SfModal',
    components: {ModalBtns},
    data() {
      return {
        btns: null,
        content: ''
      }
    },
    methods: {
      sure(){
        this.dismiss.next()
      },
      cancel(){
        this.dismiss.error()
      },
      close($event) {
        if (!$event) this.dismiss.error();
      }
    },
  }
</script>
<style lang="less" rel="stylesheet/less" type="text/less" scoped>
  .content{
    margin: 20px 0 30px 0;
  }
  .opt{
    display: flex;
    justify-content: space-around;
  }
  .opt>button{
    width: 100px;
  }
  .content{
    white-space: pre-wrap;
    word-break: break-all;
    max-height: 400px;
    overflow-y: auto;
  }
</style>
