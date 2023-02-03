<template>
    <div class="main-unix-music-sys">
        <audio v-for="it in listAudios" :key="it.id" :src="it.url" class="audioListUnix" :id="it.id + '-unix'"></audio>
        <div class="inner">
            <div class="controller">
                <div class="priview"><i class="fi fi-bs-angle-double-left"></i></div>
                <div class="play-and-stop">
                    <img src="@/assets/svgassets/icons8-воспроизведение-50.png" v-if="showBtnPlay" class="fi fi-bs-play" @click="PlayerplaySong">
                    <img src="@/assets/svgassets/icons8-пауза-60.png" v-else  @click="stopAudio">
                </div>
                <div class="next"><i class="fi fi-bs-angle-double-right"></i></div>
            </div>
            <div class="data-container">

                <div class="wrapper-container-for-input">
                    <div class="abs-progress" id="audioPlayerContainer_unix"></div>
                    <input type="range" id="progress-id" @input="setCurrTime" @change="setCurrTimeToUnixPlayer" value="0">
                </div>

                <div class="btn-expand">
                    <img src="@/assets/svgassets/icons8-down-arrow-64.png" alt="" srcset="">
                </div>


            </div>

        </div>
        <div class="hide-side-unix">
                <span id="name-songs-id">Keep for you</span>
                <span id="name-artist-id">Comele Francline</span>

            <!-- <div class="tools">
                <div class="add"><i class="fi fi-bs-plus"></i></div>
                <div class="mix"><i class="fi fi-bs-shuffle"></i></div>
                <div class="repeat"><i class="fi fi-bs-arrows-repeat-1"></i></div>
                <div class="share"><i class="fi fi-bs-redo"></i></div>
            </div> -->
            <span id="current-time-id"></span>
            <span id="total-time"></span>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
let name = document.getElementById('name-songs-id');
let artist = document.getElementById('name-artist-id');
let progress = document.getElementById('progress-id');
let currentTime = document.getElementById('current-time-id');
let totalTime = document.getElementById('total-time');

export default {
    data() {
        return {
            listAudios: []
        }
    },
    mounted() {
        console.log(name, artist, progress, currentTime, totalTime, document.getElementById('current-time-id'))
        this.setTimeContainer(document.getElementById('current-time-id'))
        this.setInput(document.getElementById('progress-id'))
        this.setCurrentTimeElement(document.getElementById('total-time'))
        this.setProgressInline(document.getElementById('audioPlayerContainer_unix'))
    },
    watch: {
        isArray: {
            handler(newArray) {
                console.log(newArray, 'newValue')
                if(!this.returnAudioElementId) {console.log('audio id is null'); return;}
                new Promise((resolve) => {
                    this.listAudios = newArray
                    resolve()
                }).then(() => {
                    let audio = document.getElementById(this.returnAudioElementId + '-unix')
                    this.playMusicUnix(audio)
                    this.displayAudioDurationUnix()
                    this.setSliderMaxUnix()
                    let listAudio = document.getElementsByClassName('audioListUnix')
                    for (let index = 0; index < listAudio.length; index++) {
                        const element = listAudio[index]
                        if(element.id != audio.id)
                        {
                            element.pause()
                        }
                    }
                })
            },
            root: true,
        }
    },
    computed: {
        ...mapState('player', {
            showBtnPlay: 'showBtnPlay',
            isArray: 'isArray',
        }),
        ...mapGetters('player', {
            returnAudioElementId: 'returnAudioElementId',
        })
    },
    methods: {
        ...mapMutations('player', {
            setCurrentTimeElement: 'setCurrentTimeElement', setProgressInline: 'setProgressInline',
            setInput: 'setInput',
            setTimeContainer: 'setTimeContainer',
            setSliderMaxUnix: 'setSliderMaxUnix',
        }),
        ...mapActions('player', {
            setCurrentTimeUnix: 'setCurrentTimeUnix',
            setCurrentTimeToAudio: 'setCurrentTimeToAudio',
            playMusicUnix: 'playMusicUnix',
            stopAudio: 'stopAudio',
            displayAudioDurationUnix: 'displayAudioDurationUnix',
        }),
        setCurrTimeToUnixPlayer() {
            this.setCurrentTimeToAudio()
        },
        setCurrTime() {
            this.setCurrentTimeUnix()
        }
    }
}
</script>
<style lang="scss" scoped>

