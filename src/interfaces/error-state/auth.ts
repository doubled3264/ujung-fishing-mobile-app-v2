import { ErrorStateItem } from './'

export interface LoginForm {
   email: ErrorStateItem
   password: ErrorStateItem
}

export interface RegisterForm {
   email: ErrorStateItem
   password: ErrorStateItem
   name: ErrorStateItem
   phone_number: ErrorStateItem
}
