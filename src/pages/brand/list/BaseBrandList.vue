<script setup lang="ts">
import { IonPage, IonContent, IonButton, onIonViewDidEnter } from '@ionic/vue'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { BrandAPI } from '../../../interfaces/brand'
import { goToPage } from '../../../routes'
import { useToggleComponent } from '../../../composable/toggle-show-hide-component'
import { arrowLeft, burgerMenu2, plus } from '../../../utils/svg'
import CustomBrandList from './BrandList.vue'
import CustomHeader from '../../../components/layout/Header.vue'
import CustomPageReload from '../../../components/PageReload.vue'
import CustomModalMainMenu from '../../../components/modal/MainMenu.vue'
import CustomIcon from '../../../components/Icon.vue'
import CustomModalOption from '../../../components/modal/Option.vue'
import terminal from 'virtual:terminal'

const store = useStore()
const modalMainMenuState = useToggleComponent()
const modalOptionState = useToggleComponent()
const optionList = ref([
   {
      label: 'ubah data',
      isActive: true,
      event: 'edit',
   },
])
const brandList = ref<BrandAPI[]>([])
const selectedBrand = ref('')

onIonViewDidEnter(async () => {
   await fetchBrand()
})

async function fetchBrand() {
   await store.dispatch('brand/getAll')
   brandList.value = store.getters['brand/getAll']
   terminal.log(brandList.value)
}

/**
 * Set selected customer for option
 * @param brandId
 */
function setSelectedBrand(brandId: string) {
   selectedBrand.value = brandId
   modalOptionState.toggling()
}

function editBrand() {
   modalOptionState.toggling()
   goToPage(`/product/brand/edit/${selectedBrand.value}`)
}
</script>
<template>
   <ion-page class="brand-list-page">
      <custom-page-reload />
      <custom-header title="Daftar brand">
         <template #nav-start>
            <ion-button
               @click="goToPage('/home', { replace: true })"
               id="open-modal-option"
            >
               <custom-icon :svg-icon="arrowLeft" width="24"></custom-icon>
            </ion-button>
         </template>
         <template #nav-end>
            <ion-button
               @click="goToPage('/product/brand/add', { replace: true })"
            >
               <custom-icon :svg-icon="plus" width="24"></custom-icon>
            </ion-button>
            <ion-button @click="modalMainMenuState.toggling">
               <custom-icon :svg-icon="burgerMenu2" width="26"></custom-icon>
            </ion-button>
         </template>
      </custom-header>
      <ion-content>
         <custom-brand-list
            :brand-list="brandList"
            @item-nav-click="setSelectedBrand"
         />
         <custom-modal-main-menu
            :is-open="modalMainMenuState.isOpen.value"
            @close-modal="modalMainMenuState.toggling"
         />
         <custom-modal-option
            :is-open="modalOptionState.isOpen.value"
            :option-list="optionList"
            @close-modal="modalOptionState.toggling"
            @edit="editBrand"
         />
      </ion-content>
   </ion-page>
</template>
