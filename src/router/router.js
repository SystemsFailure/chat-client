import StartAppComponent from "@/pages/StartAppComponent";
import registerPage from "@/pages/registerPage";
import messangerPage from "@/pages/MessangerComp"
import {createRouter, createWebHistory} from 'vue-router'
import store from "@/store/store";

const routes = [
    {path: '/', component: StartAppComponent, name: 'mainPage'},
    {path: '/register', name: 'registerPage', component: registerPage, beforeEnter: (to) => {
        if(to.name === 'registerPage')
        return true
      },},
    {path: '/messanger', name: 'messangerPage', component: messangerPage, beforeEnter: (to) => {
        if(to.name != 'registerPage' && !store.state.isAuth) {
            return {name: 'registerPage'}
        }
    }}
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router