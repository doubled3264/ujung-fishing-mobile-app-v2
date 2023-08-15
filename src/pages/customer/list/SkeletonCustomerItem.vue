<script setup lang="ts">
import { IonList, IonItem, IonSkeletonText } from '@ionic/vue'
</script>
<template>
   <ion-list>
      <ion-item v-for="n in 8" lines="none">
         <div class="customer-list-page__item skeleton">
            <ion-skeleton-text :animated="true"></ion-skeleton-text>
            <ion-skeleton-text :animated="true"></ion-skeleton-text>
         </div>
      </ion-item>
   </ion-list>
</template>
