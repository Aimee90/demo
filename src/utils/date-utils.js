import * as moment from 'moment'

export const today = ()=>{
  return moment().format('YYYY-MM-DD')
}
const FMT = 'YYYY-MM-DD HH:mm:ss'
export const dateFmt = ({date, offsetDay=0, fmt=FMT, fix=false})=>{
  let _date = moment(date)
  if(isNaN(_date)) {
    return ''
  }else if(!!offsetDay){
    return fix?_date.add(offsetDay, 'd').add(1, 'd').add(-1, 's').format(fmt):_date.add(offsetDay, 'd').format(fmt)
  }else{
    return fix?_date.add(1, 'd').add(-1, 's').format(fmt): _date.format(fmt)
  }
}

export const dateFormat = ({date, offsetDay=0, offsetSeconds=0})=>{
  if('' == date||null==date) return null
  let ndate = moment(date).format('YYYY-MM-DD')

  return moment(ndate).add(offsetDay, 'days').add(offsetSeconds, 'seconds').format('YYYY-MM-DD HH:mm:ss')
}