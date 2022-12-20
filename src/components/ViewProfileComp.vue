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
                    <span>id: <span id="user-id-id">{{titleId}}</span></span>
                </div>

                <div class="info-block">
                    <span id="bio-id" style="text-align: center; font-size: 9px; display: flex; flex-wrap: wrap; width: 300px; margin-top: 10px;"></span>
                </div>

                <div class="bio-block">
                    <div class="left-b">
                        <div class="bio-item">
                            <span style="border-bottom: 1px solid #333;">Email</span>
                            <span id="email-id" style="font-size:12px; font-family: sans-serif; text-transform: lowercase ;"></span>
                        </div>

                        <div class="bio-item">
                            <span style="border-bottom: 1px solid #333;">sity</span>
                            <span id="city-id" style="font-size:12px; font-family: sans-serif; text-transform: uppercase ;"></span>
                        </div>

                        <div class="bio-item">
                            <span style="border-bottom: 1px solid #333;">Country</span>
                            <span id="country-id" style="font-size:12px; font-family: sans-serif; text-transform: uppercase ;"></span>
                        </div>
                    </div>

                    <div class="right-b">
                        <div class="bio-item">
                            <span style="border-bottom: 1px solid #333;">Number-phone</span>
                            <span id="number-phoe-id" style="font-size:12px"></span>
                        </div>

                        <div class="bio-item">
                            <span style="border-bottom: 1px solid #333;">State</span>
                            <span id="state-id" style="font-size:12px; font-family: sans-serif; text-transform: lowercase ;"></span>
                        </div>

                        <div class="bio-item">
                            <span style="border-bottom: 1px solid #333;">Created</span>
                            <span id="data-created-id" style="font-size:12px; font-family: sans-serif; text-transform: lowercase ;"></span>
                        </div>
                    </div>
                </div>

            </div>

            <!-- <div class="bottom-n">
                <audio
                    controls
                    src="">
                        <a href="/media/cc0-audio/t-rex-roar.mp3">
                            Download audio
                        </a>
                </audio>
            </div> -->

        </div>
        
    </div>
</template>
<script>
import {UserApi} from '@/firebase-config/UserController.js'

// let myAudioElement = new Audio('https://muzofond.fm/collections/artists/%D0%BE%D0%BA%D1%81%D0%B8%D0%BC%D0%B8%D1%80%D0%BE%D0%BD')

// myAudioElement.addEventListener("canplaythrough", event => {
//   console.log(event)
//   myAudioElement.play();
// });
export default {
    data() {
        return {
            titleId: localStorage.getItem('user-id')
        }
    },

    mounted() {
        UserApi.GetPersonalDataOfUser(this.titleId).then(user => {
            if(!user) {
                console.log('user not found')
                return
            }
            document.getElementById('username-id').innerHTML = user[0].name
            document.getElementById('user-id-id').innerHTML = user[0].id
            document.getElementById('bio-id').innerHTML = user[0].bio_info
            document.getElementById('email-id').innerHTML = user[0].email
            document.getElementById('city-id').innerHTML = user[0].city
            document.getElementById('number-phoe-id').innerHTML = 'NOT'
            document.getElementById('state-id').innerHTML = user[0].status
            document.getElementById('data-created-id').innerHTML = user[0].atCreated
            document.getElementById('country-id').innerHTML = user[0].country

            document.getElementById('avatar-profile-id').src = user[0].img_url
            document.getElementById('data-created-id')

        })
    },
    
}
</script>
<style lang="scss" scoped>
$color-back: rgba(0, 0, 0, 0.4);


.main-viewProfile-comp {
    width: 100%;
    height: 100vh;
    padding-right: 10px;
    padding-left: 10px;
    padding-top: 45px;
    background: $color-back;
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

    .inner-content {
        width: 100%;
        height: 100%;
        // background-color: darkblue;
        overflow: auto;


        .bottom-n {
            width: 100%;
            height: 30vh;
            background-color: $color-back;
        }


        .profile-title {
            width: 100%;
            height: auto;
            padding: 5px;

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