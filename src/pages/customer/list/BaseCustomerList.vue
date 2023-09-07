<script setup lang="ts">
import { IonPage, IonContent, IonButton, onIonViewDidEnter } from '@ionic/vue'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { find } from 'lodash'
import { ContactListAPI } from '../../../interfaces/contact'
import { goToPage } from '../../../routes/'
import { useToggleComponent } from '../../../composable/toggle-show-hide-component'
import { arrowLeft, burgerMenu2, plus } from '../../../utils/svg'
import * as sweetalertDialog from '../../../utils/sweetalert-dialog'
import CustomCustomerList from './CustomerList.vue'
import SkeletonCustomerItem from './SkeletonCustomerItem.vue'
import CustomModalMainMenu from '../../../components/modal/MainMenu.vue'
import CustomIcon from '../../../components/Icon.vue'
import CustomPageReload from '../../../components/PageReload.vue'
import CustomHeader from '../../../components/layout/Header.vue'
import CustomSearchbar from '../../../components/Searchbar.vue'
import CustomModalOption from '../../../components/modal/Option.vue'

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
const customerList = ref<ContactListAPI[]>([])
const selectedCustomer = ref('')

onIonViewDidEnter(() => {
  fetchCustomerList()
})
/**
 * Set selected customer for option
 * @param customerId
 */
function setSelectedCustomer(customerId: string) {
  selectedCustomer.value = customerId
  modalOptionState.toggling()
}

async function fetchCustomerList() {
  await store.dispatch('customer/getAll')
  customerList.value = store.getters['customer/getAll']
}
function openWhatsapp() {
  const customer = find(customerList.value, { id: selectedCustomer.value })
  const phoneNumber = '62' + customer?.phone_number.slice(1)
  sweetalertDialog
    .confirm(`Buka kontak "${customer?.name}" di Whatapp ?`, 'Ya, buka')
    .then((result) => {
      if (result.isConfirmed) {
        modalOptionState.toggling()
        window.open(`https://wa.me/${phoneNumber}`)
      }
    })
}
function editCustomer() {
  modalOptionState.toggling()
  goToPage(`/customer/edit/${selectedCustomer.value}`)
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
        <ion-button @click="goToPage('/customer/add', { replace: true })">
          <custom-icon :svg-icon="plus" width="24"></custom-icon>
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
      <custom-customer-list v-if="customerList!.length > 0" :customer-list="customerList!"
        @item-nav-click="setSelectedCustomer" />
      <skeleton-customer-item v-if="customerList.length == 0" />
      <custom-modal-option :is-open="modalOptionState.isOpen.value" :option-list="optionList"
        @close-modal="modalOptionState.toggling" @open-whatsapp="openWhatsapp" @edit="editCustomer" />
    </ion-content>
  </ion-page>
</template>
