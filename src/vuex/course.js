import postRequest from "@/vuex/request/postRequest.js"
import getRequest from "@/vuex/request/getRequest.js"

export default {
    actions: {
        pushCourse(context, data) {
            context.commit('updateIsLoadingCourses', true)
            return postRequest('/courses', data, 'updateCourse', context)
                .finally(() => {
                    context.commit('updateIsLoadingCourses', false)
                })
        },
        fetchCourse(context, id) {
            return getRequest('/courses/' + id, 'updateCourse', context)
        },
        fetchCourses(context) {
            context.commit('updateIsLoadingCourses', true)
            return getRequest('/courses', 'updateCourses', context)
                .finally(() => {
                    context.commit('updateIsLoadingCourses', false)
                })
        }

    },
    mutations: {
        updateCourse(state, course) {
            state.course = course
        },
        updateCourses(state, courses) {
            state.courses.models = courses.data['hydra:member']
        },
        updateIsLoadingCourses(state, isLoading) {
            state.isLoading = isLoading
        },
    },
    state: {
        course: {
            "@id": null,
            id: null,
            name: null,
            description: null,
            createdAt: null
        },
        courses: {
            models: [],
            totalItems: 0
        },
        isLoading: false
    },
    getters: {
        getCourse(state) {
            return state.course
        },
        getCourses(state) {
            return state.courses.models
        },
        getIsLoadingCourses(state) {
            return state.isLoading
        }
    }
}
