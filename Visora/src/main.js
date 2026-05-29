import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import { createApp } from 'vue'
import store from './service/store/index.js'
import App from './App.vue'
import { routes } from './routes'
import { createRouter, createWebHistory } from 'vue-router'

import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faInstagram, faXTwitter, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons'

library.add(faUser, faFacebook, faInstagram, faXTwitter, faGithub)
library.add(faEnvelope, faPhone, faLocationDot)

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const token = localStorage.getItem('token')

  const isAdmin = user?.role === 'admin'

  const requiresAuth = to.matched.some((r) => r.meta.requiresAuth)
  const requiresAdmin = to.matched.some((r) => r.meta.requiresAdmin)

  if (requiresAuth && !token) {
    return next('/loginpage')
  }

  if (requiresAdmin && !isAdmin) {
    return next('/')
  }

  next()
})

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.config.globalProperties.$quill = Quill

app.use(store)
app.use(router)

app.mount('#app')
