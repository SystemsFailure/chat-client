import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/main";
const contextmenu = {
    state: () => ({
        idSelectedMessage: undefined,
        editedText: undefined,
    }),

    mutations: {
        setidSelectedMessage(st, vl) {
            st.idSelectedMessage = vl
        }
    },

    actions: {
        async deleteMessageById({state}) {
            await deleteDoc(doc(db, "messages", state.idSelectedMessage));
        },
    },

    getters: {

    },

    namespaced: true,
}

export default contextmenu