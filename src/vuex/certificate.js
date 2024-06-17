import postRequest from "@/vuex/request/postRequest.js";
import getRequest from "@/vuex/request/getRequest.js";

export default {
    actions: {
        pushCertificate(context, data) {
            return postRequest('/certificates', data, 'updateCertificate', context)
        },

        fetchCertificate(context, id) {
            return getRequest('/certificates/' + id, 'updateCertificate', context)
        },
        fetchCertificateScanQr(context, id) {
            return getRequest('/certificates/scan_qr/' + id, 'updateCertificate', context)
        },

        fetchCertificates(context) {
            return getRequest('/certificates', 'updateCertificates', context)
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
            state.certificates.models =certificates['hydra:member']
            state.certificates.totalItems = certificates['hydra:totalItems']
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
            models:[],
            totalItems:0

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
            return state.certificates.models
        }
    }
}
