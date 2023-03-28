
/**
 * 新增事件监听
 * @param {*} callback 
 */
export const addListener = (event, callback, dom = window) =>{
  if(dom.addEventListener){
    dom.addEventListener(event, callback, true);
  }else if(dom.attachEvent){
    dom.attachEvent('on' + event, callback)
  }else{
    dom['on' + event] = callback
  }
}

/**
 * 移除事件监听
 * @param {*} callback 
 */
export const removeListener = (event, callback, dom = window) =>{
  if(dom.removeEventListener){
    dom.removeEventListener(event, callback, true);
  }else if(dom.detachEvent){
    dom.detachEvent('on' + event, callback)
  }else{
    dom['on'+event] = null
  }
}