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
  terminal.log('beforeEach run')
  let isAuthenticated = false
  let role = ''
  let isPublic = last(to.matched)!.meta.public
  let allowedRoles: any = last(to.matched)!.meta.role

  await store
    .dispatch('auth/getAccess')
    .then(() => {
      terminal.log('is authorize')
      isAuthenticated = true
      role = store.getters['auth/getAdmin'].role
      terminal.log(role)
    })
    .catch(() => {
      isAuthenticated = false
      terminal.log('is un authorize')
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
      terminal.log('user is authenticated')
      next({ path: '/home' })
    } else {
      next()
    }
  }
})

export const goToPage = (path: string, replace: boolean = false) => {
  router.push({ path, replace })
}

export default router
