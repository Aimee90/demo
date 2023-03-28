/**
 * @author: zoolin
 * create time: 2022-02-10 14:54:11
*/
import event from '@/libs/vue-event'


let searcherFac = {
  name: 'searcherFac',
  props: {
    immediate: {
        type: Boolean,
        default: true
    },
    fields: {
        type: Array,
        default: ()=>[]
    }
  },
  data(){
      return {
          params: {},
          event
      }
  },
  mounted(){
      this.resetParams()
      this.$nextTick(()=>this.immediate&&this.$emit('on-search', this.params))
  },
  render(h){ 
    return (<Row class="searchLine">{_(this.fields).chain().map(field=>{
        let con = ''
        if(field.hasOwnProperty('slot')&&this.$slots.hasOwnProperty(field.key)){
            con = (<div class="flex-row align-row">{ _.map(this.$slots[field.key], slot=>slot) }</div>)
        }else if(_.isFunction(field.render)){
            con = field.render()
        }else{  
            switch (field.el) { 
                case '_blank': 
                  con = (<span></span>);
                  break;
                case 'select': 
                  con = (<Select placeholder={field.title} v-model={this.params[field.key]}>
                      {_.map(field.options.enums, o=><Option value={o.id}>{o.label}</Option>)}
                  </Select>);
                  break;
                case 'datepicker':
                  con = (<DatePicker placeholder={field.title} v-model={this.params[field.key]} editable={false}></DatePicker>);
                  break;
                case 'date-range': 
                  con = (<DatePicker type="daterange" v-model={this.params[field.key]} style="width: 100%;" editable={false}/>);
                  break;
                default: 
                  con = (<Input placeholder={field.title} v-model={this.params[field.key]}></Input>);
                  break;
            }
        } 
        return [
            undefined!==field.title?(<Col span={field.tspan||2}><span class="titleClass">{field.title}</span></Col>):'',
            (<Col span={field.span||3}>{con}</Col>)
          ]
    }).flatten().concat(
      <Col class="query" span="4">
          <Button type="primary" v-on:click={this.search.bind(this)} style="margin-right: 3px;">查询</Button>
          <Button v-on:click={this.reset.bind(this)}>重置</Button>
      </Col>).value()}</Row>) 
  },
  methods: {
    resetParams(){
        _.forEach(this.fields, field=>{
          '_blank'!==field.el&&this.$set(this.params, field.key, field.value||null)
        })
    },
    reset(){
      this.resetParams() 
      this.event.$emit('searcher-reset', this.search)
    },
    search(){
      this.$emit('on-search', this.params)
    },
  },
  watch: {
    params: { 
      deep: true,
      handler(nv){
        this.event.$emit('searcher-set', nv)
      }
    }
  },
}
export default searcherFac