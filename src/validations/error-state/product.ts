import { ref, toRef } from 'vue'

export const productAddForm = () => {
  const errorState = ref({
    name: {
      isError: true,
      message: '',
    },
    category: {
      isError: true,
      message: '',
    },
    brandName: {
      isError: true,
      message: '',
    },
  })

  return {
    errorState: toRef(errorState, 'value'),
  }
}
