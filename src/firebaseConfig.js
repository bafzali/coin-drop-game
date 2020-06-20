import firebase from "firebase"
require("firebase/firestore")
require("dotenv")

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FBASE_API_KEY,
  authDomain: process.env.VUE_APP_FBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FBASE_DB_URL,
  projectId: process.env.VUE_APP_FBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FBASE_APP_ID,
  measurementId: process.env.VUE_APP_FBASE_MEASUREMENT_ID
}

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// firebase collections
const userCollection = db.collection("user")
const gameCollection = db.collection("game")

export {
  db,
  auth,
  currentUser,
  userCollection,
  gameCollection
}
