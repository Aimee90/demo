<template>
  <div class="container" ref="container">
    <div v-show="$slots['sel-1']" class="search-content" ref="search">
      <slot name="sel-1"></slot>
    </div>
    <div class="container-table" :style="{'height':height}" ref="table">
      <slot name="sel-2"></slot>
    </div>
  </div>
</template>
<script>
  import {showTitle} from '@/libs/util'

  export default {
    name: 'SfContainer',
    data() {
      return {
        height: '',
        fontSize: 16
      }
    },
    methods: {
      getHeight() {
        this.height = this.$refs.container.offsetHeight - this.$refs.search.offsetHeight + 'px';
      },
      showTitle(item) {
        return showTitle(item, this)
      },
      changeHeight() {
        setTimeout(() => {
          this.getHeight();
        }, 100);
      }
    },
    computed: {
    },
    mounted() {
      this.$nextTick(this.getHeight)
      window.addEventListener('resize', this.getHeight)
    },
    destroyed() {
      window.removeEventListener('resize', this.getHeight)
    }
  }
</script>

<style lang="less" scoped>
  .container {
    width: 100%;
    height: 100%;
  }

  .search-content {
    display: flex;
    align-items: center;
    background-color: #fff;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 5px;
  }

  .search-content {
    /deep/ .searchLine {
      display:flex !important;
      justify-content: flex-start !important;
      align-items: center;
      flex-wrap: wrap;
      width: 100%;
      margin: 10px auto;
      background-color: #FFFFFF;
      margin-top: 10px;
      padding-right: 20px;
      &>div{
        padding: 4px 0;
        &:last-child{
          margin-left: auto;
          text-align: right;
        }
      }
      .titleClass{
        line-height: 30px;
        float:right;
        padding-right:5px;
        &::after{
          content: '：';
        }
      }
    }
    /deep/ .query{
      button{
        margin-left: 3px;
      }
    }
  }
</style>
