<template>
    <div class="main-window-chat">
        <BannerUpComp @showOrHideSettingChatId="showHideSettingChatId" @showNotificationWindowFunction="(value) => {this.$emit('showNotificationWindowFunctionArrow', value)}"></BannerUpComp>
        <BannerBottomComp @sendMessage="add_message" @add_file_messageFunction="add_file_message"></BannerBottomComp>
        <MiniListLastChatsComp v-if="showMiniListComp" @MiniChatBindMiniUsersListFunction="functionBindingMiniListUsersByMiniChat"></MiniListLastChatsComp>
        <MiniChatComp v-if="showMiniChatValue" v-bind:USERTO="USERTO" @closeMiniChatCompFunction="value => this.showMiniChatValue=value"></MiniChatComp>
        <viewPhotoWindow v-if="showWindowImage" v-model:imageURL="imageURL" @closeWindowFunction="() => {this.showWindowImage = false}" v-bind:toID="user_to_id"></viewPhotoWindow>

        <div class="content-win-chat">
            
            <div class="chat-window">
                <div class="empty-title-won" v-if="Object.keys(message_lst).length == 0"><span>You not choiced user, please current however user in your contacts...</span></div>

                <Transition name="fade-comp-settChatId-v">
                    <SettingsMenuChatIdComp v-if="showSettingsChatId"></SettingsMenuChatIdComp>
                </Transition>

                <div class="generl-list-messages" id="block-chat-window-id">
                    <div class="outer-container">
                        <div v-show="showDialogWindow" class="container-hide-box" id="query1">
                            <h5  class="mess-content-example" style="color: white;" id="q1"></h5>
                            <h5  class="mess-content-example" style="color: white;" id="q2"></h5>
                            <h5  class="mess-content-example" style="color: white;" id="q3"></h5>
                            <h5  class="mess-content-example" style="color: white;" id="q4"></h5>
                            <h5  class="mess-content-example" style="color: white;" id="q5"></h5>
                        </div>

                        <transition-group name="bounce-bubble-message" tag="div">
                            <div v-for="n in message_lst" v-bind:key="n.id" class="inner-container" ref="content">
                                <div class="message-bubble">
                                    <div class="image-content" v-if="n.img_url">
                                        <!-- <img :src="n.img_url" :style="n.fromId === user_id ? {'float' : 'right'} : {'float' : 'left'}" @click="openImageToWindow(n.img_url)"> -->
                                        <img :src="n.img_url" :style="n.fromId === user_id ? {'margin-left' : 'auto'} : {'margine-left' : '0'}" @click="openImageToWindow(n.img_url)">
                                        <div class="data-created-img" :style="n.fromId === user_id ? {'margin-left' : 'auto'} : {'margine-left' : '0'}"><span>{{ n.atCreated }}</span></div>
                                    </div>
                                    <h6 v-else
                                    :id="n.id"
                                    class="im-message-content"
                                    @contextmenu="() => {this.deleteMessage(n.id); return false}"
                                    @mouseover="showDetailDataMessage($event, n.id)"
                                    @mouseout="hideDetailDataMessage($event)"
                                    v-bind:style="n.fromId===user_id?{'float':'right', 'backgroundColor' : '#111;', 'color' : 'white'}:{'float':'left', 'padding-bottom': '10px'}"
                                    >{{n.content}}
                                    </h6>
                                </div>
                            </div>
                        </transition-group>

                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
import BannerUpComp from '@/components/BannerUpComp.vue'
import BannerBottomComp from '@/components/BannerBottomComp.vue'
import SettingsMenuChatIdComp from '@/components/SettingsMenuChatIdComp.vue'
import MiniListLastChatsComp from '@/components/ModalWindows/MiniListLastChatsComp.vue'
import MiniChatComp from '@/components/ModalWindows/MiniChatComp.vue'
import viewPhotoWindow from '@/components/ModalWindows/viewPhotoWindow.vue'
import { MessagesApi } from '@/firebase-config/MessagesController'
import { UserApi } from '@/firebase-config/UserController'
import { ChatApi } from '@/firebase-config/ChatController'
import { db } from '@/main'
import { doc, onSnapshot} from "firebase/firestore"


