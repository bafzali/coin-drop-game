<template>
  <div>
    <b-row class="py-5">
      <b-col>
        <b-card :title="ownerUserName" sub-title="">
          <b-card-text>
            Coins:
          </b-card-text>
          <b-card-text class="text-center">
            <h3>{{ userOneCoins }}</h3>
          </b-card-text>
        </b-card>
      </b-col>
      <b-col>
        <b-card :title="opponent" sub-title="">
          <b-card-text>
            Coins:
          </b-card-text>
          <b-card-text class="text-center">
            <h3>{{ userTwoCoins }}</h3>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="px-3 text-center">
      <b-button :disabled="!isUsersTurn || !userHasRolledOnce" @click="endTurn" variant="warning" size="lg">
        End Turn
      </b-button>
    </b-row>
  </div>
</template>

<script>

export default {
  props: {
    userOneCoins: Number, // always owner of the game
    userTwoCoins: Number, // always opponent in someone's game
    ownerUserName: String,
    opponent: String,
    endTurn: Function,
    activePlayerID: String,
    isUsersTurn: Boolean,
    userHasRolledOnce: Boolean
  },
  computed: {
  },
  methods: {

  }
}
</script>