<template>
  <div class="game-container">
    <b-row>
      <b-col cols="4">
        <p>Active player: {{ currentGame.activePlayerID }}</p>
        <GameStatus
          :userOneCoins="currentGame.ownerScore"
          :userTwoCoins="currentGame.opponentScore"
          :ownerUserName="currentGame.ownerUserName"
          :opponent="currentGame.opponent"
          :endTurn="endTurn"
          :isUsersTurn="isUsersTurn"
        />
      </b-col>
      <b-col cols="8">
        <GameBoard
          :isSlotFilled="coinSlotArray"
          :rollDie="rollDie"
          :rollResult="rollResult"
          :isUsersTurn="isUsersTurn"
          :opponent="opponentUserName"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState } from "vuex"

const fbase = require("../firebaseConfig")

import GameStatus from "@/components/GameStatus.vue"
import GameBoard from "@/components/GameBoard.vue"

export default {
  data() {
    return {
      // isSlotFilled: [false, false, false, false, false],
      rollResult: 0,
      isUsersTurn: null,
      currentGameID: this.$route.params.id,
      // coinSlotArray: this.currentGame.isSlotFilled.split(",")
      // opponent: this.opponentUserName()
    }
  },
  components: {
    GameStatus, 
    GameBoard
  },
  computed: {
    ...mapState([
      "userProfile",
      "currentUser",
      "currentGame",
      "activePlayerID"
    ]),
    opponentUserName() {
      if(this.currentGame.ownerID === this.currentUser.uid) {
        return this.currentGame.opponent
      } 
      
      return this.currentGame.ownerUserName
    },
    checkOwnerScore() {
      return this.currentGame.ownerScore
    },
    checkOpponentScore() {
      return this.currentGame.opponentScore
    },
    checkActivePlayer() {
      return this.currentGame.activePlayerID
    },
    checkIsSlotFilled() {
      return this.currentGame.isSlotFilled
    },
    coinSlotArray: function() {
      return this.currentGame.isSlotFilled.split(",")
    }
  },
  created() {
    if(this.currentGame.activePlayerID === this.currentUser.uid) {
      this.isUsersTurn = true
    } else {
      this.isUsersTurn = false
    }
  },
  watch: {
    checkActivePlayer(newVal, oldVal) {
      if(newVal === this.currentUser.uid) {
        this.isUsersTurn = true
      } else {
        this.isUsersTurn = false
      }

      fbase.gameCollection.doc(window.localStorage.getItem("currentGameID")).update({
        activePlayerID: newVal 
      }).then(() => {
        console.log("Active player changed from " + oldVal + " to " + newVal);
      }).catch((err) => {
        console.log(err);
      })
    },
    checkIsSlotFilled(newVal) {
      console.log("Watcher: " + newVal);
      
      fbase.gameCollection.doc(window.localStorage.getItem("currentGameID")).update({
        isSlotFilled: newVal 
      }).then(() => {
        console.log("slots updated to firebase");
      }).catch((err) => {
        console.log(err);
      })
    },
    checkOwnerScore(newVal) {
      fbase.gameCollection.doc(window.localStorage.getItem("currentGameID")).update({
        ownerScore: newVal 
      }).then(() => {
        console.log("Owner's score updated");
      }).catch((err) => {
        console.log(err);
      })
    },
    checkOpponentScore(newVal) {
      fbase.gameCollection.doc(window.localStorage.getItem("currentGameID")).update({
        opponentScore: newVal 
      })
      .then(() => {
        console.log("Opponent's score updated");
      }).catch((err) => {
        console.log(err);
      })
    },
  },
  methods: {
    rollDie() {
      let rollResult = Math.floor((Math.random() * 6) + 1)
      this.rollResult = rollResult
      console.log(rollResult);
      let rollIndex = rollResult - 1
      this.updateScore(rollIndex)
    },
    updateScore(rollIndex) {
      let scoreChange = 0
      let coinSlotArray = this.currentGame.isSlotFilled.split(",")

      if(coinSlotArray[rollIndex] === "false" && rollIndex < 5) {

        coinSlotArray[rollIndex] = "true"
        scoreChange--
        
      } else if(coinSlotArray[rollIndex] === "true" && rollIndex < 5) {
        
        coinSlotArray.forEach((element) => {
          if(element === "true") {
            scoreChange++
          }
        })

        coinSlotArray=["false", "false", "false", "false", "false"]
        
        // this.endTurn()
      } else {
        scoreChange--
      }

      this.$store.commit("setIsSlotFilled", coinSlotArray.toString())
      
      if (this.currentGame.ownerID === this.currentUser.uid) {
        this.$store.commit("incrementOwnerScore", scoreChange)
      } 
      else {
        this.$store.commit("incrementOpponentScore", scoreChange)
      } 
    },
    endTurn() {
      if (this.currentUser.uid === this.currentGame.ownerID) {
        this.$store.commit("setActivePlayerID", this.currentGame.opponentID)
      } else {
        this.$store.commit("setActivePlayerID", this.currentGame.ownerID)
      }
    },
    // updateGameFieldInFirestore(field, value) {
    //   fbase.gameCollection.doc(window.localStorage.getItem("currentGameID")).update({
    //     field: value 
    //   }).then(() => {
    //     this.$store.dispatch("fetchCurrentGame")
    //   })
    // }
  },
}
</script>