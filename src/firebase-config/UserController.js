import { getDoc, doc, deleteDoc, runTransaction, getDocs, collection, updateDoc, arrayUnion, increment} from "firebase/firestore";
import {auth, db} from '@/main.js'
import { signOut } from "firebase/auth";
import IError from "@/IError";

const UserApi = {

    GetPersonalDataOfUser: async (userId) => {
        const dataUser = []
        const userRef = doc(db, 'users', userId)
        await getDoc(userRef).then(user => {
            if(user.exists()) {
                const data = {
                    id: user.id,
                    name: user.data().name,
                    email: user.data().email,
                    online: user.data().online,
                    img_url: user.data().image_url,
                    lastmessage: "Hello, How are you going man? bro? good luck",
                    countNotReadMessages: user.data().countNotReadMessages,
                    arrayChats: user.data().arrayChats,
                    arrayFollowers: user.data().arrayFollowers,
                    arrayFollowing: user.data().arrayFollowing,
                    arrayNotReadMessages: user.data().arrayNotReadMessages,
                    arrayConfigurations: user.data().arrayConfigurations,
                    city: user.data().city,
                    country: user.data().country,
                    bio_info: user.data().bio_info,
                    status: user.data().status,
                    atCreated: user.data().atCreated
                }
                dataUser.push(data)
            }
        })
        return dataUser
    },

    getAllChats: async(userId) => {
        let users = []
        const docRef = doc(db, "users", userId)
        const user_ = await getDoc(docRef)
        const listChats = user_.data().arrayChats
        if(listChats) {
            for (let index = 0; index < listChats.length; index++) {
                const elementId = listChats[index]
                const userRef = doc(db, 'users', elementId)
                await getDoc(userRef).then(user => {
                    if(user.exists()) {
                        const data = {
                            id: user.id,
                            name: user.data().name,
                            email: user.data().email,
                            online: user.data().online,
                            img_url: user.data().image_url,
                            lastmessage: "Hello, How are you going man? bro? good luck",
                            countNotReadMessages: user.data().countNotReadMessages,
                            arrayChats: user.data().arrayChats,
                            arrayFollowers: user.data().arrayFollowers,
                            arrayFollowing: user.data().arrayFollowing,
                            arrayNotReadMessages: user.data().arrayNotReadMessages,
                            arrayConfigurations: user.data().arrayConfigurations,
                            city: user.data().city,
                            country: user.data().country,
                            bio_info: user.data().bio_info,
                            status: user.data().status
                        }
                        users.push(data)
                    }
                })
                
            }
        }
        return users
    },

    addUserToChats: async(userId, newValue) => {
        const user = doc(db, "users", userId)
        if(!user.id) return IError('user is not exit -> from UserController')
        await updateDoc(user, {
            arrayChats: arrayUnion(newValue)
        })
        return 'successful'
    },

    getAllUsers: async() => {
        let users_list = []
        const querySnapshot = await getDocs(collection(db, "users"))

        querySnapshot.forEach((user) => {
            const data = {
                id: user.id,
                name: user.data().name,
                email: user.data().email,
                online: user.data().online,
                img_url: user.data().image_url,
                lastmessage: "Hello, How are you going man? bro? good luck",
                countNotReadMessages: user.data().countNotReadMessages,
                arrayChats: user.data().arrayChats,
                arrayFollowers: user.data().arrayFollowers,
                arrayFollowing: user.data().arrayFollowing,
                arrayNotReadMessages: user.data().arrayNotReadMessages,
                arrayConfigurations: user.data().arrayConfigurations,
                city: user.data().city,
                country: user.data().country,
                bio_info: user.data().bio_info,
                status: user.data().status

            }
            users_list.push(data)
            // users_list = users_list.value.filter(user => user.id != localStorage.getItem('user-id'))
            // console.log(data)
            // console.log(user.id, " => ", user.data());
        });

        return users_list
    },

    getUserById: async (user_id) => {
        const docRef = doc(db, "users", user_id)
        const userSnap = await getDoc(docRef)
        if(userSnap.exists()) {
            return userSnap
        } else {
            return null
        }
    },

    deleteUser: async (userId) => {
        await deleteDoc(doc(db, "users", userId))
    },

    leaveUser: async () => {
        signOut(auth).then(() => {
            localStorage.removeItem('user-id')
            localStorage.removeItem('user-id')
            localStorage.removeItem('user-name')
            localStorage.removeItem('user-email')
            // cookie = ''
          }).catch((error) => {
            IError(error)
          });
    }
}

const TransitionApi = {
    updateField: async (
            field,
            newField,
            userId
            ) => {
        try {
            await runTransaction(db, async (transaction) => {
                if(!userId) throw 'user-id is invalid or null or false'
                // const user = await transaction.get(doc(db, "users", userId))
                // if (!user.exists()) throw "Document does not exist!"
                transaction.update(doc(db, "users", userId),
                     { [field]: newField })
            });
            console.log(`${field}`)
            return 'success'
        } catch (e) {
            console.log("Transaction failed: ", e)
          }
    },

    incrementValue: async (value, userId) => {
        const washingtonRef = doc(db, "users", userId);
        await updateDoc(washingtonRef, {
            [value]: increment(1)
        })
    }
}

export {UserApi, TransitionApi}