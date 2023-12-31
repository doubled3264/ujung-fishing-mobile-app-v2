import { RouteRecordRaw } from 'vue-router'

const customer: RouteRecordRaw[] = [
   {
      path: '/customer',
      name: 'customer',
      component: () => import('../../pages/customer/BaseCustomer.vue'),
      meta: { public: false, role: ['super', 'admin'] },
      children: [
         {
            path: '',
            name: 'customer list',
            component: () =>
               import('../../pages/customer/list/BaseCustomerList.vue'),
            meta: { public: false, role: ['super', 'admin'] },
         },
         {
            path: 'add',
            name: 'customer add',
            component: () => import('../../pages/customer/BaseCustomerAdd.vue'),
            meta: { public: false, role: ['super', 'admin'] },
         },
         {
            path: 'edit/:customerId',
            name: 'customer edit',
            component: () =>
               import('../../pages/customer/BaseCustomerEdit.vue'),
            meta: { public: false, role: ['super', 'admin'] },
         },
      ],
   },
]

export default customer
