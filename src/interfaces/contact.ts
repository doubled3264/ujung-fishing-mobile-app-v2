export interface Contact {
   id: string
   contact_person_id: string
   name: string
   phone_number: string
}

export interface ContactProjection
   extends Omit<Contact, 'contact_person_id' | 'name'> {
   name: any
}

export interface ContactListAPI extends Omit<Contact, 'contact_person_id'> {}
