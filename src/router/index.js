import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import Jobs from '@/views/jobs'
import Migration from '@/views/Migration'
import Works from '@/views/works'
import Upload from '@/views/upload'
import Geo from '@/views/geo'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/jobs',
      name: 'jobs',
      component: Jobs
    },
    {
      path: '/migration',
      name: 'migration',
      component: Migration
    },
    {
      path: '/works',
      name: 'works',
      component: Works
    },
    {
      path: '/upload',
      name: 'upload',
      component: Upload
    },
    {
      path: '/geo',
      name: 'geo',
      component: Geo
    }
  ]
})
