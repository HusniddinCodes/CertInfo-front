import axios from "./axios.js"

export default {
    actions: {
        pushPerson(context, data) {
            return new Promise((resolve, reject) => {
                axios
                    .post('persons', data)
                    .then(response => {
                        console.log("Person qo'shildi")

                        let person = {
                            "@id": response.data['@id'],
                            id: response.data.id,
                            givenName: response.data.givenName,
                            familyName: response.data.familyName,
                            avatar: response.data.avatar,
                        }

                        context.commit('updatePerson', person)
                        resolve()
                    })
                    .catch(() => {
                        console.log("Person qo'shishda xatolik yuz berdi")
                        reject()
                    })
            })
        },
        fetchPerson(context, id) {
            return new Promise((resolve, reject) => {
                axios
                    .get('persons/' + id)
                    .then(response => {

                        let person = {
                            "@id": response.data['@id'],
                            id: response.data.id,
                            givenName: response.data.givenName,
                            familyName: response.data.familyName,
                            avatar: response.data.avatar,
                            createdAt: response.data.createdAt,
                        }

                        context.commit('updatePerson', person)
                        resolve()
                    })
                    .catch(() => {
                        reject()
                    })
            })
        },
        fetchPersons(context) {
            return new Promise((resolve, reject) => {
                axios
                    .get('persons')
                    .then(response => {

                        let persons = {
                            models: response.data['hydra:member'],
                            totalItems: response.data['hydra:totalItems'],
                        }

                        context.commit('updatePersons', persons)
                        resolve()
                    })
                    .catch(() => {
                        reject()
                    })
            })
        },
    },
    mutations: {
        updatePerson(state, person) {
            state.person = person
        },
        updatePersons(state, persons) {
            state.persons = persons
        },

    },
    state: {
        person: {
            "@id": null,
            id: null,
            email: null,
            roles: null,
            createdAt: null,
        },

        persons: {
            models: [],
            totalItems: 0
        }
    },
    getters: {
        getPerson(state) {
            return state.person
        },
        getPersons(state) {
            return state.persons.models
        },
    }
}
