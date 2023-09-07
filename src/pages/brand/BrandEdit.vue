<script setup lang="ts">
import { IonPage, IonContent, IonButton, onIonViewDidEnter } from '@ionic/vue'
import { ref, toRef } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { BrandAddForm as BrandEditFormErrorState } from '../../interfaces/error-state/brand'
import { goToPage } from '../../routes'
import { arrowLeft } from '../../utils/svg'
import { brandAddForm as brandEditFormErrorState } from '../../validations/error-state/brand'
import * as formValidation from '../../validations/'
import * as brandSchema from '../../validations/schema/brand'
import * as sweetalertDialog from '../../utils/sweetalert-dialog'
import CustomIcon from '../../components/Icon.vue'
import CustomHeader from '../../components/layout/Header.vue'
import CustomPageReload from '../../components/PageReload.vue'
import CustomInput from '../../components/Input.vue'
import CustomButton from '../../components/Button.vue'

const store = useStore()
const route = useRoute()
const { errorState } = brandEditFormErrorState()
const brandEditForm = ref({
  id: '',
  name: '',
})

onIonViewDidEnter(async () => {
  await fetchBrand()
})

async function fetchBrand() {
  const { brandId } = route.params
  await store.dispatch('brand/getOne', brandId)
  brandEditForm.value = store.getters['brand/getOne']
}

async function validateInput(field: keyof BrandEditFormErrorState) {
  await formValidation.validate(
    toRef(brandEditForm, 'value'),
    toRef(errorState, 'value'),
    brandSchema.add,
    field
  )
}

function validateForm() {
  for (const item in errorState.value) {
    if (errorState.value[item as keyof BrandEditFormErrorState].isError) {
      sweetalertDialog.error('Terdapat form yang belum terisi.')
      return ''
    } else {
      sweetalertDialog
        .confirm('Data Brand akan disimpan.', 'Ya simpan.')
        .then(async (result) => {
          if (result.isConfirmed) {
            await updateBrandAction()
          }
        })
    }
  }
}

async function updateBrandAction() {
  await store
    .dispatch('brand/update', brandEditForm.value)
    .then((res) => {
      const message = res.data.message
      sweetalertDialog.success(message)
      goToPage('/product/brand', { replace: true })
    })
    .catch((err) => {
      const message = err.response.data.message
      sweetalertDialog.error(message)
    })
}
</script>
<template>
  <ion-page class="brand-add-page">
    <custom-page-reload />
    <custom-header title="ubah data brand">
      <template #nav-start>
        <ion-button @click="goToPage('/product/brand', { replace: true })">
          <custom-icon :svg-icon="arrowLeft" width="24"></custom-icon>
        </ion-button>
      </template>
    </custom-header>
    <ion-content>
      <div class="inner">
        <form>
          <custom-input label="Nama Brand" v-model:input-value="brandEditForm.name" :error-state="errorState.name"
            @validate-input="validateInput('name')" />
          <div class="submit-button">
            <custom-button label="simpan" block color="lapis-lazuli" @click="validateForm" />
          </div>
        </form>
      </div>
    </ion-content>
  </ion-page>
</template>
