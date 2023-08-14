<script setup lang="ts">
import { IonSearchbar } from '@ionic/vue'

interface Props {
   placeholder: string
}

defineProps<Props>()
const emit = defineEmits(['onChange'])

function inputChange(ev: any) {
   emit('onChange', ev)
}
</script>
<template>
   <div class="custom-searchbar">
      <ion-searchbar
         class=""
         show-clear-button="focus"
         :debounce="800"
         @ionChange="inputChange"
         :placeholder="placeholder"
      >
      </ion-searchbar>
   </div>
</template>
