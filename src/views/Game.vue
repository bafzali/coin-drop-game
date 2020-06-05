<template>
  <div class="game-container">
    <b-row>
      <b-col cols="4">
        <GameStatus
          :userOneCoins="userOneCoins"
          :userTwoCoins="userTwoCoins"
          :userName="userProfile.userName"
        />
      </b-col>
      <b-col cols="8">
        <GameBoard
          :rollDie="rollDie"
          :rollResult="rollResult"
          :isSlotFilled="isSlotFilled"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState } from "vuex"

import GameStatus from "@/components/GameStatus.vue"
import GameBoard from "@/components/GameBoard.vue"

export default {
  data() {
    return {
      isSlotFilled: [false, false, false, false, false],
      rollResult: 0,
      userOneCoins: 10,
      userTwoCoins: 10,
      activeUser: ""
    }
  },
  components: {
    GameStatus, 
    GameBoard
  },
  computed: {
    ...mapState(["userProfile"])
  },
  methods: {
    rollDie() {
      this.rollResult = Math.floor((Math.random() * 6) + 1)
      this.updateGameBoard()
    },
    clearBoard() {

    },
    updateGameBoard() {
      if(!this.isSlotFilled[0] && this.rollResult === 1) {
        this.isSlotFilled[0] = true
        console.log(this.isSlotFilled);
      } else if (this.isSlotFilled[0] && this.rollResult === 1) {
        this.isSlotFilled.forEach(element => {
          this.isSlotFilled[element] = false
        })
      }
    },
    updateUserCoinTotal() {

    }
  },
}
</script>