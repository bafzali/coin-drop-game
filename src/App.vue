<template>
  <div id="app">
    <div id="nav">
      <Navigation />
    </div>
    <b-container>
      <router-view/>
    </b-container>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue"
export default {
  components: {
    Navigation
  }
}
</script>
