<template>
  <div>
    <b-row class="py-5">
      <b-col>
        <b-card :title="userName" sub-title="">
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
    <b-row class="px-3 text-center">
      <b-button variant="warning" size="lg">
        End Turn
      </b-button>
    </b-row>
  </div>
</template>

<script>

export default {
  props: {
    userOneCoins: Number,
    userTwoCoins: Number,
    userName: String,
  },
  computed: {
  },
  methods: {

  }
}
</script>