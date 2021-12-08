import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Road from '../views/road.vue'
import Road2 from '../views/road2.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/road',
    name: 'road',
    component: Road
  },
  {
    path: '/road2',
    name: 'road2',
    component: Road2
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
