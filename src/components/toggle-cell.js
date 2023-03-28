/**
 * @author: zoolin
 * create time: 2022-03-28 14:41:10
*/
//Start typing your code from here
export default {
    name: 'toggleCell',
    props: {
        text: {
            type: [String, Number],
            default: ''
        },
        readonly: {
            type: Boolean,
            default: false
        }
    },
    render(h){
        return !this.readonly?h('div', [this.$slots.default]):this.$slots.content||h('span', this.text)
    }
  }