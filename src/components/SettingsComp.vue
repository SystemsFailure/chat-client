<template>
<div class="main-comp">
    <div class="globalconfiguration">
        <div class="inner-container-globalconfiguration">
            <div class="line-title">global configuration</div>
            <div class="items0global0conf">
                <div class="item-conf" @click="() => {this.showAppereanceSection = true}"><img src="@/assets/svgassets/icons8-палитра-90.png" alt="">Appereance</div>
                <div class="item-conf"><img src="@/assets/svgassets/icons8-накладка-дверного-замка-100.png" alt=""> <span>Security</span></div>
                <div class="item-conf"><img src="@/assets/svgassets/icons8-кали-линукс-wh.svg" alt=""><span>Other</span></div>
            </div>
        </div>
    
    </div>

    <div class="global-section-of-appereance" v-if="showAppereanceSection">
        <div class="inner-section-box">
            <div class="line-title-section-of-appereance">Appereance</div>
            <div class="selectThemeBox">
                <span>select accent color</span>
                <div class="inner-content-accent-colors">
                    <div 
                    v-for="it in listItemsAccentColor" 
                    class="item-theme-color" 
                    :class="it.acc" 
                    :key="it.id"
                    @click="setAccentColor(it.vl)"
                    ></div>
                </div>
            </div>
        </div>
    </div>

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
            <div class="i-item-class">
                <!-- <i class="fi fi-bs-user"></i> -->
            </div>
            <input type="text" placeholder="Name" v-model="queryName">
            <!-- <div class="btn-changed" @click="changeValueSetting($event)" data-value="name">Change</div> -->
        </div>

        <div class="sett-box">
            <div class="i-item-class">
                <!-- <i class="fi fi-bs-info"></i> -->
            </div>
            <textarea type="text" placeholder="Bio" v-model="queryBio"></textarea>
            <!-- <div class="btn-changed" @click="changeValueSetting($event)" data-value="bio_info">Change</div> -->
        </div>

        <div class="sett-box">
            <div class="i-item-class">
                <!-- <i class="fi fi-bs-envelope"></i> -->
            </div>
            <input type="email" placeholder="Email" v-model="queryEmail">
            <!-- <div class="btn-changed" @click="changeValueSetting($event)" data-value="email">Change</div> -->
        </div>

        <div class="sett-box">
            <div class="i-item-class">
                <!-- <i class="fi fi-bs-link"></i> -->
            </div>
            <input type="text" placeholder="Website" v-model="queryStatus">
            <!-- <div class="btn-changed" @click="changeValueSetting($event)" data-value="status">Change</div> -->
        </div>

        <div class="sett-box">
            <div class="i-item-class">
                <!-- <i class="fi fi-bs-flag"></i> -->
            </div>
            <input type="text" placeholder="Country" v-model="queryCountry">
            <!-- <div class="btn-changed" @click="changeValueSetting($event)" data-value="country">Change</div> -->
        </div>

        <div class="sett-box">
            <div class="i-item-class">
                <!-- <i class="fi fi-bs-building"></i> -->
            </div>
            <input type="text" placeholder="Company" v-model="queryCity">
            <!-- <div class="btn-changed" @click="changeValueSetting($event)" data-value="city">Change</div> -->
        </div>

        <div class="sett-box">
            <div class="i-item-class">
                <!-- <i class="fi fi-brands-twitter"></i> -->
                <!-- <i class="fi fi-bs-building"></i> -->

            </div>
            <input type="text" placeholder="Twitter account link" v-model="queryCity">
            <!-- <div class="btn-changed" @click="changeValueSetting($event)" data-value="city">Change</div> -->
        </div>

        <div class="bottom-box">
            <div class="wrapper-box">
                <div class="btn-save"><span>save</span></div>
            </div>
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
import { mapMutations } from 'vuex';


