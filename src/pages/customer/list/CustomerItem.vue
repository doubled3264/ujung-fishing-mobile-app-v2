<script setup lang="ts">
import { IonList, IonItem } from '@ionic/vue'
import { computed } from 'vue'
import { ContactListAPI } from '../../../interfaces/contact'
import { phone, threeDots } from '../../../utils/svg'
import CustomIcon from '../../../components/Icon.vue'

interface Props {
  customerList: ContactListAPI[]
}

const getPhoneNumber = computed(() => {
  return (phoneNumber: string) => {
    return phoneNumber.length > 0 ? phoneNumber : '-'
  }
})
defineProps<Props>()
defineEmits(['itemNavClick'])
</script>
<template>
  <ion-list lines="none">
    <ion-item v-for="(item, index) in customerList" :key="index + 1">
      <div class="customer-list-page__item">
        <div class="customer-list-page__info">
          <h3>{{ item.name }}</h3>
          <p>
            <span>
              <custom-icon :svg-icon="phone" width="18" />
            </span>
            {{ getPhoneNumber(item.phone_number) }}
          </p>
        </div>

        <div class="customer-list-page__nav" @click="$emit('itemNavClick', item.id)">
          <custom-icon :svg-icon="threeDots" width="22" />
        </div>
      </div>
    </ion-item>
  </ion-list>
</template>
