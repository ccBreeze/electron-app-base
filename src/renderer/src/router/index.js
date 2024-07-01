import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: () => import('@/App.vue')
  // },
  {
    path: '/AppAsar',
    name: 'AppAsar',
    component: () => import('@/views/AppAsar.vue')
  },
  {
    path: '/AppAsarUnpacked',
    name: 'AppAsarUnpacked',
    component: () => import('@/views/AppAsarUnpacked.vue')
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})
