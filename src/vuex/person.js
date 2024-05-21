import postRequests from "@/vuex/requests/postRequests.js";
import getRequests from "@/vuex/requests/getRequests.js";

export default {
    actions: {
        pushPerson(context,data) {
            return postRequests('/persons',data, 'updatePerson', context)
        },

        fetchPerson(context, id) {
            return getRequests("/persons" + id,'updatePerson',context)
        },
        fetchPersons(context) {
            return getRequests('/persons','updatePersons', context)
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
