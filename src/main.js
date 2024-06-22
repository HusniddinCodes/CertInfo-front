import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/router.js'
import store from "@/vuex/store.js"
import 'bootstrap'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import maskDateDirective from '@/directives/maskDateDirective.js'

const app = createApp(App)

app.config.globalProperties.$apiBaseMediaUrl = import.meta.env.VITE_API_MEDIA_URL

app.use(router)
    .use(store)
    .directive('mask-date', maskDateDirective)
    .mount('#app')
