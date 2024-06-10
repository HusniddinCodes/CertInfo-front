import {createStore} from "vuex";
import certificate from "@/vuex/certificate.js";
import course from "@/vuex/course.js";
import user from "@/vuex/user.js";    
import person from "@/vuex/person.js";
import media_object from "@/vuex/media_object.js";

export default createStore({
    modules: {
        certificate,
        course,
        user,
        person
    }
})
