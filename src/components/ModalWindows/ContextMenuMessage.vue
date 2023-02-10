<template>
    <div class="lclass-context-menu">
        <div class="inner">
            <div class="item">select</div>
            <div class="item">copy text</div>
            <div class="item">answer</div>
            <div class="item">delete</div>
            <div class="item">save</div>
            <div class="item">edit</div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            listItemsContextMenu: [
                {id: 0, text: 'select', vl: 'select'}
            ]
        }
    },
}
</script>
<style lang="scss" scoped>

.lclass-context-menu {
    width: 150px;
    height: auto;
    background: rgba($color: #090909, $alpha: 1.0);
    position: absolute;

    .inner {
        width: 100%;
        height: 100%;
        padding: 5px;
        display: flex;
        flex-direction: column;

        .item {
            padding: 8px;
            color: #999;
            text-transform: uppercase;
            font-size: 13px;
            font-weight: 500;
            font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
            width: 100%;
            display: flex;
            align-items: center;
            // justify-content: center;

            &:hover {
                cursor: pointer;
                opacity: .5;
                transition: .3s;
            }
        }
    }
}

</style>