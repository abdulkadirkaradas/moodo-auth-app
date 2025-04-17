import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/LoginPage.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../components/RegisterPage.vue'),
    },
    {
      path: '/refresh-token',
      name: 'refreshToken',
      component: () => import('../components/RefreshTokenPage.vue'),
    }
  ],
})

export default router
