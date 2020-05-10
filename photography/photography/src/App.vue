<template>
  <div id="app">
    <Headers></Headers>
    <router-view/>
  </div>
</template>

<script>
import Headers from "./common/header"

export default {
  name: 'App',
  components: {
    Headers,
  },
  mounted(){
    window.addEventListener("unload",this.saveState)
  },
  methods: {
    saveState(){
      this.$store.commit("setname",window.localStorage.getItem("name"))
    }
  }
}
</script>

<style>
#app{
  height: 100%;
}
</style>
