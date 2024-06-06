import {createRouter, createWebHistory} from 'vue-router'

const routes = [
  {
    path:'/createCertificate',
    component:import('@/pages/CreateCertificatePage.vue')
  },
  {
    path:'/create-course',
    component: () => import('@/pages/CourseCreatePage.vue')
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
