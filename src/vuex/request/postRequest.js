import axios from "@/vuex/axios.js"

export default function (url, data, mutationName, context) {
    return new Promise((resolve, reject) => {
        axios
            .post(url, data)
            .then(response => {
                context.commit(mutationName, response)
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
