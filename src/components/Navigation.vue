<template>
  <div class="navigation-container">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="">
        <img src="../../public/img/icons8-stack-of-coins-48.png" alt="">
      </b-navbar-brand>
      <b-navbar-brand href="/">
        Coin Drop
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="/">Dashboard</b-nav-item>
        </b-navbar-nav>
        <!-- Center aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-text center>You have won {{ userProfile.wins }} games out of {{ userProfile.totalGamesPlayed }} played</b-nav-text>

        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="/settings">
              Settings
            </b-dropdown-item>
            <b-dropdown-item @click="logOut">
              Sign Out
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState } from "vuex"
const fbase = require("../firebaseConfig")

export default {
  computed: {
    ...mapState(["userProfile"])
  },
  methods: {
    logOut() {
      fbase.auth.signOut().then(() => {
        this.$store.dispatch("clearData")    
        this.$router.push("/login")    
      }
      ).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>