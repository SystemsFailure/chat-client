<template>

<div class="main-comp">
    <div class="main-settings-comp">

        <div class="main-info-user">
            <div class="image0-user">
                <img alt="" src="@/assets/user_profile.png" id="photoAvatarUser" style="width:50px;height:50px; border-radius: 50%; color:white">
                <img :src="URLIMAGE" alt="" id="photoRsUUser">

                <div class="inner-info-box">
                    <span id="user-name-text"></span>
                    <span>id: <span id="user-id-text"></span></span>
                </div>

            </div>
            <label for="myfile_phAvatar" class="label_2">Choice image</label>
            <input type="file" class="my" id="myfile_phAvatar" name="myfile_phAvatar" multiple @change="setBackImage">
        </div>

        <div class="sett-box">
            <h5>name</h5>
            <input type="text" placeholder="name" v-model="queryName">
            <div class="btn-changed" @click="changeValueSetting($event)" data-value="name">Change</div>
        </div>

        <div class="sett-box">
            <h5>email</h5>
            <input type="email" placeholder="email" v-model="queryEmail">
            <div class="btn-changed" @click="changeValueSetting($event)" data-value="email">Change</div>
        </div>

        <div class="sett-box">
            <h5>bio</h5>
            <input type="text" placeholder="biography" v-model="queryBio">
            <div class="btn-changed" @click="changeValueSetting($event)" data-value="bio_info">Change</div>
        </div>

        <div class="sett-box">
            <h5>status</h5>
            <input type="text" placeholder="status" v-model="queryStatus">
            <div class="btn-changed" @click="changeValueSetting($event)" data-value="status">Change</div>
        </div>

        <div class="sett-box">
            <h5>country</h5>
            <input type="text" placeholder="country" v-model="queryCountry">
            <div class="btn-changed" @click="changeValueSetting($event)" data-value="country">Change</div>
        </div>

        <div class="sett-box">
            <h5>city</h5>
            <input type="text" placeholder="city" v-model="queryCity">
            <div class="btn-changed" @click="changeValueSetting($event)" data-value="city">Change</div>
        </div>

    </div>
</div>

</template>

<script>

import {storageAPImage} from '@/firebase-config/StorageController.js'
import { runTransaction, doc } from "firebase/firestore";
import { db } from '@/main';
import IError from '@/IError';
import { TransitionApi } from '@/firebase-config/UserController';
import { UserApi } from '@/firebase-config/UserController';


