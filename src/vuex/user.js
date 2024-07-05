import postRequest from "@/vuex/request/postRequest.js"
import getRequest from "@/vuex/request/getRequest.js"
import putRequest from "@/vuex/request/putRequest.js"
import modal from "bootstrap/js/src/modal.js"

export default {
    actions: {
        pushUser(context, data) {
            return postRequest('/users', data, 'updateUser', context)
        },
        fetchUsers(context, data) {
            return getRequest('/users', data, 'updateUsers', context)
        },
        fetchToken(context, data) {
            context.commit('updateIsLoadingSettings', true)
            return postRequest('/users/auth', data, 'updateTokens', context)
                .then(response => {
                    const payload = {
                        status: response.status,
                        description: response.data.message
                    }
                    context.commit('updateResponse', payload)
                }).catch(error => {
                    const payload = {
                        status: error.response.status,
                        description: error.response.data['hydra:description']
                    }
                    context.commit('updateResponse', payload)
                })
                .finally(() => {
                    context.commit('updateIsLoadingSettings', false)
                })
        },
        fetchUser(context, data) {
            context.commit('updateIsLoadingSettings', true)
            return postRequest('/users/about_me', data, 'updateUser', context)
                .finally(() => {
                    context.commit('updateIsLoadingSettings', false)
                })
        },
        fetchRequestResetPassword(context, data) {
            context.commit('updateIsLoadingSettings', true)
            return postRequest('users/request_reset_password', data, 'updateResponse', context)
                .then(response => {
                    new modal(document.getElementById('successModal')).show()
                    const payload = {
                        status: response.status,
                        description: response.data.message
                    }
                    context.commit('updateResponse', payload)
                }).catch(error => {
                    const payload = {
                        status: error.response.status,
                        description: error.response.data['hydra:description']
                    }
                    new modal(document.getElementById('errorModal')).show()
                    context.commit('updateResponse', payload)
                })
                .finally(() => {
                    context.commit('updateIsLoadingSettings', false)
                })
        },
        fetchResetPassword(context, data) {
            return postRequest('/users/reset-password', data, 'updateResponse', context)
                .then(response => {
                    new modal(document.getElementById('successModal')).show()
                    const payload = {
                        status: response.status,
                        description: 'Krasavchik, parol yangilandi'
                    }
                    context.commit('updateResponse', payload)
                    context.commit('updateTokens', response)
                }).catch(error => {
                    const payload = {
                        status: error.response.status,
                        description: error.response.data['hydra:description']
                    }
                    new modal(document.getElementById('errorModal')).show()
                    context.commit('updateResponse', payload)
                })        },
        changePassword(context, {id, data}) {
            return putRequest(`users/${id}/password`, data, 'updateResponse', context)
                .then(response => {
                    new modal(document.getElementById('successModal')).show()
                    const payload = {
                        status: response.status,
                        description: 'Parol yangilandi'
                    }
                    context.commit('updateResponse', payload)
                }).catch(error => {
                    const payload = {
                        status: error.response.status,
                        description: error.response.data['hydra:description']
                    }
                    new modal(document.getElementById('errorModal')).show()
                    context.commit('updateResponse', payload)
                })
        },
        changeUserData(context, {id, data}) {
            return putRequest(`users/${id}`, data, 'updateResponse', context)
                .then(response => {
                    new modal(document.getElementById('successModal')).show()
                    const payload = {
                        status: response.status,
                        description: response.data.message
                    }
                    context.commit('updateResponse', payload)
                }).catch(error => {
                    const payload = {
                        status: error.response.status,
                        description: error.response.data['hydra:description']
                    }
                    new modal(document.getElementById('errorModal')).show()
                    context.commit('updateResponse', payload)
                })
        },
    },
    mutations: {
        updateUser(state, user) {
            state.user = user.data
        },
        updateUsers(state, users) {
            state.users = users.data
        },
        updateTokens(state, tokens) {
            localStorage.setItem('accessToken', tokens.data.accessToken)
            localStorage.setItem('refreshToken', tokens.data.refreshToken)

            state.accessToken = tokens.data.accessToken
            state.refreshToken = tokens.data.refreshToken
        },
        updateResponse(state, response) {
            state.response = response
        },
        updateIsLoadingSettings(state, isLoading) {
            state.isLoading = isLoading
        },
    },
    state: {
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken'),

        user: {
            "@id": null,
            id: null,
            email: null,
            roles: null,
            createdAt: null,
            updatedAt: null,
            person: null
        },
        users: {
            models: [],
            totalItems: 0
        },
        response: {
            status: null,
            description: null
        },
        isLoading: false
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
        },
        getUserResponse(state) {
            return state.response
        },
        getResponse(state) {
            return state.response
        },
        getIsLoadingSettings(state) {
            return state.isLoading
        },
        isAuthorized(state) {
            return state.accessToken !== null
        },
        isAdmin: (state) => {
            try {
                const token = state.accessToken

                if (token === null) {
                    return false
                }

                const base64Url = token.split('.')[1]
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
                const payload = JSON.parse(window.atob(base64))

                return payload.roles && payload.roles.includes('ROLE_ADMIN')
            } catch (e) {
                console.error('Error decoding token', e)

                return false
            }
        }
    }
}
