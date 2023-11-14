<script setup lang="ts">
import { IonPage, IonButtons, IonButton, onIonViewWillEnter } from '@ionic/vue'
import { SafeArea } from '@aashu-dubey/capacitor-statusbar-safe-area'
import { burgerMenu2 } from '../../utils/svg'
import { useToggleComponent } from '../../composable/toggle-show-hide-component'
import CustomIcon from '../../components/Icon.vue'
import CustomHeader from '../../components/layout/Header.vue'
import CustomPageReload from '../../components/PageReload.vue'
import CustomModalMainMenu from '../../components/modal/MainMenu.vue'
import terminal from 'virtual:terminal'

const modalMainMenuState = useToggleComponent()

onIonViewWillEnter(async () => {
  const { height } = await SafeArea.getStatusBarHeight()
  terminal.log(height)
})

</script>
<template>
  <ion-page class="home-page">
    <custom-page-reload />
    <custom-header title="Home">
      <template #nav-end>
        <ion-buttons>
          <ion-button @click="modalMainMenuState.toggling">
            <custom-icon :svg-icon="burgerMenu2"></custom-icon>
          </ion-button>
        </ion-buttons>
      </template>
    </custom-header>
    <custom-modal-main-menu :is-open="modalMainMenuState.isOpen.value" @close-modal="modalMainMenuState.toggling" />
  </ion-page>
</template>