export default {
    data() {
        return {
            showSettingsChatId: false,
            showWindowImage: false,
            user_id: localStorage.getItem('user-id') ? localStorage.getItem('user-id') : null,
            showDialogWindow: false,
            message_lst: [],
            USERTO: null,
            showMiniChatValue: false,
            showMiniListComp: false,
            imageURL: null,
        }
    },

    props: {
        user_to_id: {},
        cleaningChat: {},
    },

    async mounted() {
        const data_ = {
            message_lst: this.message_lst,
            toId: this.user_to_id,
            fromId: this.user_id,
        }
        MessagesApi.getAllMessage(data_).then(arr => {
            this.message_lst = arr
            setTimeout(() => {
                let block = document.getElementById("block-chat-window-id")
                block.scrollTop = block.scrollHeight
            },1000)
        }).catch(err => {
            console.log(err)
        })

        // Здесь устанавливается onSnapshoot для слежения за index - это колл-во сообщений в чате, которое меняется каждый раз когда оправляется сообщение
        await UserApi.getAllChats(this.user_id).then(chats => {
            chats.forEach(async elem => {
                await ChatApi.getChat({toID: elem.id, fromID: this.user_id}).then( async chat => {
                    onSnapshot(doc(db, "ChatId", chat[0].id), async (doc) => {
                        console.log(doc.data())
                        const data_ = {
                            message_lst: this.message_lst,
                            toId: this.user_to_id,
                            fromId: this.user_id,
                        }
                        await MessagesApi.getAllMessage(data_).then(arr => {
                            console.log(arr)
                        }).catch(err => {
                            console.log(err)
                        })

                    })
                })
            })
        }).catch(err => {
            console.log(err)
        })


    },


    watch: {
        user_to_id: {
            async handler() {
                const data_ = {
                    message_lst: this.message_lst,
                    toId: this.user_to_id,
                    fromId: this.user_id,
                }
                await MessagesApi.getAllMessage(data_).then(arr => {
                    this.message_lst = arr

                }).catch(err => {
                    console.log(err)
                })
            },
            deep: true

        },

        cleaningChat: {
            handler() {
                this.showSettingsChatId = false
                this.message_lst = []
            },
            deep: true
        },

    },


    methods: {
        async createIndex() {
            let countMess = null
            if(this.user_to_id && this.user_id) {
                await ChatApi.getChat({toID: this.user_to_id, fromID: this.user_id}).then( async chat => {
                    if (chat.length != 0)
                    {
                        if (chat.length === 1)
                        {
                            await ChatApi.updataField(chat[0].id)
                            countMess = chat[0].countMessages
                        }
                        else
                        {
                            console.log('length is not 1')
                        }
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
            return countMess
        },

        deleteMessage(messId) {
            MessagesApi.deleteMessageById(messId).then(() => {
                console.log('bubble message')
            })
            return false
        },

        async updateAllChat() {
            const data_ = {
                message_lst: this.message_lst,
                toId: this.user_to_id,
                fromId: this.user_id,
            }
            await MessagesApi.getAllMessage(data_).then(arr => {
                this.message_lst = arr
                let block = document.getElementById("block-chat-window-id")
                block.scrollTop = block.scrollHeight
            }).catch(err => {
                console.log(err)
            })
        },

        functionBindingMiniListUsersByMiniChat(user, value) {
            if(user) {
                this.USERTO = user
                this.showMiniChatValue = value
            } else {
                console.log('user is empty')
            }
        },

        openImageToWindow(valueImageURL) {
            this.imageURL = valueImageURL
            this.showWindowImage = true
            console.log(valueImageURL)
        },

        showHideProfile(result) {
            console.log(result, 'res')
            this.showUserInfo_model = result
        },

        showHideSettingChatId(result) {
            this.showSettingsChatId = result
        },

        showDetailDataMessage(event, id) {            
            let message = document.getElementById('query1');
            let q1 = document.getElementById('q1');
            let q2 = document.getElementById('q2');
            let q3 = document.getElementById('q3');
            let q4 = document.getElementById('q4');
            let coords = event.target.getBoundingClientRect()
            let mess_OnId = 0

            message.style = "position:fixed";
            this.showDialogWindow = true
            mess_OnId = this.message_lst.filter(mess => {
                return mess.id === id
            })
            q1.innerHTML = mess_OnId[0].result !== 'Success' 
            ? "result" + " : " + "<font color=#00cec7>"+mess_OnId[0].result+"</font>" 
            : "result" + " : " + "<font color=red>"+mess_OnId[0].result+"</font>"

            q2.innerText = "time" + " : " + mess_OnId[0].atCreated
            q3.innerText = "size" + " : " + mess_OnId[0].size + 'kb'
            q4.innerText = mess_OnId[0].view ? "Viewed" + " : " +  'Yah' : "Viewed" + " : " +   'No'

            if(event.target.style.float === 'left') 
            {
                if(this.message_lst.findIndex(i => i.id === mess_OnId[0].id) === this.message_lst.length - 1) 
                {
                    message.style.left = coords.right + 'px'
                    message.style.top = coords.bottom  - coords.height*2.5 + 'px'
                    return
                }
                message.style.left = coords.right + 'px'
                message.style.top = coords.bottom + 'px'
            } else {
                if(this.message_lst.findIndex(i => i.id === mess_OnId[0].id) === this.message_lst.length - 1) 
                {
                    message.style.right = coords.width + 20 + 'px'
                    if(coords.height < 50) 
                    {
                        message.style.top = coords.bottom  - coords.height*2 + 'px'
                        return
                    }
                    message.style.top = coords.bottom  - coords.height + 'px'
                    return
                }
                message.style.right = coords.width + 25 + 'px'
                message.style.top = coords.bottom + 'px'
            }
        },

        hideDetailDataMessage() {
            this.showDialogWindow = false
        },

        async add_file_message(file) {
            if(file) 
            {
                const data_ = {
                    message_lst: this.message_lst,
                    toId: this.user_to_id,
                    fromId: this.user_id,
                }
                const count = await this.createIndex()
                await MessagesApi.uploadImageMessage(file, localStorage.getItem('user-id'), data_).then(({file_path, file_url}) => {
                    console.log(file_path, file_url, '0002')
                    MessagesApi.createMessage( {
                        content: null,
                        fromId: localStorage.getItem('user-id'),
                        toId: this.user_to_id != null && this.user_to_id != 0 ? this.user_to_id : false,
                        size: null,
                        result: true,
                        atCreated: new Date().toLocaleString(),
                        atUpdated: new Date().toLocaleString(),
                        view: null,
                        img_url: file_url,
                        img_name: file_path,
                        index: count,
                    }, data_).then(data => {
                        this.message_lst = data
                        console.log(data, '0001')
                    }).catch(err => {
                        console.log(err)
                    })
                    console.log(file, 'adddada121212', count)
                })
            }
        },

        async add_message(text) {
            let countMess = 0
            const data_ = { message_lst: this.message_lst, toId: this.user_to_id, fromId: this.user_id }
            new Promise((resolve, failure) => {
                this.message_lst.push(
                    {
                        fromId: this.user_id, content: text, 
                        toId: this.user_to_id, size: new Blob([text]).size, 
                        result: true,
                        atCreated: new Date().toLocaleString(),
                        atUpdated: new Date().toLocaleString(),
                    })
                resolve('success')
                failure('failure')
            }).then(() => {
                document.getElementsByClassName('im-message-content')[document.getElementsByClassName('im-message-content').length - 1].classList.add('anime-bubble-message')
            })


            if(this.user_to_id && this.user_id) {
                await ChatApi.getChat({toID: this.user_to_id, fromID: this.user_id}).then( async chat => {
                    if (chat.length != 0)
                    {
                        if (chat.length === 1)
                        {
                            await ChatApi.updataField(chat[0].id)
                            countMess = chat[0].countMessages
                        }
                        else
                        {
                            console.log('length is not 1')
                        }
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
            let messageContent = {
                content: text,
                fromId: this.user_id,
                toId: this.user_to_id != null && this.user_to_id != 0 ? this.user_to_id : false,
                size: new Blob([text]).size,
                result: true,
                atCreated: new Date().toLocaleString(),
                atUpdated: new Date().toLocaleString(),
                view: false,
                img_url: null,
                img_name: null,
                index: countMess,
            }
            await MessagesApi.createMessage(messageContent, data_).then( async () => {
                document.getElementsByClassName('im-message-content')[document.getElementsByClassName('im-message-content').length - 1].classList.remove('anime-bubble-message')
                let block = document.getElementById("block-chat-window-id")
                block.scrollTop = block.scrollHeight
            }).catch(err => {
                console.log(err)
                document.getElementsByClassName('im-message-content')[document.getElementsByClassName('im-message-content').length - 1].classList.add('failure-bubble-message')
                localStorage.setItem('fail-message', messageContent)
            })
        },
    },


    components: {
        BannerUpComp,
        BannerBottomComp,
        SettingsMenuChatIdComp,
        MiniListLastChatsComp,
        MiniChatComp,
        viewPhotoWindow
    }
}
</script>

<style scoped lang="scss">

.failure-bubble-message {
    background: #ff0000;
}

.anime-bubble-message {
    animation: change-background 3s ease infinite;
    background: linear-gradient(-90deg, #dbdbdb, #b5b5b5, #707070, #484848);
    transition: .6s;
}

@keyframes change-background {
	0% {
		background-position: 0% 25%;
	}
    15% {
        background-position: 25% 50%;
    }
    25% {
        background-position: 50% 75%;
    }
    40% {
        background-position: 75% 100%;
    }
	50% {
		background-position: 100% 75%;
	}
    75% {
        background-position: 75% 50%;
    }
    85% {
        background-position: 50% 25%;
    }
	100% {
        background-position: 25% 0%;
	}
}

$color-back: rgba(19, 19, 19, 0.4);
$color-back-message-bubble: rgba(34, 34, 34, 0.8);
$color-back-trans: none;
$color-back-gray: rgba(41, 41, 41, 0.7);
$color-back-blue: rgba(12, 22, 44, 0.7);

$color-text: #4e5f7d;
$color-text-yellow: #ff6600;
$color-text-teal: #00cec7;
$color-text-izumrud: #00ff80;

$cool-back-gradient-color: linear-gradient(45deg, #ff216d, #2196f3);

:root {
    --th-color: blue;
}
.main-window-chat{
    width: 100%;
    height: 100%;

    .content-win-chat {
        .chat-window {
            width: 100%;
            height: 100vh;
            background-color:rgba(0, 0, 0, 0.8);
            padding-top: 40px;
            padding-bottom: 40px;

            .empty-title-won {
                position: absolute;
                margin: 0;
                top: 50%;
                left: 65%;
                margin-right: -50%;
                transform: translate(-50%, -50%);
                font-family: Lato,sans-serif;
                font-weight: 900;
                font-size: 14px;
                text-transform: uppercase;
                letter-spacing: .02em;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                word-wrap: break-word;
                // background-color: #ff216d;

                span {
                    color: white;
                }
            }

        .generl-list-messages {
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
            width: 100%;
            height: 100%;
            overflow:scroll;
            overflow-x: hidden;

            .outer-container{
                padding: 10px;
                width: 100%;
                height: auto;
                .container-hide-box {
                    padding: 10px;
                    width: auto;
                    height: auto;
                    // background: linear-gradient(45deg, #ff216d, #2196f3);

                    background: rgba(10, 10, 10, 0.65);
                    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
                    backdrop-filter: blur(4.2px);
                    -webkit-backdrop-filter: blur(4.2px);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                }

                .inner-container {
                    display: grid;
                    // background-color: #00cec7;
                    width: 100%;
                    
                    padding: 8px;
                    margin-top: 10px;
                    
                    .message-bubble {
                        height: auto;
                        // background-color:$color-back-message-bubble;
                        

                        .image-content {
                            right: 0;
                            // background-color: #ff216d;   
                            display: grid;
                             
                            .data-created-img {
                                // position: absolute;
                                // // width: ;
                                color: white;
                                // margin-left: auto;
                                font-size: 12px;
                                z-index: 5;
                                float: right;
                            }

                            img{ 
                                width: 200px;
                                height: 250px;
                                float: right;
                                border: 3px solid #333;

                                &:hover{
                                    cursor: pointer;
                                }
                                // margin-left: auto;


                            }
                        }
                    }

                }


                #addresator {
                        color: $color-text;
                    }
                
                .im-message-content:hover {
                    cursor:default;
                }
                .im-message-content {
                    border-radius: 10px;
                    float: right;
                    color: rgb(232, 230, 230);
                    font-size: 14px;
                    background-color:$color-back-message-bubble;
                    background-size: 300% 300%;
                    word-wrap: break-word;
                    width: auto;
                    max-width: 47%;
                    height: auto;
                    padding: 7px 7px 7px 7px;
                    display: flex;
                    flex-direction: column;
                    transition: .6s;
                    .bomb-s-loader {
                        margin-left: auto;
                        margin-right: 10px;
                        font-size: 10px;
                        padding-left: 10px;
                        width: 10px;
                        height: 10px;
                    }
                    }
            }
        }
    }
    }
}


.fade-comp-settChatId-v-enter-active,
.fade-comp-settChatId-v-leave-active {
  transition: opacity 0.3s ease;
}

.fade-comp-settChatId-v-enter-from,
.fade-comp-settChatId-v-leave-to {
  opacity: 0;
}

//LIST ANIME

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0
}



@keyframes ldio-irfwm47jvi {
  0% { transform: rotate(0deg) }
  50% { transform: rotate(180deg) }
  100% { transform: rotate(360deg) }
}
.ldio-irfwm47jvi div {
  position: absolute;
  animation: ldio-irfwm47jvi 1s linear infinite;
  width: 14px;
  height: 14px;
//   top: 92px;
//   left: 92px;
  border-radius: 50%;
  box-shadow: 0 1px 0 0 #0a0a0a;
  transform-origin: 8px 8.5px;
}
.loadingio-spinner-eclipse-pguwq2zyapl {
  width: 15px;
  height: 15px;
//   padding: 10px;
  display: inline-block;
  overflow: hidden;
  margin-left: auto;
}
.ldio-irfwm47jvi {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
}
.ldio-irfwm47jvi div { box-sizing: content-box; }


.bounce-bubble-message-enter-active {
  animation: bounce-in .3s ease-out both;
}

.bounce-bubble-message-leave-active {
  animation: bounce-in .3s reverse ease-in both;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.10);
  }
  100% {
    transform: scale(1);
  }
}

</style>