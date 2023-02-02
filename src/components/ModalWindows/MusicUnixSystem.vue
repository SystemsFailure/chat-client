<template>
    <div class="main-unix-music-sys">
        <div class="inner">
            <div class="controller">
                <div class="priview"><i class="fi fi-bs-angle-double-left"></i></div>
                <div class="play-and-stop">
                    <i v-if="showBtnPlay" class="fi fi-bs-play" @click="PlayerplaySong"></i>
                    <i v-else class="fi fi-bs-pause" @click="PlayerStopSong"></i>
                </div>
                <div class="next"><i class="fi fi-bs-angle-double-right"></i></div>
            </div>
            <div class="data-container">
                <span id="name-songs-id">Keep for you</span>
                <span id="name-artist-id">Comele Francline</span>

                <div class="wrapper-container-for-input">
                    <div class="abs-progress" id="audioPlayerContainer_unix"></div>
                    <input type="range" id="progress-id" @input="setCurrTime" @change="setCurrTimeToUnixPlayer" value="0">
                </div>

                <span id="current-time-id">00:00</span>
                /
                <span id="total-time">00:00</span>
            </div>
            <div class="tools">
                <div class="add"><i class="fi fi-bs-plus"></i></div>
                <div class="mix"><i class="fi fi-bs-shuffle"></i></div>
                <div class="repeat"><i class="fi fi-bs-arrows-repeat-1"></i></div>
                <div class="share"><i class="fi fi-bs-redo"></i></div>
            </div>
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
            showBtnPlay: true,
        }
    },
    mounted() {
        console.log(name, artist, progress, currentTime, totalTime, document.getElementById('current-time-id'))
        this.setTimeContainer(document.getElementById('current-time-id'))
        this.setInput(document.getElementById('progress-id'))
        this.setCurrentTimeElement(document.getElementById('total-time'))
        this.setProgressInline(document.getElementById('audioPlayerContainer_unix'))
    },
    computed: {
        ...mapState('player', {

        }),
        ...mapGetters('player', {

        })
    },
    methods: {
        ...mapMutations('player', {
            setCurrentTimeElement: 'setCurrentTimeElement', setProgressInline: 'setProgressInline',
            setInput: 'setInput',
            setTimeContainer: 'setTimeContainer',
        }),
        ...mapActions('player', {
            setCurrentTimeUnix: 'setCurrentTimeUnix',
            setCurrentTimeToAudio: 'setCurrentTimeToAudio',
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
    padding:5px;
    color: white;
    font-size: 12px;
    margin-left: auto;

    .inner {
        padding: 5px;
        width:115%;
        height: 100%;
        display: flex;
        align-items: center;

        .tools {
            display: flex;
            width: 150px;
            height: 100%;
            align-items: center;
            justify-content: space-between;
            padding-top: 4px;
            margin-left: auto;
        }
    
        .data-container {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;

            .wrapper-container-for-input {
                display: flex;
                align-items: center;
                // justify-content: center;
                width: 100%;
                // margin-left: 10px;
                height: 3.5px;
                position: relative;
                .abs-progress {
                    position: absolute;
                    width: 100%;
                    height: 3.5px;
                    background-color: rgba($color: #00fff2, $alpha: 1);
                }

                #progress-id {
                    width: 100%;
                    position: absolute;
                    margin-left: 10px;
                    // padding-top: 3px;
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
    
                #name-songs-id {
                    font-size: 13px;
                    margin-left: 10px;
                    width: 100px;
    
                    &:hover {
                        cursor: pointer;
                        color: turquoise;
                        transition: .3s;
                    }
                }
    
                #name-artist-id {
                    font-size: 11px;
                    color:#555;
                    margin-left: 0px;
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


        }

        .controller {
            width: 80px;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }
}

</style>