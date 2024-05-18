import postRequest from "@/vuex/request/postRequest.js";
import getRequest from "@/vuex/request/getRequest.js";

export default {
    actions: {
        pushUser(context, data) {
            return postRequest('users', data, 'updateUser', context)
        },
        fetchToken(context, data) {
            return postRequest('users/auth', data, 'updateTokens', context)
        },
        fetchUser(context, id) {
            return getRequest('users/' + id, 'updateUser', context)
        },
        fetchUsers(context) {
            return getRequest('users', 'updateUsers', context)
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
        }
    }
}
