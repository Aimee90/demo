<template>
  <Modal
    v-model="modal"
    :width="width"
    :mask="mask"
    :mask-closable="maskClosable"
    :footer-hide="footerHide"
    :scrollable="scrollable"
    :fullscreen="fullscreen"
    :closable="closable"
    :transfer="transfer"
    :z-index="zIndex"
    class-name="vertical-center-modal"
    @on-visible-change="close">
    <div class="model-header" slot="header" ref="header"></div>
    <div ref="slots" id="fdd"></div>
  </Modal>
</template>
<script>
  export default {
    name: 'SfModal',
    props: {
      modal: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        dismiss: {},
        title: '',
        width: 520,
        mask: true,
        draggable: true,
        maskClosable: false,
        footerHide: true,
        scrollable: false,
        fullscreen: false,
        closable: true,
        transfer: false,
        // className: "vertical-center-modal",
        zIndex: 1000,
      }
    },
    methods: {
      close($event) {
        if (!$event) this.dismiss.error();
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" type="text/less">
  @import './sf-modal.less';
</style>
