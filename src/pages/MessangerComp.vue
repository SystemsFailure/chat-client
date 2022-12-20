<template>
    <ProfileCardComp v-if="$store.state.showProfile" @closeProfileFunction="(value) => {this.$store.state.showProfile = value}"></ProfileCardComp>
    <ListAllUsersComp v-if="show_list_all_users_comp" @updateUsersListFunction="updateUsersList" @closeListUsersCompFunction="(value) => {this.show_list_all_users_comp = value}"></ListAllUsersComp>
    <div class="main_div">
        <div class="global-content">

            <NavigationComp @openMenu="openMenu"></NavigationComp>

            <div class="right-block">
                <ChatWindowComp v-bind:user_to_id="i_user_to_id"></ChatWindowComp>
            </div>

            <div class="left-block">

                <SearchUsersBoxComp v-if="showMenuChats" v-model="searchQuery"></SearchUsersBoxComp>

                <div v-if="showMenuChats" class="list-users">
                    <ul>
                        <TransitionGroup name="list">
                            <div
                            v-for="item in filteredUsers"
                            v-bind:key="item.id"
                            class="item-list"
                            @click="open_item_of_list_users($event, item.id, item)"
                            v-bind:class="{'selected-item-of-list-messages' : this.id_currect_user === item.id}"
                            >
                                <div class="name-and-img">
                                    <div class="box-img-and-toggle">
                                        <div :class="{'toggle-online' : item.online}"></div>
                                        <img :src="item.img_url || require('../assets/user_profile.png')" alt="photo" srcset="">
                                        <!-- <img src="../assets/user_profile.png" alt="" srcset=""> -->
                                    </div>
                                    <span>{{item.name}}</span>
                                    <span id="dateLastMessage_id">{{item.dateLastMessage}}</span>
                                </div>
                                <h6>{{slice_last_message(item.lastmessage)}}</h6>
                                <div class="box-not-read-message">
                                    <span :class="{'count-not-read-message_': item.countNotReadMessages}">{{item.countNotReadMessages ? item.countNotReadMessages:undefined}}</span>
                                </div>
                            </div>
                        </TransitionGroup>
                    </ul>
                </div>

                <SettingsComp v-show="showMenuSettings" @setImageToBack="setImage"></SettingsComp>
                <ViewProfileComp></ViewProfileComp>

            </div>
        </div>
    </div>
</template>

<script>
import NavigationComp from '@/components/NavigationComp.vue'
import ChatWindowComp from '@/components/ChatWindowComp.vue'
import SearchUsersBoxComp from '@/components/SearchUsersBoxComp.vue'
import SettingsComp from '@/components/SettingsComp.vue'
import ProfileCardComp from '@/components/ProfileCardComp.vue'
import ListAllUsersComp from '@/components/ListAllUsersComp.vue'
import ViewProfileComp from '@/components/ViewProfileComp.vue'

import requestGetUsers from '@/hooks/hookRequestsToUser'
import hookBackChange from '@/hooks/hookBackgroundChange'

import { UserApi } from '@/firebase-config/UserController'


export default {
    data() {
        return {
            showSettingsChatId: true,

            userId: localStorage.getItem('user-id') || null,

            showMenuChats: true,
            showMenuMail: false,
            showMenuSettings: false,

            show_list_all_users_comp: true,

            i_user_to_id: null,

            id_currect_user: null,

            searchQuery: '',
            up: true,
            list_users: [],
        }
    },


    setup() {
        // const { data_, result_write, sendData } = sendDataToServer();
        let {users_list, getUsers} = requestGetUsers()
        const {changeBack, imgs_path_list, getCookieValueByName} = hookBackChange()

        // console.log(users_list, 'startApp')
        // console.log(imgs_path_list, 'startApp2')
        return {
            users_list,
            getUsers,
            changeBack,
            imgs_path_list,
            getCookieValueByName,
        }
    },


    mounted() {
        if(this.getCookieValueByName('imgId') != '' && document.cookie) {
            document.body.style.backgroundImage = `url(${require('@/assets/' + this.imgs_path_list[this.getCookieValueByName('imgId')].img_path)})`
        } else {
            console.log('cookie is empty!')
        }
        // document.body.style.backgroundImage = `url(${require('@/assets/Clouds.png')})`
        // this.getUsers()

        const users = UserApi.getAllChats(this.userId)
        users.then(data => {
            this.list_users = data
        })
    },

    computed: {
        filteredUsers() {
            if(this.searchQuery) {
                return this.list_users.filter(user => {
                    return user.name.includes(this.searchQuery)
                })
            }
            return this.list_users
        }
    },

    methods: {
        updateUsersList() {
            const users = UserApi.getAllChats(this.userId)
            users.then( data => {
                this.list_users = data
            })
        },

        open_item_of_list_users(event, user_to_id, item) {
            const user_ = this.list_users.filter(user => user.id === user_to_id)
            this.$store.state.user_data = user_

            this.i_user_to_id = user_to_id
            this.id_currect_user = user_to_id

            // console.log(item)
            this.$store.commit('changeProfile', item)
        },


        openMenu(id_) {
            switch (id_) {
                case 0:
                    this.showMenuMail = true
                    this.showMenuChats = false
                    this.showMenuSettings = false
                    break;
                case 1:
                    this.showMenuChats = true
                    this.showMenuMail = false
                    this.showMenuSettings = false
                    break;
                case 2:
                    this.showMenuSettings = true
                    this.showMenuMail = false
                    this.showMenuChats = false
                    break;
                default:
                    break;
            }
        },

        // hideScroll(param) {
        //     const x = document.getElementById('search_e')
        //     x.style.width = "64px";
        //     param.style.overflow = 'auto'
        // },

        slice_last_message(text) {
            var sliced = text.slice(0,40);
            if (sliced.length < text.length) {
                sliced += '...';
            }
            return sliced
        },
    },

    components: {NavigationComp, ChatWindowComp, SearchUsersBoxComp, SettingsComp,
         ProfileCardComp, ListAllUsersComp, ViewProfileComp
        }

}

