<template>
  <div class="sf-form">
    <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="labelWidth" label-colon>
      <FormItem v-for="(item, index) in _formData" :key="`form-item-`+index" :label="item.label" v-show="item.shown">
        <slot v-if="item.slot" name="item.slot"></slot>
        <Input v-else :value="item.value" :disabled="item.disabled"></Input>
      </FormItem>
    </Form>
    <div class="btns" style="text-align: center;">
      <Button @click="cancel" style="margin-right: 20px;">取消</Button>
      <Button type="primary" @click="handleSubmit" :loading="loading">{{loading?`保存中`: `确定`}}</Button>
    </div>
  </div>

</template>

<script>
  import * as _ from 'lodash'
  const DEFAULT_FORM = { label: '默认标签', field: 'form-0', value: null, shown:()=>true, disabled: false, validator: (rule, value, callback) => {}}
  export default {
    name: 'SfForm',
    props: {
      labelWidth: {
        type: Number,
        default: 80
      }
    },
    data(){
      return {
        context: null,
        loading: false,
        formData: [],
        formCustom: {},
        ruleCustom: {}
      }
    },
    mounted(){
      this.formData = this.context.formData||[DEFAULT_FORM]
    },
    methods: {
      cancel(){
        this.dismiss.error()
      },
      handleSubmit(){
        this.dismiss.next(this.formCustom)
      }
    },
    computed: {
      _formData(){
        let form = []
        let data = _.forEach(this.formData, item=>{
          form.push(_.assign(DEFAULT_FORM, item))
        })
        return form
      }
    }
  }
</script>

<style lang="less" scoped></style>