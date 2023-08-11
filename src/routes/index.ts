import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
   {
      path: '/',
      name: 'login',
      component: () => import('../pages/login/BaseLogin.vue'),
   },
]

const router = createRouter({
   history: createWebHistory(),
   routes,
})

export default router
