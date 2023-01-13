<template>
    <div class="main-viewProfile-comp">

        <div class="inner-content">

            <div class="profile-title">
                <div class="img-box">
                    <img id="avatar-profile-id" src="@/assets/user_profile.png" alt="" srcset="">
                </div>

                <div class="info-block-person-name">
                    <span id="username-id"></span>
                </div>

                <div class="info-block">
                    <span>id: <span id="user-id-id">{{ titleId }}</span></span>
                </div>

                <div class="info-block">
                    <span id="bio-id"
                        style="text-align: center; font-size: 9px; display: flex; flex-wrap: wrap; width: 300px; margin-top: 10px;"></span>
                </div>

                <div class="info-block-section">
                    <div class="wrapper-container">
                        <span>followers</span>
                        <span>following</span>
                    </div>
                </div>

                <div class="line-main-informations">
                    <div class="btn-detail">
                        <i class="fi fi-ss-interrogation"></i>
                        <span>detail</span>
                    </div>
                </div>

                <div class="spinner-container-navigation">
                    <swiper class="swiper" :modules="modules" :slides-per-view="1" :centered-slides="true"
                        :space-between="50" :grab-cursor="false" :pagination="{
                            clickable: true
                        }">
                        <swiper-slide class="slide">Music</swiper-slide>
                        <swiper-slide class="slide">Posts</swiper-slide>
                        <swiper-slide class="slide">Photos</swiper-slide>
                    </swiper>
                </div>

                <div class="content-conteiner">
                    <div class="custom-playlist">
                        <div class="line-title"><span>playlists</span> <span class="text-more">show more</span></div>
                        <div class="playlist_" v-for="playlist in playlistList" :key="playlist.id">
                            <img :src="playlist.img_url ? playlist.img_url : require('@/assets/playlist.png')" alt="" srcset="">
                            <div class="title-playlist"><span>{{ playlist.title }}</span></div>
                            <div class="avtor-title"><span>{{ playlist.avtor }}</span></div>
                        </div>
                    </div>
                </div>

                <div class="line-bottom">
                    <div class="upload-music" @click="() => {this.showDialogMenu = true}"><span>upload new music</span></div>
                </div>

            </div>

        </div>

    </div>
</template>
<script>

import { UserApi } from '@/firebase-config/UserController.js'
import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'

export default {
    data() {
        return {
            showDialogMenu: false,
            titleId: localStorage.getItem('user-id'),
            playlistList: [
                { id: 0, title: 'for me', img_url: '@/assets/Ninja.jpeg', arrayMusic: [], desc: 'This is just my playlist', avtor: 'Eric Leonhard'},
                { id: 1, title: 'for me', img_url: '@/assets/Ninja.jpeg', arrayMusic: [], desc: 'This is just my playlist', avtor: 'Eric Leonhard'},
                { id: 2, title: 'for me', img_url: '@/assets/RedSpiritSpring.jpeg', arrayMusic: [], desc: 'This is just my playlist', avtor: 'Eric Leonhard'},
                { id: 3, title: 'for me', img_url: null, arrayMusic: [], desc: 'This is just my playlist', avtor: 'Eric Leonhard'},
                { id: 4, title: 'for me', img_url: null, arrayMusic: [], desc: 'This is just my playlist', avtor: 'Eric Leonhard'},
                { id: 5, title: 'for me', img_url: '@/assets/Tiger.jpeg', arrayMusic: [], desc: 'This is just my playlist', avtor: 'Eric Leonhard'},
            ]
        }
    },

    mounted() {
        UserApi.GetPersonalDataOfUser(this.titleId).then(user => {
            if (!user) {
                console.log('user not found')
                return
            }
            document.getElementById('username-id').innerHTML = user[0].name
        })
    },

    components: {
        Swiper,
        SwiperSlide
    },
    setup() {
        return {
            modules: [Pagination]
        }
    }

}
</script>
<style lang="scss" scoped>
$color-back: rgba(0, 0, 0, 0.8);

// .swiper {
//     // margin-top: 20px;
//     // display: flex;
//     // align-items: center;
//     // justify-content: center;
// }

// .slide {
//     width: 100%;

//     &:nth-child(2n) {
//         width: 40%;
//         margin-left: 10px;
//     }
//     &:nth-child(3n) {
//         width: 20%;
//         margin-left: 10px;
//     }
// }



