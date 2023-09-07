import { object } from 'yup'
import { commonString } from '../'

const name = commonString('Nama tidak boleh kosong.')
const category = commonString('Kategori tidak boleh kosong.')
const brandName = commonString('Brand tidak boleh kosong.')

export const add = object({
  name,
  category,
  brandName,
})
