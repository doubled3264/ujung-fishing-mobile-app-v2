import { RouteRecordRaw } from 'vue-router'
import customer from './customer'
import product from './product'

const routes: Array<RouteRecordRaw> = [
   {
      path: '/home',
      name: 'home',
      component: () => import('../../pages/home/BaseHome.vue'),
      meta: { public: false, role: ['super', 'admin'] },
   },
   ...customer,
   ...product,
]

export default routes
