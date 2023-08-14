<script setup lang="ts">
import { IonFab, IonFabButton } from '@ionic/vue'
import terminal from 'virtual:terminal';
import { computed } from 'vue'
import { refresh } from '../utils/svg'
import CustomIcon from './Icon.vue'

function reloadPage() {
  window.location.reload()
}

const checkMode = computed(() => {
  const mode = import.meta.env.VITE_CHECKMODE
  terminal.log(mode)
  return mode == 'development' ? true : false
})
</script>
<template>
  <ion-fab v-if="checkMode" slot="fixed" vertical="bottom" horizontal="end">
    <ion-fab-button @click="reloadPage">
      <custom-icon :svg-icon="refresh" />
    </ion-fab-button>
  </ion-fab>
</template>
