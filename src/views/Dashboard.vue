<template>
  <div class="dashboard-container">
    <h3>Dashboard</h3>
    <p>{{ userProfile.userName }}</p>
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