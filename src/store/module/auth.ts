import axios from 'axios'
import * as axiosAuth from '../../middleware/auth'
import { Admin } from '../../interfaces/auth'

interface State {
   admin: Admin
}

export default {
   namespaced: true,
   state: {
      admin: {},
      isAuthorize: false,
   },
   getters: {
      getAdmin: (state: State) => {
         return state.admin
      },
   },
   mutations: {
      setAdmin: (state: State, data: any) => {
         state.admin = data
      },
   },
   actions: {
      async register({}, credentials: any) {
         return new Promise((resolve, reject) => {
            axios
               .post('auth/register', credentials)
               .then((response) => {
                  resolve(response)
               })
               .catch((err) => {
                  reject(err)
               })
         })
      },
      async signIn({}: any, credentials: any) {
         return new Promise<void>((resolve, reject) => {
            axios
               .post('auth/login', credentials)
               .then((response) => {
                  axiosAuth.storeAccessToken(response.data.data.token.access)
                  axiosAuth.storeRefreshToken(response.data.data.token.refresh)
                  resolve()
               })
               .catch((err) => {
                  reject(err)
               })
         })
      },
      async getAccess({ commit }: any) {
         return new Promise<void>((resolve, reject) => {
            axiosAuth.setAxiosHeader()
            axios
               .get('auth/check-fe-access')
               .then((response) => {
                  commit('setAdmin', response.data.data)
                  resolve()
               })
               .catch((err) => {
                  reject(err)
               })
         })
      },
      async refreshToken({}: any) {
         const token = {
            refresh_token: axiosAuth.getRefreshToken(),
         }
         return new Promise<void>((resolve, reject) => {
            axios
               .post('auth/refresh-token', token)
               .then((response: any) => {
                  resolve(response)
               })
               .catch((err) => {
                  reject(err)
               })
         })
      },
      async logout({}: any) {
         const token = {
            refresh_token: axiosAuth.getRefreshToken(),
         }
         return new Promise<void>((resolve, reject) => {
            axios
               .post('auth/logout', token)
               .then((response: any) => {
                  resolve(response)
               })
               .catch((err) => {
                  reject(err)
               })
         })
      },
   },
}
