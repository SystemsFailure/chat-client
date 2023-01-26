<template>

    <div class="main-banner-bottom-comp">
        <div class="content">
            <div class="im-form-data">
                <input type="text" name="text" id="message-input" placeholder="write..." v-model="inp_text_message" @keydown="send_message_key_enter">

                <div class="outer-container">
                    <div class="agent-container">

                        <div class="universal-btn" @click='show_and_hide_menuToggle'>
                            <transition name="fade-cycle">
                                <div class="cycle-point-adapter" v-if="show_toggle_menu" @click="alertShow"></div>                            
                            </transition>

                            <transition name="fade-menu">
                                <div class="box-toggle-menu" v-if="show_toggle_menu" @click.stop.prevent>
                                    <div class="item-menu0 item-ofMenu-clip">
                                        <i class="fi fi-bs-clip"></i>
                                    </div>
                                    <div class="item-menu0 item-ofMenu-smile">
                                        <i class="fi fi-bs-camera"></i>
                                    </div>
                                    <div class="item-menu0 item-ofMenu-voice">
                                        <i class="fi fi-bs-smile"></i>
                                    </div>
                                </div>
                            </transition>
                        </div>

                        <div class="video-capture">
                            <i class="fi fi-bs-clip" style="color: white"></i>
                            <label for="myfile" class="label"></label>
                            <input type="file" class="my" id="myfile" name="myfile" multiple @change="send_photo($event)">
                        </div>

                        <div @click="send_message" id="btn-send-data">
                            <img src="@/assets/sender.png" alt="send">
                        </div>

                    </div>
                </div>
            </div>
        </div> 
    </div>

</template>

<script>

export default {
    data() {
        return {
            model_message: 'hell0',
            inp_text_message: '',
            show_toggle_menu: false,
        }
    },

    methods: {
        send_photo(event) {
            let file = event.target.files[0]
            this.$emit('add_file_messageFunction', file)
        },

        send_message_key_enter(event) {
            if(event.key === 'Enter') {
                if(this.inp_text_message != '' && this.inp_text_message.length < 10000) {
                    this.$emit('sendMessage', this.inp_text_message)
                    this.inp_text_message = ''
                } else {
                    return
                }
            }else {
                return
            }
        },

        send_message() {
            this.$emit('sendMessage', this.inp_text_message)
            this.inp_text_message = ''
        },

        show_and_hide_menuToggle() {
            this.show_toggle_menu = !this.show_toggle_menu
        },

        alertShow() {
            console.log('click to cycle from menu')
        }
    },

    components: {

    }
}

</script>


<style scoped lang="scss">


.fade-cycle-enter-active, .fade-cycle-leave-active {
  transition: opacity .3s;
}
.fade-cycle-enter, .fade-cycle-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}

.fade-menu-enter-active, .fade-menu-leave-active {
  transition: opacity .3s;
}
.fade-menu-enter, .fade-menu-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}


$color-back: rgba(0, 0, 0, 0.7);
$color-back-trans: none;
$color-back-gray: rgba(41, 41, 41, 0.7);
$color-back-blue: rgba(12, 22, 44, 0.7);

$color-text-yellow: #ff6600;
$color-text: #4e5f7d;
$color-text-teal: #00cec7;
$color-text-izumrud: #00ff80;

* {
    margin: 0;
    padding: 0;
}

