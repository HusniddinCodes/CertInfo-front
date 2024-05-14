import axios from "axios"
import store from "@/vuex/store"

axios.defaults.baseURL = import.meta.env.VITE_API_URL
axios.defaults.headers.post['Content-Type'] = 'application/ld+json'

axios.interceptors.request.use((config) => {
    if(config.url !== '/users/auth') {
        config.headers.Authorization = 'bearer ' + store.getters.getAccessToken
    }

    return config
})

export default axios
