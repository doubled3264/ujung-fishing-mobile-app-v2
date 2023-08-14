import { RouteRecordRaw } from 'vue-router'

declare module 'vue-router' {
   interface RouteMeta {
      public?: boolean
      onlyLoggedOut?: boolean
   }
}

const routes: Array<RouteRecordRaw> = [
   {
      path: '/',
      redirect: '/login',
   },
   {
      path: '/login',
      component: () => import('../pages/login/BaseLogin.vue'),
      meta: {
         public: true,
         onlyLoggedOut: true,
      },
   },
   {
      path: '/register',
      component: () => import('../pages/register/BaseRegister.vue'),
      meta: {
         public: true,
         onlyLoggedOut: true,
      },
   },
]

export default routes
