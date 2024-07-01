<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <main>
    <div class="h-screen w-screen flex items-center justify-center">
      <RouterLink
        to="/v1"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Chat V1
      </RouterLink>
      <RouterLink
        to="/v2"
        class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Chat V2
      </RouterLink>
    </div>
  </main>
</template>
