<template>
    <div class="main-AudioComp">
        <div class="inner-container-deep">

            <div class="line-comp">
                <div class="toggle-line-tools">
                    <div class="icon"><i class="fi fi-br-search"></i></div>
                    <input type="text" placeholder="search music">
                    <div class="close-btn"><i class="fi fi-ss-cross"></i></div>
                </div>
                
                <div class="player">
                    <div class="inner-container-player">

                        <div class="controller">
                            <div class="priview"><i class="fi fi-ss-angle-double-left"></i></div>
                            <div class="play-and-stop">
                                <i class="fi fi-ss-play"></i>
                                <i v-if="false" class="fi fi-ss-pause"></i>
                            </div>
                            <div class="next"><i class="fi fi-ss-angle-double-right"></i></div>
                        </div>

                        <div class="data-music">
                            <div class="name-music"><span>На всю планету земля</span></div>
                            <div class="name-avtor">Pizza</div>
                        </div>

                        <div class="progress-audio"><input type="range" id="volume-slider" max="100" value="32"></div>

                        <div class="time">
                            <div class="current-time">00:32</div>
                            /
                            <div class="total-time">03:36</div>
                        </div>

                        <div class="tools">
                            <div class="add"><i class="fi fi-ss-plus"></i></div>
                            <div class="mix"><i class="fi fi-ss-shuffle"></i></div>
                            <div class="repeat"><i class="fi fi-ss-arrows-repeat-1"></i></div>
                            <div class="share"><i class="fi fi-ss-redo"></i></div>
                        </div>

                    </div>
                </div>


            </div>


            <div class="list-audio">

                <!-- <transition-group name="audiolist"> -->
                    <div class="item-audio" v-for="audio in audioList" :key="audio.id" @mouseover="itemAudioOver($event, audio.id)">



                        <div class="inner-item" :id="`inner${audio.id}`" @mouseout="itemAudioLeave($event, audio.id)">
                            <div class="inner-image-audio">
                                <div class="image-src">
                                    <i class="fi fi-ss-play"></i>
                                    <i class="fi fi-ss-pause"></i>
                                </div>
                            </div>
                            <div class="tools-item">
                                <div class="add-audio"><i class="fi fi-ss-plus"></i></div>
                                <div class="sett-audio"><i class="fi fi-ss-menu-dots-vertical"></i></div>
                            </div>
                        </div>


                        <div class="image-audio">
                            <img src="@/assets/airPods.png" alt="" srcset="">
                            <!-- <Transition name="anim-fade-effect">
                            </Transition> -->
    
                        </div>
                        <div class="data-audio">
                            <div class="name-audio">{{ audio.name }}</div>
                            <div class="name-artist"><span>{{ audio.artist }}</span></div>
                        </div>
                        <div class="time-audio"><span>03:46</span></div>
                    </div>
                <!-- </transition-group> -->

            </div>

        </div>    
    </div>
</template>
<script>
import { MusicApi } from '@/firebase-config/MusicController'

