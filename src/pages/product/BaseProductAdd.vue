<script setup lang="ts">
import { IonPage, IonContent, IonButton } from '@ionic/vue'
import { ref, toRef } from 'vue'
import { ProductAddForm as ProductAddFormErrorState } from '../../interfaces/error-state/product'
import { goToPage } from '../../routes'
import { arrowLeft, plusCircle } from '../../utils/svg'
import { useToggleComponent } from '../../composable/toggle-show-hide-component'
import { productAddForm as productAddFormErrorState } from '../../validations/error-state/product'
import * as formValidation from '../../validations'
import * as productSchema from '../../validations/schema/product'
import * as sweetalertDialog from '../../utils/sweetalert-dialog'
import CustomIcon from '../../components/Icon.vue'
import CustomHeader from '../../components/layout/Header.vue'
import CustomPageReload from '../../components/PageReload.vue'
import CustomSelectBox from '../../components/SelectBox.vue'
import CustomInput from '../../components/Input.vue'
import CustomSelectBoxBrand from '../../components/SelectBoxBrand.vue'

const modalSelectBoxBrand = useToggleComponent()
const { errorState } = productAddFormErrorState()
const selectboxOptionList = [
   'umpan',
   'reel',
   'joran',
   'mata kail',
   'pelampung',
   'korang',
]
const productAddForm = ref({
   name: '',
   brandId: '',
   brandName: '',
})

async function validateInput(field: keyof ProductAddFormErrorState) {
   await formValidation.validate(
      toRef(productAddForm, 'value'),
      toRef(errorState, 'value'),
      productSchema.add,
      field
   )
}
</script>
<template>
   <ion-page class="product-add-page">
      <custom-page-reload />
      <custom-header title="tambah produk baru">
         <template #nav-start>
            <ion-button @click="goToPage('/customer', { replace: true })">
               <custom-icon :svg-icon="arrowLeft" width="24"></custom-icon>
            </ion-button>
         </template>
         <template #nav-end>
            <ion-button @click="modalSelectBoxBrand.toggling">
               <custom-icon :svg-icon="plusCircle" width="24"></custom-icon>
            </ion-button>
         </template>
      </custom-header>
      <ion-content>
         <div class="inner">
            <form>
               <custom-input
                  label="Nama"
                  v-model:input-value="productAddForm.name"
                  :error-state="errorState.name"
                  @validate-input="validateInput('name')"
               />
               <custom-select-box-brand
                  label="brand"
                  v-model:input-value-id="productAddForm.brandId"
                  v-model:input-value-name="productAddForm.brandName"
                  :is-open="modalSelectBoxBrand.isOpen.value"
               />
            </form>
         </div>
      </ion-content>
   </ion-page>
</template>
