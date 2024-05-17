import axios from "./axios.js"

export default {
    actions: {
        pushUser(context, data) {
            return new Promise((resolve, reject) => {
                axios
                    .post('users', data)
                    .then(response =>{
                        console.log("Foydalanuvchi qo'shildi")

                        let user = {
                            "@id": response.data['@id'],
                            id: response.data.id,
                            email: response.data.email,
                            roles: response.data.roles,
                            createdAt: response.data.createdAt,
                        }

                        context.commit('updateUser', user)
                        resolve()
                    })
                    .catch(() => {
                        console.log("Foydalanuvchi qo'shishda xatolik yuz berdi")
                        reject()
                    })
            })
        },
        fetchToken(context, data) {
            return new Promise((resolve, reject) => {
                axios
                    .post('users/auth', data)
                    .then(response => {
                        let tokens = {
                            accessToken: response.data.accessToken,
                            refreshToken: response.data.refreshToken,
                        }

                        context.commit('updateTokens', tokens)
                        resolve()
                    })
                    .catch(() => {
                        console.log("Token olishda xatolik!!!")
                        reject()
                    })
            })
        },
        fetchUser(context, id) {
            return new Promise((resolve, reject) => {
                axios
                    .get('users/' + id)
                    .then(response => {
                        let user = {
                            "@id": response.data['@id'],
                            id: response.data.id,
                            email: response.data.email,
                            roles: response.data.roles,
                            createdAt: response.data.createdAt,
                        }

                        context.commit('updateUser', user)
                        resolve()
                    })
                    .catch(() => {
                        reject()
                    })
            })
        },
        fetchUsers(context) {
            return new Promise((resolve, reject) => {
                axios
                    .get('users')
                    .then(response => {
                        let users ={
                            models: response.data['hydra:member'],
                            totalItems: response.data['hydra:totalItems'],
                        }

                        context.commit('updateUsers', users)
                        resolve()
                    })
                    .catch(() => {
                        reject()
                    })
            })
        },
    },
    mutations: {
        updateUser(state, user) {
            state.user = user
        },
        updateUsers(state, users) {
            state.users = users
        },
        updateTokens(state, tokens) {
            localStorage.setItem('accessToken', tokens.accessToken)
            localStorage.setItem('refreshToken', tokens.refreshToken)

            state.accessToken = tokens.accessToken
            state.refreshToken = tokens.refreshToken
        },
    },
    state: {
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refresh'),

        user: {
            "@id": null,
            id: null,
            email: null,
            roles: null,
            createdAt: null,
        },

        users: {
            models: [],
            totalItems: 0
        }
    },
    getters: {
        getUser(state) {
            return state.user
        },
        getUsers(state) {
            return state.users.models
        },
        getAccessToken(state) {
            return state.accessToken
        }
    }
}
