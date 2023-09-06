import { RouteRecordRaw } from 'vue-router'

const brand: RouteRecordRaw[] = [
  {
    path: 'brand',
    name: 'brand',
    component: () => import('../../pages/brand/BaseBrand.vue'),
    meta: { public: false, role: ['super', 'admin'] },
    children: [
      {
        path: '',
        name: 'brand list',
        component: () => import('../../pages/brand/BrandList.vue'),
        meta: { public: false, role: ['super', 'admin'] },
      },
      {
        path: 'add',
        name: 'brand add',
        component: () => import('../../pages/brand/BrandAdd.vue'),
        meta: { public: false, role: ['super', 'admin'] },
      }
    ],
  },
]

export default brand
