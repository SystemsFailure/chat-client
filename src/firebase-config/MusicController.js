// import { ref, list} from "firebase/storage";
import { ref, list, getDownloadURL, uploadBytes} from "firebase/storage";
import {addDoc, collection, query, getDocs} from "firebase/firestore"

import { storage } from "@/main";
import { db } from "@/main";

const MusicApi = {

    sendFile: async ( data ) => {
        console.log(data, 'start')
        let file_url = null
        if(!data)
        {
            console.log('data is not defined')
            return
        }
        const storageRef = ref(storage, 'musics/' + `${data.name} - ` + data.userId)
        console.log(storageRef, 'storageReference')
        await uploadBytes(storageRef, data.file).then( async (snapshot) => {
            const starsRef = ref(storage, snapshot.metadata.fullPath)
            console.log(starsRef, 'file been upload successful')
            if(!starsRef) {
                console.log(starsRef, 'not found', 'MessageController -> file not found' + ``)
            }
            await getDownloadURL(starsRef).then((url) => {
                console.log(url, 'url return successful')
                file_url = url
              }).catch((error) => {
                console.log(error)  
              })
          }).catch( error => {
            console.log(error)
          })
          return {file_url: file_url}
    },

    sendFileDocument: async (data) => {
        await addDoc(collection(db, "musics"), data).then( async () => {
            console.log('file been created successful')
        }).catch(err => {console.log(err)})
        
    },

    getAllMusicsDocs: async() => {
        const query_ = query(collection(db, 'musics'))
        let musicsList = []
        const querySnapshot = await getDocs(query_)
        querySnapshot.forEach((doc) => {
            let data_message = {
                id: doc.id,
                url: doc.data().url,
                name: doc.data().name,
                artist: doc.data().artist,
                size: doc.data().size,
                type: doc.data().type,
                userId: doc.data().userId,
                playlist: doc.data().playlist,
            }
            musicsList.push(data_message)
        })
        console.log(musicsList, 'array')
        return musicsList
    },

    getImg: async () => {
        try {
            const listRef = ref(storage, 'chat-files-package');
            let firstChunck = await list(listRef, { maxResults: 100 })
            firstChunck.items.forEach(async elem => {
                await getDownloadURL(elem).then(async url => {
                    // await addDoc(collection(db, "musics"), {
                    //     name: elem.name,
                    //     url: url,
                    //     artist: 'Eric Dragons'
                    // }).then( async () => {
                    //     console.log('created document')
                    // }).catch(err => console.log(err))
                    console.log(url)
                })
            })
        } catch (error) {
            console.log(error)
        }
    },

    getAllMusics: async () => {
            let arrayList = []
            const listRef = ref(storage, 'musics');
            await list(listRef, { maxResults: 100 }).then(async firstPage => {

                for (let index = 0; index < firstPage.items.length; index++) {
                    const folderRef = firstPage.items[index];
                    let data_music = {
                        id: folderRef.name,
                        name: folderRef.name,
                        artist: 'Eric Leonhard',
                    }
                    arrayList.push(data_music)
                }
            })
            return arrayList

            
          
            // Fetch the second page if there are more elements.
            // if (firstPage.nextPageToken) {
            //   const secondPage = await list(listRef, {
                // maxResults: 100,
                // pageToken: firstPage.nextPageToken,
            //   });
              // processItems(secondPage.items)
              // processPrefixes(secondPage.prefixes)
        // }

        // const listRef_ = ref(storage, 'files/uid');

        // // Find all the prefixes and items.
        // listAll(listRef)
        // .then((res) => {
        //     res.prefixes.forEach((folderRef) => {
        //     // All the prefixes under listRef.
        //     // You may call listAll() recursively on them.
        //     });
        //     res.items.forEach((itemRef) => {
        //     // All the items under listRef.
        //     });
        // }).catch((error) => {
        //     // Uh-oh, an error occurred!
        // });
    }
}

export {MusicApi}