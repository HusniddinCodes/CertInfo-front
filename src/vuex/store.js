import {createStore} from "vuex";
import user from "@/vuex/user.js";    
import person from "@/vuex/person.js";

export default createStore({
    modules: {
        user,
        person
        
    }
})
