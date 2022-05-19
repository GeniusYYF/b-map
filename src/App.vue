<template>
  <div id="app">
    <b-header></b-header>
    <router-view />
  </div>
</template>
<script>
import BHeader from "@/components/BHeader";

export default {
  components: { BHeader },
};
</script>
<style lang="scss">
/* @import url(); 引入css类 */
html,
body,
#app {
  width: 1920px;
  height: 1080px;
  overflow: hidden;
  margin: 0px;
  padding: 0px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
