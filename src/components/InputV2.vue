<script setup lang="ts">
import { IonInput } from '@ionic/vue'

interface Props {
  label: string
}

defineProps<Props>()
</script>
<template>
  <div class="new-custom-input">
    <label>{{ label }}</label>
    <div :class="['inner']">
      <ion-input />
    </div>
  </div>
</template>
