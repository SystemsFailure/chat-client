<template>

    <div class="search-users">
        <input type="text" placeholder="search" class="inp-search" id="search_e" v-bind:value="modelValue" @input="updateInput">
    </div>

</template>

<script>

export default {
    props: {
        modelValue: [String, Number]
    },

    methods: {
        updateInput(event) {
            this.$emit('update:modelValue', event.target.value)
        }
    }
}

</script>

<style scoped lang="scss">
$color-back: rgba(0, 0, 0, 0.4);
$color-back-blue: rgba(12, 22, 44, 0.7);
$color-text: #4e5f7d;
.search-users {
    width: 25%;
    height: 40px;
    align-items: center;
    justify-content: center;
    // background:blueviolet;

    background: rgba(10, 10, 10, 0.65);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(4.2px);
    -webkit-backdrop-filter: blur(4.2px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    position: fixed;
    z-index: 1;


    .inp-search {
        width: 100%;
        height: 40px;
        padding: 10px;
        border: none;
        background: rgba(10, 10, 10, 0);
        color: $color-text;
        outline: none;

        font-family: Lato,sans-serif;
        font-weight: bold;
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: .02em;

    }
}
</style>