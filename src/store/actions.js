const fbase = require("@/firebaseConfig.js")

export default {
  fetchUserProfile({ commit, state }) {
    fbase.userCollection.doc(state.currentUser.uid).get()
    .then(res => {
      commit("setUserProfile", res.data())
    }).catch(err => {
      console.log(err);
    })
  }
}
