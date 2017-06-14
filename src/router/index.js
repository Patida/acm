import Vue from 'vue'
import Router from 'vue-router'
import resultComponent from '@/components/ResultView'
import DirectionService from '@/components/SubResultMap'
import Appcimo from '@/components/Appcimo'
import RouteGeneral from '@/components/GetRoutes'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      component: Appcimo
    }
  ]
})
