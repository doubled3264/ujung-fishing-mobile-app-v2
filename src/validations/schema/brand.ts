import { object } from 'yup'
import { commonString } from '../'

export const add = object({
  name: commonString('Nama brand tidak boleh kosong.'),
})
