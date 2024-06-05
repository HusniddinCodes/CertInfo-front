import postRequest from "@/vuex/request/postRequest.js";
import getRequest from "@/vuex/request/getRequest.js";
import axios from "@/vuex/axios.js"

export default {
    namespaced: true,
    actions: {
        pushCourse(context, data) {
            return postRequest('/courses', data, 'updateCourse', context);
        },
        fetchCourse(context, id) {
            return getRequest('/courses/' + id, 'updateCourse', context);
        },
        fetchCourses(context) {
            return new Promise((resolve, reject) => {
                axios
                    .get('/courses')
                    .then((response) => {
                        let courses = {
                            models: response.data['hydra:member'],
                            totalItems: response.data['hydra:totalItems']
                        };
                        context.commit('updateCourses', courses);
                        resolve();
                    })
            });
        }
    },
    mutations: {
        updateCourse(state, course) {
            state.course = course;
        },
        updateCourses(state, courses) {
            state.courses = courses;
        }
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
        }
    },
    getters: {
        getCourse(state) {
            return state.course;
        },
        getCourses(state) {
            return state.courses.models;
        }
    }
};
