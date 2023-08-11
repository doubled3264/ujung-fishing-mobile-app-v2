import { object } from 'yup'
import { email, password, confirmPassword, name, phone_number } from '../index'

export const register = object().shape(
  {
    email,
    password,
    confirmPassword,
    name,
    phone_number,
  },
  [
    ['email', 'email'],
    ['password', 'password'],
    ['confirmPassword', 'confirmPassword'],
    ['name', 'name'],
    ['phone_number', 'phone_number'],
  ]
)

export const login = object({
  email,
  password,
})
