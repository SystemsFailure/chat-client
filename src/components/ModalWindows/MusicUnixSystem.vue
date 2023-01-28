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
                <input type="range" id="progress-id">
                <span id="current-time-id">04:26</span>
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

export default {
    data() {
        return {
            showBtnPlay: true,
        }
    },
    mounted() {
        console.log(name, artist, progress, currentTime)
    },
    computed: {
        ...mapState('player', {

        }),
        ...mapGetters('player', {

        })
    },
    methods: {
        ...mapMutations('player', {

        }),
        ...mapActions('player', {

        })
    }
}
</script>
<style lang="scss" scoped>

.main-unix-music-sys {
    width: 90%;
    height: 97%;
    background-color: rgba($color: #000000, $alpha: 1.0);
    padding:5px;
    color: white;
    font-size: 12px;
    margin-left: auto;

    .inner {
        padding: 5px;
        width:100%;
        height: 100%;
        display: flex;
        align-items: center;

        .tools {
            display: flex;
            width: 120px;
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

                &:hover {
                    cursor: pointer;
                    color: turquoise;
                    transition: .3s;
                }
            }

            #name-artist-id {
                font-size: 11px;
                color:#555;
                margin-left: 10px;
                &:hover {
                    cursor: pointer;
                    color: turquoise;
                    transition: .3s;
                }
            }

            #current-time-id {
                margin-left: auto;
                margin-right: 20px;
            }

            #progress-id {
                width: 55%;
                margin-left: 10px;
                padding-top: 3px;
            }
        }

        .controller {
            width: 60px;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }
}

</style>