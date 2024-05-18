import axios from "@/vuex/axios.js";

export default function (url, mutationName, context) {
    return new Promise((resolve, reject) => {
        axios
            .get(url, id)
            .then(response => {
                context.commit(mutationName, response.data)
                resolve()
            })
            .catch(() => {
                reject()
            })
    })
}
