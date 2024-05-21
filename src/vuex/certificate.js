import postRequests from "@/vuex/requests/postRequests.js";
import getRequests from "@/vuex/requests/getRequests.js";

export default {
    actions: {
        pushCertificate(context, data) {
            return postRequests('/certificates', data, 'updateCertificate', context)
        },

        fetchCertificate(context, id) {
            return getRequests('/certificates/' + id, 'updateCertificate', context)
        },

        fetchCertificateByQrCode(context, id) {
            return getRequests('/certificates/' + id, 'updateCertificateByQrCode', context)
        },

        fetchCertificates(context) {
            return getRequests('/certificates', 'updateCertificates', context)
        }
    },
    mutations: {
        updateCertificate(state, certificate) {
            state.certificate = certificate
        },
        updateCertificateByQrCode(state, certificateByQrCode) {
            state.certificateByQrCode = certificateByQrCode
        },
        updateCertificates(state, certificates) {
            state.certificates = certificates
        }
    },
    state: {
        certificate: {
            certificate: {
                "@id": null,
                id: null,
                createdAt: null
            }
        },
        certificateByQrCode: {
            certificateByQrCode: {
                "@id": null,
                id: null,
                createdAt: null
            }
        },
        certificates: {
            hydraTotalItems: 0,
            hydraMember: []

        }
    },
    getters: {
        getCertificate(state) {
            return state.certificate
        },
        certificateByQrCode(state) {
            return state.certificateByQrCode
        },
        getCertificates(state) {
            return state.certificates.hydraMember
        }
    }
}
