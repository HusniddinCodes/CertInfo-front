import axios from "@/vuex/axios.js"

export default function (url, id, mutationName, context) {
    return new Promise((resolve, reject) => {
        axios
            .delete(url + id)
            .then(response => {
                context.commit(mutationName, response)
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
