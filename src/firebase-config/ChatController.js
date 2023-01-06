import { db } from "@/main"
import { collection, addDoc} from "firebase/firestore";
import { orderBy, where, query, getDocs} from "firebase/firestore"

const ChatApi = {
    createChat: async (data) => {
        await addDoc(collection(db, "ChatId"), {
            fromID: data.fromID,
            toID: data.toID,
            lastMessage: 'You not comunicated with it',
            countOfMessages: 0,
            atCreated: new Date().toLocaleString(),
            atUpdated: new Date().toLocaleString(),
        }).then( (chatInstance) => {
            console.log(chatInstance.id)
        }).catch(err => {
            console.log(err)
        })
    },

    getChat: async (data_) => {
        const q = query(collection(db, "ChatId"), orderBy("atCreated", "asc"), where("toID", "in", [data_.toID, data_.fromID]))
        let chat_lst = []
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            if(!doc) {
                console.log('not 00001')
                return
            }
            if(doc.data().fromID === data_.fromID || doc.data().fromID === data_.toID)
            {
                if(doc.data().fromID === doc.data().toID) return
                let data_chat = {
                    id: doc.id,
                    toId: doc.data().toID,
                    fromId: doc.data().fromID,
                    atCreated: doc.data().atCreated,
                    atUpdated: doc.data().atUpdated,
                    lastMessage: doc.data().lastMessage,
                }
                chat_lst.push(data_chat)
            } else {
              return
            }
        })
        return chat_lst
    },

    getChatById: async () => {

    },
}

export { ChatApi }