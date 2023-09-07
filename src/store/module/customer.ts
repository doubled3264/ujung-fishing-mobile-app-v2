import axios from 'axios'
import terminal from 'virtual:terminal'
import { ContactListAPI } from '../../interfaces/contact'

interface State {
   customerList: ContactListAPI[]
   customer: ContactListAPI
}

export default {
   namespaced: true,
   state: {
      customerList: [],
      customer: {},
   },
   getters: {
      getAll: (state: State) => {
         return state.customerList
      },
      getOne: (state: State) => {
         return state.customer
      },
   },
   mutations: {
      setAll: (state: State, data: ContactListAPI[]) => {
         state.customerList = data
      },
      setOne: (state: State, data: ContactListAPI) => {
         state.customer = data
      },
   },
   actions: {
      async getAll({ commit }: any) {
         await axios
            .get('customer')
            .then((response) => {
               commit('setAll', response.data.data)
            })
            .catch((err) => {})
      },
      async add({}, credentials: any) {
         return new Promise((resolve, reject) => {
            axios
               .post('customer', credentials)
               .then((response) => {
                  resolve(response)
               })
               .catch((err) => {
                  reject(err)
               })
         })
      },
      async getOne({ commit }: any, customerId: string) {
         await axios
            .get(`customer/${customerId}`)
            .then((response) => {
               commit('setOne', response.data.data)
            })
            .catch((_err) => {
               // console.log(err)
            })
      },
      async update({}, payload: { customerId: string; data: any }) {
         const { customerId, data } = payload
         terminal.log(payload)
         return new Promise((resolve, reject) => {
            axios
               .put(`customer/${customerId}`, data)
               .then((response) => {
                  resolve(response)
               })
               .catch((err) => {
                  reject(err)
               })
         })
      },
   },
}
