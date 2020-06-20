<template>
  <div class="game-container">
    <b-row>
      <b-col cols="4">
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
          :isSlotFilled="currentGame.isSlotFilled"
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
      console.log("Active player changed from " + oldVal + " to " + newVal);

      if(newVal === this.currentUser.uid) {
        this.isUsersTurn = true
      } else {
        this.isUsersTurn = false
      }

      fbase.gameCollection.doc(window.localStorage.getItem("currentGameID")).update({
        activePlayerID: newVal 
      }).then(() => {
        this.$store.dispatch("fetchCurrentGame")
      })
    },
    // checkIsSlotFilled(newVal) {
    //   // console.log(newVal);
      
    //   fbase.gameCollection.doc(window.localStorage.getItem("currentGameID")).update({
    //     isSlotFilled: newVal 
    //   }).then(() => {
    //     this.$store.dispatch("fetchCurrentGame")
    //   })
    //   // this.updateGameFieldInFirestore("isSlotFilled", newVal)
    // },
    checkOwnerScore(newVal) {
      fbase.gameCollection.doc(window.localStorage.getItem("currentGameID")).update({
        ownerScore: newVal 
      }).then(() => {
        this.$store.dispatch("fetchCurrentGame")
      })
    },
    checkOpponentScore(newVal) {
      fbase.gameCollection.doc(window.localStorage.getItem("currentGameID")).update({
        opponentScore: newVal 
      }).then(() => {
        this.$store.dispatch("fetchCurrentGame")
      })
    },
  },
  methods: {
    rollDie() {
      let rollResult = Math.floor((Math.random() * 6) + 1)
      this.rollResult = rollResult
      console.log(rollResult);
      this.updateScore(rollResult)
    },
    updateScore(rollResult) {
      let rollIndex = rollResult - 1
      let scoreChange = 0
      let coinSlotArray = this.currentGame.isSlotFilled
      console.log("Initial Coin Slot Array: " + coinSlotArray);
      

      if(!coinSlotArray[rollIndex] && rollIndex < 5) {
        coinSlotArray[rollIndex] = true
        scoreChange--
        console.log("Modified Coin Slot Array: " + coinSlotArray);
        this.$store.commit("setIsSlotFilled", coinSlotArray)
      } else if(coinSlotArray[rollIndex] && rollIndex < 5) {
        
        coinSlotArray.forEach((element) => {
          if(element) {
            scoreChange++
          }
        })

        coinSlotArray=[false, false, false, false, false]
        this.$store.commit("setIsSlotFilled", coinSlotArray)     

        // this.isUsersTurn = !this.isUsersTurn
      } else {
        scoreChange--
      }
      
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