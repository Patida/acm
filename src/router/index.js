import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import GoogleDirections from '@/components/GoogleDirections'
import Appcimo from '@/components/Appcimo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Hello',
      component: Hello
    },
    {
      path:'/',
      component: Appcimo
    }
  ]
})
