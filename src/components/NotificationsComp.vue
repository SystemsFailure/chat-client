<template>
    <div class="main-class-nitification-comp">
        <div class="inner-container">

            <div class="left-block-content">
                <div class="title-block"><span>Notifications</span></div>
                <div class="list-items-ness">
                    <div
                    class="global-message"
                    v-for="item in list_items_mess" 
                    :key="item.id"
                    @click="showWindowById(item.id)"
                    ><div class="text-content-0"><span>{{ item.title }}</span></div></div>
                </div>
            </div>
            
            <div class="right-block-content-global-mess" v-if="showGlobalMessWindow">
                <div class="line-up-content">
                    <div class="close-btn" @click="() => {this.$emit('closeNotificationsCompFunction', false)}"><i class="fi fi-ss-cross"></i></div>
                    <div class="expend-window"><i class="fi fi-ss-expand"></i></div>
                </div>
            </div>

            <div class="right-block-content-request-mess" v-if="showRequestMessWindow">
                <div class="line-up-content">
                    <div class="title-box"><span>list messages</span></div>
                    <div class="wrapper-boc">
                        <div class="expend-window"><i class="fi fi-ss-expand"></i></div>
                        <div class="close-btn" @click="() => {this.$emit('closeNotificationsCompFunction', false)}"><i class="fi fi-ss-cross"></i></div>
                    </div>
                </div>
                <div class="list-messages-of-request">
                    <div class="message-box" v-for="message in list_requests" :key="message.id" :style="message.status ? {'border-left' : '5px solid teal'} : {'border' : '1px solid #333'}">
                        <div class="check-box-bpx">
                            <input type="checkbox" name="" id="check-id">
                        </div>

                        <div class="wrapper-container-mess-box">
                            <div class="fromWhoMessage-box"><span>{{ message.fromID }}</span></div>
                            <div class="text-message-box"><span>{{ message.previewMessage }}</span></div>
                        </div>

                        <div class="wrapper-container-btns">
                            <div class="btn-success-accept-box" @click="addToChat_createChat_send_notify(message)"><span>Accept</span></div>
                            <div class="btn-fail-no-accept-box"><span>Cancel</span></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
import { NotifyApi } from '@/firebase-config/NotificationController'
import { UserApi } from '@/firebase-config/UserController'
import { ChatApi } from '@/firebase-config/ChatController'
export default {
    data() {
        return {
            USERID: localStorage.getItem('user-id'),
            list_items_mess: [
                {id: 0, title: 'Глобальные сообщения'},
                {id: 1, title: 'Заявки и запросы'}
            ],
            list_requests: [],

            showGlobalMessWindow: false,
            showRequestMessWindow: true,
        }
    },

    mounted() {
        NotifyApi.getAllNotifictions({toID: this.USERID}).then(NotifyList => {
            this.list_requests = NotifyList
        }).catch(err => {
            console.log(err)
        })
    },

    methods: {
        async addToChat_createChat_send_notify(message) {
            UserApi.addUserToChats(message.toID, message.fromID)
            UserApi.addUserToChats(message.fromID, message.toID)
            await ChatApi.createChat({toID: message.toID, fromID: message.fromID}).then(() => {
                console.log('chat success created')
            }).catch(err => {
                console.log(err)
            })
            this.$emit('updateUsersListFunction')

        },
        
        showWindowById(id) {
            console.log(id)
            if(id != null) {

                if(id === 0) {
                    this.showRequestMessWindow = false,
                    this.showGlobalMessWindow = true
                }

                if(id === 1) {
                    this.showGlobalMessWindow = false,
                    this.showRequestMessWindow = true
                }

            }
        },
    }
}
</script>
<style lang="scss" scoped>

