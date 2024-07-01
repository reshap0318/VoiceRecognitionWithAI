<template>
  <div>
    <div class="w-full h-32" style="background-color: #449388"></div>
    <div class="container mx-auto" style="margin-top: -128px">
      <div class="py-6 h-screen">
        <div class="flex border border-grey rounded shadow-lg h-full">
          <div class="w-full border flex flex-col">
            <div class="flex-1 overflow-auto" style="background-color: #dad3cc">
              <div class="py-2 px-3">
                <div class="flex justify-center mb-2">
                  <div class="rounded py-2 px-4" style="background-color: #ddecf2">
                    <p class="text-sm uppercase">{{ dateTime }}</p>
                  </div>
                </div>
                <div class="flex justify-center mb-4">
                  <div class="rounded py-2 px-4" style="background-color: #fcf4cb">
                    <p class="text-xs">
                      Messages to this chat and calls are now secured with end-to-end encryption.
                      Tap for more info.
                    </p>
                  </div>
                </div>
                <template v-for="(item, idx) in voiceStore.results" :key="idx">
                  <Row :message="item.message" :time="item.time" :sender="item.sender" />
                </template>
                <Row v-if="voiceStore.runningText" :message="voiceStore.runningText" />
              </div>
            </div>
            <FormSend />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import FormSend from '@/components/v1/FormSend.vue'
import Row from '@/components/v1/Row.vue'

import { useVoiceChatStore } from '@/stores/voiceChat'
import { computed } from 'vue'
const voiceStore = useVoiceChatStore()

const dateTime = computed((): string => {
  var options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  var today = new Date()
  // @ts-ignore: Unreachable code error
  return today.toLocaleDateString('id-ID', options).toString()
})
</script>
