//全局this.$http//Vue.http
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)
const state={
  companyId:99,
  checkindex:0,
  dateStyle:1,//默认日期状态是天
  dateStaus:"",//默认日期状态是天前
  dayweek:"",//默认日期状态是天前
}
const actions={
editdayweek({ commit },data){ //触发获取数据
  commit('Editdayweek',data);
},
}
const mutations={
  editId(state,item){
      state.companyId=item.DepartmentId;
      state.checkindex=item.checkindex;
  },
  editdateStyle(state,status){//修改日期状态
      state.dateStyle=status;
  },
  Editdayweek(state,status){//传4天的值
    state.dayweek=status.weekTite;
},
}
export default new Vuex.Store({
  state,
  mutations,
  actions
})
