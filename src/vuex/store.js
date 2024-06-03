import {createStore} from "vuex";
import certificate from "@/vuex/certificate.js";
import course from "@/vuex/course.js";
import user from "@/vuex/user.js";    
import person from "@/vuex/person.js";

export default createStore({
    modules: {
        certificate,
        course,
        user,
        person
    }
})
