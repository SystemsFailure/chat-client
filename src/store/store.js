import {createStore} from "vuex";
import playerModule from "@/store/modules/playerModule";
import playlistModule from '@/store/modules/playlistController'
import toastModule from "./modules/toastModule";

const store = createStore({

    modules: {
        player: playerModule,
        playlist: playlistModule,
        toast: toastModule,
    },

    state: () => ({
        user_data: [],
        validated: true,
        isAuth: true,
        URL: 'http://localhost:3000/',
        inp_text_for_fulter: '',
        AuthOrRegister: false,
        hideExploreBar: false,
        id_backgroundImage: null,
        showProfile: false,
        itemByProfile: [],
        online: false,
        USERID: null,
        UserPersonalData: [],
        showDialogDeleteWindow: false,
        // showCycyleNotifyItem: false

    }),
    mutations: {
        changeDialogValue (state) {
            state.showDialogDeleteWindow = true
        },

        showEventMutation (state) {
            state.showProfile = !state.showProfile
        },
        changeProfile (state, newProxy) {
            state.itemByProfile = [newProxy]
        },
        globalFunctionUpdateChat (array) {
            if(array) {
                return array = []
            } else {
                console.log('array already by clean')
            }
        },
    }
})
export default store