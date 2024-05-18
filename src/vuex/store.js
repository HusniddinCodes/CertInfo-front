import {createStore} from "vuex";
import person from "@/vuex/person.js";

export default createStore({
    modules: {
        person,
    }
})
