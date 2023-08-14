<script setup lang="ts">
import {
   IonModal,
   IonHeader,
   IonContent,
   IonToolbar,
   IonTitle,
   IonButtons,
   IonButton,
   IonLabel,
   IonList,
   IonItem,
} from '@ionic/vue'
import { order, cross, user, bill, box, trolley, logout } from '../../utils/svg'
import { useStore } from 'vuex'
import { goToPage } from '../../routes'
import * as axiosAuth from '../../middleware/auth'
import * as sweetalertDialog from '../../utils/sweetalert-dialog'
import CustomIcon from '../Icon.vue'

const props = defineProps({
   isOpen: Boolean,
})
const emit = defineEmits(['closeModal'])
const store = useStore()

function closeModal() {
   if (props.isOpen) {
      emit('closeModal')
   }
}

async function logOutAction() {
   sweetalertDialog
      .confirm('Akun anda akan dikeluarkan.', 'Ya, keluar')
      .then(async (result) => {
         if (result.isConfirmed) {
            await store.dispatch('auth/logout').then(() => {
               axiosAuth.removeAccessToken()
               axiosAuth.removeRefreshToken()
               axiosAuth.removeAxiosHeader()
               closeModal()
               goToPage('/login')
            })
         }
      })
}

function navigateTo(path: string) {
   emit('closeModal')
   goToPage(path)
}
</script>
<template>
   <ion-modal
      :is-open="isOpen"
      @didDismiss="closeModal"
      class="modal-main-menu"
   >
      <ion-header class="ion-no-border">
         <ion-toolbar>
            <ion-title>menu utama</ion-title>
            <ion-buttons slot="start">
               <ion-button @click="closeModal">
                  <custom-icon :svg-icon="cross" width="16"></custom-icon>
               </ion-button>
            </ion-buttons>
         </ion-toolbar>
      </ion-header>
      <ion-content>
         <div class="modal-main-menu__inner">
            <h3>pelanggan</h3>
            <ion-list lines="none">
               <ion-item @click="navigateTo('/customer')">
                  <custom-icon :svg-icon="user" width="20"></custom-icon>
                  <ion-label>daftar pelanggan</ion-label>
               </ion-item>
               <ion-item @click="">
                  <custom-icon :svg-icon="order" width="20"></custom-icon>
                  <ion-label>daftar pesanan</ion-label>
               </ion-item>
               <ion-item @click="">
                  <custom-icon :svg-icon="bill" width="20"></custom-icon>
                  <ion-label>daftar tagihan</ion-label>
               </ion-item>
            </ion-list>
            <h3>sales</h3>
            <ion-list lines="none">
               <ion-item>
                  <custom-icon :svg-icon="trolley" width="20"></custom-icon>
                  <ion-label>daftar sales</ion-label>
               </ion-item>
               <ion-item>
                  <custom-icon :svg-icon="bill" width="20"></custom-icon>
                  <ion-label>daftar tagihan</ion-label>
               </ion-item>
            </ion-list>
            <h3>barang</h3>
            <ion-list lines="none">
               <ion-item @click="navigateTo('/product-list')">
                  <custom-icon :svg-icon="box" width="20"></custom-icon>
                  <ion-label>daftar barang</ion-label>
               </ion-item>
            </ion-list>
            <h3>akun</h3>
            <ion-list lines="none">
               <ion-item @click="logOutAction">
                  <custom-icon :svg-icon="logout" width="20"></custom-icon>
                  <ion-label>keluar</ion-label>
               </ion-item>
            </ion-list>
         </div>
      </ion-content>
   </ion-modal>
</template>
