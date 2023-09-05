import axios from 'axios'
import { ContactListAPI } from '../../interfaces/contact'

interface State {
  customerList: ContactListAPI[]
  customer: ContactListAPI
}

export default {
  namespaced: true,
  state: {
    customerList: [],
    customer: {}
  },
  getters: {
    getAll: (state: State) => {
      return state.customerList
    },
    getOne: (state: State) => {
      return state.customer
    }
  },
  mutations: {
    setAll: (state: State, data: ContactListAPI[]) => {
      state.customerList = data
    },
    setOne: (state: State, data: ContactListAPI) => {
      state.customer = data
    }
  },
  actions: {
    async getAll({ commit }: any) {
      await axios
        .get('customer')
        .then((response) => {
          commit('setAll', response.data.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
      async add({ }, credentials: any) {
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
  },
}
