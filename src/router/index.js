import { createRouter, createWebHistory } from 'vue-router'
import Fileupload from '@/views/Fileupload.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Fileupload,
    },
  ],
})

export default router
