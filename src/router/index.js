import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/1-1"
  },
  {
    path: '/1-1',
    name: '1-1',
    component: () => import(/* webpackChunkName: "about" */ '@/views/1-1.vue')
  },
  {
    path: '/2-1',
    name: '2-1',
    component: () => import(/* webpackChunkName: "about" */ '@/views/2-1.vue')
  },
  {
    path: '/3-1',
    name: '3-1',
    component: () => import(/* webpackChunkName: "about" */ '@/views/3-1.vue')
  },
  {
    path: '/4-1',
    name: '4-1',
    component: () => import(/* webpackChunkName: "about" */ '@/views/4-1.vue')
  },
  {
    path: '/5-1',
    name: '5-1',
    component: () => import(/* webpackChunkName: "about" */ '@/views/5-1.vue')
  },
  {
    path: '/6-1',
    name: '6-1',
    component: () => import(/* webpackChunkName: "about" */ '@/views/6-1.vue')
  },
  {
    path: '/app-page',
    name: 'app-page',
    component: () => import(/* webpackChunkName: "about" */ '@/views/AppPage.vue')
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
