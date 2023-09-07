import { createStore } from 'vuex'
import auth from './module/auth'
import customer from './module/customer'
import brand from './module/brand'

export default createStore({
   modules: { auth, customer, brand },
})
