<template>
  <div>
    <b-row class="text-center py-5">
      <b-col>
        <h3 v-show="isUsersTurn">Click the die to roll!</h3>
        <img v-show="isUsersTurn" @click="rollDie" src="../../public/img/icons8-dice-96.png" alt="sketch of a blue die" class="game-die">
        <h3 v-show="!isUsersTurn">It's {{ opponent }}'s turn</h3>
        <img v-show="!isUsersTurn" src="../../public/img/icons8-dice-96.png" alt="sketch of a blue die">
      </b-col>
      <b-col>
        <img 
          v-for="(image, index) in dieImagePaths"
          :key="index"
          :src="dieImagePaths[index]"
          :class="toggleDiceClass(index)"
          alt="">
      </b-col>
    </b-row>
    <b-row class="text-center py-5">
      <b-col>
        <div class="slot-number">
          <h3>1</h3>
          <img v-if="isSlotFilled[0] === 'true'" src="../../public/img/icons8-coin-96.png" alt="">
        </div>
      </b-col>
      <b-col>
        <div class="slot-number">
          <h3>2</h3>
          <img v-if="isSlotFilled[1] === 'true'" src="../../public/img/icons8-coin-96.png" alt="">
        </div>
      </b-col>
      <b-col>
        <div class="slot-number">
          <h3>3</h3>
          <img v-if="isSlotFilled[2] === 'true'" src="../../public/img/icons8-coin-96.png" alt="">
        </div>
      </b-col>
      <b-col>
        <div class="slot-number">
          <h3>4</h3>
          <img v-if="isSlotFilled[3] === 'true'" src="../../public/img/icons8-coin-96.png" alt="">
        </div>
      </b-col>
      <b-col>
        <div class="slot-number">
          <h3>5</h3>
          <img v-if="isSlotFilled[4] === 'true'" src="../../public/img/icons8-coin-96.png" alt="">
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
    data() {
      return {
        dieImagePaths: ["img/icons8-dice-one-96.png", 
          "img/icons8-dice-two-96.png", "img/icons8-dice-three-96.png", 
          "img/icons8-dice-four-96.png", "img/icons8-dice-five-96.png", ],
      }
    },
  props: {
    isSlotFilled: Array,
    rollResult: Number,
    rollDie: Function,
    isUsersTurn: Boolean,
    opponent: String
  },
  methods: {
    toggleDiceClass(index) {
      let dieClass = ""
      let activeDieIndex = this.rollResult - 1
      if(activeDieIndex === index) {
        dieClass = "grow"
      }
      return dieClass
    },
  }
}
</script>