import {createStore} from "vuex";

const store = createStore({
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
        USERID: localStorage.getItem('user-id'),
        showDialogDeleteWindow: false,

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