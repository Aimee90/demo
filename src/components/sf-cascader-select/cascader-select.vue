<template>
  <div class="cascader-select">
      <Cascader :data="data" v-model="selected" :render-format="renderHandler" @on-change="onChange" :disabled="disabled" transfer></Cascader>
  </div>
</template>
<script>
  export default {
    name: 'cascader-select',
    props: {
        'value': {
          type: Array,
          default: ()=>[]
        },
        'renderFormat': {
          type: Function,
          default: (labels) => labels.join('/')
        },
        'data': {
          type: Array,
          default: ()=>[]
        },
        'disabled': {
          type: Boolean,
          default: false
        }
    },
    data() {
      return {
          selected: []
      }
    },
    mounted() {
        this.selected = this.value
    },
    methods: {
      onChange(value, selectedData){
        this.$emit('on-change', value, selectedData)
      },
      renderHandler(labels, selectedData){
        return this.renderFormat(labels, selectedData)
      }
    },
    watch: {
      selected(nv){
        this.$emit('input', nv)
      }
    }
  }
</script>
<style style lang="less" scoped>
  .cascader-select {
  }
</style>
