<template>
    <div class="main-AudioComp">
        <div class="inner-container-deep">

            <div class="line-comp">
                <span style="color: #fff;">Trecks</span>
            </div>

            <div class="list-audio">

                <transition-group name="audiolist">
                    <div class="item-audio" v-for="audio in audioList" :key="audio.id">
                        <div class="image-audio" @mouseover="showPlayFunc(audio.id)">
                            <img src="@/assets/875016.jpg" alt="" srcset="">
                            <Transition name="anim-fade-effect">
                                <div v-if="showPlay && audio.id === currentAudio" class="box-show" @mouseleave="() => {this.showPlay = false}">
                                    <i v-if="showPlayBtn && audio.id === currentAudio" class="fi fi-ss-play" @click="() => {this.showPlayBtn = false; this.currCount=audio.id}"></i>
                                    <i v-if="!showPlayBtn" class="fi fi-ss-pause" @click="() => {this.showPlayBtn = true; this.currCount = null}"></i>
                                </div>
                            </Transition>
    
                        </div>
                        <div class="data-audio">
                            <div class="name-audio">Свой дом</div>
                            <div class="name-artist"><span>Макс Корж</span></div>
                        </div>
                        <div class="time-audio"><span>03:46</span></div>
                    </div>
                </transition-group>

            </div>

        </div>    
    </div>
</template>
<script>
export default {
    data() {
        return {
            showPlay: false,
            currentAudio: 0,
            currCount: null,
            showPlayBtn: true,
            audioList: [
                {id: 1, url: 'http/proxy/audio-element.mp3', name: 'life-cycle', img_url: 'http://photo.png'},
                {id: 2, url: 'http/proxy/audio-element.mp3', name: 'life-cycle', img_url: 'http://photo.png'},
                {id: 3, url: 'http/proxy/audio-element.mp3', name: 'life-cycle', img_url: 'http://photo.png'},
                {id: 4, url: 'http/proxy/audio-element.mp3', name: 'life-cycle', img_url: 'http://photo.png'},
                {id: 5, url: 'http/proxy/audio-element.mp3', name: 'life-cycle', img_url: 'http://photo.png'},
                {id: 6, url: 'http/proxy/audio-element.mp3', name: 'life-cycle', img_url: 'http://photo.png'},
                {id: 7, url: 'http/proxy/audio-element.mp3', name: 'life-cycle', img_url: 'http://photo.png'},
                {id: 8, url: 'http/proxy/audio-element.mp3', name: 'life-cycle', img_url: 'http://photo.png'},
                {id: 9, url: 'http/proxy/audio-element.mp3', name: 'life-cycle', img_url: 'http://photo.png'},
                {id: 10, url: 'http/proxy/audio-element.mp3', name: 'life-cycle', img_url: 'http://photo.png'},
                {id: 11, url: 'http/proxy/audio-element.mp3', name: 'life-cycle', img_url: 'http://photo.png'},
                {id: 12, url: 'http/proxy/audio-element.mp3', name: 'life-cycle', img_url: 'http://photo.png'},
                {id: 13, url: 'http/proxy/audio-element.mp3', name: 'life-cycle', img_url: 'http://photo.png'},
                {id: 14, url: 'http/proxy/audio-element.mp3', name: 'life-cycle', img_url: 'http://photo.png'},
            ]
        }
    },
    methods: {
        showPlayFunc(id) {
            if(this.currCount === null) {
                this.currentAudio = id
                this.showPlay = true
            } else {
                if (this.currCount === id) {
                    this.showPlay = true
                } else {
                    this.showPlay = false
                }
            }
        }
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
    background-color: rgba($color: #000000, $alpha: .8);
    // padding: 20px;
    .inner-container-deep {
        width: 100%;
        height: 100%;
        background: rgba($color: #000000, $alpha: .8);
        z-index: 1000;
        padding: 10px;
        .list-audio {
            width: 100%;
            height: 100%;
            background-color: rgba($color: #000000, $alpha: .8);
            overflow: auto;


            .item-audio {
                width: 100%;
                background-color: rgba($color: #121212, $alpha: .3);
                color: white;
                display: flex;
                align-items: center;
                margin-top: 5px;
                border: 1px solid #222;
                padding: 5px;

                &:hover {
                    cursor: pointer;
                    background-color: rgba($color: #00c19e, $alpha: 1);
                    transition: .5s;
                }

                .time-audio {
                    margin-left: auto;
                    margin-right: 10px;
                }
                .data-audio {
                    margin-left: 20px;

                    .name-artist {

                    }

                    .name-audio {

                    }
                }

                .image-audio {
                    position: relative;

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