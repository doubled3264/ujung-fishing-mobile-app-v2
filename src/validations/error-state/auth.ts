import { ref, toRef } from 'vue'

export const loginForm = () => {
   const errorState = ref({
      email: {
         isError: true,
         message: '',
      },
      password: {
         isError: true,
         message: '',
      },
   })

   return {
      errorState: toRef(errorState, 'value'),
   }
}

export const registerForm = () => {
   const errorState = ref({
      email: {
         isError: true,
         message: '',
      },
      password: {
         isError: true,
         message: '',
      },

      name: {
         isError: true,
         message: '',
      },

      phone_number: {
         isError: true,
         message: '',
      },
   })

   return {
      errorState: toRef(errorState, 'value'),
   }
}
