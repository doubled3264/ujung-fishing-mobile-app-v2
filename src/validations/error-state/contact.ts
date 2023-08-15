import { ref } from 'vue'

export const contactAddForm = () => {
  const errorState = ref({
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
    errorState,
  }
}

export const contactEditForm = contactAddForm
