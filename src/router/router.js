import {createRouter, createWebHistory} from 'vue-router'
import store from "@/vuex/store.js"

const routes = [
    {
        path: '/admin/create-certificate',
        component: () => import('@/pages/CreateCertificatePage.vue')
    },
    {
        path: '/admin/certificate-edit/:id',
        component: () => import('@/pages/CreateCertificatePage.vue')
    },
    {
        path: '/admin/create-course',
        component: () => import('@/pages/CourseCreatePage.vue')
    },
    {
        path: '/admin/certificates',
        component: () => import('@/pages/CertificatesPage.vue')
    },
    {
        path: '/admin/certificate-info/:certificateId',
        component: () => import('@/pages/CertInfoPage.vue')
    },
    {
        path: '/scan-qr/:certificate',
        component: () => import('@/pages/CertInfoPage.vue')
    },
    {
        path: '/sign-in',
        component: () => import('@/pages/LoginPage.vue')
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.path.startsWith('/admin') && !store.getters.isAdmin) {
        next({path: '/sign-in'})
    } else {
        next()
    }
})

export default router
