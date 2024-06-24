import postRequest from "@/vuex/request/postRequest.js"
import getRequest from "@/vuex/request/getRequest.js"
import deleteRequest from "@/vuex/request/deleteRequest.js"
import putRequest from "@/vuex/request/putRequest.js";

export default {
    actions: {
        pushCertificate(context, data) {
            return postRequest('/certificates', data, 'updateCertificate', context)
        },
        changeCertificate(context, {id, data}) {
            return putRequest(`/certificates/${id}`, data, 'updateCertificate', context)
        },
        fetchCertificate(context, id) {
            context.commit('updateIsLoadingCertificates', true)
            return getRequest('/certificates/' + id, 'updateCertificate', context)
                .finally(() => {
                    context.commit('updateIsLoadingCertificates', false)
                })
        },
        fetchCertificateScanQr(context, id) {
            context.commit('updateIsLoadingCertificates', true)
            return getRequest('/certificates/scan_qr/' + id, 'updateCertificate', context)
                .finally(() => {
                    context.commit('updateIsLoadingCertificates', false)
                })
        },
        fetchCertificates(context, data) {
            context.commit('updateIsLoadingCertificates', true)
            let url = '?page=' +data.page

            if (data.beforeCourseFinishedDate) {
                url += '&courseFinishedDate%5Bbefore%5D=' + data.beforeCourseFinishedDate
            }

            if (data.afterCourseFinishedDate) {
                url += '&courseFinishedDate%5Bafter%5D=' + data.afterCourseFinishedDate
            }

            if (data.search !== undefined && data.search.trim() !== '') {
                url += '&search=' + encodeURIComponent(data.search.trim())
            }

            return getRequest('/certificates/' + url, 'updateCertificates', context)
                .then(() => {
                    context.commit('updateBeforeCourseFinishedDate', data.beforeCourseFinishedDate)
                    context.commit('updateAfterCourseFinishedDate', data.afterCourseFinishedDate)
                    context.commit('updateCurrentCertificatePage', data.page)
                    context.commit('updateSearch', data.search)
                })
                .finally(() => {
                    context.commit('updateIsLoadingCertificates', false)
                })
        },
        deleteCertificate(context, id) {
            return deleteRequest(`/certificates/${id}`, 'updateCertificates', context)
        }
    },
    mutations: {
        updateCertificate(state, certificate) {
            state.certificate = certificate.data
        },
        updateCertificates(state, certificates) {
            state.certificates.models = certificates.data['hydra:member']
            state.certificates.totalItems = certificates.data['hydra:totalItems']
        },
        updateBeforeCourseFinishedDate(state, beforeCourseFinishedDate) {
            state.beforeCourseFinishedDate = beforeCourseFinishedDate
        },
        updateAfterCourseFinishedDate(state, afterCourseFinishedDate) {
            state.afterCourseFinishedDate = afterCourseFinishedDate
        },
        updateCurrentCertificatePage(state, currentCertificatePage) {
            state.currentCertificatePage = currentCertificatePage
        },
        updateSearch(state, search) {
            state.search = search
        },
        updateIsLoadingCertificates(state, isLoading) {
            state.isLoading = isLoading
        },
    },
    state: {
        certificate: {
            "@id": null,
            id: null,
            owner: null,
            file: null,
            course: null,
            courseFinishedDate: null,
            practiceDescription: null,
            certificateDefense: null,
            createdBy: null,
            updatedBy: null,
            createdAt: null,
            updatedAt: null,
            imgCertificate: null
        },
        certificateByQrCode: {
            certificateByQrCode: {
                "@id": null,
                id: null,
                givenName: null,
                familyName: null,
                email: null,
                avatar: null,
                course: null,
                practiceDescription: null,
                certificateDefense: null,
                createdAt: null,
            }
        },
        certificates: {
            models: [],
            totalItems: 0

        },
        currentCertificatePage: 1,
        afterCourseFinishedDate: null,
        beforeCourseFinishedDate: null,
        search: '',
        isLoading: false
    },
    getters: {
        getCertificate(state) {
            return state.certificate
        },
        getCertificates(state) {
            return state.certificates.models
        },
        getTotalCertificates(state) {
            return state.certificates.totalItems
        },
        getCurrentCertificatePage(state) {
            return state.currentCertificatePage
        },
        getAfterCourseFinishedDate(state) {
            return state.afterCourseFinishedDate
        },
        getBeforeCourseFinishedDate(state) {
            return state.beforeCourseFinishedDate
        },
        getSearchCertificates(state) {
            return state.search
        },
        getIsLoadingCertificates(state) {
            return state.isLoading
        },
    }
}
