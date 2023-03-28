import * as moment from 'moment'
export default {
  name: 'customeDatePicker',
  props: {
    value: {
      validator: v=> {
        return !v||_.isDate(v)||'object'===typeof v||'string'===typeof v
      }
    },
    options: {
      validator: function (value) {
        let { divideTime = new Date(), isForward=true} = value
        return _.isBoolean(isForward)&&_.isDate(divideTime)
      }
    }
  },
  render(h){
    let {divideTime= moment(), isForward=true, noRule=false, ...othersOptions} = this.options
    return h('DatePicker', {
      class: noRule?'custome-date-picker rule-exempt':'custome-date-picker',//规则豁免
      props: {
        ...othersOptions,
        value: _.isEmpty(this.value)?null:new Date(moment(this.value).format('YYYY-MM-DD')),
        options: {
          disabledDate: date => {
            return date && isForward?date.valueOf()< moment(divideTime).add(-1, 'd'): date.valueOf()>divideTime
          }
        }
      },
      on: {
        'on-change': v => {
          this.$emit('input', v)
        }
      }
    })
  }
}