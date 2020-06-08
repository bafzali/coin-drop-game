import Vue from "vue"
import Vuex from "vuex"
// import state from "./state"
// import mutations from "./mutations"
// import actions from "./actions"
const fbase = require("@/firebaseConfig.js")

Vue.use(Vuex)

fbase.auth.onAuthStateChanged(user => {
  if (user) {
    store.commit("setCurrentUser", user)
    store.dispatch("fetchUserProfile")
  }

  // update open games as they are created
  fbase.gameCollection.orderBy("createdOn", "desc").onSnapshot(querySnapshot => {
    let gamesArray = []

    querySnapshot.forEach(doc => {
      let game = doc.data()
      game.id = doc.id
      gamesArray.push(game)
    })

    store.commit("setGames", gamesArray)
  })
})

export const store = new Vuex.Store({
  state: {
    currentUser: null,
    userProfile: {},
    // currentGame: {},
    games: [],
    // openGameIdList: [],
    // currentOpponent: ""
  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val
    },
    setUserProfile(state, val) {
      state.userProfile = val
    },
    setGames(state, val) {
      if (val) {
        state.games = val
      } else {
        state.games = []
      }
    }
  },
  actions: {
    clearData({ commit }) {
      commit("setCurrentUser", null)
      commit("setUserProfile", {})
    },
    fetchUserProfile({ commit, state }) {     
      fbase.userCollection.doc(state.currentUser.uid).get()
      .then(res => {
        commit("setUserProfile", res.data())
      }).catch(err => {
        console.log(err);
      })
    }
  }
})
