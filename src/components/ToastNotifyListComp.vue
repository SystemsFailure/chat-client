<template>
    <div class="toasts-notify-class" @click="add">
        <div class="outside">
            <div class="list">
                <div 
                    class="it"
                    v-for="it in ToastsList" :key="it.id"
                    :class="{
                    'fail' : it.type === 'red',
                    'neutrally' : it.type === 'blue',
                    'succ' : it.type === 'green'
                    }"
                >
                    <div
                        class="frame-icon"
                    >
                    <!-- #44444473 -->
                    <img v-if="it.typeOf === 'delete'" src="@/assets/toasts/icons8-мусор-90.png" alt="">
                    <img v-if="it.typeOf === 'message'" src="@/assets/toasts/icons8-новое-сообщение.png" alt="">
                    <img v-if="it.typeOf === 'send'" src="@/assets/toasts/icons8-добавить-пользователя-96.png" alt="">


                    </div>
    
                    <div 
                        class="text-content"
                    >
                    {{ it.textContent }}
                    </div>
    
                    <div
                        class="close-btn-toast"
                        @click="() => {}"
                    >
                    <img src="@/assets/svgassets/icons8-удалить.svg" alt="">
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
export default {
    data() {
        return {
            ToastsList: [
                // {id: 0, icon: 'delete document', textContent: 'Document been deleted', type: 'red', typeOf: 'delete'},
                {id: 0, icon: 'delete document', textContent: 'New message', type: 'blue', typeOf: 'message'},
                // {id: 0, icon: 'delete document', textContent: 'Request been sended by successful', type: 'green', typeOf: 'send'},
            ],
        }
    },

    watch: {
        isList: {
            handler(newArray) {
                this.ToastsList = newArray
                console.log('array is been to updated', newArray)
            },
            deep: true,
        }
    },
    computed: {
        ...mapState('toast', {
            isList: 'isList',
        })
    },

    mounted() {
        this.ToastsList = this.isList
        console.log(this.isList, this.ToastsList, 'bomba')
    },
    methods: {
        ...mapMutations('toast', {
            addToast: 'addToast',
        }),
    }
}
</script>
<style lang="scss" scoped>
// #ff0000

.fail {
    background: linear-gradient(90deg, rgba(255,0,0,0.958420868347339) 0%, rgba(255,0,0,0.6278886554621849) 18%, rgba(28,28,33,0.5690651260504201) 45%);
}
.neutrally {
    background: linear-gradient(90deg, rgba(0, 94, 255, 0.958) 0%, rgba(0, 68, 255, 0.628) 18%, rgba(28,28,33,0.5690651260504201) 45%);
}
.succ {
    background: linear-gradient(90deg, rgba(0, 255, 94, 0.958) 0%, rgba(0, 255, 55, 0.628) 18%, rgba(28,28,33,0.5690651260504201) 45%);
}

.toasts-notify-class {
    position: absolute;
    right: 10px;
    top: 30px;
    width: 400px;
    // padding: 5px;
    // height: 600px;
    // background-color: rgba($color: rgb(0, 0, 0), $alpha: .5);
    // background: linear-gradient(90deg, rgba(252,34,34,1) 0%, rgba(255,0,0,1) 0%, rgba(28,28,33,1) 40%);4
    // background: linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,0,0,0.3925945378151261) 18%, rgba(28,28,33,0.6446953781512605) 40%);
    // background: linear-gradient(90deg, rgba(255,0,0,0.9556197478991597) 0%, rgba(255,0,0,0.48783263305322133) 18%, rgba(28,28,33,0.6138830532212884) 40%);
    // background: linear-gradient(90deg, rgba(255,0,0,0.958420868347339) 0%, rgba(255,0,0,0.6278886554621849) 18%, rgba(28,28,33,0.5690651260504201) 45%);
    z-index: 11;
    .outside {
        width: 100%;
        height: 100%;


        .list {
            width: 100%;
            height: 100%;
            // overflow: auto;
            .it {
                width: 100%;
                height: 50px;
                display: flex;
                align-items: center;
                // border-radius: 10px;
                padding-left: 20px;
                margin-top: 10px;
                z-index: 50;
                color: white;
                font-size: 12px;
                text-transform: uppercase;

                .frame-icon {
                    
                    img {
                        width: 30px;
                        height: 30px;
                    }
                }
    
                .text-content {
                    margin-left: 10px;
                    display: flex;
                    flex-direction: column;
                }
    
                .close-btn-toast {
                    margin-left: auto;
                    margin-right: 20px;
                    img {
                        width: 12px;
                        height: 12px;

                        &:hover {
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }
}

</style>