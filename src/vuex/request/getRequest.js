import axios from "@/vuex/axios.js";

export default function (url, data, mutationName, context) {
    return new Promise((resolve, reject) => {
        axios
            .get(url, data)
            .then(response => {
                context.commit(mutationName, response.data)
                resolve()
            })
            .catch(() => {
                reject()
            })
    })
}
