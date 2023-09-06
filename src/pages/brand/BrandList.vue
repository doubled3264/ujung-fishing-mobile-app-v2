<script setup lang="ts">
import { IonPage, IonContent, IonButton, onIonViewDidEnter } from '@ionic/vue'
import { goToPage } from '../../routes'
import { useToggleComponent } from '../../composable/toggle-show-hide-component'
import { arrowLeft, burgerMenu2, plus } from '../../utils/svg'
import CustomHeader from '../../components/layout/Header.vue'
import CustomPageReload from '../../components/PageReload.vue'
import CustomModalMainMenu from '../../components/modal/MainMenu.vue'

import CustomIcon from '../../components/Icon.vue'

const modalMainMenuState = useToggleComponent()
</script>
<template>
   <ion-page class="brand-list-page">
      <custom-page-reload />
      <custom-header title="Daftar brand">
         <template #nav-start>
            <ion-button
               @click="goToPage('/home', { replace: true })"
               id="open-modal-option"
            >
               <custom-icon :svg-icon="arrowLeft" width="24"></custom-icon>
            </ion-button>
         </template>
         <template #nav-end>
            <ion-button
               @click="goToPage('/product/brand/add', { replace: true })"
            >
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
         <custom-modal-main-menu
            :is-open="modalMainMenuState.isOpen.value"
            @close-modal="modalMainMenuState.toggling"
         />
      </ion-content>
   </ion-page>
</template>
