<template>
  <div class="m-section__input">
    <Input v-model="range[0]" placeholder="最小值" @on-change="valueChange">
      <template slot="prepend">
        <slot v-if="$slots.prependMin" name="prependMin"></slot>
        <slot v-else name="prepend"></slot>
      </template>
    </Input>
    <span class="section--split"></span>
    <Input v-model="range[1]" placeholder="最大值" @on-change="valueChange">
      <template slot="prepend">
        <slot v-if="$slots.prependMax" name="prependMax"></slot>
        <slot v-else name="prepend"></slot>
      </template>
    </Input>
  </div>
</template>
<script>
  export default {
    name: 'sfSectionInput',
    props: {
      value: {
        type: Array,
        default: () => [null, null]
      }
    },
    data(){
      return {
        range: this.value
      }
    },
    methods: {
      valueChange(){
        // console.log(`range value change: ${this.range}`)
        this.$emit('input', this.range)
      }
    },
    watch: {
      value(nv){
        this.range = nv
      }
    }
  }
</script>
<style scoped lang="less">
  @import './section-input.less';
</style>