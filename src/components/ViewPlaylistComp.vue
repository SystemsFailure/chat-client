<template>
    <div class="main-playlist0view-class">
        <div class="close-btn">
            <i class="fi fi-bs-cross" @click="$emit('closeViewPlaylistComp', false)"></i>
            <i class="fi fi-ss-cross" style="color: red;" @click="pauseAudio()"></i>
        </div>
        <div class="img-view">
            <img src="@/assets/Tumblr.jpeg" alt="" id="img-view-id">
            <div class="mix"></div>
        </div>
        <div class="list">
            <div class="it" v-for="it in listSongs" :key="it.id" :id="it.id + '-class'">
                <audio :src="it.url" :id="it.id"></audio>
                <div class="img-box-it">
                    <!-- <img src="@/assets/playlist.png" alt=""> -->
                    <i class="fi fi-bs-play" @click="PlayerplaySong(it.id)"></i>
                </div>
                <div class="inner-content">
                    <span class="name-music">
                        {{ it.name }}
                    </span>
                    <span class="name-artist">{{ it.artist }}</span>
                    <span id="time-duration">03:46</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState, mapActions, mapMutations} from 'vuex'
export default {
    data() {
        return {
            listSongs: [],
        }
    },
    mounted() {
        this.getDataFromPlaylist().then(() => {
            this.listSongs = this.musicsListLV
        })
    },
    methods: {
        ...mapActions('playlist', {
            getDataFromPlaylist: 'getDataFromPlaylist',
        }),
        ...mapActions('player', {
            displayAudioDurationUnix: 'displayAudioDurationUnix',
        }),
        ...mapMutations('player', {
            playMusic: 'playMusic', setSliderMaxUnix: 'setSliderMaxUnix',
            stopAudio: 'stopAudio',
        }),
        PlayerplaySong(id) {
            let audio = document.getElementById(id)
            this.currentAudioElement = audio
            this.playMusic(audio)
            this.displayAudioDurationUnix()
            this.setSliderMaxUnix()
        },
        pauseAudio() {
            this.stopAudio()
        }
    },
    computed: {
        ...mapState('playlist', {
            musicsListLV: 'musicsListLV',
        })
    },
}
</script>
<style lang="scss" scoped>

.main-playlist0view-class {
    position: absolute;
    width: 800px;
    height: 600px;
    background-color: rgba($color: #000000, $alpha: 1);
    margin: 0;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    // padding: 10px;
    z-index: 12;
    border: 1px solid #333;

    font-family: Lato,sans-serif;
    font-weight: 700;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: .02em;

    .list {
        width: 100%;
        height: 100%;
        padding: 5px;
        padding-top: 275px;
        .it {
            width: 100%;
            padding: 10px;
            color: white;
            display: flex;
            align-items: center;
            border-radius: 5px;

            .img-box-it {
                i {
                    font-size: 15px;

                    &:hover {
                        cursor: pointer;
                        opacity: .6;
                    }
                }
            }

            .inner-content {
                display: flex;
                align-items: center;
                margin-left: 10px;
                width: 100%;

                .name-music {

                }

                #time-duration {
                    margin-left: auto;
                    font-size: 9px;
                    color: #555;
                }

                .name-artist {
                    font-size: 9px;
                    margin-left: 10px;
                    color: #555;
                }
            }
        }
    }

    .img-view {
        position: absolute;
        width: 100%;
        height: 45%;
        z-index: 11;
        
        .mix {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: red;
            position: absolute;
            top: 0;
        }

        #img-view-id {
            width:100%;
            height: 100%;

        }

        
    }

    .close-btn {
        position: absolute;
        display: flex;
        align-items: center;
        width: 100%;
        color: white;
        z-index: 15;

        i {
            margin-left: auto;
            margin-top:10px;
            margin-right: 10px;
            &:hover {
                cursor: pointer;
                opacity: 0.8;
                transition: .3s;
            }
        }

    }
}

</style>