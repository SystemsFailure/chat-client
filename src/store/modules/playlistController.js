import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { query, where, getDocs } from "firebase/firestore"; 
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/main";

const playlistModule = {
    namespaced: true,
    state: () => ({
        filesList: [],
        playlistID: null,
        data: {},
        arrayIds: [],
        currentUserId: null,
    }),
    mutations: {
        setplaylistId(state, id) {
            state.playlistID = id
        },
        setArrayMusicId(state, array) {
            state.arrayIds = array
        },
        setData(state, object) {
            state.data = object
        },
        setToZeroList(state) {
            state.filesList = []
        },
        setCerrentUserId(state, value) {
            state.currentUserId = value
        },
    },
    actions: {
        async uploadImages(context) {
            if(!context.state.playlistID) console.log('id is null')
            if(context.state.filesList.length === 1)
            {
                await context.dispatch('createdNewPlayList')
                const storageRef = ref(storage, 'image-of-playlist/' + context.state.filesList[0].name + '-' + context.state.playlistID);
                const uploadTask = uploadBytesResumable(storageRef, context.state.filesList[0]);
                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log(progress + '% done');
                        switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        }
                    }, (error) => {
                        switch (error.code) {
                        case 'storage/unauthorized':
                            break;
                        case 'storage/canceled':
                            break;
                        case 'storage/unknown':
                            break;
                        }
                    }, () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                            console.log('context.state.playlistID', context.state.playlistID)
                            const docRef = doc(db, "playlist", context.state.playlistID);
                            await updateDoc(docRef, {
                                imgUrl: downloadURL
                            });
                            context.commit('setToZeroList')
                        });
                    }
                );
            }
        },
        async createdNewPlayList(context) {
            if(context.state.currentUserId === null)
            {
                console.log('userid in global storage is null')
                return
            }
            if(context.state.data === null)
            {
                console.log('data in global store is null')
                return
            }
            const doc = await addDoc(collection(db, "playlist"), context.state.data);
            console.log('start commit set id')
            context.commit('setplaylistId', doc.id)
        },
        async getAllPlayList(context) {
            console.log(context.state.currentUserId)
            if(context.state.currentUserId === null) 
            {
                console.log('user id into global store === null')
                return
            }
            const q = query(collection(db, "playlist"), where("userId", "==", context.state.currentUserId));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data(), 'playlist dt');
            });
        },
        async getLimitPlaylist() {

        },
    },
    getters: {

    },
}

export default playlistModule