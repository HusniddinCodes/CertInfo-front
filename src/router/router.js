import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path:'/createCertificate',
    component:import('@/pages/createCertificatePage.vue')
  },
  {
    path:'/create-course',
    component: () => import('@/pages/courseCreatePage.vue')
  },
]

export default createRouter({
  history: createWebHistory(),
  routes
})
