/**
 * @author: zoolin
 * create time: 2021-07-30 14:38:27
*/
//数据存储
export default {
    state: {
        cache: {},
    },
    mutations: {
        setData(state, data){
            state.cache = data
        },
        setCache(state, obj){
            const cacheData = JSON.parse(JSON.stringify(state.cache)), keys = _.keys(obj)
            if(!_.isEmpty(keys)){
                const key = keys[0]
                cacheData[key] = obj[key]
            }
            state.cache = cacheData
        }
    },
    actions: {
        setData({ commit }, { data, key }){
            const _key = key||Math.floor(Math.random()*1E10)
            let obj = {}
            obj[_key] = data
            commit('setCache', obj)
            return _key
        },
        rmData({commit, state}, key){
            let nData = _.omit(state.cache, [key])
            commit('setData', nData)
        },
        getProcedureCache({ state}, key){
            return state.cache[key]
        }
    },
}