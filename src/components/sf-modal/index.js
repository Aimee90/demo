import SfModel from './sf-modal.vue'
import sfDefModal from './sf-def-modal.vue'

import { Observable } from 'rxjs'
import Vue from 'vue'
import store from '@/store'
Vue.component('SfModel', SfModel)
Vue.component('sfDefModal', sfDefModal)

// 
let modelIds = 0
let modelIdx = 100
Vue.prototype.$modal = ({
  component=null, 
  content='默认内容', 
  param={}, 
  title="标题", 
  width=340, 
  ok=()=>{}, 
  cancel=()=>{},
  fullscreen, 
  closable, 
  btns=['ok','cancel']}) => {
    
  let className = `model-${modelIds++}`, _modelId = 'm_modal_Layer';

  let componentBody = null, componentHeader = null

  let obs = new Observable().subscribe({
    next: (res) => {
      componentBody = null
      document.getElementById(_modelId).removeChild(document.querySelector(`#${_modelId} .${className}`));
      obs.unsubscribe();
      ok(res);
    },
    error: (res) => {
      componentBody = null
      document.getElementById(_modelId).removeChild(document.querySelector(`#${_modelId} .${className}`));
      obs.unsubscribe();
      cancel(res);
    },
  });
  let componentModel = Vue.component("SfModel");
  let instanceModel = new componentModel();

  if('string' === typeof component){
    componentBody = Vue.component(component);
  }else if(null==component){
    componentBody = Vue.component('sfDefModal')
  }else{
    Vue.component('componentBody4Modal', component)
    componentBody = Vue.component('componentBody4Modal')
  }

  let instanceBody = new componentBody();
  instanceModel.title = title;
  instanceModel.width = width;
  instanceModel.fullscreen = fullscreen;
  instanceModel.closable = closable;
  instanceModel.zIndex = modelIdx=modelIdx+30;
  instanceModel.dismiss = obs;

  let ins = instanceModel.$mount();


  instanceBody.$store = store
  instanceBody.context = {}
  for(let key in param){
    Vue.set(instanceBody.context, key, param[key])
  }
  instanceBody.content = content
  instanceBody.btns = btns
  instanceBody.dismiss = obs;

  instanceBody.$mount(instanceModel.$refs.slots, true);

  if('string' === typeof title){
    Vue.component('componentHeader4Modal',{name: 'componentHeader4Modal', render: h=>h('span', title)})
  }else{
    Vue.component('componentHeader4Modal', title) 
  }
  componentHeader = Vue.component('componentHeader4Modal')
  new componentHeader().$mount(instanceModel.$refs.header, false);
  

  document.getElementById(_modelId).appendChild(ins.$el);
  ins.$el.className = className+' model-bg';
  const setOverflow = () => {
    let $modal = ins.$el.getElementsByClassName('ivu-modal')[0], 
        $fdd = document.getElementById('fdd')
    if(!$modal||!$fdd) return
    let modalHeight = $modal.offsetHeight, fddHeight = $fdd.offsetHeight + 74
    if(modalHeight<fddHeight){
      $modal.getElementsByClassName('ivu-modal-body')[0].style.overflow = "auto"
    }else{
      $modal.getElementsByClassName('ivu-modal-body')[0].style.overflow = "visible"
    }
  }
  ins.$el.addEventListener('DOMSubtreeModified', ()=>{
    setTimeout(setOverflow, 200)
  })

};
