import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import changeCity from '@/components/changeCity'
import undelivered from '@/components/undelivered'
import examination from '@/components/examination'
import purchasing_agent from '@/components/purchasing_agent'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index  //首页
    },
    {
      path: '/changeCity',
      name: 'changeCity',
      component: changeCity
    },
    {
      path: '/undelivered',
      name: 'undelivered',
      component: undelivered
    },
    {
      path: '/examination',
      name: 'examination',
      component: examination
    },
    {
      path: '/purchasingAgent',
      name: 'purchasing_agent',
      component: purchasing_agent
    }
  ]
})
