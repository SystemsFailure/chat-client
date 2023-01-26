<template>
    <div class="main-comp-class-create-playlist">
        <div class="inner-cotainer">
            <div class="inline-">
                <span>create new playlist</span>
                <div class="close-btn" @click="() => {this.$emit('closeCreateWindowPlaylistFunction', false)}"><i class="fi fi-bs-cross"></i></div>
            </div>
            <div class="wrap-container">
                <div class="field-data-playlist">
                    <div class="img-container">
                        <label for="select-playlist-image" class="label_3">+</label>
                        <span style="font-size: 13px;">Cover</span>
                        <input type="file" class="my" id="select-playlist-image" name="select-playlist-image" multiple @change="setBackImage">
                    </div>
                    <div class="input-continer">
                        <input type="text" placeholder="name playlist">
                        <textarea type="text" placeholder="description playlist"></textarea>
                        <div class="private-box">
                            <input type="checkbox" name="" id="sl-private-mode">
                            <span>private mode</span>
                        </div>
                    </div>
                </div>

                <div class="two-inner-container">
                    <i class="fi fi-bs-search"></i>
                    <input type="text" placeholder="global search music">
                    <i class="fi fi-bs-cross"></i>
                </div>
                
            </div>

            <div class="download-from-my-list">
                <div class="btn">download my list</div>
            </div>
                
            <div class="list-finded-musics">
                <span v-if="foundMusicsList.length <= 0">Here just not musics</span>
                <div class="list">
                    <transition-group name="bouncetwo">
                        <div class="item" v-for="music in foundMusicsList" :key="music.id">
                            <img src="@/assets/voice-chat.png" alt="">
                            <div class="music-data">
                                <span class="name-music">
                                    {{ music.name }}
                                </span>
                                <span class="name-artist">
                                    {{ music.artist }}
                                </span>
                            </div>
                        </div>
                    </transition-group>
                </div>
            </div>
            <div class="save" v-if="this.foundMusicsList.length > 0">
                save
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            foundMusicsList: [
                {id: 0, name: 'name', imgURL: '', url: '', artist: 'Image Dragons'},
                {id: 1, name: 'name', imgURL: '', url: '', artist: 'Image Dragons'},
                {id: 2, name: 'name', imgURL: '', url: '', artist: 'Image Dragons'},
                {id: 3, name: 'name', imgURL: '', url: '', artist: 'Image Dragons'},
                {id: 4, name: 'name', imgURL: '', url: '', artist: 'Image Dragons'},
                {id: 5, name: 'name', imgURL: '', url: '', artist: 'Image Dragons'},
                {id: 6, name: 'name', imgURL: '', url: '', artist: 'Image Dragons'},
                {id: 7, name: 'name', imgURL: '', url: '', artist: 'Image Dragons'},
            ],
        }
    },
}
</script>
<style lang="scss" scoped>

