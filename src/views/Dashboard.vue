<template>
  <div class="dashboard-container">
    <h2>Welcome, {{ userProfile.userName }}!</h2>
    <h4>Start a new game or join an existing game by selecting one of the open games below.</h4>

    <b-button 
      v-if="!gameInitiated" 
      @click="createGame" 
      variant="info"
    >
      Start a New Game
    </b-button>

    <b-button
      v-if="gameInitiated"
      :to="`/game/${usersGame.id}`"
      variant="info"
      @click="startUsersGame"
    >
      Go to my game
    </b-button>

    <b-button
      v-if="userProfile.currentGameID !== ''"
      :to="`/game/${userProfile.currentGameID}`"
      variant="info"
    >
      Go to {{ currentGame.ownerUserName }}'s game
    </b-button>

    <b-list-group>
      <b-list-group-item 
        class="flex-column align-items-start"
        v-for="(game, index) in games"
        :key="index"
        :id="game.id"
        @click="joinGame(index)"
        :to="`/game/${game.id}`"
      >
        <div class="d-flex w-100 justify-content-between">
          <h6 class="mb-1">Join {{games[index].ownerUserName}}'s game!</h6>
          <small class="text-muted">Posted 5 days ago</small>
        </div>
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
    ...mapState(["userProfile", "currentUser", "games", "usersGame", "currentGame"])
  },
  methods: {
    createGame() {
      fbase.gameCollection.doc().set({
        createdOn: new Date(),
        ownerID: this.currentUser.uid,
        ownerUserName: this.userProfile.userName,
        opponent: "",
        opponentID: "",
        ownerScore: 10,
        opponentScore: 10,
        activePlayerID: this.currentUser.uid,
        isOpen: true,
        isSlotFilled: [false, false, false, false, false]
      }).then(() => {
        console.log("game created")  
      }).catch(err => {
        console.log(err);
      })
    },
    joinGame(index) {
      let currentGame = this.games[index]
      this.$store.commit("setCurrentGame", currentGame)
     
      window.localStorage.setItem("currentGameID", currentGame.id)

      fbase.gameCollection.doc(currentGame.id).update({
        opponent: this.userProfile.userName,
        opponentID: this.currentUser.uid,
        isOpen: false
      }).then(() => {
        this.$store.dispatch("fetchCurrentGame")
      }).catch(err => {
        console.log(err);
      })

      fbase.userCollection.doc(this.currentUser.uid).update({
        currentGameID: currentGame.id
      })

    },
    startUsersGame() {
      let currentGame = this.usersGame

      window.localStorage.setItem("currentGameID", currentGame.id)

      fbase.userCollection.doc(this.currentUser.uid).update({
        currentGameID: currentGame.id
      })

      this.$store.dispatch("fetchCurrentGame")
    }
  },
  mounted () {
    this.$store.dispatch("fetchCurrentGame")
    if (this.usersGame !== {}) {
      this.gameInitiated = true
    } else {
      this.gameInitiated = false
    }
  }
}
</script>