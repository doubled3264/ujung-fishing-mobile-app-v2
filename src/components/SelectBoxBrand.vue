<script setup lang="ts">
import {
   IonModal,
   IonHeader,
   IonToolbar,
   IonContent,
   IonList,
   IonItem,
   IonLabel,
   IonButtons,
   IonButton,
   IonRippleEffect,
} from '@ionic/vue'
import { nextTick, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { clone, cloneDeep, filter } from 'lodash'
import { Contacts } from '@capacitor-community/contacts'
import { useToggleComponent } from '../composable/toggle-show-hide-component'
import { BrandAPI } from '../interfaces/brand'
import { cross, phone, plus } from '../utils/svg'
import CustomSearchbar from './Searchbar.vue'
import CustomIcon from './Icon.vue'
import CustomHeader from './layout/Header.vue'

const props = defineProps({
   label: String,
   inputValueId: String,
   inputValueName: String,
   isOpen: Boolean,
})
const emit = defineEmits(['update:inputValueId', 'update:inputValueName'])
const store = useStore()
const modalState = useToggleComponent()
const brandListAPI = ref<BrandAPI[]>([])
const searchResult = ref<BrandAPI[]>([])
const brandList = ref<BrandAPI[]>([])

async function fetchBrand() {
   clearData()
   await store.dispatch('brand/getAll')
   brandListAPI.value = store.getters['brand/getAll']
   brandList.value = clone(brandListAPI.value)
}

function clearData() {
   brandListAPI.value = []
}

function closeModal() {
   clearData()
   modalState.toggling()
}

function handleChange(event: any) {
   brandList.value = []
   const query = event.target.value.toLowerCase()
   searchResult.value = cloneDeep(
      brandListAPI.value.filter(
         (item: any) => item.name.toLowerCase().indexOf(query) > -1
      )
   )
   brandList.value = cloneDeep(searchResult.value)
}

function selectedBrand(brandId: string) {
   const result = filter(brandListAPI.value, (item) => item.id == brandId)
   emit('update:inputValueId', result[0].id)
   emit('update:inputValueName', result[0].name)
}
</script>
<template>
   <div class="custom-select-box-brand" @click="modalState.toggling">
      <label>{{ label }}</label>
      <div class="inner">
         <p>
            {{ inputValueName }}
         </p>
      </div>
   </div>
   <ion-modal
      :is-open="modalState.isOpen.value"
      @didDismiss="closeModal"
      @didPresent="fetchBrand"
      :initial-breakpoint="0.65"
      class="modal-select-box-brand"
   >
      <custom-header>
         <template #nav-start>
            <ion-button @click="closeModal">
               <custom-icon :svg-icon="cross" width="16"></custom-icon>
            </ion-button>
         </template>
         <template #searchbar>
            <custom-searchbar
               placeholder="Cari brand"
               @on-change="handleChange"
            />
         </template>
      </custom-header>
      <ion-content>
         <ion-list lines="none">
            <ion-item
               class="ion-activatable"
               v-for="item in brandList"
               @click="selectedBrand(item.id)"
            >
               <p>{{ item.name }}</p>
               <ion-ripple-effect></ion-ripple-effect>
            </ion-item>
            <ion-item v-show="brandList.length == 0" class="serch-not-found">
               <ion-label class="ion-text-center">
                  <p>Hasil tidak ditemukan.</p>
               </ion-label>
            </ion-item>
         </ion-list>
      </ion-content>
   </ion-modal>
</template>
