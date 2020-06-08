<template>
  <div class="dashboard-container">
    <h2>Welcome, {{ userProfile.userName }}!</h2>
    <!-- <router-link to="game">Start a New Game</router-link> -->
    <b-button v-if="!gameInitiated" @click="createGame" variant="info">
      Start a New Game
    </b-button>
    <b-list-group>
      <b-list-group-item
        v-for="(game, index) in games"
        :key="index"
        :id="game.id"
      >
      <h3>{{games[index].ownerUserName}}</h3>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { mapState } from "vuex"
const fbase = require("../firebaseConfig")

export default {
  data() {
    return {
      gameInitiated: false
    }
  },
  computed: {
    ...mapState(["userProfile", "currentUser", "games"])
  },
  methods: {
    createGame() {
      fbase.gameCollection.doc().set({
        createdOn: new Date(),
        ownerID: this.currentUser.uid,
        ownerUserName: this.userProfile.userName,
        opponent: "",
        ownerScore: 10,
        opponentScore: 10,
        isOpen: true
      }).then(() => {
        console.log("game created")  
        this.toggleGameInitiated()     
      }).catch(err => {
        console.log(err);
      })
    },
    toggleGameInitiated() {
      this.gameInitiated = !this.gameInitiated
    }
  }
}
</script>