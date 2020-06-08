<template>
  <div>
    <b-row class="text-center py-5">
      <b-col>
        <h3>Click the die to roll!</h3>
        <img @click="rollDie" src="../../public/img/icons8-dice-96.png" alt="sketch of a blue die" class="game-die">
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
          <img v-if="isSlotFilled[0]" src="../../public/img/icons8-coin-96.png" alt="">
        </div>
      </b-col>
      <b-col>
        <div class="slot-number">
          <h3>2</h3>
          <img v-if="isSlotFilled[1]" src="../../public/img/icons8-coin-96.png" alt="">
        </div>
      </b-col>
      <b-col>
        <div class="slot-number">
          <h3>3</h3>
          <img v-if="isSlotFilled[2]" src="../../public/img/icons8-coin-96.png" alt="">
        </div>
      </b-col>
      <b-col>
        <div class="slot-number">
          <h3>4</h3>
          <img v-if="isSlotFilled[3]" src="../../public/img/icons8-coin-96.png" alt="">
        </div>
      </b-col>
      <b-col>
        <div class="slot-number">
          <h3>5</h3>
          <img v-if="isSlotFilled[4]" src="../../public/img/icons8-coin-96.png" alt="">
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
    rollDie: Function
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