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
   IonRippleEffect,
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
const mainMenuItem = [
   {
      title: 'pelanggan',
      child: [
         {
            icon: user,
            label: 'daftar pelanggan',
            action: () => {
               navigateTo('/customer')
            },
         },
         { icon: order, label: 'daftar pesanan', action: () => {} },
         { icon: bill, label: 'daftar tagihan', action: () => {} },
      ],
   },
   {
      title: 'sales',
      child: [
         { icon: trolley, label: 'daftar sales', action: () => {} },
         { icon: bill, label: 'daftar tagihan', action: () => {} },
         { icon: bill, label: 'daftar tagihan', action: () => {} },
      ],
   },
   {
      title: 'barang',
      child: [
         {
            icon: box,
            label: 'daftar barang',
            action: () => {
               navigateTo('/product')
            },
         },
         {
            icon: box,
            label: 'daftar brand',
            action: () => {
               navigateTo('/product/brand')
            },
         },
      ],
   },
   {
      title: 'akun',
      child: [{ icon: logout, label: 'keluar', action: logOutAction }],
   },
]

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
            <div v-for="(item, index) in mainMenuItem" :key="index + 1">
               <h3>{{ item.title }}</h3>
               <ion-list lines="none">
                  <ion-item
                     class="ion-activatable"
                     v-for="(subItem, subIndex) in item.child"
                     :key="subIndex + 1"
                     @click="subItem.action"
                  >
                     <custom-icon
                        :svg-icon="subItem.icon"
                        width="20"
                     ></custom-icon>
                     <ion-label>{{ subItem.label }}</ion-label>
                     <ion-ripple-effect></ion-ripple-effect>
                  </ion-item>
               </ion-list>
            </div>
         </div>
      </ion-content>
   </ion-modal>
</template>
