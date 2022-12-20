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
    width: 1000%;
    height: 100vh;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: aquamarine;

    .inner-container-deep {
        width: 70px;
        height: 50px;
        background: deeppink;
        z-index: 1000;
    }
}
</style>