export default {
    data() {
        return {
            userId: localStorage.getItem('user-id'),
            userName: localStorage.getItem('user-name'),
            SettItensList: [
                {id: 0, title: 'name', value: 'name'},
                {id: 1, title: 'email', value: 'email'},
                {id: 2, title: 'bio', value: 'bio_info'},
                {id: 3, title: 'status', value: 'state'},
                {id: 4, title: 'country', value: 'country'},
                {id: 5, title: 'city', value: 'city'},
            ],
            queryName: '',
            queryEmail: '',
            queryBio: '',
            queryStatus: '',
            queryCountry: '',
            queryCity: '',
            userPersonalData: [],

            URLIMAGE: null,
        }
    },

    mounted() {
        UserApi.GetPersonalDataOfUser(this.userId).then(user => {
            if(user) {
                document.getElementById('user-name-text').innerHTML = user[0].name
                document.getElementById('user-id-text').innerHTML = user[0].id
                document.getElementById('photoAvatarUser').src = user[0].img_url
            } else {
                console.log('user is not found!')
            }
        }).catch(err => {
            console.log(err)
        })
    },

    methods: {

        changeValueSetting(event) {
            const value = event.target.dataset.value
            console.log(value, this.queryName)

            switch (value) {
                case 'name':
                    TransitionApi.updateField(value, this.queryName, this.userId).then(
                        (result) => {
                            console.log(result)
                            localStorage.removeItem('user-name')
                            localStorage.setItem('user-name', this.queryName)
                        }
                    ).catch(err => {
                        console.log(err)
                    })
                    break;
                case 'email':
                    TransitionApi.updateField(value, this.queryEmail, this.userId).then(
                        (result) => {
                            console.log(result)
                        }
                    ).catch(err => {
                        console.log(err)
                    })
                    break;
                
                case 'bio_info':
                    TransitionApi.updateField(value, this.queryBio, this.userId).then(
                        (result) => {
                            console.log(result)
                        }
                    ).catch(err => {
                        console.log(err)
                    })
                    break;

                case 'status':
                    TransitionApi.updateField(value, this.queryStatus, this.userId).then(
                        (result) => {
                            console.log(result)
                        }
                    ).catch(err => {
                        console.log(err)
                    })
                    break;
                
                case 'country':
                    TransitionApi.updateField(value, this.queryCountry, this.userId).then(
                        (result) => {
                            console.log(result)
                        }
                    ).catch(err => {
                        console.log(err)
                    })
                    break;

                case 'city':
                    TransitionApi.updateField(value, this.queryCity, this.userId).then(
                        (result) => {
                            console.log(result)
                        }
                    ).catch(err => {
                        console.log(err)
                    })
                    break;
            
                default:
                    break;
            }
            // TransitionApi.updateField()
        },

        // fileToDataUri(field) {
        //     return new Promise((resolve) => {
        //         const reader = new FileReader();
        //         reader.addEventListener("load", () => {
        //         resolve(reader.result);
        //         });
        //         reader.readAsDataURL(field);
        //     });
        // },

        // resizeImage(imgToResize, resizingFactor = 0.5) {
        //     const canvas = document.createElement("canvas")
        //     const context = canvas.getContext("2d")

        //     const originalWidth = imgToResize.width
        //     const originalHeight = imgToResize.height
        //     console.log(imgToResize.width)

        //     const canvasWidth = originalWidth * resizingFactor
        //     const canvasHeight = originalHeight * resizingFactor

        //     canvas.width = canvasWidth
        //     canvas.height = canvasHeight

        //     context.drawImage(
        //         imgToResize,
        //         0,
        //         0,
        //         originalWidth * resizingFactor,
        //         originalHeight * resizingFactor
        //     )

        //     return canvas.toDataURL();
        // },

        async setBackImage(event) {
            let file = event.target.files[0]
            let cortUrl = URL.createObjectURL(file)
            let photoUser = document.getElementById('photoAvatarUser')
            photoUser.src = cortUrl

            storageAPImage.uploadBlobImageFile(file, localStorage.getItem('user-id')).then( () => {
                storageAPImage.downloadBlobImageFile(localStorage.getItem('user-id')).then(promise_ => {
                    try {
                        runTransaction(db, async (transaction) => {
                            const sfDoc = await transaction.get(doc(db, "users", localStorage.getItem('user-id')));
                            if (!sfDoc.exists()) {
                                throw "Document does not exist!";
                            }
                        // const newPopulation = sfDoc.data().image_url;
                        transaction.update(doc(db, "users", localStorage.getItem('user-id')), { image_url: promise_ });
                    });
                        console.log("Transaction successfully committed!");
                    } catch (e) {
                        console.log("Transaction failed: ", e);
                    }
                }).catch(error => {
                    IError(error)
                })

            }).catch( err => {
                console.log(err)
            })

            




            this.$emit('setImageToBack', cortUrl)
            // let reader = new FileReader()

            // reader.readAsDataURL(file)

            // reader.onload(function () {
            //     alert(reader.result)
            // })
        }
    }
}
</script>

<style scoped lang="scss">

$color-back: rgba(0, 0, 0, 0.4);
$color-back-trans: none;
$color-back-gray: rgba(41, 41, 41, 0.7);
$color-back-blue: rgba(12, 22, 44, 0.7);

$color-text: #4e5f7d;
$color-text-yellow: #ff6600;
$color-text-teal: #00cec7;
$color-text-izumrud: #00ff80;


.main-comp {
    width: 100%;
    height: 100%;
    // background-color: #333;
    background: $color-back;
}

.main-settings-comp{
    width: 100%;
    height: auto;
    padding-right: 10px;
    padding-left: 10px;
    padding-top: 45px;
    // background: $color-back;
    // overflow:auto;

    // background-color: red;

    display: flex;
    flex-direction: column;
    align-items: center;

    font-family: Lato,sans-serif;
    font-weight: 700;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: .02em;
    color: white;

    .main-info-user {
        width: 100%;
        height: auto;
    }

    .sett-box {
        margin-top: 10px;
        width: 100%;
        padding: 10px;
        // background-color: #4e5f7d;
        display: flex;
        // justify-content: space-between;
        align-items: center;

        input {
            // background-color: #333;
            width: 150px;
            background: none;
            outline: none;
            color: white;
            border: 1px solid #333;
            padding: 5px;
            margin-left: 35px;
        }

        h5 {
            // background-color: red;
            width: 60px;
            padding: 5px;
            border-right: 1px solid #4e5f7d;

        }

        .btn-changed {
            margin-left: 20px;
            width: 60px;
            height: 30px;
            background-color: none;
            border: 1px solid #333;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 8px;
            &:hover {
                color: white;
                background: #00cec780;
            }
        }

    }

    .my {
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
    }

    .image0-user {
        display: flex;
        align-items: center;
        // justify-content: center;

        .inner-info-box {
            margin-left: 15px;
            display: flex;
            flex-direction: column;
        }

    }

    .label_2 {
        margin-top: 10px;
        width: 100px;
        height: 30px;
        background-color: none;
        border: 1px solid #333;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        border-radius: 4px;
        // transition: all 0.18s ease-in-out;

        font-family: Lato,sans-serif;
        font-weight: 700;
        font-size: 8px;
        text-transform: uppercase;
        letter-spacing: .02em;
        color: white;
    }

    .label_2:hover {
        color: white;
        background: #00cec780;
    }
}

</style>