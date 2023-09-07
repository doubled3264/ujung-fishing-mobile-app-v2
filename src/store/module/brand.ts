import axios from 'axios'
import { BrandAPI } from '../../interfaces/brand'

interface State {
  brandList: BrandAPI[]
  brand: BrandAPI
}

export default {
  namespaced: true,
  state: {
    brandList: [],
    brand: {},
  },
  getters: {
    getAll: (state: State) => {
      return state.brandList
    },
    getOne: (state: State) => {
      return state.brand
    },
  },
  mutations: {
    setAll: (state: State, data: BrandAPI[]) => {
      state.brandList = data
    },
    setOne: (state: State, data: BrandAPI) => {
      state.brand = data
    },
  },
  actions: {
    async add({ }, payload: string) {
      return new Promise((resolve, reject) => {
        axios
          .post('brand', payload)
          .then((response) => {
            resolve(response)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    async update({ }, payload: { id: string; name: string }) {
      const { id, name } = payload
      return new Promise((resolve, reject) => {
        axios
          .put(`brand/${id}`, { name })
          .then((response) => {
            resolve(response)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    async getAll({ commit }: any) {
      await axios
        .get('brand')
        .then((response) => {
          commit('setAll', response.data.data)
        })
        .catch((_err) => { })
    },
    async getOne({ commit }: any, brandId: string) {
      await axios
        .get(`brand/${brandId}`)
        .then((response) => {
          commit('setOne', response.data.data)
        })
        .catch((_err) => { })
    },
  },
}
