import { object } from 'yup'
import { name, phone_number } from '../index'

export const add = object({
   name,
   phone_number,
})
