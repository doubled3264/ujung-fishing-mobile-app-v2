import { ref } from 'vue'

export const brandAddForm = () => {
  const errorState = ref({
    name: {
      isError: true,
      message: '',
    },
  })
  return {
    errorState,
  }
}
