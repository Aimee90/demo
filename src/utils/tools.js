import { read_excel, export_array_to_excel } from '@/utils/excel'

export const handleUpload = (file, cb=_.noop) => {
  const fileExt = file.name.split('.').pop().toLocaleLowerCase()
  if (fileExt === 'xlsx' || fileExt === 'xls') {
    read_excel({file, onloadend(data){
      _.isFunction(cb)&&cb(data)
    }})
  } else {
    this.$Notice.warning({
      title: '文件类型错误',
      desc: '文件：' + file.name + '不是EXCEL文件，请选择后缀为.xlsx或者.xls的EXCEL文件。'
    })
  }
  return false
}

export const exportExcel = (params) => {
  export_array_to_excel(params)
}

export const handleIDUpload = (file, cb=_.noop) => {
  handleUpload(file, data=>{
    let ids = _.map(data.results, _.property('用户ID'))
    _.isFunction(cb)&&cb(ids)
  })
}

export const exportIds = (params) => {
  let data = _.assign({
    title: ['用户ID'],
    key: ['userId'],
    data: [],
    autoWidth: true,
    filename: `客户ID`
  }, params)
  export_array_to_excel(data)
}

export const loadScript = url => new Promise((resolve, reject) => {
  let script = document.createElement('script')
  script.type = "text/javascript"

  if(script.readyState){
    script.onreadystatechange = ()=>{
      if( 'loaded' == script.readyState || 'complete' == script.readyState){
        script.onreadystatechange = null
        resolve()
      }
    }
  }else{
    script.onload = () => resolve()
  }
  script.src = url
  document.getElementsByName('head')[0].appendChild(script)
})

