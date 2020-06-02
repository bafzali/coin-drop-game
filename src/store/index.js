import Vue from "vue"
import Vuex from "vuex"
// import state from "./state"
// import mutations from "./mutations"
// import actions from "./actions"
const fbase = require("@/firebaseConfig.js")

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    currentUser: null,
    userProfile: {}
  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val
    },
    setUserProfile(state, val) {
      state.userProfile = val
    }
  },
  actions: {
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
