import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/router.js'
import store from "@/vuex/store.js"
import 'bootstrap/dist/css/bootstrap.min.css'


const app = createApp(App)

app.use(router)
app.use(store)
app.mount('#app')
