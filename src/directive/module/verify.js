/**
 * @author: zoolin
 * create time: 2021-11-24 10:56:34
*/
//
import { binaryUtils as bUtils } from '@/libs/util'

const TAG = 'vvtag__', ERR = 'err__', KEY="key__", SUB = 'children'
function handler(binding, vnode){
    const {refer, dataHandler} = binding.value, 
        data = vnode.context[refer],
        isFunc = _.isFunction(dataHandler)
    isFunc&&dataHandler.call(this, data, o=>{
        o[TAG] = true
    })
}
function check(binding, vnode){
    const {refer, rules, sub=SUB} = binding.value 
    const data = vnode.context[refer]
    /**
     * 
     * @param {*} cdata 
     */
    function checkField(cdata){ 
        cdata[ERR] = 0
        cdata[KEY] = Math.floor(Math.random())
        for(let field in cdata){
            if(field==sub){
                loop(cdata[sub])
            }else{
                const checkRule = rules[field]
                _.isFunction(checkRule)&&checkRule.call(this, cdata[field], function(code){ 
                    cdata[ERR] = undefined===code?cdata[ERR]:bUtils.setBinary(Number(code), cdata[ERR]) 
                }) 
            }
        }
    }
    /**
     * 
     * @param {*} data 
     */
    function loop(data){
        if(_.isArray(data)){
            _.forEach(data, item=>loop(item))
        }else{
            data.hasOwnProperty(TAG)&&checkField(data)
        }
    }
    loop(data)
}
export default {
    inserted: (el, binding, vnode) => { 
        handler.call(this, binding, vnode) 
        setImmediate(check.bind(this, binding, vnode)) 
    },
    update: (el, binding, vnode) => {
        const {refer} = binding.value 
        handler.call(this, binding, vnode) 
        check.call(this, binding, vnode)     
        vnode.context.$set(vnode.context[refer], vnode.context[refer])
        console.log('update.')
    },
}