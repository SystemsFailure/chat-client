import IError from "@/IError"
import { db } from "@/main"
import { collection, addDoc, orderBy, where, query, getDocs} from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/main";

const MessagesApi = {

    uploadImageMessage: async (file, user_id, data_) => {
        let file_path = null
        let file_url = null
        const query_ = query(collection(db, "messages"), orderBy("atCreated", "asc"), where("toId", "in", [data_.toId, data_.fromId]))
        await getDocs(query_).then(async array => {
            if(!user_id) {
              IError('localStorage -> item = user-id === null')
              return
            }
            const storageRef = ref(storage, '/chat-files-package/users-photo-message_id - ' + user_id + array.size)
            await uploadBytes(storageRef, file).then( async (snapshot) => {
                file_path = snapshot.metadata.fullPath
                const starsRef = ref(storage, snapshot.metadata.fullPath)
                if(!starsRef) {
                    console.log(starsRef, 'not found', 'MessageController -> file not found' + `${file_path}`)
                }
                await getDownloadURL(starsRef).then((url) => {
                    file_url = url
                  }).catch((error) => {
                    switch (error.code) {
                      case 'storage/object-not-found':
                        IError(error.code)
                        break;
                      case 'storage/unauthorized':
                        IError(error.code)
                        break;
                      case 'storage/canceled':
                        IError(error.code)
                        break;
                      case 'storage/unknown':
                        IError(error.code)
                        break;
                    }
                  })
              }).catch( error => {
                IError(error)
              })
        })
        return {file_path: file_path, file_url: file_url}
      },


    getAllMessage: async (data_) => {
        const q = query(collection(db, "messages"), orderBy("atCreated", "asc"), where("toId", "in", [data_.toId, data_.fromId]))
        let mess_lst = data_.message_lst
        mess_lst = []
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            if(doc.data().fromId === data_.fromId || doc.data().fromId === data_.toId)
            {
                if(doc.data().fromId === doc.data().toId) return
                let data_message = {
                    id: doc.id,
                    content: doc.data().content,
                    toId: doc.data().toId,
                    fromId: doc.data().fromId,
                    result: true,
                    size: doc.data().size,
                    atCreated: doc.data().atCreated,
                    atUpdated: doc.data().atUpdated,
                    view: doc.data().view,
                    img_url: doc.data().img_url,
                    img_name: doc.data().img_name,
                }
                mess_lst.push(data_message)
            } else {
                IError(doc.data().content)
                IError(mess_lst)
            }
        })
        return mess_lst
    },

    createMessage: async (data, data_r=null) => {
        if(!data) {IError('data is empty -> MessageApi')}
        if(!data.fromId) {IError('fromId is null -> MessageApi')}
        if(!data.toId) throw IError('toId as null -> MessageApi')
        const array = await addDoc(collection(db, "messages"), data).then( async () => {
            return await MessagesApi.getAllMessage(data_r)
        }).catch(err => {
            IError(err)
        })
        return array
    },

    incrementValue: () => {

    },

    deleteMessage: () => {

    },

    editMessage: () => {

    },

    deleteAllMessage: () => {

    },

    ViewingMessage: () => {

    }
}

export {MessagesApi}