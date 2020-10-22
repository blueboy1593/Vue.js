import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import login from '@/views/Login'

Vue.use(VueRouter)

// 여기 있는 구조만 기억하면 된다는데?? urls.py 랑 비슷한 역할을 한다고 하는 듯.
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
