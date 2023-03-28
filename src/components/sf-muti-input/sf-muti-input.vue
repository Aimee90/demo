<template>
  <div class="sf-muti-input" ref="mutiInput">
    <i-input v-model="text" @keyup.enter.native="inputEnter" @on-blur="onBlur" @on-focus="onFocus" :placeholder="placeholder">
      <!-- <span class="more-input" slot="append" @click="inputEnter">确定</span> -->
    </i-input>
    <div class="more-details" v-show="showMore">
      <div v-if="!list.length" style="color: #999;"><label>请添加{{label}}</label></div>
      <div v-for="item in list"><label>{{item}}</label><span @click="deleteItem(item)"></span></div>
      <div v-if="!!list.length" @click="deleteAll"><label>清空</label></div>
    </div>
  </div>
</template>
<script>
  import {showTitle, checkValid} from '@/libs/util';
  import * as _ from "lodash";
  export default {
    name: 'SfMutiInput',
    props:{
      label: {
        type: String,
        default: ''
      },
      value: {
        type: Array,
        default: ()=>{
          return []
        }
      }
    },
    data() {
      return {
        showMore: false,
        list: this.value,
        text: null
      }
    },
    methods: {
      inputEnter(){
        if('' == this.text||null == this.text) return;
        let text = this.text.replace(/，/g, ",")
        let inputs = _.compact(text.split(',').map(item=>item.trim()))
        this.list =_.uniq(this.list.concat(inputs)) 
        this.text = ''
        this.updateList()
      },
      onBlur(){
        this.inputEnter()
        setTimeout(()=>{
          this.showMore = false
        }, 200)
      },
      onFocus(){
        this.showMore = true
      },
      deleteItem(item){
        this.list.splice(_.findIndex(this.list, o => o == item),1)
        this.updateList()
      },
      deleteAll(){
        this.list = []
        this.updateList()
      },
      updateList(){
        this.showMore = true
        this.$emit('input', this.list)
      }
    },
    computed: {
      placeholder(){
        return this.list.length==0?'多个选项之间请使用 "," 分隔':this.list.join(',')
      }
    },
    watch: {
      value(nv){
        this.list = nv
      }
    }
  }
</script>

<style lang="less" scoped>
  @import './sf-muti-input.less';
</style>