.main-class-nitification-comp {
    width: 1200px;
    height: 600px;
    background-color: rgba($color: #000000, $alpha: .8);
    position: absolute;
    margin: 0;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    padding: 10px;
    z-index: 12;
    border: 1px solid #333;

    font-family: Lato,sans-serif;
    font-weight: 700;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: .02em;
    .inner-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;

        .left-block-content {
            width: 20%;
            height: 100%;
            padding: 10px;

            .title-block {
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                width: 100%;
            }
            
            .list-items-ness {
                margin-top: 20px;
                display: flex;
                flex-direction: column;
                align-items: center;
                color: white;
                .global-message {
                    margin-top: 10px;
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #333;
                    background-color: rgba($color: #000000, $alpha: 1.0);
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    &:hover {
                        cursor: pointer;
                        background-color: rgba($color: #0e0e0e, $alpha: 1.0);
                    }
    
                    .text-content-0 {
    
                    }
                }

            }
            
        }

        .right-block-content-global-mess {
            width: 80%;
            height: 100%;
            padding: 10px;
            background-color: yellow;

            .line-up-content {
                width: 100%;
                height: auto;
                color: white;
                font-size: 12px;
                padding-top: 5px;

    
                .expend-window {
                    float: right;
                    margin-right: 10px;
    
                    &:hover {
                        cursor: pointer;
                        opacity: 0.8;
                        transition: .3s;
                    }
                }
    
                .close-btn {
                    float: right;
                    margin-right: 10px;
    
                    &:hover {
                        cursor: pointer;
                        opacity: 0.8;
                        transition: .3s;
                    }
                }
            }

        }

        .right-block-content-request-mess {
            width: 80%;
            height: 100%;
            padding: 10px;
            // background-color: red;

            .list-messages-of-request {
                width: 100%;
                height: 98%;
                // margin-top: 10px;
                padding: 10px;

                .message-box {
                    width: 100%;
                    padding: 10px;
                    background-color: rgba($color: #000000, $alpha: 1.0);
                    color: white;
                    margin-top: 15px;
                    height: 50px;
                    border: 1px solid #333;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .check-box-bpx {
                        width: 20px;

                        input {
                            padding: 4px;
                            color: white;
                            background: none;
                        }
                        #check-id {
                        }

                    }

                    .wrapper-container-mess-box {
                        width: 70%;
                        display: flex;
                        .fromWhoMessage-box {
                            border-right: 1px solid #333;
                            padding-right: 20px;
                            span {
    
                            }
                        }
    
                        .text-message-box {
                            margin-left: 20px;
                            span {
    
                            }
    
                        }
                    }

                    .wrapper-container-btns {
                        width: 20%;
                        display: flex;
                        justify-content: flex-end;
                        .btn-success-accept-box {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            padding: 8px;
                            border: 1px solid #333;

                            &:hover {
                                cursor: pointer;
                                background-color: rgba($color: #000000, $alpha: 1.0);
                                border: 1px solid teal;
                                transition: .1s;
                            }
                        }
    
                        .btn-fail-no-accept-box {
                            margin-left: 10px;
                            padding: 8px;
                            border: 1px solid #333;
                            display: flex;
                            align-items: center;
                            justify-content: center;

                            &:hover {
                                cursor: pointer;
                                background-color: rgba($color: #000000, $alpha: 1.0);
                                border: 1px solid red;
                                transition: .1s;
                            }
                        }
                    }

                }
                
            }

            .line-up-content {
                width: 100%;
                height: auto;
                color: white;
                font-size: 12px;
                padding-top: 5px;
                display: flex;
                align-items: center;
                justify-content: center;

                .title-box {
                    margin-left: auto;
                }

                .wrapper-boc {
                    margin-left: auto;
                    display: flex;
                    .expend-window {
                        margin-right: 10px;
        
                        &:hover {
                            cursor: pointer;
                            opacity: 0.8;
                            transition: .3s;
                        }
                    }
        
                    .close-btn {
                        margin-right: 10px;
        
                        &:hover {
                            cursor: pointer;
                            opacity: 0.8;
                            transition: .3s;
                        }
                    }

                }
    
            }
        }

    }
}

</style>