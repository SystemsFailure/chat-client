<template>
    <div class="main-AudioComp">
        <div class="inner-container-deep"></div>    
    </div>
</template>
<script>
export default {
    
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
    }
}
</style>