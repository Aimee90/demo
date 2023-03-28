/**
 * @author: zoolin
 * create time: 2022-06-05 22:10:34
*/
//Start typing your code from here
export default {
  data: {},
  add(key, data){ 
    this.data[key] = data
  },
  pick(key){ 
    return this.data[key]
  },
  clear(key){
    undefined==key?this.data = {}:delete this.data[key]
  }
}