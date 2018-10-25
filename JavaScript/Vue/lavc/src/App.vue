<template>
  <div id="app">
    <router-view></router-view>
    <Tab></Tab>
  </div>
</template>

<script>
import Tab from "./base/Tab.vue";

export default {
  name: 'App',
  components: {
    Tab
  }
}
</script>

<style>

</style>
