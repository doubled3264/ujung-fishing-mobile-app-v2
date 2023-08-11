<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  onIonViewDidEnter,
} from '@ionic/vue'
import { ref, toRef } from 'vue'
import terminal from 'virtual:terminal'
import { LoginForm } from '../../interfaces/error-state/auth'
import { loginForm } from '../../validations/error-state/auth'
import * as formValidation from '../../validations/'
import * as authSchema from '../../validations/schema/auth'
import CustomInput from '../../components/Input.vue'
import CustomPageReload from '../../components/PageReload.vue'

const { errorState } = loginForm()
const loginFormState = ref({
  email: '',
  password: '',
})

onIonViewDidEnter(() => {
  terminal.log('base login')
})

async function validateInput(field: keyof LoginForm) {
  await formValidation.validate(
    toRef(loginFormState, 'value'),
    toRef(errorState, 'value'),
    authSchema.login,
    field
  )
}
</script>
<template>
  <ion-page class="login-page">
    <custom-page-reload />
    <ion-content>
      <div class="inner">
        <div class="title">
          <h3>ujung fishing</h3>
        </div>
        <form>
          <custom-input label="Email" v-model:input-value="loginFormState.email" :error-state="errorState.email"
            @validate-input="validateInput('email')" />
          <custom-input label="Password" v-model:input-value="loginFormState.password" type="password" use-for-password
            :error-state="errorState.password" @validate-input="validateInput('password')" />
        </form>
      </div>
    </ion-content>
  </ion-page>
</template>
