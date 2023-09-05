<script setup lang="ts">
import { IonPage, IonRouterOutlet } from '@ionic/vue'
import terminal from 'virtual:terminal';
import { watch } from 'vue';
import { useRoute } from 'vue-router';

const route= useRoute()
watch(route, (value)=>{
terminal.log(value.fullPath)
})
</script>
<template>
  <ion-page>
    <ion-router-outlet id="base-customer" :key="route.fullPath"></ion-router-outlet>
  </ion-page>
</template>
