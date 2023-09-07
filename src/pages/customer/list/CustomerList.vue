<script setup lang="ts">
import { IonList, IonItem } from '@ionic/vue'
import { ContactListAPI } from '../../../interfaces/contact'
import { phone, threeDots } from '../../../utils/svg'
import CustomIcon from '../../../components/Icon.vue'

interface Props {
   customerList: ContactListAPI[]
}
defineProps<Props>()
defineEmits(['itemNavClick'])
</script>
<template>
   <ion-list lines="none">
      <ion-item v-for="(item, index) in customerList" :key="index + 1">
         <div class="customer-list-page__item">
            <div class="content">
               <h3>{{ item.name }}</h3>
               <p>
                  <span>
                     <custom-icon :svg-icon="phone" width="18" />
                  </span>
                  {{ item.phone_number }}
               </p>
            </div>

            <div class="nav" @click="$emit('itemNavClick', item.id)">
               <custom-icon :svg-icon="threeDots" width="22" />
            </div>
         </div>
      </ion-item>
   </ion-list>
</template>
