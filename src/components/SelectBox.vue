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
import { computed, customRef } from 'vue'
import { useToggleComponent } from '../composable/toggle-show-hide-component'
import { cross, arrowRight } from '../utils/svg'
import CustomIcon from './Icon.vue'

interface Props {
   label: string
   inputValue: string
   optionList: Array<string>
}

const props = defineProps<Props>()
const emit = defineEmits(['update:inputValue', 'closeModal'])
const modalState = useToggleComponent()

function setValue(value: string) {
   emit('update:inputValue', value)
}

function selectedOptionCheck(value: string) {
   return value == props.inputValue ? true : false
}

const countInitialBreakpoint = computed(() => {
   const breakpoint = props.optionList.length * 0.065 + 0.07
   return breakpoint
})
</script>
<template>
   <div class="custom-selectbox" @click="modalState.toggling">
      <label class="custom-selectbox__label">{{ label }}</label>
      <div class="custom-selectbox__inner">
         <p>{{ inputValue }}</p>
      </div>
      <div class="custom-selectbox__nav">
         <custom-icon :svg-icon="arrowRight" width="18" />
      </div>
   </div>
   <ion-modal
      :is-open="modalState.isOpen.value"
      @didDismiss="modalState.toggling"
      :initial-breakpoint="countInitialBreakpoint"
      class="modal-selectbox"
   >
      <ion-header class="ion-no-border">
         <ion-toolbar>
            <ion-title>pilih salah satu</ion-title>
            <ion-buttons slot="start"> </ion-buttons>
         </ion-toolbar>
      </ion-header>
      <ion-content>
         <ion-list lines="none">
            <ion-item v-for="item in optionList" @click="setValue(item)">
               <div
                  :class="[
                     'custom-selectbox__item ',
                     'ion-activatable',
                     { selected: selectedOptionCheck(item) },
                  ]"
               >
                  <p>{{ item }}</p>
                  <ion-ripple-effect type="bounded" />
               </div>
            </ion-item>
         </ion-list>
      </ion-content>
   </ion-modal>
</template>
