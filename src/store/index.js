import Vue from "vue"
import Vuex from "vuex"
// import state from "./state"
// import mutations from "./mutations"
// import actions from "./actions"
const fbase = require("@/firebaseConfig.js")

Vue.use(Vuex)

fbase.auth.onAuthStateChanged(user => {
  if (user) {
    let currentGameID = window.localStorage.getItem("currentGameID")

    store.commit("setCurrentUser", user)
    store.dispatch("fetchUserProfile")
    // store.dispatch("fetchCurrentGame")
    
    // update open games as they are created
    fbase.gameCollection.orderBy("createdOn", "desc").onSnapshot(querySnapshot => {
      let gamesArray = []
  
      querySnapshot.forEach(doc => {
        let game = doc.data()
        game.id = doc.id
  
        if(game.ownerID !== user.uid && game.isOpen) {
          gamesArray.push(game)
        }
        
        if(game.ownerID === user.uid) {
          store.commit("setUsersGame", game)
        }
  
      })
  
      store.commit("setGames", gamesArray)
    })

    fbase.gameCollection.doc(currentGameID)
    .onSnapshot(function(doc) {

      let game = doc.data()      

      if (game.isSlotFilled !== store.state.currentGame.isSlotFilled) {
        store.commit("setIsSlotFilled", game.isSlotFilled)
      }

    // realtime update of score changes
      if (game.ownerScore !== store.state.currentGame.ownerScore) {
        store.commit("setOwnerScore", game.ownerScore)
      }
      
      if (game.opponentScore !== store.state.currentGame.opponentScore) {
        store.commit("setOpponentScore", game.opponentScore)
      }

    // realtime update of active player ID
      if (game.activePlayerID !== store.state.currentGame.activePlayerID) {
        store.commit("setActivePlayerID", game.activePlayerID)
      }
      
    }, function(error) {
      console.log(error);
    })
  }
  
})


export const store = new Vuex.Store({
  state: {
    currentUser: null,
    userProfile: {},
    games: [],
    currentGame: {},
    usersGame: {},
  },
  mutations: {
    setCurrentUser(state, payLoad) {
      state.currentUser = payLoad
    },
    setUserProfile(state, payLoad) {
      state.userProfile = payLoad
    },
    setGames(state, payLoad) {
      if (payLoad) {
        state.games = payLoad
      } else {
        state.games = []
      }
    },
    setCurrentGame(state, payLoad) {
      state.currentGame = payLoad      
    },
    setUsersGame(state, payLoad) {
      state.usersGame = payLoad
    },
    setActivePlayerID(state, payLoad) {
      state.currentGame.activePlayerID = payLoad
    },
    // incrementOwnerScore(state, payLoad) {
    //   state.currentGame.ownerScore += payLoad
    // },
    setOwnerScore(state, payLoad) {
      state.currentGame.ownerScore = payLoad
    },
    // incrementOpponentScore(state, payLoad) {
    //   state.currentGame.opponentScore += payLoad
    // },
    setOpponentScore(state, payLoad) {
      state.currentGame.opponentScore = payLoad
    },
    setIsSlotFilled(state, payLoad) {
      state.currentGame.isSlotFilled = payLoad
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
    }, 
    fetchCurrentGame({ commit }) {  
      let currentGameFromLocalStore = window.localStorage.getItem("currentGameID")

      if (currentGameFromLocalStore === null || currentGameFromLocalStore === undefined) {
        console.log("no current game saved")
        return
      }

      fbase.gameCollection.doc(window.localStorage.getItem("currentGameID")).get()
      .then(res => {
        commit("setCurrentGame", res.data())
        console.log("Current game set. Owner: " + res.data().ownerID + ". Opponent: " + res.data().opponentID)
      }).catch(err => {
        console.log(err);
      })
    }
  }
})
