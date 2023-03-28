/**
 * @author: zoolin
 * create time: 2022-01-07 17:56:48
*/
//Start typing your code from here
import { binaryUtils as bUtils } from '@/libs/util'
export default {
    name: 'sfModalBtns',
    props: {
        btns: {
            type: Array,
            default: ()=>['ok', 'cancel']
        }
    },
    data(){
        return{
            loading: 0
        }
    },
    render(h){
        const btnFactory = (innerHTML, click=_.noop, props) => h('Button', {
            style: {'width': '100px'},
            props: {...props},
            domProps: {innerHTML},
            on: { click }
        })
        return h('div', {
            style: { 'display': 'flex', 'justify-content': 'space-around'}
        }, [
            this.showOk?btnFactory('确定', ()=>{
                this.setLoading(0)
                this.$emit('on-ok')
                this.clearLoading(0)
            },{
                type: 'primary',
                loading: this.getLoading(0)
            }):null,
            this.showCancel?btnFactory('取消', ()=>{
                this.setLoading(1)
                this.$emit('on-cancel')
                this.clearLoading(1)
            }, {
                type: 'default',
                loading: this.getLoading(1)
            }):null,
        ])
    },
    methods: {
        setLoading(code){
            this.loading = bUtils.setBinary(code, this.loading)
        },
        getLoading(code){
            return bUtils.getBinary(code, this.loading)
        },
        clearLoading(code){
            setTimeout(()=>{
                this.loading = bUtils.rmBinary(code, this.loading)
            }, 1000*6)
        }
    },
    computed: {
      showOk(){
        return _.findIndex(this.btns, item=>item=='ok')>=0
      },
      showCancel(){
        return _.findIndex(this.btns, item=>item=='cancel')>=0
      }
    }
}