import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue'

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
]

const router = createRouter({
  // Permet de conserver l'historique des pages web
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
