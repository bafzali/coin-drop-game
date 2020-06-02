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
})

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
