import HomePage from './components/pages/HomePage.vue'
import ProductPage from './components/pages/ProductPage.vue'
import LoginPage from './components/pages/LoginPage.vue'
import DefoultLayout from './components/layouts/DefoultLayout.vue'
import AuthLayout from './components/layouts/AuthLayout.vue'
import SigninPage from './components/pages/SigninPage.vue'
import AdminPage from './components/pages/AdminPage.vue'
import AdminLayout from '@/components/layouts/AdminLayout.vue'
import ContactusPage from './components/pages/ContactusPage.vue'
import AboutusPage from './components/pages/AboutusPage.vue'

export const routes = [
  {
    path: '/',
    component: DefoultLayout,
    children: [
      { path: '', name: 'homepage', component: HomePage },
      { path: 'productpage', component: ProductPage },
      { path: 'contactus', component: ContactusPage },
      { path: 'aboutus', component: AboutusPage },
    ],
  },
  {
    path: '/loginpage',
    component: AuthLayout,
    children: [{ path: '', name: 'loginpage', component: LoginPage }],
  },
  {
    path: '/signinpage',
    component: AuthLayout,
    children: [{ path: '', name: 'signinpage', component: SigninPage }],
  },
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      {
        path: '',
        name: 'adminpage',
        component: AdminPage,
      },
    ],
  },
  {
    path: '/products/:id',
    component: DefoultLayout,
    children: [
      {
        path: '',
        name: 'ProductDetail',
        component: () => import('@/components/pages/DetailPage.vue'),
      },
    ],
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('@/components/pages/ForgotPasswordPage.vue'),
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: () => import('@/components/pages/ResetPasswordPage.vue'),
  },
]
