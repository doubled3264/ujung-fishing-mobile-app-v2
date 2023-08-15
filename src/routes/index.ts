import { createRouter, createWebHistory } from '@ionic/vue-router'
import { includes, last } from 'lodash'
import store from '../store'
import publicRoute from './public'
import privateRoute from './private'
import terminal from 'virtual:terminal'

const router = createRouter({
   history: createWebHistory(),
   routes: [...publicRoute, ...privateRoute],
})

router.beforeEach(async (to, _from, next) => {
   let isAuthenticated = false
   let role = ''
   let isPublic = last(to.matched)!.meta.public
   let allowedRoles: any = last(to.matched)!.meta.role

   await store
      .dispatch('auth/getAccess')
      .then(() => {
         isAuthenticated = true
         role = store.getters['auth/getAdmin'].role
      })
      .catch(() => {
         isAuthenticated = false
      })
   //
   //if not public
   if (!isPublic) {
      // if not authenticated
      if (!isAuthenticated) {
         next({ path: '/login' })
      } else {
         // if authenticated but role not allowed
         if (!includes(allowedRoles, role)) {
            next({ path: '/home' })
         } else {
            next()
         }
      }
      //   //check if authenticated, direct to private route
   } else {
      if (isAuthenticated) {
         next({ path: '/home' })
      } else {
         next()
      }
   }
})

export const goToPage = (
   path: string,
   args: { replace: boolean } = { replace: false }
) => {
   const { replace } = args
   terminal.log(replace)
   router.push({ path, replace })
}

export default router
