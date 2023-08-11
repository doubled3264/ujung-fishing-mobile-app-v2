import { ToRef } from 'vue'
import { string } from 'yup'

interface ErrorState {
  [key: string]: {
    isError: boolean
    message: string
  }
}

export const validate = async (
  objToTest: ToRef<any>,
  errorStateObj: ToRef<ErrorState>,
  schema: any,
  field: string
) => {
  await schema
    .validateAt(field, objToTest.value)
    .then(() => {
      errorStateObj.value[field as keyof ErrorState].isError = false
    })
    .catch((err: any) => {
      errorStateObj.value[field as keyof ErrorState].isError = true
      errorStateObj.value[field as keyof ErrorState].message = err.message
    })
}


export const email = string()
  .email('Email tidak valid.')
  .trim()
  .required('Email tidak boleh kosong.')
export const password = string()
  .trim()
  .required('Password tidak boleh kosong.')
  .min(6, 'Password terlalu pendek.')
export const confirmPassword = string()
  .trim()
  .required('Konfirmasi password tidak boleh kosong.')
  .test('password-check', 'Password tidak cocok.', (value, schema) => {
    return schema.parent.password == value
  })
export const name = string().trim().required('Nama tidak boleh kosong.')
export const phone_number = string()
  .matches(/^[0-9]+$/, 'No telepon tidak valid.')
  .min(11, 'Minimal 11 karakter.')
  .max(13, 'Maksimal 13 karakter.')
  .required()
  .typeError('No telepon tidak valid.')
