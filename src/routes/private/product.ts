import { RouteRecordRaw } from 'vue-router'
import brand from './brand'

const product: RouteRecordRaw[] = [
   {
      path: '/product',
      name: 'product',
      component: () => import('../../pages/product/BaseProduct.vue'),
      meta: { public: false, role: ['super', 'admin'] },
      children: [
         {
            path: '',
            name: 'product list',
            component: () => import('../../pages/product/BaseProductList.vue'),
            meta: { public: false, role: ['super', 'admin'] },
         },
         {
            path: 'add',
            name: 'product add',
            component: () => import('../../pages/product/BaseProductAdd.vue'),
            meta: { public: false, role: ['super', 'admin'] },
         },
         ...brand,
      ],
   },
]

export default product
