<template>
  <div v-if="!isSender" class="col-start-1 col-end-8 p-3 rounded-lg">
    <div class="flex flex-row items-center">
      <div
        class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0 text-white"
      >
        AI
      </div>
      <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
        <div>
          {{ message }}
        </div>
        <div class="absolute text-xs bottom-0 left-0 -mb-5 mr-2 text-gray-500">{{ time }}</div>
      </div>
    </div>
  </div>
  <div v-else class="col-start-6 col-end-13 p-3 rounded-lg">
    <div class="flex items-center justify-start flex-row-reverse">
      <div
        class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0 text-white"
      >
        Me
      </div>
      <div class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl min-w-44">
        <div class="text-right">
          {{ message }}
        </div>
        <div class="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500">{{ time }}</div>
      </div>
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
