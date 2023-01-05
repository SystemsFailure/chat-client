import { getDocs, collection, addDoc } from "firebase/firestore";
import { orderBy, where, query} from "firebase/firestore"
import { db } from "@/main";
const NotifyApi = {
    sendNotify: async (data) => {
        await addDoc(collection(db, "notifications"), {
            fromID: data.fromID,
            toID: data.toID,
            atCreated: new Date().toLocaleString(),
            atUpdated: new Date().toLocaleString(),
            status: null,
            priviewMessage: data.priviewMessage,
        }).then(() => {
            console.log('success created notify')
        }).catch(err => {
            console.log(err)
        })
    },

    getAllNotifictions: async (data_) => {
        const q = query(collection(db, "notifications"), orderBy("atCreated", "asc"), where("toID", "in", [data_.toID]))
        let notifyList = []
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            if(doc.data().toID === data_.toID)
            {
                if(doc.data().fromID === doc.data().toID) return
                let data_message = {
                    id: doc.id,
                    previewMessage: doc.data().previewMessage,
                    toID: doc.data().toID,
                    fromID: doc.data().fromID,
                    atCreated: doc.data().atCreated,
                    atUpdated: doc.data().atUpdated,
                }
                notifyList.push(data_message)
            } else return
        })
        return notifyList
    },
}

export {NotifyApi}