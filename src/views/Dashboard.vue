<template>
  <div class="dashboard-container">
    <h2>Welcome, {{ userProfile.userName }}!</h2>
    <router-link to="game">Start a New Game</router-link>
  </div>
</template>

<script>
import { mapState } from "vuex"
// const fbase = require("../firebaseConfig")

export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapState(["userProfile"])
  },
  methods: {

  }
}
</script>