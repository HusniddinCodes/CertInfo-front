import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/createCertificate',
        name: 'createCertificate',
        component: import('@/pages/createCertificatePage.vue')
    },
    {
        path: '/certificate-info',
        name: 'certificate-info',
        component: import('@/pages/CertInfoPage.vue')
    }
]

export default createRouter({
    history: createWebHistory(),
    routes
})
