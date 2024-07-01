import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: () => import('@/App.vue')
  // },
  {
    path: '/UnpackAsar',
    name: 'UnpackAsar',
    component: () => import('@/views/UnpackAsar.vue')
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  console.log('🚀 ~ router.beforeEach ~ to, from, next:', to, from, next)
  next()
})
