import axios from "@/vuex/axios.js"

export default function ( url, mutationName, context) {
    return new Promise((resolve, reject) => {
        axios
            .get(url)
            .then(response => {
                context.commit(mutationName, response)
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
