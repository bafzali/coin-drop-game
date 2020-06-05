<template>
  <div>
    <b-row class="py-5">
      <b-col>
        <b-card :title="userName" sub-title="">
        <!-- <b-card :title="userProfile.userName" sub-title=""> -->
          <b-card-text>
            Coins:
          </b-card-text>
          <b-card-text class="text-center">
            <h3>{{ userOneCoins }}</h3>
          </b-card-text>
        </b-card>
      </b-col>
      <b-col>
        <b-card title="Opponent" sub-title="">
          <b-card-text>
            Coins:
          </b-card-text>
          <b-card-text class="text-center">
            <h3>{{ userTwoCoins }}</h3>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
// import { mapState } from "vuex"

export default {
  props: {
    userOneCoins: Number,
    userTwoCoins: Number,
    userName: String
  },
  computed: {
    // ...mapState(["userProfile"])
  },
  methods: {

  }
}
</script>