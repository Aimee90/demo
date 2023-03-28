<template>
  <div class="tableBox" ref="tableBox">
    <Spin fix v-if="loading">
      <Icon type="ios-loading" size=20 class="demo-spin-icon-load"></Icon>
      <div style="font-size: 18px;margin-left: 10px">{{loadingText}}</div>
    </Spin>
    <div class="sf-query-btn" ref="btns" v-show="isShowQuery">
      <slot name="sel-query"></slot>
    </div>
    <div :class="`tableInner${!isShowQuery?' unquerable':''}`" ref="tableInner" :style="{'height':height+'px'}">
      <Table
        :height="height"
        :columns="Columns"
        :no-data-text="noData"
        :data="data"
        v-bind="$attrs"
        @on-selection-change="RowSelectChange"
        @on-sort-change="onSortChange" >
        <template v-for="item in slotColumn" :slot="item.slot" slot-scope="{row,column,index}">
          <slot :name="item.slot" :row="row" :column="column" :index="index"></slot>
        </template>
      </Table>
    </div>
    <div class="pager" v-show="showPager" ref="pager" style="margin-bottom: 10px">
      <div class="left">
        <Select :value="pageSize" style="width:60px;margin-right: 5px" size="small"
                @on-change="onpagesizechange($event)">
          <Option v-for="item in pageSizeOptions" :value="item" :key="item">{{ item }}</Option>
        </Select>
        <Page
          simple
          @on-change="onchange($event)"
          @on-page-size-change="onpagesizechange($event)"
          :current="current" :total="total" :page-size="pageSize" show-elevator show-sizer show-total/>
      </div>
      <div class="right">
        {{'显示从'|translate}}{{FromPager}}{{'到'|translate}}{{EndPager}}，{{'总'|translate}}{{total}}{{'条'|translate}}，{{'每页显示：'|translate}}{{pageSize}}
      </div>
    </div>
  </div>
</template>

<script>
  import i18n from '@/locale'
  import * as _ from "lodash"
  export default {
    name: 'SfTable',
    // inject: ["message"],
    props: {
      value: '',
      total: {
        type: Number,
        default: 0
      },
      current: {
        type: Number,
        default: 1
      },
      pageSize: {
        type: Number,
        default: 10
      },
      sfHeight: {
        type: Number,
        default: null
      },
      selection: {
        type: Boolean,
        default: false
      },
      loading: {
        type: Boolean,
        default: false
      },
      loadingText: {
        type: String,
        default: '加载中...'
      },
      columns: {
        type: Array,
        default: () => {
          return []
        }
      },
      data: {
        type: Array,
        default: () => {
          return []
        }
      },
      showPager: {
        type: Boolean,
        default: true
      },
      showIndex: {
        type: Boolean,
        default: true
      },
      emptyText: {
        type: String,
        default: '暂无数据'
      },
    },
    data() {
      return {
        isShowQuery: true,
        height: '',
        pageSizeOptions: [10, 15, 30, 50, 100, 200]
      }
    },
    computed: {
      attrs(){
        console.log('table attrs:',this.$attrs)
      },
      slotColumn() {
        return this.columns.filter(item => item.slot)
      },
      Columns() {
        let bool = this.columns.some((item) => {
          if ('fixed' in item) {
            return true
          }
          return false
        })

        let selItem = {
          type: 'selection',
          width: 60,
          align: 'center',
          fixed: bool ? 'left' : ''
        }
        let item = {
          type: 'ids',
          width: 80,
          align: 'center',
          render: (h, params) => {
            return h('span', params.index + 1 + this.pageSize * (this.current - 1))
          },
          renderHeader: (h, params) => {
            return h('span', 'No.')
          },
          fixed: bool ? 'left' : ''
        }
        let temp = this.columns.slice(0);
        let showColumns =  _.cloneDeep(temp);
        showColumns.forEach((item) => {
          item.minWidth = 100;
          item.tooltip = item.tooltip||false;
          item.title = i18n.t(item.title);
          if ('width' in item) {
            item.resizable = true
          }
          if (!item.align) {
            item.align = 'center'
          }
        })
        if (this.showIndex) {
          showColumns.unshift(item)
        }
        if (this.selection) {
          showColumns.unshift(selItem)
        }
        return showColumns;
      },
      FromPager() {
        return (this.current - 1) * this.pageSize + 1
      },
      EndPager() {
        let page = (this.current - 1) * this.pageSize + this.pageSize
        return page > this.total ? this.total : page
      },
      noData() {
        if (this.loading) {
          return ''
        } else {
          return this.emptyText
        }
      }
    },
    watch: {
      data: {
        handler: function (newVal, oldVal) {
          let selected = [];
          newVal.map((v) => {
            if (v._checked) {
              selected.push(v);
            }
          });
          this.$emit('input', selected)
          setTimeout(() => {
            this.getHeight()
          })
        },
        immediate: true
      }
    },
    methods: {
      getHeight() {
        this.height = this.sfHeight || (this.$refs.tableBox.offsetHeight - this.$refs.btns.offsetHeight - this.$refs.pager.offsetHeight - 10)
      },
      changeHeight() {
        this.height = 0;
        setTimeout(() => {
          this.getHeight();
        }, 200)
      },
      onchange($event) {
        this.$emit('on-change', $event)
      },
      onpagesizechange($event) {
        this.$emit('on-page-size-change', $event)
      },
      RowSelectChange($event) {
        this.$emit('input', $event)
        this.$emit('on-select', $event)
      },
      onSortChange(){
        this.$emit('on-sort-change', ...arguments)
      }
    },
    mounted() {
      window.addEventListener('resize', this.getHeight)
      if (this.$slots == null) {
        this.isShowQuery = false
        return
      }
      this.isShowQuery = Object.keys(this.$slots).length !== 0
    },
    destroyed() {
      window.removeEventListener('resize', this.getHeight)
    }
  }
</script>

<style lang="less" type="text/scss" scoped>
@import './sf-table.less';
</style>
