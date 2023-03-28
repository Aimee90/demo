<template>
  <div class="container" ref="container">
    <div v-if="showSearch" class="search-content" ref="search">
      <searcher :fields="searchParams" @on-search="search">
        <template v-for="field in slots"> 
          <slot :slot="field.key" :name="field.key"></slot>
        </template>
      </searcher>
    </div>
    <div class="container-table" :style="{'height':height}" ref="table"> 
      <slot v-if="!!$slots['table-list']" name="table-list"></slot>
      <sf-table 
        v-else
        v-bind="tab"  
        @on-change="pageChangeHandler" 
        @on-page-size-change="pageSizeChangeHandler">
        <template  v-if="!!$slots['header-btns']" slot="sel-query" class="queryClass">
          <slot name="header-btns"></slot>
        </template>
      </sf-table>
    </div>
  </div>
</template>
<script>
  import Searcher from './searcher-fac'
  import {showTitle} from '@/libs/util'
  import event from '@/libs/vue-event'
  const getDefaultTableConf = ()=>{
    return { 
      loading: false, 
      current: 1,
      total: 0,
      pageSize: 10,
      columns: [],
      data: [],
    }
  }
  export default {
    name: 'sfSearchContainer',
    components: { Searcher },
    props: { 
      tableConfig: {
        type: Object,
        default: ()=>{
          return { columns: [], data: [] }
        }
      },
      searchParams: {
        type: Array,
      }
    },
    data() {
      return {
        height: '',
        fontSize: 16,
        tab: {
          type: Object,
          default: getDefaultTableConf
        },
      }
    },
    methods: {
      setPage(current=1, pageSize=10){
        this.$set(this.tab, 'current', current)
        this.$set(this.tab, 'pageSize', pageSize)
      },
      getHeight() {
        this.height = this.$refs.container.offsetHeight - (!!this.$refs.search?this.$refs.search.offsetHeight:0) + 'px';
      },
      showTitle(item) {
        return showTitle(item, this)
      },
      changeHeight() {
        setTimeout(() => {
          this.getHeight();
        }, 100);
      },
      pageChangeHandler(v){
        this.$set(this.tab, 'current', v)
        this.search()
      },
      pageSizeChangeHandler(v){ 
        this.$set(this.tab, 'current', 1)
        this.$set(this.tab, 'pageSize', v) 
        this.search()
      },
      search(param){ 
        const {current: pageNum, pageSize} = this.tab 
        this.tmp = _.assign(param||this.tmp, {pageNum, pageSize}) 
        this.$emit('on-search', this.tmp)
      }
    },
    mounted() {
      this.$nextTick(this.getHeight)
      window.addEventListener('resize', this.getHeight)
    },
    destroyed() {
      window.removeEventListener('resize', this.getHeight)
    },
    computed: {
      showSearch(){
        return _.size(this.searchParams)!==0
      },
      slots(){
        return _.filter(this.searchParams, o=>o.hasOwnProperty('slot'))
      }
    },
    watch: {
      tableConfig: {
        immediate: true,
        deep: true,
        handler(nv){
          for (const key in nv) {
            if(this.__flag&&('loading'==key||'current'==key||'pageSize'==key)) continue
            let value = nv[key]
            this.$set(this.tab, key, (_.isObject(value)&&!_.isFunction(value)?_.cloneDeep(value): value))
          }
          this.__flag = true
        }
      },
    }
  }
</script>

<style lang="less" scoped>
  .container {
    width: ~"calc(100vw - 280px)" !important; 
    height: ~"calc(100vh - 140px)" !important; 
  }

  .search-content {
    display: flex;
    align-items: center;
    background-color: #fff;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 5px;

    ::v-deep .searchLine {
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

      .ivu-col{
        .align-row{
          white-space: nowrap !important;
          align-items: center !important;
        }
      }
    }
    :v-deep .query{
      button{
        margin-left: 3px;
      }
    }
  }

  ::v-deep .ivu-table-border{
    @border: 1px solid #e8eaec;
    .ivu-table-header{
      border-top: @border;
    }
    th, td{
      &:first-child{
        border-left: @border
      }
    }
  }
</style>
