<script setup lang="ts">
import { IonHeader, IonToolbar, IonTitle, IonButtons } from '@ionic/vue'

interface Props {
   title?: string
}

defineProps<Props>()
</script>
<template>
   <ion-header class="ion-no-border">
      <ion-toolbar>
         <ion-title v-if="title">{{ title }}</ion-title>
         <ion-buttons slot="start">
            <slot name="nav-start" />
         </ion-buttons>
         <ion-buttons slot="end">
            <slot name="nav-end" />
         </ion-buttons>
         <slot name="searchbar" />
      </ion-toolbar>
   </ion-header>
</template>
