import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import CommunityView from '../views/CommunityView.vue'
import SignView from '../views/SignView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
    },
  {
    path: '/community',
    name: 'community',
    component: CommunityView
  },
  {
    path: '/sign',
    name: 'sign',
    component: SignView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
