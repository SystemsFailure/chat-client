<template>
    <div class="navigation">
        <div class="content">

            <div @click="openMenuAny(0)" class="item-im" :class="{'item-selected' : showMenuMail}">
                <i class="fi fi-ss-mode-portrait"></i>
            </div>
            <div @click="openMenuAny(1)" class="item-im" :class="{'item-selected' : showMenuChats}">
                <i class="fi fi-rr-comment"></i>
                <!-- <img src="@/assets/chat-right-fill.svg" alt="chats" srcset=""> -->
            </div>
            <div @click="openMenuAny(3)" class="item-im" :class="{'item-selected' : showMenuMusics}">
                <i class="fi fi-ss-music-alt"></i>
            </div>
            <div @click="openMenuAny(2)" class="item-im" :class="{'item-selected' : showMenuSettings}">
                <i class="fi fi-br-settings-sliders"></i>
                <!-- <img src="@/assets/setting.png" alt="chats" srcset=""> -->
            </div>

        </div>
    </div>

</template>

<script>
export default {
    data() {
        return {
            showMenuChats: true,
            showMenuMail: false,
            showMenuSettings: false,
            showMenuMusics: false,
        }
    },
    methods: {
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
    z-index: 10;

    background: rgba(10, 10, 10, 0.65);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(4.2px);
    -webkit-backdrop-filter: blur(4.2px);
    border-right: 1px solid rgba(255, 255, 255, 0.3);

    .content {
        width: 100%;

            .item-im:hover {
                background-color: #00cec780;
                border-left: 2px solid wheat;
            }
            .item-im {
                width: auto;
                height: 40px;
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