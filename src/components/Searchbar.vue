<script setup lang="ts">
import { IonSearchbar } from '@ionic/vue'

interface Props {
   placeholder: string
}

defineProps<Props>()
const emit = defineEmits(['onChange'])

function inputChange(ev: any) {
   console.log('inputChange fire')
   emit('onChange', ev)
}
</script>
<template>
   <div class="custom-searchbar">
      <ion-searchbar
         class=""
         show-clear-button="focus"
         :debounce="800"
         @ion-input="inputChange"
         :placeholder="placeholder"
      >
      </ion-searchbar>
   </div>
</template>
