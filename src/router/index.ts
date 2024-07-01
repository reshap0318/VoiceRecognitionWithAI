import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ChatV1 from '@/views/ChatV1.vue'
import ChatV2 from '@/views/ChatV2.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/v1',
      name: 'v1',
      component: ChatV1
    },
    {
      path: '/v2',
      name: 'v2',
      component: ChatV2
    }
  ]
})

export default router
