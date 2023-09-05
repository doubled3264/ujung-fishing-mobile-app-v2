<script setup lang="ts">
import { IonPage, IonContent, IonButton ,onIonViewDidEnter} from '@ionic/vue'
import { ref, toRef } from 'vue'
import { useStore } from 'vuex'
import terminal from 'virtual:terminal'
import { RegisterForm as RegisterFormErrorState } from '../../interfaces/error-state/auth'
import { registerForm as registerFormErrorState } from '../../validations/error-state/auth'
import { goToPage } from '../../routes/'
import { arrowLeft } from '../../utils/svg'
import omit from '../../utils/omit'
import * as formValidation from '../../validations/'
import * as authSchema from '../../validations/schema/auth'
import * as sweetalertDialog from '../../utils/sweetalert-dialog'
import CustomPageReload from '../../components/PageReload.vue'
import CustomHeader from '../../components/layout/Header.vue'
import CustomIcon from '../../components/Icon.vue'
import CustomInput from '../../components/Input.vue'
import CustomButton from '../../components/Button.vue'

const store = useStore()
const { errorState } = registerFormErrorState()
const registerForm = ref({
  email: '',
  password: '',
  confirm_password: '',
  name: '',
  phone_number: '',
})

onIonViewDidEnter(() => {
  terminal.log('[base register]')
})
async function validateInput(field: keyof RegisterFormErrorState) {
  await formValidation.validate(
    toRef(registerForm, 'value'),
    toRef(errorState, 'value'),
    authSchema.register,
    field
  )
}

function validateForm() {
  for (const item in errorState.value) {
    if (errorState.value[item as keyof RegisterFormErrorState].isError) {
      sweetalertDialog.error('Terdapat form yang belum terisi.')
      return ''
    } else {
      sweetalertDialog
        .confirm('Pendaftaran akan diproses.', 'Ya proses.')
        .then(async (result) => {
          if (result.isConfirmed) {
            await registerAction()
          }
        })
    }
  }
}

async function registerAction() {
  const payload = {
    ...omit(registerForm.value, 'confirm_password'),
    invitation_token: '01H8F3MPFNB8601F2JD1SXND48',
  }
  await store
    .dispatch('auth/register', payload)
    .then(() => {
      sweetalertDialog.success('Pendaftaran berhasil.')
      goToPage('/login', {replace:true})
    })
    .catch((err) => {
      const message = err.response.data.message
      sweetalertDialog.error(message)
    })
}
</script>
<template>
  <ion-page class="register-page">
    <custom-page-reload />
    <custom-header title="pendaftaran">
      <template #nav-start>
        <ion-button @click="goToPage('/login', { replace: true })">
          <custom-icon :svg-icon="arrowLeft" width="24"></custom-icon>
        </ion-button>
      </template>
    </custom-header>
    <ion-content>
      <div class="inner">
        <form>
          <custom-input label="Email" v-model:input-value="registerForm.email" :error-state="errorState.email"
            @validate-input="validateInput('email')" />
          <custom-input label="Password" v-model:input-value="registerForm.password" type="password" use-for-password
            :error-state="errorState.password" @validate-input="validateInput('password')" />
          <custom-input label="Ulangi password" v-model:input-value="registerForm.confirm_password" type="password"
            use-for-password :error-state="errorState.confirm_password"
            @validate-input="validateInput('confirm_password')" />
          <custom-input label="Nama" v-model:input-value="registerForm.name" :error-state="errorState.name"
            @validate-input="validateInput('name')" />
          <custom-input label="No telepon" input-mode="numeric" v-model:input-value="registerForm.phone_number"
            :error-state="errorState.phone_number" @validate-input="validateInput('phone_number')" />
          <div class="submit-button">
            <custom-button label="simpan" block color="lapis-lazuli" @click="validateForm" />
          </div>
        </form>
      </div>
    </ion-content>
  </ion-page>
</template>
