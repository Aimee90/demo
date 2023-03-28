<!-- 
  v-model 数据绑定值
  data 数据格式需要转化为[{id, name}]格式 
  current 当前页
  pages 总页数
  loading 筛选时是否展示loading
  onPage  触发分页（上一页/下一页）
  filterable 是否支持筛选
  on-search 在 filterable为true时 触发筛选
  placeholder
 -->
<template>
  <div style="position:relative">
      <sf-pagination-select 
        v-model="pageSelected"
        @on-page="onPage" 
        @on-search="onSearch"
        :data="ps.data"
        :current="ps.pageNum"
        :pages="ps.total"
        placeholder="请选择"
        filterable
        style="width: 200px;margin: 100px auto;"></sf-pagination-select>
  </div>
</template>
<script>
  import sfPaginationSelect from '_c/sf-pagination-select'
  import { strategyList } from '@/api/grant'
  export default {
    name: 'paginationSelect',
    components: {sfPaginationSelect},
    data(){
      return {
        pageSelected: null,
        ps: {
          data: [],
          name: '',
          pageNum: 1,
          total: 0,
          loading: false
        }
      }
    },
    mounted(){
      this.selectSearch()
    },
    methods: {
      onSearch(v){
        this.ps.pageNum = 1
        this.ps.name = v
        this.selectSearch()
      },
      onPage(v){
        this.ps.pageNum = v
        this.selectSearch()
      },
      selectSearch(){
        this.ps.loading = true
        let tmp = _.cloneDeep(this.ps)
        tmp.pageSize = 2
        strategyList(tmp).then(res=>{
          this.ps.loading = false
          if(0 == res.data.code){
            this.ps.data = _.map(res.data.data.list, o=>_.assign({}, {id: o.id, name: o.ruleName}))
            this.ps.total = res.data.data.pages
          }else{
            this.ps.data = []
            this.ps.total = 0
          }

          console.log('ps:',this.ps.pageNum, this.ps.total)
        }).catch(e=>{
          this.ps.loading = false
          this.ps.data = []
          this.ps.total = 0
        })
      }
    },
    watch: {
      pageSelected(nv){
        console.log('pageSelected:', nv)
      }
    }
  }
</script>