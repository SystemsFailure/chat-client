
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/main";


const filexchange = {
    state: () => ({
        file: null,
        countIndex: null,
        progressUpload: '',
    }),
    mutations: {
        setprogressUpload(st, vl) {
            st.progressUpload = vl
        },
        setFileObj(st, vl) {
            st.file = vl
        },
        setcountIndex(st, vl) {
            st.countIndex = vl
        },
    },
    actions: {
        async uploadFileToCloud({state, getters, commit}) {
            if(state.file === null)
            {
                console.log(state.progressUpload, getters)
                return
            }
            const storageRef = ref(storage, 'chat-files-object-package/' + state.file.name + '-' + state.countIndex)
                const uploadTask = uploadBytesResumable(storageRef, state.file)
                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        commit('setprogressUpload', progress)
                        switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused')
                            break;
                        case 'running':
                            console.log('Upload is running')
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
                            console.log(downloadURL)
                            return downloadURL
                        });
                    }
                );


        },
    },
    getters: {
        getprogressUpload(st) {
            return st.progressUpload
        }
    },

    namespaced: true,
}

export default filexchange