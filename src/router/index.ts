import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import CommunityView from '../views/CommunityView.vue'
import SignView from '../views/SignView.vue'
import NotFound from '../views/NotFound.vue'
import MatchHistory from '../views/MatchHistory.vue'
import ResetPassword from '../views/ResetPassword.vue'
import codePartComponent from '../views/codePartComponent.vue'
import CodeSubmitView from '../views/CodeSubmitView.vue'
import chatComponent from '../views/chatComponent.vue'
import ProfileComponent from '../views/ProfileComponent.vue'
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
  },
  {
    path: '/matchhistory',
    name: 'matchhistory',
    component: MatchHistory
  },
  {
    path: '/resetpass',
    name: 'findpass',
    component: ResetPassword
  },
  {
    path: '/code',
    name: 'code',
    component: codePartComponent
  },
  {
    path: '/codeSubmit',
    name: 'codeSubmit',
    component: CodeSubmitView
  },
  { path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound
  },
  {
    path: '/chat',
    name: 'chat',
    component: chatComponent
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileComponent
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
