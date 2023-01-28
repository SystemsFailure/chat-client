import { doc, getDoc} from "firebase/firestore"
import { db } from "@/main"
const playerModule = {
    state: () => ({
        isArray: [],
        currentSong: null,
        currentSongId: null,
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
        },
        setCurrentSongId(state, value) {
            state.currentSongId = value
        },
    },
    actions: {
        request_getAllMusicsById(context) {
            console.log(context.state.isArray)
        },
        async getSongById(context) {
            if(context.state.currentSongId)
            {
                const refSong = doc(db, "musics", context.state.currentSongId)
                const docSnap = await getDoc(refSong);
                if(docSnap.exists())
                {
                    console.log(docSnap.data())
                } else {
                    console.log('so music is not exists!')
                }
            }
        }
    },
    getters: {
        calculateTime(secs) {
            const minutes = Math.floor(secs / 60);
            const seconds = Math.floor(secs % 60);
            const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
            return `${minutes}:${returnedSeconds}`;
        },
    }
}

export default playerModule