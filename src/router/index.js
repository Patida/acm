import Vue from 'vue'
import Router from 'vue-router'
import Appcimo from '@/components/Appcimo'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      component: Appcimo
    }
  ]
})
