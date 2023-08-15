import { ErrorStateItem } from './'

export interface ContactAddForm {
  name: ErrorStateItem
  phone_number: ErrorStateItem
}

export interface ContactEditForm extends ContactAddForm { }