.main-viewProfile-comp {

    width: 100%;
    height: 100vh;
    padding-right: 10px;
    padding-left: 10px;
    padding-top: 45px;
    background: $color-back;
    backdrop-filter: blur(4.2px);
    -webkit-backdrop-filter: blur(4.2px);
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: Lato, sans-serif;
    font-weight: 700;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: .02em;
    color: white;
    border-right: 1px solid #333;
    border-top: 1px solid #333;

    .inner-content {
        width: 100%;
        height: 100%;
        overflow: auto;
        padding-bottom: 50px;


        .bottom-n {
            width: 100%;
            height: 30vh;
            background-color: $color-back;
        }


        .profile-title {
            width: 100%;
            height: auto;
            padding: 5px;

            .line-bottom {
                width: 100%;
                height: 50px;
                padding: 5px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-top: 50px;
                border: 1px solid #333;   

                .upload-music {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 11px;

                    &:hover {
                        cursor: pointer;
                        opacity: .6;
                    }

                }             
            }

            .content-conteiner {
                width: 100%;
                height: 100%;
                padding: 5px;
                display: flex;
                align-items: center;
                margin-top: 50px;
                border-top: 1px solid #333;


                .custom-playlist {
                    margin-top: 20px;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    justify-content: center;
                    overflow: auto;

                    .line-title {
                        width: 100%;
                        padding-left: 15px;
                        margin-bottom: 10px;
                        
                        .text-more {
                            text-transform:lowercase;
                            font-size: 11px;
                            float: right;

                            &:hover {
                                cursor: pointer;
                                opacity: .7;
                                text-decoration:underline;
                            }
                        }
                    }

                    .playlist_ {
                        width: 100px;
                        display: flex;
                        flex-direction: column;
                        position: relative;
                        margin-left: 10px;
                        margin-top: 10px;

                        .avtor-title {
                            width: 100%;
                            display: flex;
                            align-items: center;
                            color: white;
                            font-size: 8px;
                            margin-top: 5px;
                        }
                        
                        .title-playlist {
                            margin-top: 8px;
                            width: 100%;
                            display: flex;
                            align-items: center;
                            color: white;
                            font-size: 8px;
                        }

                        img {
                            width: 100px;
                            height: 100px;

                        }

                        &:hover {
                            cursor: pointer;
                            opacity: .6;
                            transition: .4s;
                        }
                    }
                }
            }

            .spinner-container-navigation {
                width: 100%;
                height: 50px;
                padding: 5px;
                display: flex;
                align-items: center;
                justify-content: space-between;

                margin-top: 20px;
                // background-color: red;

                .swiper {
                    width: 50%;
                    height: 100px;
                    // background-color: #333;
                }

                .slide {
                    width: 50%;
                    font-size: 14px;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    cursor: default;

                    &:nth-child(1n) {
                        width: 30%;
                    }

                    &:nth-child(2n) {
                        width: 40%;
                    }

                    &:nth-child(3n) {
                        width: 30%;
                    }
                }

            }

            .info-block-section {
                width: 100%;
                height: 50px;
                padding: 5px;
                display: flex;
                align-items: center;
                justify-content: center;

                .wrapper-container {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 5px;
                    width: 50%;

                    span {
                        font-size: 12px;
                        text-transform: lowercase;
                    }
                }

            }


            .line-main-informations {
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;

                .btn-detail {
                    padding: 8px;

                    span {
                        margin-left: 5px;
                        font-size: 12px;
                    }

                    i {
                        margin-top: 4px;
                    }
                }
            }

            .bio-block {
                width: 100%;
                height: 30vh;
                // background-color: red;
                margin-top: 30px;
                display: flex;

                .right-b {
                    width: 50%;
                    height: 30vh;
                    // background-color: aquamarine;

                    .bio-item {
                        margin-top: 20px;
                        width: 100%;
                        // background-color: darkcyan;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: flex-end;

                        span {
                            padding: 5px;
                            // border: 1px solid #333;
                            border-bottom: none;
                        }
                    }
                }

                .left-b {
                    width: 50%;
                    height: 30vh;
                    // background-color: blue;

                    .bio-item {
                        margin-top: 20px;
                        width: 100%;
                        // height: 5vh;
                        // background-color: darkcyan;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: flex-end;

                        span {
                            padding: 5px;
                            // border: 1px solid #333;
                            border-bottom: none;
                        }
                    }

                }
            }

            .info-block-person-name {
                width: 100%;
                display: flex;
                justify-content: center;
                margin-top: 10px;
                // span {
                //     color: var(--theme-color);
                // }
            }

            .info-block {
                width: 100%;
                display: flex;
                justify-content: center;
                margin-top: 10px;

            }

            .img-box {
                width: 100%;
                display: flex;
                justify-content: center;

                img {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                }
            }

        }
    }
}
</style>