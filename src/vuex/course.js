import postRequest from "@/vuex/request/postRequest.js";
import getRequest from "@/vuex/request/getRequest.js";

export default {
    actions: {
        pushCourse(context, data) {
            return postRequest('/courses', data, 'updateCourse', context)
        },
        fetchCourse(context, id) {
            return getRequest('/courses/' +id, 'updateCourse', context)
        },
        fetchCourses(context) {
            return getRequest('/courses','updateCourses', context)
        },
    },
    mutations: {
        updateCourse(state, course) {
            state.course = course
        },
        updateCourses(state, courses) {
            state.courses = courses
        },

    },
    state: {
        course: {
            "@id": null,
            id: null,
            name: null,
            description: null,
            createdAt: null,
        },

        courses: {
            models: [],
            totalItems: 0
        }
    },
    getters: {
        getCourse(state) {
            return state.course
        },
        getCourses(state) {
            return state.courses.models
        },
    }
}