.main-comp-class-create-playlist {
    position: absolute;
    width: 500px;
    height: 660px;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(4.2px);
    -webkit-backdrop-filter: blur(4.2px);
    border: 1px solid #333;
    margin: 0;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    color: white;

    .inner-cotainer {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;

        .download-from-my-list {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 5px;

            .btn {
                padding: 10px;
                font-family: Lato,sans-serif;
                font-weight: 700;
                font-size: 10px;
                text-transform: uppercase;
                letter-spacing: .02em;
                border: 1px solid #333;

                &:hover {
                    cursor: pointer;
                    opacity: .7;
                    transition: .3s;
                }
            }
        }
        .save {
            // position: fixed;
            width: 100%;
            padding: 10px;
            bottom:0;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #333;
            background: none;

            &:hover {
                cursor: pointer;
                background-color: rgba($color: #00a28f, $alpha: .8);
                color: black;
                transition: .3s;
            }
        }

        .list-finded-musics {
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 14px;
            width: 100%;
            height: 100%;
            padding: 0px 8px 0px 8px;
            padding-bottom: 50px;
            overflow: auto;
            // position: relative;

            
            .list {
                width: 100%;
                height: 100%;
                .item {
                    width: 100%;
                    height: 50px;
                    padding: 10px;
                    background-color: rgba($color: #232323, $alpha: .3);
                    margin-top: 5px;
                    display: flex;
                    align-items: center;

                    img {
                        width: 30px;
                        height: 30px;
                    }

                    .music-data {
                        margin-left: 10px;
                        display: flex;
                        flex-direction: column;

                        span[class='name-music'] {
                            font-size: 15px;
                        }

                        span[class='name-artist'] {
                            font-size: 12px;
                        }
                    }
                }
            }
        }

        .wrap-container {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 50vh;
            padding: 10px;


            .two-inner-container {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                width: 100%;
                padding: 10px;
                border-bottom: 1px solid #333;

                input {
                    width: 85%;
                    height: 100%;
                    border: none;
                    background: none;
                    outline: none;
                    color: azure;
                }
                .fi-br-search {
                    width: 10%;
                    color: white;
                    margin-top: 4px;
                }

                .fi-ss-cross {
                    color: white;
                    margin-top: 4px;
                    font-size: 11px;

                    &:hover {
                        cursor: pointer;
                        opacity: .7;
                        transition: .3s;
                    }
                }
            }
            
            .field-data-playlist {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                width: 100%;
                padding: 20px;
                border-bottom: 1px solid #333;

                .img-container {
                    margin-right: 10px;
                    .my {
                        width: 0.1px;
                        height: 0.1px;
                        opacity: 0;
                        overflow: hidden;
                        position: absolute;
                        z-index: -1;
                    }
                    
                    .label_3 {
                        font-size: 50px;
                        width: 100px;
                        height: 100px;
                        background-color: none;
                        border: 1px solid #333;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
    
                        border-radius: 4px;
                        // transition: all 0.18s ease-in-out;
    
                        font-family: Lato,sans-serif;
                        text-transform: uppercase;
                        letter-spacing: .02em;
                        color: white;
                    }
    
                    .label_3:hover {
                        color: white;
                        background: #00cec780;
                    }
                }

                .input-continer {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    height: 100px;
                    margin-bottom: 10px;
                    .private-box {
                        margin-top: 5px;
                        width: 100%;
                        display: flex;
                        align-items: center;
                        font-family: Lato,sans-serif;
                        font-weight: 700;
                        font-size: 10px;
                        text-transform: uppercase;
                        letter-spacing: .02em;

                        input[type='checkbox'] {
                            margin-right: 5px;
                        }
                    }

                    input[type='text'] {
                        width: 200px;
                        background: none;
                        outline: none;
                        color: white;
                        border: 1px solid #777;
                        border-radius: 5px;
                        padding: 8px;
                        // margin-left: 10px;
                        font-size: 12px;
                        margin-bottom: 5px;
        
                    }
        
                    textarea {
                        width: 200px;
                        font-size: 12px;
                        padding: 8px;
                        border-radius: 5px;
                        background: none;
                        outline: none;
                        color: white;
                        border: 1px solid #777;
                        padding: 5px;
                        max-width: 200px;
                        min-width: 200px;
                        max-height: 300px;
                        min-height: 50px;
                    }
                }


            }
        }


        .inline- {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: row;
            border-bottom: 1px solid #333;
            padding: 5px;
            font-family: Lato,sans-serif;
            font-weight: 500;
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: .02em;

            span {
                margin-left: auto;

            }
            .close-btn {
                margin-left: auto;
                // margin-top: 10px;
                margin-right: 10px;
                font-size: 11px;
    
                &:hover {
                    cursor: pointer;
                    opacity: 0.8;
                    transition: .3s;
                }
            }
        }
    }

}

.bouncetwo-enter-active {
  animation: bounceListMusics-in .3s ease-out both;
}

.bouncetwo-leave-active {
  animation: bouncetwo-in .3s reverse ease-in both;
}

@keyframes bouncetwo-in {
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