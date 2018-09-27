// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import echarts from 'echarts'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'; 
import http from "@/service/fetch";
import api from "@/service/api"
Vue.prototype.$http=http;//axios全局方法
Vue.prototype.$api=api;//axios全局方法
Vue.use(Mint);
Vue.config.productionTip = false


Vue.prototype.$echarts = echarts 

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,store,
  components: { App },
  template: '<App/>'
})
