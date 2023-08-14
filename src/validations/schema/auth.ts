import { object } from 'yup'
import {
  email,
  password,
  confirmPassword as confirm_password,
  name,
  phone_number,
} from '../index'

export const register = object().shape(
  {
    email,
    password,
    confirm_password,
    name,
    phone_number,
  },
  [
    ['email', 'email'],
    ['password', 'password'],
    ['confirm_password', 'confirm_password'],
    ['name', 'name'],
    ['phone_number', 'phone_number'],
  ]
)

export const login = object({
  email,
  password,
})
