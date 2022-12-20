<template>

<div class="main-banner-up">
    <div class="content">

        <div class="user-box" @click="showOrHideProfile_">
            <h6 style="color:white;">{{$store.state.user_data[0].name}}</h6>
            <div class="recently-ok" style="color:white; font-size: 12px;">seen at 9:46 - {{user_id}}</div>
        </div>

        <!-- <div class="navigation-menu-modes-box">
            <div class="content-box0">
                <div
                class="modes-boxes"
                v-for="mode in list_modes"
                v-bind:key="mode.id"
                @click="console.log('hellooooo')"
                >{{mode.name}}
                </div>
            </div>
        </div> -->

        <div class="banner">
            <div class="settings-chatId" @click="change">
                <div class="item-round-i"></div>
                <div class="item-round-i"></div>
                <div class="item-round-i"></div>
            </div>
        </div>
    </div>
</div>

</template>

<script>
export default {
    data() {
        return {
            list_modes: [
                {id: 0, name: 'standart', callback: 'undefined'},
                {id: 1, name: 'socket', callback: 'undefined'},
                {id: 2, name: 'firebase', callback: 'undefined'}
            ],
            showSettingsChatId: false,
            user_id: localStorage.getItem('user-id')
        }
    },
    methods: {
        change() {
            this.showSettingsChatId = !this.showSettingsChatId
            this.$emit('showOrHideSettingChatId', this.showSettingsChatId)
        },
        showOrHideProfile_() {
            this.$store.commit('showEventMutation')
        },
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

.main-banner-up {
    width: 71%;
    position: fixed;
    height: 40px;


    background: rgba(10, 10, 10, 0.65);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(4.2px);
    -webkit-backdrop-filter: blur(4.2px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);

    .content {
        width: 100%;
        height: 40px;
        display:flex;
        align-items: center;
        justify-content: space-between;

        .banner {
            float: right;
            width: 30%;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: end;

            .settings-chatId {
                height: 30px;
                // background: #00cec7;
                margin-right: 10px;


                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                padding: 5px;
                .item-round-i {
                    width: 5px;
                    height: 5px;
                    border-radius: 50%;
                    background: white;
                }
            }
            .settings-chatId:hover {
                    opacity: 0.4;
                    cursor: pointer;
                }
        }

        .user-box:hover {
            cursor: pointer;
            opacity: 0.7;
        }

        .user-box {
            margin-left: 20px;
            height: 40px;
            display:flex;
            flex-direction: column;
            justify-content: center;
            padding-right: 10px;

            h6 {
                font-size: 11px;
            }
        }

        .navigation-menu-modes-box {
            height: 40px;
            width: 40%;
            margin-left: 10px;
            border-left: 1px solid rgba(255, 255, 255, 0.3);

            .content-box0 {
                // background-color: #ff6600;
                width: auto;
                height: 40px;
                display: flex;

                .modes-boxes:hover {
                    border-bottom: 1px solid wheat;
                    cursor: pointer;
                }
                .modes-boxes {
                    display: flex;
                    align-items: center;
                    color: wheat;
                // background-color: #00cec7;
                width: auto;
                padding: 5px;
                height: 40px;
                margin-left: 10px;
            }
            }
        }
    }
}

</style>