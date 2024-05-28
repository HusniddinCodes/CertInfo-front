import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path:'/createCertificate',
    name:'createCertificate',
    component:import('@/pages/createCertificatePage.vue')
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
