<script setup lang="ts">
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonList,
  IonItem,
  IonRippleEffect,
} from '@ionic/vue'
import { forEach } from 'lodash'
import { computed, ref } from 'vue'
import { cross } from '../../utils/svg'
import CustomIcon from '../Icon.vue'

interface Props {
  isOpen: boolean
  optionList: Array<{
    label: string
    isActive: boolean
    event: string
  }>
}

const props = defineProps<Props>()
const emit = defineEmits(['closeModal'])
const initialBreakpoint = ref(0)

function closeModal() {
  if (props.isOpen) {
    emit('closeModal')
  }
}

const countInitialBreakpoint = computed(() => {
  let size = 0
  forEach(props.optionList, (item) => {
    if (item.isActive) {
      size++
    }
  })
  return (initialBreakpoint.value = size * 0.078 + 0.07)
})
</script>
<template>
  <ion-modal :is-open="isOpen" @didDismiss="closeModal" :initial-breakpoint="countInitialBreakpoint" class="modal-option">
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title>lainnya</ion-title>
        <ion-buttons slot="start">
          <ion-button @click="closeModal">
            <custom-icon :svg-icon="cross" width="16"></custom-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list lines="none">
        <ion-item class="ion-activatable" v-for="item in optionList" v-show="item.isActive" @click="$emit(item.event)">
          <p>{{ item.label }}</p>
          <ion-ripple-effect></ion-ripple-effect>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-modal>
</template>
