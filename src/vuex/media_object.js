import axios from "@/vuex/axios.js"

export default {
    actions: {
        pushPicture(context, data){
            return new Promise((resolve, reject) => {
                axios
                    .post('/media_objects', data, {
                        headers: {
                            'Content-Type': 'multipart/from-data'
                        }
                    })
                    .then((response) => {
                        context.commit('updatePicture', response.data)
                        resolve(response.data)
                    })
                    .catch(() => {
                        reject()
                    })
            })
        }
    },

    mutations: {
        updatePicture(state, picture){
            state.picture = picture['@id']
        }
    },
    state: {
        picture: null
    },

    getters: {
        getPicture(state) {
            return state.picture
        }
    }
}
