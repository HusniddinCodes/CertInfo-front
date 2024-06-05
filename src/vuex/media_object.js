import axios from "@/vuex/axios.js";

export default {
    namespaced: true,
    actions: {
        pushPicture(context, formData){
            return new Promise((resolve, reject) => {
                axios
                    .post('/media_objects', formData, {
                        headers: {
                            'Content-Type': 'multipart/from-data'
                        }
                    })
                    .then((response) => {
                        let picture = {
                                avatar: response.data
                        }
                        context.commit('updatePicture', picture)
                        resolve(picture)
                    })
                    .catch(() => {
                        reject()
                    })
            })
        }
    },

    mutations: {
        updatePicture(state, picture){
            state.picture = picture;
        }
    },
    state: {
        picture: null
    },

    getters: {
        getPicture(state) {
            return state.picture;
        }
    }
}
