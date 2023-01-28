const playerModule = {
    state: () => ({
        isArray: [],
        currentSong: null,
    }),
    mutations: {
        setMusicsInArray(state, value) {
            state.isArray = value
        },
        clearisArray(state) {
            state.isArray = []
            state.isArray.length = 0
        },
        setCurrentSong(state, value) {
            state.currentSong = value
        }
    },
    actions: {
        request_getAllMusicsById(state) {
            console.log(state.isArray)
        },
    },
    getters: {

    }
}

export default playerModule