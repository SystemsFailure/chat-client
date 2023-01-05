import { db } from "@/main"
import { collection, addDoc} from "firebase/firestore";

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

    getChat: async () => {

    },
}

export { ChatApi }