// color - localStorage.setItem('accent-color', vl);
// backImage - localStorage.setItem('bk-img', vl);
// typeBoxMessage - localStorage.setItem('tp-bx-mess', vl);


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
            listItemsAccentColor: [
                {id: 0, acc: 'green-cl', vl: 'green'},
                {id: 1, acc: 'teal-cl', vl: 'teal'},
                {id: 2, acc: 'orange-cl', vl: 'orange'},
                {id: 3, acc: 'fiolet-cl', vl: 'fiolet'},
                {id: 4, acc: 'gray-cl', vl: 'gray'},
                {id: 5, acc: 'red-cl', vl: 'red'},
            ],
            queryName: '',
            queryEmail: '',
            queryBio: '',
            queryStatus: '',
            queryCountry: '',
            queryCity: '',
            userPersonalData: [],

            URLIMAGE: null,

            showAppereanceSection: true,
        }
    },

    mounted() {
        UserApi.GetPersonalDataOfUser(this.userId).then(user => {
            if(user) {
                document.getElementById('user-name-text').innerHTML = user[0].name
                document.getElementById('user-id-text').innerHTML = user[0].id
                // document.getElementById('photoAvatarUser').src = user[0].img_url
            } else {
                console.log('user is not found!')
            }
        }).catch(err => {
            console.log(err)
        })
    },

    computed: {

    },

    methods: {
        ...mapMutations('themescontroller', {
            changeTheme: 'changeTheme',
        }),
        setAccentColor(vl) {
            // Установка темы
            if(vl === 'gray') {
                this.changeTheme('default')
                localStorage.setItem('theme-schema', 'default')
            }
            if(vl === 'green') {
                this.changeTheme('green')
                localStorage.setItem('theme-schema', 'green')
            }
            if(vl === 'orange') {
                this.changeTheme('orange')
                localStorage.setItem('theme-schema', 'orange')
                console.log('set orange theme', localStorage.getItem('theme-schema'))
            }
            if(vl === 'teal') {
                this.changeTheme('teal')
                localStorage.setItem('theme-schema', 'teal')
            }
            if(vl === 'red') {
                this.changeTheme('red')
                localStorage.setItem('theme-schema', 'red')
            }
            if(vl === 'fiolet') {
                this.changeTheme('feolet')
                localStorage.setItem('theme-schema', 'feolet')
            }
        },

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
$color-back: rgba(0, 0, 0, 0.8);
$color-back-trans: none;
$color-back-gray: rgba(41, 41, 41, 0.7);
$color-back-blue: rgba(12, 22, 44, 0.7);

$color-text: #4e5f7d;
$color-text-yellow: #ff6600;
$color-text-teal: #00cec7;
$color-text-izumrud: #00ff80;


.main-comp {
    position: absolute;
    width: 1000px;
    height: 560px;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(4.2px);
    -webkit-backdrop-filter: blur(4.2px);
    margin: 0;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    overflow: auto;
    display: flex;
    // align-items: center;
    // justify-content: center;
    flex-direction: row;
    z-index: 4;

    .global-section-of-appereance {
        width: 45%;
        height: 100%;
        // background-color:#001011;

        .inner-section-box {
            width: 100%;
            height: 100%;
            padding: 10px;
            display: flex;
            flex-direction: column;

            .line-title-section-of-appereance {
                width: 100%;
                display: flex;
                padding: 10px;
                align-items: center;
                justify-content: center;
                font-size: 11px;
                font-weight: 700;
                font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
                text-transform: uppercase;
                color: #999;
            }

            .selectThemeBox {
                width: 100%;
                padding: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                border: 1px solid #111;
                margin-top: 10px;

                span {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 10px;
                    text-transform: uppercase;
                    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
                }

                .inner-content-accent-colors {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 15px;

                    .item-theme-color {
                        width: 20px;
                        height: 20px;
                        border-radius: 50%;
                        margin-left: 20px;

                        &:hover {
                            cursor: pointer;
                            opacity: .5;
                            transition: .3s;
                        }
                    }
                    .green-cl {
                        background-color: #00ff33;
                    }

                    .teal-cl {
                        background-color: #00cec7;
                    }

                    .orange-cl {
                        background-color: #ff6600;
                    }

                    .fiolet-cl {
                        background-color: rgb(218, 0, 234);
                    }

                    .gray-cl {
                        background-color: rgb(30, 29, 29);
                    }

                    .red-cl {
                        background-color: red;
                    }
                }
            }
        }
    }

    .globalconfiguration {
        width: 25%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        // border-right: 1px solid #111;


        .inner-container-globalconfiguration {
            width: 100%;
            height: 100%;
            padding: 5px;
            display: flex;
            flex-direction: column;

            .line-title {
                padding: 5px;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 11px;
                font-weight: 700;
                font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
                text-transform: uppercase;
                color: #4e5f7d;
            }

            .items0global0conf {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;

                .item-conf {
                    width: 100%;
                    height: 30px;
                    padding: 5px;
                    margin-top: 5px;
                    color: #999;
                    display: flex;
                    // justify-content: center;
                    padding-left: 20px;
                    align-items: center;
                    font-size: 12px;
                    font-weight: 700;
                    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
                    text-transform: uppercase;
                    span {
                        margin-top: 4px;
                    }
                    img {
                        width: 18px;
                        height: 18px;
                        margin-right: 7px;
                    }

                    &:hover {
                        cursor: pointer;
                        opacity: .5;
                        transition: .3s;
                    }
                }
            }
        }
    }
}

.main-settings-comp{
    width: 30%;
    height: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: Lato,sans-serif;
    font-weight: 700;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: .02em;
    color: white;
    border-right: 1px solid #111;

    .bottom-box {
        width: 100%;
        height: 100px;
        // background-color: $color-back;

        .wrapper-box {
            width: 100%;
            padding-top: 10px;
            .btn-save {
                float: left;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: $color-text;
                span {
                    color: white;
                    padding: 8px 15px 8px 15px;

                    &:hover {
                        cursor: pointer;
                        opacity: .8;
                    }
                }
            }
        }
    }

    .main-info-user {
        width: 100%;
        height: auto;
    }

    .sett-box {
        width: 100%;
        padding: 10px 10px 10px 0;
        display: flex;
        align-items: center;

        // .i-item-class {
        //     font-size: 16px;
        //     padding-top: 4px;
        // }

        input {
            // background-color: #333;
            width: 200px;
            background: none;
            outline: none;
            color: white;
            border: 1px solid #777;
            border-radius: 5px;
            padding: 8px;
            // margin-left: 10px;
            font-size: 12px;
        }

        textarea {
            width: 200px;
            font-size: 12px;
            padding: 8px;
            border-radius: 5px;
            background: none;
            outline: none;
            color: white;
            border: 1px solid #777;
            padding: 5px;
            max-width: 200px;
            min-width: 200px;
            max-height: 300px;
            min-height: 50px;
        }

        h5 {
            // background-color: red;
            width: 40px;
            padding: 5px;
            border-right: 1px solid #4e5f7d;

        }

        .btn-changed {
            margin-left: 20px;
            width: 60px;
            height: 30px;
            background-color: none;
            border: 1px solid #777;
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