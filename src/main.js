import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/router.js'
import store from "@/vuex/store.js"
import 'bootstrap/dist/css/bootstrap.min.css'
import maskDateDirective from '@/directives/maskDateDirective.js'

const app = createApp(App)

app.use(router)
app.use(store)
app.directive('mask-date', maskDateDirective)
app.mount('#app')