export default {
    data() {
        return {
            audioList: [
                // {id: 1, url: 'http/proxy/audio-element.mp3', name: 'life-cycle', img_url: 'http://photo.png', artistName: 'Maks Korzh'},
                // {id: 2, url: 'http/proxy/audio-element.mp3', name: 'Ipmossible', img_url: 'http://photo.png', artistName: 'Global'},
                // {id: 3, url: 'http/proxy/audio-element.mp3', name: 'Dragon', img_url: 'http://photo.png', artistName: 'Design'},
                // {id: 4, url: 'http/proxy/audio-element.mp3', name: 'Help me', img_url: 'http://photo.png', artistName: 'Oxxxymiron'},
                // {id: 5, url: 'http/proxy/audio-element.mp3', name: 'Mix-show', img_url: 'http://photo.png', artistName: 'Image Dragons'},
                // {id: 6, url: 'http/proxy/audio-element.mp3', name: 'Browse', img_url: 'http://photo.png', artistName: 'Maks Korzh'},
                // {id: 7, url: 'http/proxy/audio-element.mp3', name: 'I Hate everthing about you', img_url: 'http://photo.png', artistName: 'Maks Korzh'},
                // {id: 8, url: 'http/proxy/audio-element.mp3', name: 'life-cycle', img_url: 'http://photo.png', artistName: 'Maks Korzh'},
                // {id: 9, url: 'http/proxy/audio-element.mp3', name: 'life-cycle', img_url: 'http://photo.png', artistName: 'Maks Korzh'},
                // {id: 10, url: 'http/proxy/audio-element.mp3', name: 'life-cycle', img_url: 'http://photo.png', artistName: 'Maks Korzh'},
                // {id: 11, url: 'http/proxy/audio-element.mp3', name: 'life-cycle', img_url: 'http://photo.png', artistName: 'Maks Korzh'},
                // {id: 12, url: 'http/proxy/audio-element.mp3', name: 'life-cycle', img_url: 'http://photo.png', artistName: 'Maks Korzh'},
                // {id: 13, url: 'http/proxy/audio-element.mp3', name: 'life-cycle', img_url: 'http://photo.png', artistName: 'Maks Korzh'},
                // {id: 14, url: 'http/proxy/audio-element.mp3', name: 'life-cycle', img_url: 'http://photo.png', artistName: 'Maks Korzh'},
                // {id: 15, url: 'http/proxy/audio-element.mp3', name: 'life-cycle', img_url: 'http://photo.png', artistName: 'Maks Korzh'},
                // {id: 16, url: 'http/proxy/audio-element.mp3', name: 'life-cycle', img_url: 'http://photo.png', artistName: 'Maks Korzh'},
                // {id: 17, url: 'http/proxy/audio-element.mp3', name: 'life-cycle', img_url: 'http://photo.png', artistName: 'Maks Korzh'},
                // {id: 18, url: 'http/proxy/audio-element.mp3', name: 'life-cycle', img_url: 'http://photo.png', artistName: 'Maks Korzh'},
            ]
        }
    },


    mounted() {
        this.getAll()
        // MusicApi.getImg()
    },

    methods: {

        async getAll() {
            await MusicApi.getAllMusics().then(array_ => {
                this.audioList = array_
            }).catch(err => {
                console.log(err)
            })
        },

        itemAudioOver(e, id) {
            let elem = document.getElementById(`inner${id}`)
            if (elem)
            {
                elem.style.zIndex = 1
                elem.style.display = 'flex'
            } else {
                return
            }
        },

        itemAudioLeave(e, id) {
            e.target.style.zIndex = -1
            let itemList = document.getElementsByClassName('inner-item')
            for (let index = 0; index < itemList.length; index++) {
                const element = itemList[index]
                if (element.id === id)
                {
                    return
                } else {
                    element.style.zIndex = -1
                    element.style.display = 'none'
                }
                
            }
        },

        // showPlayFunc(id) {
        //     if(this.currCount === null) {
        //         this.currentAudio = id
        //         this.showPlay = true
        //     } else {
        //         if (this.currCount === id) {
        //             this.showPlay = true
        //         } else {
        //             this.showPlay = false
        //         }
        //     }
        // }
    }
}
</script>
<style lang="scss" scoped>
.main-AudioComp {
    width: 100%;
    height: 100vh;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    .inner-container-deep {
        width: 100%;
        height: 100%;
        background: rgba($color: #000000, $alpha: .8);
        z-index: 1000;

        .line-comp {
            height: 100px;
            width: 100%;
            position: relative;

            .player {
                position: absolute;
                width: 100%;
                height: 50px;
                display: flex;
                align-items: center;
                color: white;
                bottom: 0;
                border-bottom: 1px solid #333;
                border-top: 1px solid #333;



                .inner-container-player {
                    background-color: rgba($color: #000000, $alpha: .8);
                    display: flex;
                    align-items: center;
                    width: 100%;
                    height: 100%;

                    .tools {
                        display: flex;
                        width: 120px;
                        height: 100%;
                        align-items: center;
                        justify-content: space-between;
                        padding-top: 4px;
                        margin-left: 25px;
                        .add {
                            &:hover {
                                cursor: pointer;
                                color: rgba($color: teal, $alpha: 1.0);
                                transition: .5s;
                            }
                        }

                        .mix {
                            &:hover {
                                cursor: pointer;
                                color: rgba($color: teal, $alpha: 1.0);
                                transition: .5s;
                            }
                        }

                        .repeat {
                            &:hover {
                                cursor: pointer;
                                color: rgba($color: teal, $alpha: 1.0);
                                transition: .5s;
                            }
                        }

                        .share {
                            &:hover {
                                cursor: pointer;
                                color: rgba($color: teal, $alpha: 1.0);
                                transition: .5s;
                            }
                        }

                    }

                    .time {
                        padding: 5px;
                        display: flex;
                        align-items: center;
                        height: 100%;
                        font-size: 12px;

                        .current-time {
                            margin-left: 10px;
                            margin-right: 5px;


                        }

                        .total-time {
                            margin-left: 5px;

                        }
                    }

                    .controller {
                        padding: 7px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        font-size: 14px;
                        width: 70px;
                        height: 100%;
                        padding-top: 11px;
                        margin-left: 15px;
                        

                        .priview {
                            &:hover {
                                cursor: pointer;
                                color: rgba($color: teal, $alpha: 1.0);
                                transition: .5s;
                            }
                        }

                        .play-and-stop {
                            &:hover {
                                cursor: pointer;
                                color: rgba($color: teal, $alpha: 1.0);
                                transition: .5s;
                            }
                        }

                        .next {
                            &:hover {
                                cursor: pointer;
                                color: rgba($color: teal, $alpha: 1.0);
                                transition: .5s;
                            }
                        }

                    }

                    .data-music {
                        height: 100%;
                        padding: 7px;
                        color: white;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        .name-music {
                            font-size: 14px;
                            margin-left: 10px;
                            font-weight: 700;

                            &:hover {
                                cursor: pointer;
                                color: rgba($color: teal, $alpha: 1.0);
                                transition: .5s;
                            }

                        }

                        .name-avtor {
                            // text-transform: uppercase;
                            font-size: 12px;
                            margin-left: 10px;

                            &:hover {
                                cursor: pointer;
                                color: rgba($color: teal, $alpha: 1.0);
                                transition: .5s;
                            }
                        }
                    }
                }
            }

            .progress-audio {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 50%;
                margin-left: 10px;

                input[type="range"] {
                    -webkit-appearance: none;
                    appearance: none;
                    background: transparent;
                    cursor: pointer;
                    width: 100%;

                }

                input[type="range"]::-webkit-slider-runnable-track {
                    background: #212121;
                    height: 3.5px;
                }

                input[type="range"]::-moz-range-track {
                    background: #000000;
                    height: 3.5px;
                }

                input[type="range"]::-webkit-slider-thumb {
                    // margin-top = (высота дорожки / 2) - (высота ползунка / 2)
                    -webkit-appearance: none; /* Override default look */
                    appearance: none;
                    margin-top: -3.5px; /* Centers thumb on the track */
                    background-color: #111;
                    height: 10px;
                    width: 10px;    
                    border-radius: 50%;

                    &:hover {
                        background-color: teal;
                    }

                }

                input[type="range"]::-moz-range-thumb {
                    border: none; /*Removes extra border that FF applies*/
                    border-radius: 0; /*Removes default border-radius that FF applies*/
                    background-color: #111;
                    height: 2rem;
                    width: 1rem;
                }
            }

            .toggle-line-tools {
                position: absolute;
                width: 100%;
                height: 50px;
                background-color: rgba($color: #000000, $alpha: .8);
                // bottom: 0;
                display: flex;
                align-items: center;
                color: white;


                .icon {
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    // border: 1px solid #333;
                    border-right: none;
                    padding: 5px 10px;
                    width: 5%;
                    
                    i {
                        color: white;
                        margin-top: 4px;
                    }
                }

                input {
                    width: 90%;
                    height: 100%;
                    background: none;
                    padding: 8px;
                    border: none;
                    outline: none;
                    // border-bottom: 1px solid #333;
                    border-right: none;
                    border-left: none;
                    color:white;
                    // margin-left: 15px;
                }

                .close-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 5px 10px 0 0;
                    height: 100%;
                    // border: 1px solid #333;
                    border-left: none;
                    font-size: 12px;
                    width: 5%;

                    &:hover {
                        cursor: pointer;
                        color: rgba($color: teal, $alpha: 1.0);
                        transition: .5s;
                    }

                }

            }
        }

        .list-audio {
            width: 100%;
            height: 100%;
            background-color: rgba($color: #000000, $alpha: .8);
            overflow: auto;
            display: flex;
            flex-direction: column;
            padding-bottom: 100px;

            .item-audio {
                width: 100%;
                color: white;
                display: flex;
                align-items: center;
                // margin-top: 8px;
                padding: 5px;
                position: relative;

                .inner-item {
                    z-index: -1;
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background-color: rgba($color: #272727, $alpha: .5);
                    display: none;
                    align-items: center;
                    padding-left: 8px;
                    border-radius: 5px;

                    .tools-item {
                        margin-left: auto;
                        margin-right: 80px;
                        width: 100px;
                        height: 50px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        // background-color: rgba($color: #000000, $alpha: .5);
                        border-radius: 10px;
                        z-index: -1;

                        .add-audio {
                            width: 50%;
                            height: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            // background-color: red;
                            color: white;
                            border-right: 1px solid #333;

                            i {
                                margin-top: 4px;

                                &:hover {
                                    transition: .3s;
                                    cursor: pointer;
                                    color: rgba($color: #00fff2, $alpha: 1.0);
                                }
                            }
                        }

                        .sett-audio {
                            width: 50%;
                            height: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            // background-color: yellow;
                            color: white;
                            
                            i {
                                margin-top: 4px;

                                &:hover {
                                    transition: .3s;
                                    cursor: pointer;
                                    color: rgba($color: #00fff2, $alpha: 1.0);
                                }
                            }
                        }
                    }

                    .inner-image-audio {
                        position: relative;
                        z-index: 2;
                        display: flex;
                        align-items: center;
                        width: 45px;
                        height: 45px;
                        // background-color: red;
                        border-radius: 5px;

                        .image-src {
                            width: 45px;
                            height: 45px;
                            position: absolute;
                            margin: 0;
                            top: 50%;
                            left: 50%;
                            margin-right: -50%;
                            transform: translate(-50%, -50%);      
                            
                            display: flex;
                            align-items: center;
                            justify-content: center;

                            background-color: rgba($color: #000000, $alpha: .5);
                            border-radius: 10px;

                            i {
                                &:hover {
                                    transition: .3s;
                                    color: rgba($color: #00fff2, $alpha: 1.0);
                                    cursor: pointer;
                                }
                            }
                        }
                    }
                }

                .time-audio {
                    z-index: 0;

                    margin-left: auto;
                    margin-right: 10px;
                }
                .data-audio {
                    margin-left: 20px;
                    z-index: 2;


                    .name-artist {
                        font-size: 12px;

                        &:hover {
                            transition: .3s;
                            color: rgba($color: #00fff2, $alpha: 1.0);
                            cursor: pointer;
                        }
                    }

                    .name-audio {
                        &:hover {
                            transition: .3s;
                            color: rgba($color: #00fff2, $alpha: 1.0);
                            cursor: pointer;
                        }
                    }
                }

                .image-audio {
                    position: relative;
                    z-index: 0;
                    display: flex;
                    align-items: center;
                    padding-left: 8px;


                    .box-show {
                        width: 45px;
                        height: 45px;
                        position: absolute;
                        margin: 0;
                        top: 50%;
                        left: 50%;
                        margin-right: -50%;
                        transform: translate(-50%, -50%);      
                        
                        display: flex;
                        align-items: center;
                        justify-content: center;

                        background-color: rgba($color: #000000, $alpha: .5);
                        border-radius: 10px;

                        i {
    
                        }
                    }
                    

                    img {
                        width: 45px;
                        height: 45px;
                        border-radius: 10px;

                    }
                }

                .image-audio:hover::after {
                    opacity: 1; /* Полная видимость */
                    // bottom: 0;
                }
            }

        }
    }
}

.anim-fade-effect-enter-active,
.anim-fade-effect-leave-active {
  transition: opacity .3s ease;
}

.anim-fade-effect-enter-from,
.anim-fade-effect-leave-to {
  opacity: 0;
}

.audiolist-enter-active {
  animation: audiolist-in .4s ease-out both;
}

.audiolist-leave-active {
  animation: audiolist-in .4s reverse ease-in both;
}

@keyframes audiolist-in {
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