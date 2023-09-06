<script setup lang="ts">
import { IonPage, IonContent, IonButton } from '@ionic/vue'
import { ref, toRef } from 'vue'
import { useStore } from 'vuex'
import { ContactAddForm as ContactAddFormErrorState } from '../../interfaces/error-state/contact'
import { ContactProjection } from '../../interfaces/contact'
import { phoneBook, arrowLeft } from '../../utils/svg'
import { useToggleComponent } from '../../composable/toggle-show-hide-component'
import { goToPage } from '../../routes'
import { contactAddForm as contactAddFormErrorState } from '../../validations/error-state/contact'
import * as formValidation from '../../validations'
import * as contactSchema from '../../validations/schema/contact'
import * as sweetalertDialog from '../../utils/sweetalert-dialog'
import CustomIcon from '../../components/Icon.vue'
import CustomHeader from '../../components/layout/Header.vue'
import CustomPageReload from '../../components/PageReload.vue'
import CustomModalImportContact from '../../components/modal/customer/ImportContact.vue'
import CustomInput from '../../components/Input.vue'
import CustomButton from '../../components/Button.vue'

const store = useStore()
const { errorState } = contactAddFormErrorState()
const modalImportContactState = useToggleComponent()
const customerAddForm = ref({
   name: '',
   phone_number: '',
})

function fromImportContact(contactInfo: ContactProjection) {
   const { name, phone_number } = contactInfo
   customerAddForm.value.name = name
   customerAddForm.value.phone_number = phone_number

   validateInput('name')
   validateInput('phone_number')
}

async function validateInput(field: keyof ContactAddFormErrorState) {
   await formValidation.validate(
      toRef(customerAddForm, 'value'),
      toRef(errorState, 'value'),
      contactSchema.add,
      field
   )
}

function validateForm() {
   for (const item in errorState.value) {
      if (errorState.value[item as keyof ContactAddFormErrorState].isError) {
         sweetalertDialog.error('Terdapat form yang belum terisi.')
         return ''
      } else {
         sweetalertDialog
            .confirm('Kontak akan disimpan.', 'Ya simpan.')
            .then(async (result) => {
               if (result.isConfirmed) {
                  await saveContactAction()
               }
            })
      }
   }
}

async function saveContactAction() {
   const payload = {
      ...customerAddForm.value,
   }
   await store
      .dispatch('customer/add', payload)
      .then((res) => {
         const message = res.data.message
         sweetalertDialog.success(message)
         goToPage('/customer', { replace: true })
      })
      .catch((err) => {
         const message = err.response.data.message
         sweetalertDialog.error(message)
      })
}
</script>
<template>
   <ion-page class="customer-add-page">
      <custom-page-reload />
      <custom-header title="tambah pelanggan baru">
         <template #nav-start>
            <ion-button @click="goToPage('/customer', { replace: true })">
               <custom-icon :svg-icon="arrowLeft" width="24"></custom-icon>
            </ion-button>
         </template>
         <template #nav-end>
            <ion-button @click="modalImportContactState.toggling">
               <custom-icon :svg-icon="phoneBook" width="24"></custom-icon>
            </ion-button>
         </template>
      </custom-header>
      <ion-content>
         <div class="inner">
            <form>
               <custom-input
                  label="Nama"
                  v-model:input-value="customerAddForm.name"
                  :error-state="errorState.name"
                  @validate-input="validateInput('name')"
               />
               <custom-input
                  label="No telepon"
                  v-model:input-value="customerAddForm.phone_number"
                  input-mode="numeric"
                  :error-state="errorState.phone_number"
                  @validate-input="validateInput('phone_number')"
               />
               <div class="submit-button">
                  <custom-button
                     label="simpan"
                     block
                     color="lapis-lazuli"
                     @click="validateForm"
                  />
               </div>
            </form>
         </div>
         <custom-modal-import-contact
            :is-open="modalImportContactState.isOpen.value"
            @close-modal="modalImportContactState.toggling"
            @process-contact="fromImportContact"
         />
      </ion-content>
   </ion-page>
</template>
