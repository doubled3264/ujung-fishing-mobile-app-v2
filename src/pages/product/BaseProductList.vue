<script setup lang="ts">
import { IonPage, IonContent, IonButton, onIonViewDidEnter } from '@ionic/vue'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { goToPage } from '../../routes/'
import { useToggleComponent } from '../../composable/toggle-show-hide-component'
import { arrowLeft, plus, burgerMenu2 } from '../../utils/svg'
import CustomIcon from '../../components/Icon.vue'
import CustomModalMainMenu from '../../components/modal/MainMenu.vue'
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
            <ion-button
               @click="goToPage('home', { replace: true })"
               id="open-modal-option"
            >
               <custom-icon :svg-icon="arrowLeft" width="24"></custom-icon>
            </ion-button>
         </template>
         <template #nav-end>
            <ion-button @click="goToPage('/product/add')">
               <custom-icon :svg-icon="plus" width="24"></custom-icon>
            </ion-button>
            <ion-button @click="modalMainMenuState.toggling">
               <custom-icon :svg-icon="burgerMenu2" width="26"></custom-icon>
            </ion-button>
         </template>
         <template #searchbar>
            <custom-searchbar placeholder="Cari produk" />
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
