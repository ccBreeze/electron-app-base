import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'

window.addEventListener('beforeunload', (e) => {
  console.log('🚀 ~ window.addEventListener beforeunload:')
  e.preventDefault()
})

createApp(App).use(router).mount('#app')
