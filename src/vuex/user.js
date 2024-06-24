import postRequest from "@/vuex/request/postRequest.js"
import getRequest from "@/vuex/request/getRequest.js"
import putRequest from "@/vuex/request/putRequest.js"

export default {
    actions: {
        pushUser(context, data) {
            return postRequest('/users', data, 'updateUser', context)
        },
        fetchToken(context, data) {
            return postRequest('/users/auth', data, 'updateTokens', context)
        },
        fetchUser(context, data) {
            context.commit('updateIsLoadingSettings', true)
            return postRequest('/users/about_me', data, 'updateUser', context)
                .finally(() => {
                    context.commit('updateIsLoadingSettings', false)
                })
        },
        fetchUsers(context, data) {
            return getRequest('/users', data, 'updateUsers', context)
        },
        changeUserData(context, {id, data}) {
            return putRequest(`users/${id}`, data, 'updateUser', context)
        },
        fetchRequestResetPassword(context, data) {
            return postRequest('users/request_reset_password', data, 'updateUser', context)
        },
        fetchResetPassword(context, data) {
            return postRequest('/users/reset-password', data, 'updateUser', context)
        },
    },
    mutations: {
        updateUser(state, user) {
            state.user = user.data
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
        },

        users: {
            models: [],
            totalItems: 0
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
        getIsLoadingSettings(state) {
            return state.isLoading
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
