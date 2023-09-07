<script setup lang="ts">
import { IonList, IonItem } from '@ionic/vue'
import { BrandAPI } from '../../../interfaces/brand'
import { threeDots } from '../../../utils/svg'
import CustomIcon from '../../../components/Icon.vue'

interface Props {
   brandList: BrandAPI[]
}

defineProps<Props>()
defineEmits(['itemNavClick'])
</script>
<template>
   <ion-list lines="none">
      <ion-item v-for="(item, index) in brandList" :key="index + 1">
         <div class="brand-list-page__item">
            <div class="content">
               <p>{{ item.name }}</p>
            </div>
            <div class="nav" @click="$emit('itemNavClick', item.id)">
               <custom-icon :svg-icon="threeDots" width="22" />
            </div>
         </div>
      </ion-item>
   </ion-list>
</template>
