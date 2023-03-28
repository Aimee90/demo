/**
 * @author: zoolin
 * create time: 2022-01-11 10:49:16
*/
//Start typing your code from here
// 工具类组件
import { mapMutations } from 'vuex'
export const TurnBack = {
    name: 'turnBack', 
    props: ['prevRoute'],
    render(h){
        return !this.hasSlots?h('span', {
            class: this.cls,
            style: {
                'color': '#2d8cf0',
                'font-weight': 'bold',
                'cursor': 'pointer'
            },
            domProps: { innerHTML: '返回' },
            on: {
                click: this.backTo
            }
        }):h('div',{
            class: this.cls,
        },[
            this.$slots.default
        ])
    },
    methods: {
        ...mapMutations([
            'setTagNavListOnly', 
            'closeTag'
        ]),
        backTo(){
            const route = this.$route
            this.setTagNavListOnly(_.filter(this.tagNavList, o=>o.name!=route.name))
            window.history.go(-1)
        }
    },
    computed: {
        cls(){
            return 'back-to-prev'
        },
        hasSlots(){
            return undefined !== this.$slots.default
        },
        tagNavList(){
            return this.$store.state.app.tagNavList
        }
    }
}