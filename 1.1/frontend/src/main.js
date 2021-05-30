import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Initialisation de l'APP (Progressive Web APP) en important les modules requis
createApp(App).use(store).use(router).mount('#app')
