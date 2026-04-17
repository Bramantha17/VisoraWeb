import './assets/main.css'
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"
import { createApp } from 'vue'
import App from './App.vue'
import { routes }  from './routes'

import { createRouter, createWebHistory }  from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const app = createApp(App)
app.use(router)
app.mount('#app')