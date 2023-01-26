<template>
    <!-- <div class="main-comp-profile-card"> -->
        <div class="content-card" id="divDrag" v-for="n in itemByProfile" :key="n.id">
            <div class="btn0-close-profile"><i @click="() => {this.$emit('closeProfileFunction', false)}" class="fi fi-ss-cross"></i></div>
            <div class="header-drag-simple" id="divDragheader-simple"></div>

            <div class="inside-content">
                <img :src="n.img_url || require('../assets/user_profile.png')" alt="" id="avatar-prof-id">
            </div>

            <div class="center-content">
                <div class="info-box">
                    <h3 class="name-user-text">{{n.name}}</h3>
                    <h3 class="name-user-text">{{n.country || undefined}}</h3>
                    <h4 class="bio-user-text">{{n.bio_info || undefined}}</h4>
                </div>

                <div class="userful-info">
                    <div class="items-info-boxes">
                        <div class="item-inf"><h4>Followers</h4><span>{{n.arrayFollowers.length}}</span></div>
                        <div class="item-inf"><h4>Following</h4><span>{{n.arrayFollowing.length}}</span></div>
                    </div>

                    <div class="useful-box-bottom">
                        <div class="btns-box">
                            <div class="item-btn">Follow</div>
                            <div class="item-btn">Add to chats</div>
                            <div class="item-btn">Message</div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    <!-- </div>  -->
</template>

<script>
import dragApi from '@/hooks/hookDragComposition'
import { mapState } from 'vuex'

export default {
    data() {
        return {
            itemByProfile: this.$store.state.itemByProfile

        }
    },

    computed: {
        ...mapState([
            'player',
        ]),
    },

    mounted() {
        this.dragElement(document.getElementById('divDrag'))
    },

    setup() {
        const {dragElement} = dragApi()
        return {
            dragElement,
        }
    }
}
</script>

<style scoped lang="scss">
$color-back: rgba(0, 0, 0, 0.7);
$color-back-trans: none;
$color-back-gray: rgba(41, 41, 41, 0.7);
$color-back-blue: rgba(12, 22, 44, 0.7);

$color-text: #4e5f7d;
$color-text-yellow: #ff6600;
$color-text-teal: #00cec7;
$color-text-izumrud: #00ff80;

.header-drag-simple {
        position: absolute;
        width: 100%;
        height: 100px;
        // border-bottom: 1px solid #4e5f7d;
        z-index: -1;
    }



.content-card {
    width: 400px;
    height: 70%;
    margin: 0;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(4.2px);
    -webkit-backdrop-filter: blur(4.2px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    background: rgba(0, 0, 0, 0.65);
    position: absolute;
    z-index: 1000;
    font-family: Lato,sans-serif;
    font-weight: 700;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: .02em;


    .btn0-close-profile {
        display: flex;
        align-items: center;
        justify-content: end;
        position: absolute;

        padding-top: 20px;
        padding-right: 20px;
        font-size: 12px;
        color: white;
        z-index: 11;
        right: 0;

        &:hover {
            cursor: pointer;
            opacity: .8;
            transition: .1s;
        }
    }

    .inside-content {
        width: 100%;
        display: flex;
        justify-content: center;

        // border: 1px solid #ff6600;

        img {
            border: 1px solid rgba(255, 255, 255, 0.3);
            width: 200px;
            height: 200px;
            border-radius: 50%;
            transform: translateY(-50px);
            
            pointer-events: none;
        }

        img:hover {
            cursor: pointer;

        }
    }

    .center-content {
        width: 100%;
        // border: 1px solid #4e5f7d;
        .info-box {
            width: 100%;

            display: flex;
            align-items: center;
            flex-direction: column;
            .name-user-text {
                color: white;
            }
            .bio-user-text {
                color:white;
                font-family:Verdana, Geneva, Tahoma, sans-serif;
                font-weight: 300;
            }
        }

        .userful-info {
            margin-top: 10px;
            width: 100%;
            height: 150px;

            // border: 1px solid #00cec7;

            display: flex;
            align-items: center;
            flex-direction: column;

            .items-info-boxes {
                width: 60%;
                display: flex;
                justify-content: space-between;
                height: 50%;

                .item-inf {
                    padding: 5px;
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    justify-content: center;



                    h4 {
                        color: white;
                    }

                    span {
                        color: white;
                        font-weight: bold;
                    }
                }
            }
            .useful-box-bottom {
                width: 100%;
                height: 50%;
                // border: 1px solid #00ff80;

                display: flex;
                justify-content: center;

                .btns-box {
                    width: 80%;

                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .item-btn {
                        padding: 5px;
                        color: white;
                        width: 100px;
                        height: 40px;

                        display: flex;
                        align-items: center;
                        justify-content: center;

                        // box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
                        backdrop-filter: blur(4.2px);
                        -webkit-backdrop-filter: blur(4.2px);
                        border: 1px solid rgba(255, 255, 255, 0.3);
                        background: none;
                        // background: rgba($color: #212020, $alpha: .5);

                        font-weight: bold;
                    }

                    .item-btn:hover {
                        cursor: pointer;
                        box-shadow: 0 2px 15xpx rgb(0, 255, 242);
                        border: 1px solid rgb(0, 255, 242);
                        transition: .3s;
                    }
                }
            }
        }
    }
    .center-content:hover {
        cursor:default;
    }
}

</style>