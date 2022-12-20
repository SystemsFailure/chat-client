import { createApp } from 'vue'
// import VueFire from 'vuefire'
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";


import App from './App.vue'
import router from "@/router/router";
import store from "@/store/store";
import mitt from 'mitt';


const firebaseConfig = {
    apiKey: "AIzaSyAMoQWSRlByi8OSrgGmFr5N9kL-V9HAlQg",
    authDomain: "messangercloud.firebaseapp.com",
    projectId: "messangercloud",
    messagingSenderId: "1018070323148",
    appId: "1:1018070323148:web:ada081b3aeb10270f1d769",
    measurementId: "G-Z946G7Z6PK",
    storageBucket: 'gs://messangercloud.appspot.com/'
}

const appBase = initializeApp(firebaseConfig);

const auth = getAuth(appBase);
const db = getFirestore(appBase);
const storage = getStorage(appBase)

onAuthStateChanged(auth, (user) => {
    if (user) {
        localStorage.setItem('user-uid', user.uid)
        store.state.isAuth = true
    } else {
        localStorage.removeItem('user-uid')
        store.state.isAuth = false
    }
});

const emmiter = mitt()
const appVue = createApp(App)
appVue.config.globalProperties.emmiter = emmiter
appVue.use(store)
.use(router).mount('#app')

export {auth, db, storage}