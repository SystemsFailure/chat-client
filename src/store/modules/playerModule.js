const playerModule = {
    state: () => ({
        isArray: [],
        currentSong: null,
    }),
    mutations: {

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