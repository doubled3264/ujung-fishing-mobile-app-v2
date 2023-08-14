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
import { goToPage } from '../../routes/'
import { useToggleComponent } from '../../composable/toggle-show-hide-component'
import { arrowLeft, userAdd, burgerMenu2 } from '../../utils/svg'
import CustomModalMainMenu from '../../components/modal/MainMenu.vue'
import CustomIcon from '../../components/Icon.vue'
import CustomPageReload from '../../components/PageReload.vue'
import CustomHeader from '../../components/layout/Header.vue'
import CustomSearchbar from '../../components/Searchbar.vue'

const modalMainMenuState = useToggleComponent()
</script>
<template>
   <ion-page class="customer-list-page">
      <custom-page-reload />
      <custom-header>
         <template #nav-start>
            <ion-button @click="goToPage('home', true)" id="open-modal-option">
               <custom-icon :svg-icon="arrowLeft" width="24"></custom-icon>
            </ion-button>
         </template>
         <template #nav-end>
            <ion-button @click="goToPage('/customer-add')">
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
         <custom-modal-main-menu
            :is-open="modalMainMenuState.isOpen.value"
            @close-modal="modalMainMenuState.toggling"
         />
      </ion-content>
   </ion-page>
</template>
