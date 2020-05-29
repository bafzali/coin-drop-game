const firebase = require("firebase/app")

const auth = require("firebase/auth")
const db = require("firebase/firestore")
const currentUser = auth.currentUser

const firebaseConfig = {
  apiKey: process.env.FBASE_API_KEY,
  authDomain: process.env.FBASE_AUTH_DOMAIN,
  databaseURL: process.env.FBASE_DB_URL,
  projectId: process.env.FBASE_PROJECT_ID,
  storageBucket: process.env.FBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FBASE_MESSAGING_SENDER_ID,
  appId: process.env.FBASE_APP_ID,
  measurementId: process.env.FBASE_MEASUREMENT_ID
}

firebase.initializeApp(firebaseConfig)

const userCollection = db.collection("user")
const postCollection = db.collection("post")

export {
  db,
  auth,
  currentUser,
  userCollection,
  postCollection
}