.main-banner-bottom-comp {
    width: 100%;
    height: 40px;
    position: fixed;

    background: rgba(5, 5, 5, 0.85);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(4.2px);
    -webkit-backdrop-filter: blur(4.2px);
    border-top: 1px solid rgba(255, 255, 255, 0.3);


    z-index: 12;
    bottom: 0;

    .content {
        width: 71%;
        height: 40px;

        .im-form-data {
            width: auto;
            height: 40px;
            display: flex;
            align-items: center;


            .outer-container {
                width: auto;
                height: 40px;

                .agent-container {
                    display: flex;
                    height: 40px;
                    align-items: center;


                    .universal-btn {
                        width: 32px;
                        height: 32px;
                        border-radius: 50%;
                        padding-top: 2px;
                        border: 1px solid #333;
                        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
                        backdrop-filter: blur(4.2px);
                        -webkit-backdrop-filter: blur(4.2px);
                        // background-color: $color-back-gray;
                        margin-right: 5px;
                        margin-left: 5px;
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        cursor: pointer;
                        .cycle-point-adapter {
                            width: 10px;
                            height: 10px;
                            border-radius: 50%;
                            position: fixed;
                            transform: translateY(-30px);
                            z-index: 1;

                            background: rgba(10, 10, 10, 0.65);
                            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
                            backdrop-filter: blur(4.2px);
                            -webkit-backdrop-filter: blur(4.2px);
                            border: 1px solid rgba(255, 255, 255, 0.3);

                            // transition: 0.5s;

                        }

                        .box-toggle-menu {
                            // width: 140px;
                            // height: 40px;
                            width: auto;
                            height: auto;
                            transform: translateY(-70px);

                            border-radius: 10px;

                            position:absolute;

                            background: rgba(0, 188, 157, 0.65);
                            backdrop-filter: blur(4.2px);
                            -webkit-backdrop-filter: blur(4.2px);
                            border: 1px solid rgba(255, 255, 255, 0.3);

                            display: flex;
                            align-items: center;
                            justify-content: space-between;

                            padding: 5px;
                            z-index: 11;

                            // transition: 1s;
                            .item-menu0 {
                                width: 35px;
                                height: 35px;
                                border-radius: 50%;

                                background:$color-back-gray;
                                // padding-top: 4px;

                                display: flex;
                                align-items: center;
                                justify-content: center;

                                margin: 5px;

                                i {
                                    margin-top: 2px;
                                    color:white;
                                    font-size: 20px;
                                }
                            }
                            .item-menu0:last-child {
                                i {
                                    margin-top: 4.8px;
                                    margin-left: 2.2px;
                                }
                            }
                            .item-menu0:first-child {
                                i {
                                    margin-top: 4px;
                                    margin-left: 1px;
                                }
                            }

                            .item-menu0:hover {
                                opacity: 0.7;
                                cursor: pointer;
                            }
                        }
                    
                    }

                    .universal-btn::before {
                            content: '+';
                            font-size: 18px;
                            color:white;
                        }

                    .video-capture {
                        width: 32px;
                        height: 32px;
                        border-radius: 50%;
                        
                        // background-color: $color-back-gray;
                        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
                        backdrop-filter: blur(4.2px);
                        -webkit-backdrop-filter: blur(4.2px);

                        margin-right: 5px;
                        margin-left: 5px;
                        padding-top: 4px;

                        display: flex;
                        align-items: center;
                        justify-content: center;

                        .my {
                            width: 0.1px;
                            height: 0.1px;
                            opacity: 0;
                            overflow: hidden;
                            position: absolute;
                            z-index: -1;
                        }

                        .label {
                            width: 32px;
                            height: 32px;
                            background-color: none;
                            border-radius: 50%;
                            z-index: 1;
                            position: absolute;

                            
                            &:hover {
                                // background-color: $color-back;
                                cursor: pointer;
                                opacity: 1;
                                transition: .3s;
                            }
                        }
                        
                    }
                    .video-capture::before {
                        // content: 'v';
                        color:white;
                    }

                    #btn-send-data {
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        border-radius: 100%;
                        padding: 8px;
                        border: none;
                        // background-color: $color-back-gray;
                        color: $color-text;

                        cursor: pointer;

                        margin-right: 5px;
                        margin-left: 5px;
                        img {
                            width: 16px;
                            height: 16px;
                        }
                    }
                }

            }

            #message-input {
                width: 100%;
                height: 40px;
                background: rgba(10, 10, 10, 0);
                border:none;
                // border-left: 1px solid rgba(255, 255, 255, 0.3);
                color: $color-text;
                outline: none;


                padding: 10px;

            }
        }

    }
}

</style>