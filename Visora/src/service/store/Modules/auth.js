import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'))

  if (to.path.startsWith('/admin')) {
    if (user?.role?.toLowerCase() === 'admin') {
      next()
    } else {
      next('/login') // redirect kalau bukan admin
    }
  } else {
    next()
  }
})

export default router
