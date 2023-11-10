<script setup lang="ts">
import { IonPage, IonContent, onIonViewDidEnter } from '@ionic/vue'
import { ref, toRef } from 'vue'
import { useStore } from 'vuex'
import { useElementSize } from '@vueuse/core'
import terminal from 'virtual:terminal'
import { LoginForm as LoginFormErrorState } from '../../interfaces/error-state/auth'
import { loginForm as loginFormErrorState } from '../../validations/error-state/auth'
import { goToPage } from '../../routes/'
import * as formValidation from '../../validations/'
import * as authSchema from '../../validations/schema/auth'
import * as sweetalertDialog from '../../utils/sweetalert-dialog'
import CustomInput from '../../components/Input.vue'
import CustomPageReload from '../../components/PageReload.vue'
import CustomButton from '../../components/Button.vue'

const store = useStore()
const { errorState } = loginFormErrorState()
const pageElement = ref(null)
const loginForm = ref({
  email: '',
  password: '',
})
const { width, height } = useElementSize(pageElement)

onIonViewDidEnter(() => {
  terminal.log('[base login]')
})

async function validateInput(field: keyof LoginFormErrorState) {
  await formValidation.validate(
    toRef(loginForm, 'value'),
    toRef(errorState, 'value'),
    authSchema.login,
    field
  )
}

function validateForm() {
  for (const item in errorState.value) {
    if (errorState.value[item as keyof LoginFormErrorState].isError) {
      sweetalertDialog.error('Terdapat form yang belum terisi.')
    } else {
      loginAction()
    }
  }
}

async function loginAction() {
  await store
    .dispatch('auth/signIn', loginForm.value)
    .then(() => {
      terminal.log('login success')
      goToPage('/home')
    })
    .catch((err) => {
      const message = err.response.data.message
      sweetalertDialog.error(message)
    })
}
</script>
<template>
  <ion-page ref="pageElement" class="login-page">
    <custom-page-reload />
    <ion-content>
      <div class="inner">
        <div class="title">
          <h3>ujung fishing</h3>
          <h3>{{ width }} {{ height }}</h3>
        </div>
        <form>
          <custom-input label="Email" v-model:input-value="loginForm.email" :error-state="errorState.email"
            @validate-input="validateInput('email')" />
          <custom-input label="Password" v-model:input-value="loginForm.password" type="password" use-for-password
            :error-state="errorState.password" @validate-input="validateInput('password')" />
          <div class="submit-button">
            <custom-button label="masuk" block color="lapis-lazuli" @click="validateForm" />
          </div>
          <div v-if="false" class="submit-button">
            <custom-button label="daftar" block color="lapis-lazuli" @click="goToPage('/register')" />
          </div>
        </form>
      </div>
    </ion-content>
  </ion-page>
</template>
