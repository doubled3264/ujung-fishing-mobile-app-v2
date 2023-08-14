<script setup lang="ts">
import { IonPage, IonButton } from '@ionic/vue'
import { burgerMenu2 } from '../../utils/svg'
import { useToggleComponent } from '../../composable/toggle-show-hide-component'
import CustomIcon from '../../components/Icon.vue'
import CustomHeader from '../../components/layout/Header.vue'
import CustomPageReload from '../../components/PageReload.vue'
import CustomModalMainMenu from '../../components/modal/MainMenu.vue'

const modalMainMenuState = useToggleComponent()
</script>
<template>
   <ion-page class="home-page">
      <custom-page-reload />
      <custom-header title="Home">
         <template #nav-end>
            <ion-button>
               <ion-button @click="modalMainMenuState.toggling">
                  <custom-icon :svg-icon="burgerMenu2" width="24"></custom-icon>
               </ion-button>
            </ion-button>
         </template>
      </custom-header>
      <custom-modal-main-menu
         :is-open="modalMainMenuState.isOpen.value"
         @close-modal="modalMainMenuState.toggling"
      />
   </ion-page>
</template>
