<template>
  <div :class="['flex mb-2', isSender ? 'justify-end' : '']">
    <div :class="['rounded py-2 px-3', isSender ? 'bg-[#e2f7cb]' : 'bg-[#f2f2f2]']">
      <p class="text-sm text-purple" v-if="sender">{{ sender }}</p>
      <p class="text-sm mt-1">{{ message }}</p>
      <p class="text-right text-xs text-grey-dark mt-1">{{ time }}</p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'

const prop = defineProps({
  sender: String,
  message: String,
  time: String
})

const isSender = computed((): boolean => typeof prop.sender == 'undefined')
</script>
