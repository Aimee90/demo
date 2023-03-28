/**
 * @author: zoolin
 * create time: 2022-02-11 17:39:30
*/
//Start typing your code from here
import event from '@/libs/vue-event'
import main from './index.vue'
Object.defineProperties(main, {
  event: {
    value: event,
    writable: false
  }
})
export default main
