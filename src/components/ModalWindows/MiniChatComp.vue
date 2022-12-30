<template>
    <div class="main-con-mini-chat-window">

        <div class="title-mini-chat">
            <img :src="USERTO.img_url" alt="">
            <span style="color:white;">{{ USERTO.name || 'undefined'}}</span>
            <div class="bittle-juice"><i @click="() => {this.$emit('closeMiniChatCompFunction', false)}" class="fi fi-ss-cross" style="color:wheat;"></i></div>
        </div>

        <div class="inner-container-mini-chate-window">
            <div class="bubble-card" v-for="element in listMessages" :key="element.id">
                <div class="message-bubble">
                    <div class="wrapper-class-bubble-message" v-bind:style="element.fromId === USERID ? {'float':'right'} : {'float':'left'}">
                        <h6>{{ element.content }}</h6>
                        <!-- <div class="data_time-class"><h6>19:33</h6></div> -->
                    </div>
                </div>
            </div>
        </div>

        <div class="bottom-naviganor-mini-chat">
            <textarea type="text" id="inp-message-write-mini-chat" placeholder="message..."></textarea>
            <div class="btn-send-message-0"><span>click</span></div>
        </div>
    </div>
</template>
<script>
import { MessagesApi } from '@/firebase-config/MessagesController';
export default {
    data() {
        return {
            USERID: localStorage.getItem('user-id'),
            listMessages: [],
        }
    },

    props: {
        USERTO: {},
    },

    watch: {
        USERTO: {
            async handler(newValue) {
                const data_ = {
                    message_lst: this.listMessages,
                    toId: newValue.id,
                    fromId: this.USERID ? this.USERID : null,
                }
                await MessagesApi.getAllMessage(data_).then(arr => {
                    arr = arr.filter(message => {
                        return message.img_url === null
                    })
                    this.listMessages = arr
                }).catch(err => {
                    console.log(err)
                })
            },
            deep: true,
        }
    },

}
</script>
<style lang="scss" scoped>
.main-con-mini-chat-window {
    position: absolute;
    width: 300px;
    height: 400px;

    margin: 0;
    top: 65%;
    left: 85%;
    margin-right: -50%;
    transform: translate(-50%, -50%);

    background-color: rgba($color: #000000, $alpha: .8);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(4.2px);
    -webkit-backdrop-filter: blur(4.2px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    z-index: 102;

    .bottom-naviganor-mini-chat {
        position: fixed;
        width: 100%;
        height: 30px;
        bottom: 0;
        background-color: #000000;

        display: flex;
        align-items: center;
        flex-direction: row;

        #inp-message-write-mini-chat {
            width: 80%;
            height: 30px;
            // max-width: 60%;
            // max-height: 30px;
            // min-width: 60%;
            // min-height: 30px;
            resize: none;
            padding: 5px;
            color: wheat;
            outline: none;
            border: none;
            background: none;

            font-family: Lato,sans-serif;
            font-weight: 500;
            font-size: 11px;
            // text-transform: uppercase;
            letter-spacing: .02em;
            color: white;
        }

        .btn-send-message-0 {
            padding: 5px;
            background-color: rgba($color: #000000, $alpha: .8);
            color: wheat;

            font-family: Lato,sans-serif;
            font-weight: 500;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: .02em;
            color: white;

            &:hover {
                cursor: pointer;
            }
        }
    }
    .title-mini-chat {
        position: fixed;
        width: 100%;
        height: 40px;
        // background-color: red;
        background-color: rgba($color: #000000, $alpha: 1);
        display: flex;
        align-items: center;

        .bittle-juice {
            width: 100%;
            margin-right: 10px;
            text-align: end;
            font-size: 12px;
        }

        img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            float: left;
            margin-left: 10px;
        }

        span {
            margin-left: 8px;
        }
    }
    .inner-container-mini-chate-window {
        width: 100%;
        height: 100%;
        padding: 7px;
        padding-top: 40px;
        overflow: auto;

        .bubble-card {
            width: 100%;
            height: auto;
            display: grid;
            // background-color: aquamarine;

            .message-bubble {
                width: 100%;
                height: auto;
                // background-color:blueviolet;
                padding: 0 5px 0 5px;
                .wrapper-class-bubble-message {
                    margin-top: 10px;
                    border-radius: 15px;
                    color: rgb(232, 230, 230);
                    font-size: 18px;
                    background-color: rgba($color: #000000, $alpha: .8);
                    word-wrap: break-word;
                    width: auto;
                    max-width: 80%;
                    height: auto;
                    padding: 10px;

                    .data_time-class {
                        width: 25px;
                        height: 5px;
                        border-radius: 50%;
                        background-color: aqua;
                        float: right;
                        font-size: 18px;
                    }
                }
            }
        }

    }
}


</style>