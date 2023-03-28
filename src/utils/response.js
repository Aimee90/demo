export const responseCode = {
  '0': '成功',
  '-1': '未知错误',
  '-2': '入参有误',
  '-3': '命中风控'
}
 /**
  * 判断是否是成功的响应
  * @param {Boolean}} res 
  */
 export const isSucc = (res) => {
  return 0 == res.data.code
 }

 /**
  * 
  * @param {*} res 
  */
 export const getData = (res) => {
   if(isSucc(res)){
    return res.data.data
   }else {
     return {}
   }
 }