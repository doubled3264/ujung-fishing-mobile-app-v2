<script setup lang="ts">
import { IonPage, IonContent, IonButton, onIonViewDidEnter } from '@ionic/vue'
import { ref, toRef } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { ContactEditForm as ContactEditFormErrorState } from '../../interfaces/error-state/contact'
import omit from '../../utils/omit'
import { arrowLeft } from '../../utils/svg'
import { goToPage } from '../../routes'
import { contactEditForm as contactEditFormErrorState } from '../../validations/error-state/contact'
import * as formValidation from '../../validations'
import * as contactSchema from '../../validations/schema/contact'
import * as sweetalertDialog from '../../utils/sweetalert-dialog'
import CustomIcon from '../../components/Icon.vue'
import CustomHeader from '../../components/layout/Header.vue'
import CustomPageReload from '../../components/PageReload.vue'
import CustomInput from '../../components/Input.vue'
import CustomButton from '../../components/Button.vue'
import terminal from 'virtual:terminal'

const store = useStore()
const route = useRoute()
const { errorState } = contactEditFormErrorState()
const customerEditForm = ref({
   id: '',
   name: '',
   phone_number: '',
})

onIonViewDidEnter(() => {
   fetchCustomer()
})

async function fetchCustomer() {
   const { customerId } = route.params
   await store.dispatch('customer/getOne', customerId)
   customerEditForm.value = store.getters['customer/getOne']
   terminal.log(customerEditForm.value)
   validateInput('name')
   validateInput('phone_number')
}

async function validateInput(field: keyof ContactEditFormErrorState) {
   await formValidation.validate(
      toRef(customerEditForm, 'value'),
      toRef(errorState, 'value'),
      contactSchema.add,
      field
   )
}

function validateForm() {
   for (const item in errorState.value) {
      if (errorState.value[item as keyof ContactEditFormErrorState].isError) {
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
      customerId: customerEditForm.value.id,
      data: { ...omit(customerEditForm.value, 'id') },
   }
   await store
      .dispatch('customer/update', payload)
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
   <ion-page class="customer-edit-page">
      <custom-page-reload />
      <custom-header title="ubah data pelanggan">
         <template #nav-start>
            <ion-button @click="goToPage('/customer', { replace: true })">
               <custom-icon :svg-icon="arrowLeft" width="24"></custom-icon>
            </ion-button>
         </template>
      </custom-header>
      <ion-content>
         <div class="inner">
            <form>
               <custom-input
                  label="Nama"
                  v-model:input-value="customerEditForm.name"
                  :error-state="errorState.name"
                  @validate-input="validateInput('name')"
               />
               <custom-input
                  label="No telepon"
                  v-model:input-value="customerEditForm.phone_number"
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
      </ion-content>
   </ion-page>
</template>
