<script setup lang="ts">
import { IonPage, IonButton } from '@ionic/vue'
import { useRouter } from 'vue-router'
import { phoneBook, arrowLeft } from '../../utils/svg'
import { useToggleComponent } from '../../composable/toggle-show-hide-component'
import { goToPage } from '../../routes/'
import CustomIcon from '../../components/Icon.vue'
import CustomHeader from '../../components/layout/Header.vue'
import CustomPageReload from '../../components/PageReload.vue'

const router = useRouter()
const modalMainMenuState = useToggleComponent()
</script>
<template>
   <ion-page class="customer-add-page">
      <custom-page-reload />
      <custom-header title="tambah data pelanggan">
         <template #nav-start>
            <ion-button @click="router.back">
               <custom-icon :svg-icon="arrowLeft" width="24"></custom-icon>
            </ion-button>
         </template>
         <template #nav-end>
            <ion-button>
               <ion-button @click="">
                  <custom-icon :svg-icon="phoneBook" width="24"></custom-icon>
               </ion-button>
            </ion-button>
         </template>
      </custom-header>
   </ion-page>
</template>
