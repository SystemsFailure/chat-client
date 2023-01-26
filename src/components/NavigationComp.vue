<template>
    <div class="navigation">
        <div class="content">

            <div @click="openMenuAny(0)" class="item-im" :class="{'item-selected' : showMenuMail}">
                <i class="fi fi-bs-mode-portrait"></i>
            </div>
            <div @click="openMenuAny(1)" class="item-im" :class="{'item-selected' : showMenuChats}">
                <i class="fi fi-bs-comment"></i>
                <!-- <img src="@/assets/chat-right-fill.svg" alt="chats" srcset=""> -->
            </div>
            <div @mouseenter="showDetailMenuFunction" @mouseleave="closeDetailMenuFunction" class="item-im" :class="{'item-selected' : showMenuMusics}">
                <div class="three-points"><i class="fi fi-bs-menu-dots-vertical"></i></div>
                <div class="detailmenu" v-if="showDetailMenu">
                    <div class="myaudio" @click="showMyMusic"><i class="fi fi-ss-list-check"></i></div>
                    <div class="allaudio" @click="GlobalListMusicss"><i class="fi fi-ss-music-alt"></i></div>
                </div>
                <i v-if="myMusicIcon" class="fi fi-bs-list-check"></i>
                <i v-else class="fi fi-bs-music-alt">
                </i>
            </div>
            <div @click="openMenuAny(2)" class="item-im" :class="{'item-selected' : showMenuSettings}">
                <i class="fi fi-bs-settings-sliders"></i>
                <!-- <img src="@/assets/setting.png" alt="chats" srcset=""> -->
            </div>

        </div>
    </div>

</template>

<script>
export default {
    data() {
        return {
            myMusicIcon: false,
            showMenuChats: true,
            showMenuMail: false,
            showMenuSettings: false,
            showMenuMusics: false,
            showDetailMenu: false,
        }
    },
    methods: {
        showDetailMenuFunction() {
            this.showDetailMenu = true
        },
        closeDetailMenuFunction() {
            this.showDetailMenu = false
        },
        showMyMusic() {
            console.log('click1')
            this.$emit('showMyMusicCompFunction', false)
            this.myMusicIcon = true

            this.showMenuMusics = true
            this.showMenuSettings = false
            this.showMenuMail = false
            this.showMenuChats = false
        },
        GlobalListMusicss() {
            console.log('click2')
            this.$emit('openMenu', 3)
            this.myMusicIcon = false

            this.showMenuMusics = true
            this.showMenuSettings = false
            this.showMenuMail = false
            this.showMenuChats = false
        },
        openMenuAny(integer) {
            switch (integer) {
                case 0:
                    this.showMenuMail = true
                    this.showMenuChats = false
                    this.showMenuSettings = false
                    this.showMenuMusics = false
                    this.$emit('openMenu', integer)
                    break;
                case 1:
                    this.showMenuChats = true
                    this.showMenuMail = false
                    this.showMenuSettings = false
                    this.showMenuMusics = false
                    this.$emit('openMenu', integer)
                    break;
                case 2:
                    this.showMenuSettings = true
                    this.showMenuMail = false
                    this.showMenuChats = false
                    this.showMenuMusics = false
                    this.$emit('openMenu', integer)
                    break;
                case 3:
                    this.showMenuMusics = true
                    this.showMenuSettings = false
                    this.showMenuMail = false
                    this.showMenuChats = false
                    this.$emit('openMenu', integer)
                    break;
                default:
                    alert('no choice something');
                    break;
            }
        }
    }
}
</script>

<style scoped lang="scss">


.item-selected {
    background-color: #00cec7 !important;
    border-left: 2px solid wheat;
}


$color-back: rgba(0, 0, 0, 0.7);
$color-back-trans: none;
$color-back-gray: rgba(41, 41, 41, 0.7);
$color-back-blue: rgba(12, 22, 44, 0.7);

$color-text: #4e5f7d;
$color-text-yellow: #ff6600;
$color-text-teal: #00cec7;
$color-text-izumrud: #00ff80;

.navigation {
    width: 4%;
    height: 100vh;
    position: fixed;
    float: left;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 100;

    background: rgba(5, 5, 5, 0.85);
    // box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(4.2px);
    -webkit-backdrop-filter: blur(4.2px);
    border-right: 1px solid rgba(30, 30, 30, 0.3);

    .content {
        width: 100%;

            .item-im:hover {
                background-color: #00cec780;
                border-left: 2px solid wheat;
            }
            .item-im {
                width: auto;
                height: 40px;
                position: relative;
                // background-color: rgba(0, 0, 0, 0.2);

                display: flex;
                align-items: center;
                justify-content: center;
                
                margin-top: 15px;

                img {
                    width: 25px;
                    height: 25px;
                    color: white;
                }

                .detailmenu {
                    right: 0;
                    height: 100%;
                    width: 120px;
                    position: absolute;
                    // background-color: red;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transform: translateX(121px);

                    .myaudio {
                        width: 60px;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        backdrop-filter: blur(5px);
                        border: 1px solid #333;
                        background-color: #111;
                        
                        &:hover {
                            cursor: pointer;
                            background: rgba(0, 179, 176, 0.889);
                            transition: .3s;
                        }
                    }

                    .allaudio {
                        width: 60px;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        backdrop-filter: blur(5px);
                        border: 1px solid #333;
                        background-color: #111;



                        &:hover {
                            cursor: pointer;
                            background: rgba(0, 179, 176, 0.889);
                            transition: .3s;
                        }

                    }
                }

                .three-points {
                    right: 0;
                    height: 100%;
                    width: 30%;
                    position: absolute;

                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 12;

                    .fi-ss-menu-dots-vertical {
                        font-size: 12px;
                        margin-top: 4px;
                    }

                }
                i {
                    color:white;

                }
            }
        }
}

@media screen and (max-width: 768px) {
    .navigation {
        width: 10%;
    }
}
</style>