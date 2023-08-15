<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButton,
  onIonViewDidEnter,
  onIonViewDidLeave,
} from '@ionic/vue'
import { ref } from 'vue'
import { useStore } from 'vuex'
import terminal from 'virtual:terminal'
import { ContactListAPI } from '../../interfaces/contact'
import { goToPage } from '../../routes/'
import { useToggleComponent } from '../../composable/toggle-show-hide-component'
import { arrowLeft, userAdd, burgerMenu2 } from '../../utils/svg'
import * as sweetalertDialog from '../../utils/sweetalert-dialog'
import CustomModalMainMenu from '../../components/modal/MainMenu.vue'
import CustomIcon from '../../components/Icon.vue'
import CustomPageReload from '../../components/PageReload.vue'
import CustomHeader from '../../components/layout/Header.vue'
import CustomSearchbar from '../../components/Searchbar.vue'
import ModalOption from '../../components/modal/Option.vue'
import { find } from 'lodash'


const store = useStore()
const modalMainMenuState = useToggleComponent()
const modalOptionState = useToggleComponent()
const optionList = ref([
  {
    label: 'buka di whatsapp',
    isActive: true,
    event: 'openWhatsapp',
  },
  {
    label: 'ubah data',
    isActive: true,
    event: 'edit',
  },
])
const customerList = ref<ContactListAPI[]>()

onIonViewDidEnter(async () => {
  await fetchCustomerList()
})

async function fetchCustomerList() {
  await store.dispatch('customer/getAll')
  terminal.log(store.getters['customer/getAll'])
}

function openWhatsapp() {
  terminal.log('openWhatsapp fired.')
}

function editCustomer() {
  //modalOptionState.toggling()
  //goToPage(`/customer-edit/${customerDataForOption.value?.id}`)
}
</script>
<template>
  <ion-page class="customer-list-page">
    <custom-page-reload />
    <custom-header>
      <template #nav-start>
        <ion-button @click="goToPage('home', { replace: true })" id="open-modal-option">
          <custom-icon :svg-icon="arrowLeft" width="24"></custom-icon>
        </ion-button>
      </template>
      <template #nav-end>
        <ion-button @click="goToPage('/customer/add')">
          <custom-icon :svg-icon="userAdd" width="24"></custom-icon>
        </ion-button>
        <ion-button @click="modalMainMenuState.toggling">
          <custom-icon :svg-icon="burgerMenu2" width="26"></custom-icon>
        </ion-button>
      </template>
      <template #searchbar>
        <custom-searchbar placeholder="Cari pelanggan" />
      </template>
    </custom-header>
    <ion-content>
      <custom-modal-main-menu :is-open="modalMainMenuState.isOpen.value" @close-modal="modalMainMenuState.toggling" />
      <custom-modal-option :is-open="modalOptionState.isOpen.value" :option-list="optionList"
        @close-modal="modalOptionState.toggling" @open-whatsapp="openWhatsapp" @edit="editCustomer" />
    </ion-content>
  </ion-page>
</template>
