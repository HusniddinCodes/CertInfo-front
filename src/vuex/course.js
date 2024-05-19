import axios from "./axios.js"

export default {
    actions: {
        pushCourse(context, data) {
            return new Promise((resolve, reject) => {
                axios
                    .post('courses', data)
                    .then(response => {
                        console.log("Course qo'shildi")

                        let course = {
                            "@id": response.data['@id'],
                            id: response.data.id,
                            givenName: response.data.name,
                            familyName: response.data.description,
                            createdAt: response.data.createdAt,
                        }

                        context.commit('updateCourse', course)
                        resolve()
                    })
                    .catch(() => {
                        console.log("Course qo'shishda xatolik yuz berdi")
                        reject()
                    })
            })
        },
        fetchCourse(context, id) {
            return new Promise((resolve, reject) => {
                axios
                    .get('courses/' + id)
                    .then(response => {

                        let course = {
                            "@id": response.data['@id'],
                            id: response.data.id,
                            givenName: response.data.name,
                            familyName: response.data.description,
                            createdAt: response.data.createdAt,
                        }

                        context.commit('updateCourse', course)
                        resolve()
                    })
                    .catch(() => {
                        reject()
                    })
            })
        },
        fetchCourses(context) {
            return new Promise((resolve, reject) => {
                axios
                    .get('courses')
                    .then(response => {

                        let courses = {
                            models: response.data['hydra:member'],
                            totalItems: response.data['hydra:totalItems'],
                        }

                        context.commit('updateCourses', courses)
                        resolve()
                    })
                    .catch(() => {
                        reject()
                    })
            })
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
