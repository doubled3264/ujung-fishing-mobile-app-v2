<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  onIonViewWillEnter,
  onIonViewDidEnter,
} from '@ionic/vue'
import terminal from 'virtual:terminal'
import CustomPageReload from '../../components/PageReload.vue'

onIonViewDidEnter(() => {
  terminal.log('base login')
})
</script>
<template>
  <ion-page class="login-page">
    <custom-page-reload />
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title class="title">masuk</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <p class="text-gray-400">maman</p>
    </ion-content>
  </ion-page>
</template>
