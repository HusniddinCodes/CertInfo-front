import postRequest from "@/vuex/request/postRequest.js";
import getRequest from "@/vuex/request/getRequest.js";

export default {
    actions: {
        pushUser(context, data) {
            return postRequest('/users', data, 'updateUser', context)
        },
        fetchToken(context, data) {
            return postRequest('/users/auth', data, 'updateTokens', context)
        },
        fetchUser(context, id) {
            return getRequest('/users/' + id, 'updateUser', context)
        },
        fetchUsers(context, data) {
            return getRequest('/users', data, 'updateUsers', context)
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
