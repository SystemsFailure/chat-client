// import { ref, list} from "firebase/storage";
import { ref, list, getDownloadURL} from "firebase/storage";
// import {addDoc, collection} from "firebase/firestore"

import { storage } from "@/main";
// import { db } from "@/main";

const MusicApi = {
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