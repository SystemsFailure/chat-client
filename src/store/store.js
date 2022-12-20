import {createStore} from "vuex";

const store = createStore({
    state: () => ({
        user_data: ['fas'],

        validated: true,
        isAuth: true,
        URL: 'http://localhost:3000/',

        inp_text_for_fulter: '',
        AuthOrRegister: false,
        hideExploreBar: false,
        id_backgroundImage: null,

        showProfile: false,
        itemByProfile: [
            {id: 0}
        ]
    }),
    mutations: {
        showEventMutation (state) {
            state.showProfile = !state.showProfile
        },
        changeProfile (state, newProxy) {
            state.itemByProfile = [newProxy]
        },
    }
})
export default store