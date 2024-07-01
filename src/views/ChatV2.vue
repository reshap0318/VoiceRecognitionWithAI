<template>
  <div class="flex h-screen antialiased text-gray-800">
    <div class="flex flex-row h-full w-full overflow-x-hidden">
      <div class="flex flex-col flex-auto h-full p-6">
        <div class="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
          <div class="flex flex-col h-full overflow-x-auto mb-4">
            <div class="flex flex-col h-full">
              <div class="grid grid-cols-12 gap-y-2">
                <template v-for="(item, idx) in voiceStore.results" :key="idx">
                  <Row :message="item.message" :time="item.time" :sender="item.sender" />
                </template>
                <Row v-if="voiceStore.runningText" :message="voiceStore.runningText" />
              </div>
            </div>
          </div>
          <FormSend />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import FormSend from '@/components/v2/FormSend.vue'
import Row from '@/components/v2/Row.vue'

import { useVoiceChatStore } from '@/stores/voiceChat'
const voiceStore = useVoiceChatStore()
</script>