.main-unix-music-sys {
    width: 100%;
    height: 97%;
    background-color: rgba($color: #000000, $alpha: 1.0);
    // padding:5px;
    color: white;
    font-size: 12px;
    margin-left: auto;
    position: relative;

    .hide-side-unix {
        position: absolute;
        width: 100%;
        height: 40px;
        background-color: #151515;
        padding: 5px;
        display: flex;
        align-items: center;


        #name-songs-id {
            font-size: 13px;
            margin-left: 10px;
            width: 80px;

            &:hover {
                cursor: pointer;
                color: turquoise;
                transition: .3s;
            }
        }

        #name-artist-id {
            font-size: 11px;
            color:#555;
            // margin-left: 10px;
            &:hover {
                cursor: pointer;
                color: turquoise;
                transition: .3s;
            }
        }

        #current-time-id {
            margin-left: 20px;
            margin-right: 2px;
        }

        #total-time {
            margin-left: 2px;
            margin-right: 20px;
        }
    }

    .inner {
        padding: 5px;
        width:100%;
        height: 100%;
        display: flex;
        align-items: center;

        // .tools {
        //     display: flex;
        //     height: 100%;
        //     align-items: center;
        //     justify-content: space-between;
        //     padding-top: 4px;
        //     margin-left: auto;
        // }
    
        .data-container {
            width: 90%;
            height: 100%;
            margin-left: 10px;
            display: flex;
            align-items: center;

            .btn-expand {
                width: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-left: auto;

                img {
                    width: 12px;
                    height: 12px;

                    &:hover {
                        cursor: pointer;
                        opacity: .5;
                        transition: .3s;
                    }
                }
            }

            .wrapper-container-for-input {
                display: flex;
                align-items: center;
                width: 90%;
                margin-left: 10px;
                height: 3.5px;
                position: relative;


                .abs-progress {
                    position: absolute;
                    width: 0%;
                    height: 3px;
                    background-color: rgba($color: #00fff2, $alpha: 1);
                }

                #progress-id {
                    width: 100%;
                    position: absolute;
                }

                input[type="range"] {
                    -webkit-appearance: none;
                    appearance: none;
                    background: transparent;
                    cursor: pointer;
                    width: 100%;
                    z-index: 11;
                }
    
                input[type="range"]::-webkit-slider-runnable-track {
                    background: rgba($color: #212121, $alpha: .8);
                    height: 3px;
    
                }
    
                input[type="range"]::-moz-range-track {
                    background: #000000;
                    height: 3px;
                }
    
                input[type="range"]::-webkit-slider-thumb {
                    // margin-top = (высота дорожки / 2) - (высота ползунка / 2)
                    -webkit-appearance: none; /* Override default look */
                    appearance: none;
                    margin-top: -3px; /* Centers thumb on the track */
                    background-color: #111;
                    height: 9px;
                    width: 9px;    
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
        }

        .controller {
            width: 70px;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-left: 10px;

            .play-and-stop {

                img {
                    width: 16px;
                    height:16px;

                    &:hover {
                        cursor: pointer;
                        opacity: .7;
                        transition: .3s;
                    }
                }
            }

            .priview {
                &:hover {
                        cursor: pointer;
                        color: turquoise;
                        transition: .3s;
                    }
            }

            .next {
                &:hover {
                        cursor: pointer;
                        color: turquoise;
                        transition: .3s;
                    }
            }
        }
    }
}

</style>