</script>

<style scoped lang="scss">

.selected-item-of-list-messages {
    background-color: rgba(0, 255, 242, 0.65) !important;
}


.backgroundColorWhite {
    background-color: azure;
}


.list-enter-active, .list-leave-active {
  transition: all 0.6s;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}



$color-back: rgba(0, 0, 0, 0.4);
$color-back-trans: none;
$color-back-gray: rgba(41, 41, 41, 0.7);
$color-back-blue: rgba(12, 22, 44, 0.7);

$color-text: #4e5f7d;
$color-text-yellow: #ff6600;
$color-text-teal: #00cec7;
$color-text-izumrud: #00ff80;
.block-settings {
    background: $color-back;
    border: $color-text;
}

.box-not-read-message {
    // background-color: #ff6600;
    display: flex;
    justify-content: end;
}

.count-not-read-message_ {
    width: 18px;
    height: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 0;
    background-color: #00cec7;
    border-radius: 50%;
    font-size: 12px;
    font-weight: 700;
    color: black;
}

.main_div {
    width: 100%;
    height: 100vh;
    
    .global-content {
        width: 100%;
        height: 100vh;
        // background-color: blue;

        .right-block {
            width: 71%;
            height: 100vh;
            // background-color: aqua;
            float: right;
        }

        .left-block{
            width: 25%;
            height: 100vh;
            // background: $color-back;
            float: left;
            margin-left: 4%;

            

            .list-users{
                // position: fixed;
                // width: 25%;
                width: 100%;
                height: 100%;
                padding-right: 10px;
                padding-left: 10px;
                padding-top: 45px;
                background: $color-back;
                overflow:auto;

                font-family: Lato,sans-serif;
                // font-weight: 700;
                // font-size: 11px;
                // text-transform: uppercase;
                // letter-spacing: .02em;



                .item-list:hover {
                    background-color: rgba(0, 248, 248, 0.281);
                    }
                .item-list{
                    // background-color: $color-back;
                    color:white;
                    padding: 10px;
                    margin-top: 5px;
                    display: flex;
                    flex-direction: column;


                    background-color: rgba(10, 10, 10, 0.65);

                    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
                    backdrop-filter: blur(8.2px);
                    -webkit-backdrop-filter: blur(8.2px);
                    border: 1px solid rgba(255, 255, 255, 0.3);

                    span {
                        margin-right: 5px;
                    }

                    .name-and-img {
                        display: flex;
                        align-items: center;

                        :last-child {
                            font-size: 12px;
                            color: white;
                            margin-left: auto;
                        }


                        .box-img-and-toggle {
                            width: 30px;
                            height: 30px;
                            border-radius: 50%;

                            .toggle-online {
                                width: 10px;
                                height: 10px;
                                border-radius: 50%;
                                background: #00cec7;
                                position: fixed;
                            }

                            img {
                                width: 30px;
                                height: 30px;
                                margin-right: 5px;
                                border-radius: 50%;
                            }
                        }

                        span {
                            margin-right: 5px;
                            margin-left: 5px;                            
                        }
                    }

                    h6 {
                        margin-top: 5px;
                        margin-left: 35px;
                    }
                }
            }
        }
    }

}


@media screen and (max-width: 768px) {
.main_div .global-content .right-block{
        display: none;
        width: 0%;
        }
}

@media screen and (max-width: 768px) {
.main_div .global-content {
    .left-block {
        width: 90%;
        margin-left: 10%;

        .search-users {
            width: 90%;

            .inp-search {
                width: 100%;
            }
        }
        }
    }

}
</style>