<template>
    <div class="main-class-view-photo-window">
        <div class="btn-container" @click="() => {this.$emit('closeWindowFunction', false)}"><div><i class="fi fi-ss-cross"></i></div></div>
        <div class="wrap-wrapper-cont">
            <div class="wrapper-continer">
                <img :src="imageURL ? imageURL : null" alt="">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
    props: {
        imageURL: {}
    }
}
</script>
<style lang="scss" scoped>

.main-class-view-photo-window {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000000, $alpha: .8);
    margin: 0;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    position: absolute;
    z-index: 12;
    // display: flex;
    // align-items: center;
    // justify-content: center;

    .btn-container {
        position: absolute;
        margin-left: auto;
        color: white;
        // background-color: red;
        right: 0;
        font-size: 12px;
        margin-right: 10px;
        margin-top: 10px;

        &:hover {
            cursor: pointer;
            opacity: .7;
        }

    }
    .wrap-wrapper-cont {
        width: 100%;
        height: 100%;
        z-index: 12;
        display: flex;
        align-items: center;
        justify-content: center;


        .wrapper-continer {
            width: 800px;
            height: 95%;
            background-color: rgba($color: #000000, $alpha: 1);

            img {
                width: 100%;
                height: 100%;
                // max-width: 800px;
                // max-height: 600px;
                border: 1px solid #333;
            }
        }
    }

}

</style>