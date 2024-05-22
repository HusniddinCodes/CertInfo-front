import postRequest from "@/vuex/request/postRequest.js";
import getRequest from "@/vuex/request/getRequest.js";

export default {
    actions: {
        pushPerson(context,data) {
            return postRequest('/persons',data, 'updatePerson', context)
        },

        fetchPerson(context, id) {
            return getRequest("/persons" + id,'updatePerson',context)
        },
        fetchPersons(context) {
            return getRequest('/persons','updatePersons', context)
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
            givenName: null,
            familyName: null,
            avatar: null,
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
