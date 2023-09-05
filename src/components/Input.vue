<script setup lang="ts">
import { IonInput } from '@ionic/vue'
import { computed, ref, watch } from 'vue'
import { eye, eyeStriped } from '../utils/svg'
import CustomIcon from './Icon.vue'
import { useToggleComponent } from '../composable/toggle-show-hide-component'
interface Props {
   label: string
   inputValue: string
   inputMode?: any
   type?: any
   disabled?: any
   useForPassword?: boolean
   errorState?:
      | {
           optional?: boolean
           isError: boolean
           message: string
        }
      | any
}

const props = withDefaults(defineProps<Props>(), {
   inputMode: {
      default: 'text',
   },
   type: {
      default: 'text',
   },
   errorState: {
      isError: false,
      message: '',
   },
})

const emit = defineEmits(['update:inputValue', 'validateInput'])
const isTouched = ref(false)
const isReadyForFlashUpdate = ref(true)
const inputType = ref(props.type)
const showPassword = ref(false)
const passwordIcon = ref(eyeStriped)
const labelState = useToggleComponent()
const inputState = useToggleComponent()

function toggleShowPassword() {
   showPassword.value = !showPassword.value
   if (showPassword.value) {
      passwordIcon.value = eye
      inputType.value = 'text'
   } else {
      passwordIcon.value = eyeStriped
      inputType.value = 'password'
   }
}

function labelFunc() {
   if (props.inputValue.length == 0) {
      labelState.toggling()
   }
   inputState.toggling()
}

const getPlaceholder = computed(() => {
   if (!labelState.isOpen.value) {
      return props.label
   } else {
      return ''
   }
})

function checkFlashUpate(value: string) {
   if (value.length > 0 && isReadyForFlashUpdate.value && !isTouched.value) {
      labelState.toggling()
      isReadyForFlashUpdate.value = false
   } else if (value.length == 0) {
      isReadyForFlashUpdate.value = true
      isTouched.value = false
   }
}

function validateInput(event: any) {
   isTouched.value = true
   emit('update:inputValue', event.target.value)
   emit('validateInput')
}

const getCustomInputCss = computed(() => {
   return [
      'custom-input',
      {
         error: props.errorState.isError && isTouched.value,
         focused: inputState.isVisited.value,
      },
   ]
})

const getLabelCss = computed(() => {
   return [
      'custom-input__label',
      {
         show: !labelState.isActive.value,
         'active-label': inputState.isVisited.value,
      },
   ]
})

watch(
   () => props.inputValue,
   (value) => {
      checkFlashUpate(value)
   }
)
</script>
<template>
   <div :class="getCustomInputCss">
      <label :class="getLabelCss">{{ label }}</label>
      <div class="custom-input__inner">
         <ion-input
            :disabled="disabled"
            :type="inputType"
            :value="inputValue"
            @ion-input="validateInput"
            @ion-focus="labelFunc"
            @ion-blur="labelFunc"
            :inputmode="inputMode"
            :placeholder="getPlaceholder"
         ></ion-input>
      </div>
      <p
         :class="[
            ' custom-input__helper',
            { show: errorState.isError && isTouched },
         ]"
      >
         {{ errorState.message }}
      </p>
      <div
         v-if="useForPassword"
         class="show-hide-password"
         @click="toggleShowPassword"
      >
         <custom-icon :svg-icon="passwordIcon" width="22" />
      </div>
   </div>
</template>
