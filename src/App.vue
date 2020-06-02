<template>
  <div id="app">
    <div id="nav">
      <Navigation v-if="currentUser"/>
    </div>
    <b-container>
      <router-view/>
    </b-container>
  </div>
</template>

<script>
import { mapState } from "vuex"
import Navigation from "@/components/Navigation.vue"
export default {
  components: {
    Navigation
  },
  computed: {
    ...mapState(["currentUser"])
  }
}
</script>
