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
      rollResult: 0,
      isUsersTurn: null,
      currentGameID: this.$route.params.id,
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
    checkActivePlayer() {
      return this.currentGame.activePlayerID
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
    checkActivePlayer(newVal) {
      if(newVal === this.currentUser.uid) {
        this.isUsersTurn = true
      } else {
        this.isUsersTurn = false
      }
    },
  },
  methods: {
    async rollDie() {
      try {
        let rollResult = Math.floor((Math.random() * 6) + 1)
        this.rollResult = rollResult
        console.log(rollResult + " FIRST | roll result");
        let rollIndex = rollResult - 1

        const scoreChange = await this.processRollOutcome(rollIndex)

        console.log(scoreChange + " THIRD | scoreChange set");

        this.processScoreChange(scoreChange)
        
      } catch(error) {
        console.log(error);
      }
    },
    processRollOutcome(rollIndex) {
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
        
      } else {
        scoreChange--
      }
      console.log("SECOND | scoreChange logic complete");

      fbase.gameCollection.doc(window.localStorage.getItem("currentGameID")).update({
        isSlotFilled: coinSlotArray.toString() 
      }).then(() => {
        console.log("slots updated to firebase");
      }).catch((err) => {
        console.log(err);
      })
      
      // this.$store.commit("setIsSlotFilled", coinSlotArray.toString())

      return scoreChange
    },
    processScoreChange(scoreChange) {
      
      if (this.currentGame.ownerID === this.currentUser.uid) {
        console.log("FOURTH | increment owner score");
        fbase.gameCollection.doc(window.localStorage.getItem("currentGameID")).update({
          ownerScore: this.currentGame.ownerScore + scoreChange 
        }).then(() => {
          console.log("Owner's score updated");
          // if user rolls a number already filled, end their turn
          if (scoreChange > 1 || this.currentGame.isSlotFilled === "false,false,false,false,false" 
              && this.rollResult !== 6) {
              this.endTurn()
          }
        }).catch((err) => {
          console.log(err);
        })
      } else {
        console.log("FOURTH | increment owner score");
        fbase.gameCollection.doc(window.localStorage.getItem("currentGameID")).update({
          opponentScore: this.currentGame.opponentScore + scoreChange 
        }).then(() => {
          console.log("Opponent's score updated");
        // if user rolls a number already filled, end their turn
          if (scoreChange > 1 || this.currentGame.isSlotFilled === "false,false,false,false,false"
              && this.rollResult !== 6) {
              this.endTurn()
          }
        }).catch((err) => {
          console.log(err);
        })
      } 
    },
    endTurn() {
      if (this.currentUser.uid === this.currentGame.ownerID) {
        console.log("FIFTH | End turn, opponentID set to active");

        fbase.gameCollection.doc(window.localStorage.getItem("currentGameID")).update({
          activePlayerID: this.currentGame.opponentID 
        }).then(() => {
          console.log("Active player changed from " + this.currentGame.ownerID 
          + " to " + this.currentGame.opponentID);
        }).catch((err) => {
          console.log(err);
        })
      } else {
        console.log("FIFTH | End turn, ownerID set to active");

        fbase.gameCollection.doc(window.localStorage.getItem("currentGameID")).update({
          activePlayerID: this.currentGame.ownerID 
        }).then(() => {
          console.log("Active player changed from " + this.currentGame.opponentID 
          + " to " + this.currentGame.ownerID);
        }).catch((err) => {
          console.log(err);
        })
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