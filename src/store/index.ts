import { createStore } from 'vuex'
import auth from './module/auth'
import customer from './module/customer'

export default createStore({
  modules: { auth, customer },
})
