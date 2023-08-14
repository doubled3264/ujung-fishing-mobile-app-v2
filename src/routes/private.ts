import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
   {
      path: '/home',
      name: 'home',
      component: () => import('../pages/home/BaseHome.vue'),
      meta: { public: false, role: ['super', 'admin'] },
   },
   {
      path: '/customer',
      name: 'customer',
      component: () => import('../pages/customer/BaseCustomer.vue'),
      meta: { public: false, role: ['super', 'admin'] },
      children: [
         {
            path: '',
            name: 'customer list',
            component: () => import('../pages/customer/BaseCustomerList.vue'),
            meta: { public: false, role: ['super', 'admin'] },
         },
      ],
   },
]

export default routes
