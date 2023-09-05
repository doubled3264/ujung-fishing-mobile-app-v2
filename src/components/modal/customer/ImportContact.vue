<script setup lang="ts">
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonContent,
  IonList,
  IonItem,
  IonButtons,
  IonButton,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from '@ionic/vue'
import { nextTick, ref } from 'vue'
import { cloneDeep } from 'lodash'
import { Contacts } from '@capacitor-community/contacts'
import { ContactProjection } from '../../../interfaces/contact'
import { cross, phone, plus } from '../../../utils/svg'
import CustomSearchbar from '../../Searchbar.vue'
import CustomIcon from '../../Icon.vue'

const props = defineProps({
  isOpen: Boolean,
})
const emit = defineEmits(['closeModal', 'processContact'])
const contactList = ref<Array<ContactProjection>>([])
let searchResult = <Array<ContactProjection>>[]
let contactProjectionList = <Array<ContactProjection>>[]
let contactToSave = <ContactProjection>{}

function cleanPhoneNumber(phoneNumber: string) {
  let result = ''
  const raw = phoneNumber.replace(/[^a-zA-Z0-9]/g, '')
  if (raw.charAt(0) == '6') {
    result = raw.slice(2)
    result = '0' + result
  } else {
    result = raw
  }
  return result
}

async function fetchContact() {
  contactProjectionList = []
  const result = await Contacts.getContacts({
    projection: {
      // Specify which fields should be retrieved.
      name: true,
      phones: true,
    },
  })

  result.contacts.forEach((item) => {
    if (item.phones) {
      contactProjectionList.push({
        id: item.contactId,
        name: item.name?.display,
        phone_number: cleanPhoneNumber(item.phones[0].number!),
      })
    }
  })
  searchResult = cloneDeep(contactProjectionList)
  contactList.value = cloneDeep(contactProjectionList.slice(0, 10))
  await nextTick()
}

function handleChange(event: any) {
  contactList.value = []
  const query = event.target.value.toLowerCase()
  searchResult = cloneDeep(
    contactProjectionList.filter(
      (item: any) => item.name.toLowerCase().indexOf(query) > -1
    )
  )
  contactList.value = cloneDeep(searchResult.slice(0, 10))
}

function generateItems() {
  const contactListLength = contactList.value.length
  searchResult.forEach((item, index) => {
    if (index >= contactListLength && index <= contactListLength - 1 + 10) {
      contactList.value.push(cloneDeep(item))
    }
  })
}

function ionInfinite(ev: any) {
  generateItems()
  ev.target.complete()
}

function closeModal() {
  if (props.isOpen) {
    contactList.value = []
    contactProjectionList = []
    searchResult = []
    emit('closeModal')
  }
}

function selectedContact(contactId: string) {
  contactProjectionList.forEach((item: any) => {
    if (item.id == contactId) {
      contactToSave = item
    }
  })
  emit('processContact', contactToSave)
  closeModal()
}
</script>
<template>
  <ion-modal :is-open="isOpen" @didDismiss="closeModal" @didPresent="fetchContact" :initial-breakpoint="0.65"
    class="modal-import-contact">
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="closeModal">
            <custom-icon :svg-icon="cross" width="16"></custom-icon>
          </ion-button>
        </ion-buttons>
        <custom-searchbar placeholder="Masukan nama" @on-change="handleChange" />
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list lines="none">
        <ion-item v-for="(item, index) in contactList" :key="index + 1">
          <div class="modal-import-contact__item">
            <div class="modal-import-contact__info">
              <h3>{{ item.name }}</h3>
              <p>
                <span>
                  <custom-icon :svg-icon="phone" width="12" />
                </span>
                {{ item.phone_number }}
              </p>
            </div>
            <div class="modal-import-contact__nav" @click="selectedContact(item.id)">
              <custom-icon :svg-icon="plus" width="20" />
            </div>
          </div>
        </ion-item>
      </ion-list>
      <ion-infinite-scroll @ionInfinite="ionInfinite">
        <ion-infinite-scroll-content loading-text="Please wait..."
          loading-spinner="bubbles"></ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ion-content>
  </ion-modal>
</template>
