import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path:'/createCertificate',
    component:import('@/pages/CreateCertificatePage.vue')
  },
  {
    path:'/create-course',
    component: () => import('@/pages/CourseCreatePage.vue')
  },
]

export default createRouter({
  history: createWebHistory(),
  routes
})
