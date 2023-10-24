import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import CommunityView from '../views/CommunityView.vue'
import SignView from '../views/SignView.vue'
import NotFound from '../views/NotFound.vue'
import MatchHistory from '../views/MatchHistory.vue'
import ResetPassword from '../views/ResetPassword.vue'
import codePartComponent from '../views/codePartComponent.vue'
import chatComponent from '../views/chatComponent.vue'
import ProfileComponent from '../views/ProfileComponent.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }

  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
    },
  {
    path: '/community',
    name: 'community',
    component: CommunityView,
    meta: { requiresAuth: true }

  },
  {
    path: '/sign',
    name: 'sign',
    component: SignView
  },
  {
    path: '/matchhistory',
    name: 'matchhistory',
    component: MatchHistory,
    meta: { requiresAuth: true }

  },
  {
    path: '/resetpass',
    name: 'findpass',
    component: ResetPassword
  },
  {
    path: '/code',
    name: 'code',
    component: codePartComponent,
    meta: { requiresAuth: true }

  },
  { path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound
  },
  {
    path: '/chat',
    name: 'chat',
    component: chatComponent,
    meta: { requiresAuth: true }

  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileComponent,
    meta: { requiresAuth: true }

  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})
import store from '../store/store';


router.beforeEach((to, from, next) => {
  // 检查即将导航到的路由是否需要认证
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 使用getter来检查用户是否已登录
    if (!store.getters.isUserLoggedIn) {
      // 如果用户未登录，重定向到登录页面
      next({ name: 'login' });
    } else {
      next(); // 如果已登录，允许导航
    }
    
  } else {
    next();  // 如果不需要认证，允许导航
  }
});
export default router

