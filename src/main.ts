import { createApp } from 'vue'
import App from './App.vue'
import { store, key } from './store'
import router from './router/index.ts'
import Notifications from '@kyvg/vue3-notification'
import './styles/index.sass'

const app = createApp(App)
app.use(store, key)
app.use(router)
app.use(Notifications)
app.mount('#app')
