<template>
  <div class="game-container">
    <b-row>
      <b-col cols="4">
        <GameStatus
          :userOneCoins="userOneCoins"
          :userTwoCoins="userTwoCoins"
          :userName="userProfile.userName"
          :coinCountClass="this.coinCountClass"
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
    updateGameBoard() {
      let rollIndex = this.rollResult - 1


      if(!this.isSlotFilled[rollIndex] && rollIndex !== 5) {
        this.isSlotFilled[rollIndex] = true
      } else if(this.isSlotFilled[rollIndex] && rollIndex !== 5) {
        
        this.isSlotFilled.forEach((element, iteration) => {
          setTimeout(() => {
            if(element) {
              this.userOneCoins++
            }
          }, iteration*250) 
          this.isSlotFilled=[false, false, false, false, false]
        })
      } else if (this.userOneCoins > 0) {
        this.userOneCoins--
      }
    }
  },
}
</script>