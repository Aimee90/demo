<template>
  <div class="sf-pagination-select"
        v-click-outside.capture="onClickOutside"
        v-click-outside:mousedown.capture="onClickOutside"
        v-click-outside:touchstart.capture="onClickOutside">
    <div ref="reference">
      <Input v-model="input" 
        ref="pageInput"
        :suffix="suffix"
        :placeholder="placeholder" 
        @on-focus="showMenu"
        @on-blur="handleBlur"
        @on-change="handleKeydown"
        @on-keypress="handleKeydown"
        @on-clear="clear"
        :readonly="!filterable"
        :clearable="clearable"
        :disabled="isDisabled"/>
    </div>
    <Drop ref="dropdown" :visible="visible">
      <ul class="" v-show="!loading" ref="selectItems">
        <li v-for="item in data" @click="select(item.id,item)" :key="item.id">
          <Tooltip :content="item.name" placement="bottom-end" transfer>
            {{item.name}}
          </Tooltip>
        </li>
      </ul>
      <Spin v-show="loading"></Spin>
      <div class="pagination" v-show="hasResult&&(hasPrev||hasNext)">
        <a @click="prev" :disabled="!hasPrev">上一页</a>
        <a @click="next" :disabled="!hasNext">下一页</a>
      </div>
      <div class="no-result" v-show="!hasResult">
        暂无选项
      </div>
    </Drop>
  </div>
</template> 
<script>
  import Vue from 'vue'
  import Drop from './dropdown.vue'
  export default {
    name: 'sfPaginationSelect',
    components: {  Drop },
    props: {
      value: {
        type: String|Number,
        default: null
      },
      data: {
        type: Array,
        default: ()=>{
          return []
        }
      },
      current: {
        type: Number,
        default: 1
      },
      pages: {
        type: Number,
        default: 1
      },
      placeholder: {
        type: String,
        default: ''
      },
      loading: {
        type: Boolean,
        default: false
      },
      filterable: {
        type: Boolean,
        default: false
      },
      clearable: {
        type: Boolean,
        default: false
      },
      isDisabled:{
        type: Boolean,
        default: false
      }
    },
    data(){
      return {
        input: '',
        styleObj: {},
        popper: null,
        popperStatus: false,
        // 是否处于搜索状态
        isSearching: false,
        isFocused: false,
        onMenu: false
      }
    },
    mounted(){
      this.input = this.getName(this.value)
    },
    destroy () {
      if (this.popper) {
        setTimeout(() => {
          if (this.popper && !this.popperStatus) {
            this.popper.destroy();
            this.popper = null;
          }
          this.popperStatus = false;
        }, 300);
      }
    },
    methods: {
      handleKeydown($e){
        this.isSearching = true
        this.search()
      },
      handleBlur($e){
        setTimeout(()=>{
          this.isFocused=false
          let name = $e.target.value
          let hit = _.find(this.data, o=>o.name==name)
          if(_.isEmpty(hit)){
            this.input = null
            this.$emit('input', null)
          }
        }, 200)
      },
      search(){
        if(!!this.delay){
          clearTimeout(this.delay)
          this.delay = null
        }
        this.delay = setTimeout(()=>{
          let name = this.$refs.pageInput.value
          this.$emit('on-search', name)
        }, 100)
      },
      select($v,info){
        this.isSearching = false
        this.input = this.getName($v)
        this.$emit('input', $v)
        this.$emit('on-select', info)
        this.hideMenu()
      },
      clear(){
        this.isSearching = false
        this.input = ''
        this.$emit('input', null)
        this.hideMenu()
      },
      getName(value){
        let selected = _.find(this.data, o=>o.id==value)||{}
        return selected.name||''
      },
      prev(){
        this.$emit('on-page', this.current-1)
      },
      next(){
        this.$emit('on-page', this.current+1)
      },
      onClickOutside(){
        this.isFocused = false
        this.onMenu = false
      },
      showMenu(){
        this.isFocused = true
        this.onMenu = true
      },
      hideMenu(){
        this.$nextTick(()=>{
          this.onMenu = false
        })
      },
    },
    computed: {
      suffix(){
        return this.filterable?`ios-search`:`ios-arrow-down`
      },
      visible(){
        return this.isFocused||this.onMenu
      },
      hasResult(){
        return this.data.length>0
      },
      hasNext(){
        return this.pages>0&&this.pages>this.current
      },
      hasPrev(){
        return this.current>1
      }
    },
    watch: {
      value(nv, ov){
        this.input = this.getName(nv)
      },
      data(nv){
        let name = this.getName(this.value)
        // 首次数据集加载时 载入选中值
        if(!_.isEmpty(name)&&!this.isSearching){
          this.input = name
        }
      }
    }
    
  }
</script>
<style lang="less" scoped>
  @import './sf-pagination-select.less';
</style>