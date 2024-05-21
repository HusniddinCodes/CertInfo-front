import postRequests from "@/vuex/requests/postRequests.js";
import getRequests from "@/vuex/requests/getRequests.js";

export default {
    actions: {
        pushCourse(context, data) {
            return postRequests('/courses', data, 'updateCourse', context)
        },
        fetchCourse(context, id) {
            return getRequests('/courses/' +id, 'updateCourse', context)
        },
        fetchCourses(context) {
            return getRequests('/courses','updateCourses', context)
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
