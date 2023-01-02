import StartAppComponent from "@/pages/StartAppComponent"
import registerPage from "@/pages/registerPage"
import messangerPage from "@/pages/MessangerComp"
import DashboardAdminComp from '@/pages/DashboardAdmin/DashboardAdminComp'
import AuthApi from "@/firebase-config/AuthController"

import {createRouter, createWebHistory} from 'vue-router'
import store from "@/store/store"

const routes = [
    {path: '/', component: StartAppComponent, name: 'mainPage'},
    {path: '/register', name: 'registerPage', component: registerPage, beforeEnter: (to) => {
        if(to.name === 'registerPage') return true
      },},
    {path: '/messanger', name: 'messangerPage', component: messangerPage, beforeEnter: (to) => {
        if(to.name === 'messangerPage') {
            console.log('user to go into messenger')
        }
        if(to.name != 'registerPage' && !store.state.isAuth) {
            return {name: 'registerPage'}
        }
    }},
    {path: '/dashboard', name: 'panelComponent', component: DashboardAdminComp, beforeEnter: (to) => {
        if(to.name != 'registerPage' && !store.state.isAuth ) {
            return {name: 'registerPage'}
        }
    }},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(async (to) => {
    if(to.name != 'messangerPage') {
        AuthApi.signout()
    }
})

export default router