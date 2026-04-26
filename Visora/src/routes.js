import HomePage from "./components/pages/HomePage.vue"
import ProductPage from "./components/pages/ProductPage.vue"
import LoginPage from "./components/pages/LoginPage.vue"
import DefoultLayout from "./components/layouts/DefoultLayout.vue"
import AuthLayout from "./components/layouts/AuthLayout.vue"
import SigninPage from "./components/pages/SigninPage.vue"
import AdminPage from "./components/pages/AdminPage.vue"

export const routes = [
    {
        path: "/",
        component: DefoultLayout,
        children: [
            {path: "", name: "homepage", component: HomePage},
            {path: "productpage", component: ProductPage}
        ]
    },
    {
        path: "/loginpage",
        component: AuthLayout,
        children: [
            {path: "", name: "loginpage", component: LoginPage}
        ]
    },
    {
        path: "/signinpage",
        component: AuthLayout,
        children: [
            {path: "", name: "signinpage", component: SigninPage}
        ]
    },
    {
        path: "/admin",
        component: AuthLayout,
        children: [
            {path: "", name: "admin", component: AdminPage}
        ]
    },
    {
        path: "/products/:id",
        component: DefoultLayout,
        children: [
            {
                path: "",
                name: "ProductDetail",
                component: () => import('@/components/pages/DetailPage.vue')
            }
        ]
    }
]


