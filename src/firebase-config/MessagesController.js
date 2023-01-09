import IError from "@/IError"
import { db } from "@/main"
import { collection, addDoc, orderBy, where, query, getDocs, deleteDoc, doc, runTransaction} from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/main";

const MessagesApi = {

    uploadImageMessage: async (file, user_id, data_) => {
        let file_path = null
        let file_url = null
        const query_ = query(collection(db, "messages"), orderBy("index", "asc"), where("toId", "in", [data_.toId, data_.fromId]))
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
        const q = query(collection(db, "messages"), orderBy("index"), where("toId", "in", [data_.toId, data_.fromId]))
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
                    result: doc.data().result,
                    size: doc.data().size,
                    atCreated: doc.data().atCreated,
                    atUpdated: doc.data().atUpdated,
                    view: doc.data().view,
                    img_url: doc.data().img_url,
                    img_name: doc.data().img_name,
                    totalCount: doc.data().totalCount,
                    index: doc.data().index
                }
                mess_lst.push(data_message)
            } else {
              return
              // console.log('error')
                // IError(doc.data().content)
                // IError(mess_lst)
            }
        })
        return mess_lst
    },

    createMessage: async (data, data_r=null) => {
        if(!data) {IError('data is empty -> MessageApi')}
        if(!data.fromId) {IError('fromId is null -> MessageApi')}
        if(!data.toId) throw IError('toId as null -> MessageApi')
        const array = await addDoc(collection(db, "messages"), data).then( async () => {
          // console.log(data_r)
          if (data.img_url) 
          {
            console.log('file')
            return await MessagesApi.getAllMessage(data_r)
          }
          else
          {
            console.log('text')
            return true
          }
        }).catch(err => {
            console.log(err, 'error from createMessage')
            return 'failure'
        })
        return array
    },

    createMessageImage: async (data, data_r=null) => {
      if(!data) {IError('data is empty -> MessageApi')}
      if(!data.fromId) {IError('fromId is null -> MessageApi')}
      if(!data.toId) throw IError('toId as null -> MessageApi')
      const array = await addDoc(collection(db, "messages"), data).then( async () => {
          return await MessagesApi.getAllMessage(data_r)
      }).catch(err => {
          console.log(err, 'error from createMessage')
          return 'failure'
      })
      return array
  },

    deleteMessageById: async (MESSAGEID) => {
      await deleteDoc(doc(db, "messages", MESSAGEID)).then(() => {
        console.log('message was delete')
      }).catch(err => {
        console.log(err)
      })
    },

    deleteAllMessages: async (USERID) => {
      const q = query(collection(db, "messages"))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((docum) => {
        if(docum.data().fromId === USERID || docum.data().toId === USERID) {
          const docRef = doc(db, "messages", docum.id)
          deleteDoc(docRef)
          console.log('delete mess', USERID)
        }
      })


      // const docRef = doc(db, "messages", '7z8j6LMnSwLKAJkkyOpA');
      // deleteDoc(docRef).then(() => {
      //   console.log("Entire Document has been deleted successfully.", USERID)

      // })
      // const todoRef = collection(db, 'messages')
      // let allMessages = await getDocs(todoRef)
      // allMessages.forEach(doc => {
      //   deleteDoc(doc).then(() => {
      //     console.log(doc.data(), USERID)
      //   }).catch(err => {
      //     console.log()
      //   })
      // })
    },

    returnTotalNumberOfDocuments: async () => {
      const q = query(collection(db, "messages"))
      const snapShoot = await getDocs(q)
      console.log(snapShoot.size, 'size of snap')
      return snapShoot.size
    },

    incrementValue: () => {

    },

    deleteByMessage: async (message_id) => {
      const docRef = doc(db, "messages", message_id)
      if(!docRef) {
        console.log('docRef not found')
        return
      } else {
        deleteDoc(docRef)
        console.log(docRef.id, ' was deleted...')
      }

    },

    editMessage: async (message_id, newContent) => {
      const sfDocRef = doc(db, "messages", message_id)
      try {
        await runTransaction(db, async (transaction) => {
          const sfDoc = await transaction.get(sfDocRef)
          if (!sfDoc.exists()) throw "Document does not exist!"
          // const newPopulation = sfDoc.data().population + 1
          transaction.update(sfDocRef, { content: newContent })
        })
        console.log("Transaction successfully committed!")
      } catch (e) {
        console.log("Transaction failed: ", e)
      }
      
    },

    deleteAllMessage: () => {

    },

    ViewingMessage: () => {

    }
}

export {MessagesApi}