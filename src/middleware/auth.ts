import axios from 'axios'
import store from '../store'

let isRefreshing = false

export const start = async () => {
   axios.defaults.baseURL = import.meta.env.VITE_APIURL
   axios.defaults.headers.post['Content-Type'] =
      'application/x-www-form-urlencoded'
   setAxiosHeader()
   axios.interceptors.request.use(
      (req) => {
         return req
      },
      (err) => {
         return Promise.reject(err)
      }
   )

   axios.interceptors.response.use(
      (res) => {
         return res
      },
      async (err) => {
         const { response } = await err
         const status = response.status
         const errorMessage = response.data.message
         if (
            status === 401 &&
            errorMessage === 'No authorization token was found'
         ) {
            console.log('Silahkan login kembali.')
         } else if (status === 401 && errorMessage === 'jwt expired') {
            if (!isRefreshing) {
               isRefreshing = true
               await store.dispatch('auth/refreshToken').then((response) => {
                  isRefreshing = false
                  storeAccessToken(response.data.data.token.access)
                  storeRefreshToken(response.data.data.token.refresh)
               })
            }
         }
         return Promise.reject(err)
      }
   )
}
export const storeAccessToken = (token: string) => {
   localStorage.setItem('accessToken', JSON.stringify(token))
   setAxiosHeader()
}

export const storeRefreshToken = (token: string) => {
   localStorage.setItem('refreshToken', JSON.stringify(token))
}

export const setAxiosHeader = () => {
   const data = JSON.parse(localStorage.getItem('accessToken')!)
   if (data) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
   }
}

export const removeAccessToken = () => {
   localStorage.removeItem('accessToken')
}

export const removeRefreshToken = () => {
   localStorage.removeItem('refreshToken')
}

export const removeAxiosHeader = () => {
   axios.defaults.headers.common['Authorization'] = ''
}

export const getRefreshToken = () => {
   const data = JSON.parse(localStorage.getItem('refreshToken')!)
   return data.token
}
