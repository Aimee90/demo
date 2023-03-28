<template>
  <div class="cascade-time">
        <DatePicker 
            v-model="form.startTime" 
            format="yyyy-MM-dd" 
            placeholder="生效日期" 
            :options = "dpickerOptions4start" 
            :editable="false" @on-change="datePickerHandler"/>
        <span class="date-split"> ~ </span>
        <DatePicker 
            v-model="form.endTime" 
            format="yyyy-MM-dd" 
            placeholder="失效日期" 
            :options = "dpickerOptions4end" 
            :editable="false" @on-change="datePickerHandler"/>
  </div>
</template>
<script>
  import * as moment from 'moment'
  const DEF_PARAM = { startTime: null, endTime: null}
  export default {
    name: 'cascade-time',
    props: {
        value: {
            type: Object,
            default: ()=>_.cloneDeep(DEF_PARAM)
        },
        dateGap: {
            type: Array,
            default: ()=>[null, null]
        },
        fmt: {
            type: String,
            default: 'YYYY-MM-DD'
        }
    },
    data() {
      return {
          form: _.cloneDeep(DEF_PARAM)
      }
    },
    mounted() {
    },
    methods: {
      isEmpty(v){
        return null===v||''===v
      },
      datePickerHandler(v){ 
        //  若活动生效日期选择在失效日期之后  清空失效日期的值
        const { startTime, endTime } = this.form
        const sTime = moment(this.form.startTime), eTime = moment(this.form.endTime)
        if(!this.isEmpty(startTime)&&!sTime.isBefore(eTime)&&!sTime.isSame(eTime, 'day')){
          this.form.endTime = null
        }
        this.$emit('change', {
          startTime: this.isEmpty(this.form.startTime)?null:moment(this.form.startTime).format(this.fmt),
          endTime: this.isEmpty(this.form.endTime)?null:moment(this.form.endTime).format(this.fmt),
        })
      }
    },
    computed: {
      dfloor(){
          return this.dateGap[0]
      },
      dupper(){
          return this.dateGap[1]
      },
      dpickerOptions4start(){
        return {
          disabledDate: date=>{
            const dfloor = this.dfloor, dupper = this.dupper
            const outGap = !((_.isDate(dfloor)?date.valueOf() < dfloor:true) && (_.isDate(dupper)?date.valueOf() > dupper:true))
            return date && outGap
          }
        }
      },
      dpickerOptions4end(){
        return {
          disabledDate: date=>{ 
            const dfloor = this.dfloor, dupper = this.dupper
            const startTime = this.form.startTime, 
                  outGap = !((_.isDate(dfloor)?date.valueOf() < dfloor:true) && (_.isDate(dupper)?date.valueOf() > dupper:true))
            return date && !this.isEmpty(startTime)?date.valueOf() < moment(startTime).add(1, 'days') - 86400000:outGap
          }
        }
      },
    },
    watch: {
        value: {
            deep: true,
            handler(nv) {
                this.form = nv
            }
        }
    }
  }
</script>
<style style lang="less" scoped>
  .cascade-time {
      display: flex;
      align-items: center;
      width: 100%;
      .date-split{
          width: 34px;
          text-align: center;
      }
  }
</style>
