<template>
  <Input :class="hasError?`error-info`:``" v-model="data" @on-change="change" :placeholder="placeholder"></Input>
</template>
<script>
  export default {
    name: 'sfNumberInput',
    model: {
      prop: 'value'
    },
    props: {
      // 输入框内容类型
      type: {
        type: String,
        default: 'string'
      },
      // number表示几位数  string表示字符个数
      limit: {
        type: Number,
        default: 2
      },
      //type为number时，小数点数
      fixed: {
        type: Number,
        default: 0
      },
      // 是否校验
      shouldValid: {
        type: Boolean,
        default: false
      },
      required: {
        type: Boolean,
        default: false
      },
      // 正则校验格式
      fmt: {
        type: String,
        default: ".*"
      },
      value: '',
      placeholder: ''
    },
    mounted(){
      const limit = this.limit
    },
    data(){
      return {
        data: this.value,
        hasError: false
      }
    },
    methods: {
      change(){
        let value = this.data, result = new RegExp(this.fmt, 'g').test(value)
        this.$emit('input', value)
        if((!this.required&&''==value)||!this.shouldValid||result){
          this.hasError = false
        }else{
          this.hasError = true
        }
        this.$emit('on-check', !this.hasError)
      }
    },
    watch:{
    }
  }
</script>
<style lang="less" scoped>
  @import './sf-valid-input.less';
</style>