import postRequests from "@/vuex/requests/postRequests.js";
import getRequests from "@/vuex/requests/getRequests.js";

export default {
    actions: {
        pushUser(context, data) {
            return postRequests('/users', data, 'updateUser', context)
        },
        fetchToken(context, data) {
            return postRequests('/users/auth', data, 'updateTokens', context)
        },
        fetchUser(context, id) {
            return getRequests('/users/' + id, 'updateUser', context)
        },
        fetchUsers(context, data) {
            return getRequests('/users', data, 'updateUsers', context)
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
