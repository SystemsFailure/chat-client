<template>
    <div class="main-sett-chat-id-comp">
        <div class="sett-chat-id-content">
            <!-- <select name="sel" id="sel-id">
                <option value="view-profile" selected>view profile</option>
                <option value="clear-chat" selected>clear chat</option>
                <option value="unmute-notify" selected>unmute notify</option>
                <option value="copy-link" selected>copy link</option>
            </select> -->

            <div class="items-content-settings">
                <div></div>
                <div class="view-profile item-setting"><i class="fi fi-ss-user"></i><h4>View profile</h4></div>
                <div class="unmute item-setting" @click="this.MuteActive = !this.MuteActive"><i :class="{'mute-active' : MuteActive}" class="fi fi-ss-volume"></i><h4 :class="{'mute-active' : MuteActive}">Mute</h4></div>
                <div class="copy-link item-setting"><i class="fi fi-sr-duplicate"></i><h4>Copy link</h4></div>
                <div class="clear-chat item-setting"><i class="fi fi-rr-broom"></i><h4>Clear chat</h4></div>
                <div class="clear-chat leave-app item-setting" @click="leaveApp"><i class="fi fi-rr-power"></i><h4>Leave</h4></div>
            </div>

        </div>
    </div>
</template>

<script>
import AuthApi from '@/firebase-config/AuthController';
export default {
    data() {
        return {
            MuteActive: false,
        }
    },

    methods: {
        leaveApp() {
            AuthApi.signout()
            this.$router.push('/register')
        }
    }
}
</script>

<style scoped lang="scss">
.mute-active {
    color: #00cec7;
}

.main-sett-chat-id-comp {
    margin-top: 5px;
    position: fixed;
    width: 200px;
    // height: 300px;
    right: 0;
    z-index: 100;
    transform: translateX(-15px);

    background-color: rgba(10, 10, 10, 0.65);

    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(8.2px);
    -webkit-backdrop-filter: blur(8.2px);
    border: 1px solid rgba(255, 255, 255, 0.3);

    .sett-chat-id-content {
        font-family: Lato,sans-serif;
        font-weight: 700;
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: .02em;

        
        .items-content-settings {
            width: 100%;
            height: auto;
            display: flex;
            flex-direction: column;
            align-items: center;

            .item-setting {
                width: 100%;
                padding: 10px;
                color:white;
                font-weight: bold;
                display: flex;
                align-items: center;

                // background-color: rgba(10, 10, 10, 0.65);

                // box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
                // backdrop-filter: blur(8.2px);
                // -webkit-backdrop-filter: blur(8.2px);
                // border: 1px solid rgba(255, 255, 255, 0.3);
                // margin-top: 10px;
                // display: flex;
                // justify-content: center;

                h4 {
                    margin-left: 8px;
                }
            }

            .clear-chat {
                color: rgb(255, 31, 31);
            }

            .leave-app {
                color: rgba($color: #00ffee, $alpha: 1.0)
            }
            .item-setting:hover {
                cursor: pointer;
                opacity: 0.9;
                // background:#00cec7;
                background-color: rgba(0, 0, 0, 0.1);
            }

        }
    }
}


</style>