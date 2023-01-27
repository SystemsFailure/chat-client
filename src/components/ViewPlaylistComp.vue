<template>
    <div class="main-playlist0view-class">
        <div class="close-btn"><i class="fi fi-bs-cross"></i></div>
        <div class="img-view">
            <img src="@/assets/Tumblr.jpeg" alt="" id="img-view-id">
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
}
</script>
<style lang="scss" scoped>

.main-playlist0view-class {
    position: absolute;
    width: 1200px;
    height: 600px;
    background-color: rgba($color: #000000, $alpha: .8);
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

    .img-view {
        position: absolute;
        width: 100%;
        height: 45%;

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