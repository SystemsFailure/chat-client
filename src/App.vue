<template>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {

    }
  },

  components: {
  },
}
</script>

<style>

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}


body {
  background-image: url(./assets/RedSpringSpirit.jpeg);
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;

  overflow-y: hidden;
  overflow-x: hidden;
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;

}

::-webkit-scrollbar-track {
  -webkit-box-shadow: 5px 5px 5px -5px rgba(34, 60, 80, 0.2) inset;
  background-color: #1b1b1b;


}

::-webkit-scrollbar-thumb {
  background-color: hsl(0, 0%, 20%);
  background-image: -webkit-gradient(linear, 0 0, 0 100%,
  /* color-stop(.5, rgba(255, 255, 255, .25)), */
  color-stop(.5, transparent), to(transparent));
  border-radius: 15%;

}
</style>
