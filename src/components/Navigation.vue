<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">Coin Drop</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item><router-link to="/">Dashboard</router-link></b-nav-item>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="">
              <router-link to="/settings">Settings</router-link>
            </b-dropdown-item>
            <b-dropdown-item href="">
              <router-link to="/login">Login</router-link>
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
const fbase = require("../firebaseConfig")

export default {
  methods: {
    logOut() {
      fbase.auth.signOut().then(
        console.log("Signed Out")        
      ).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>