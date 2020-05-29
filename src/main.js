import Vue from "vue"
import { BootstrapVue } from "bootstrap-vue"

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import "./assets/sass/index.sass"

import App from "./App.vue"
import router from "./router"
import store from "./store"

const firebase = require("./firebaseConfig")

Vue.use(BootstrapVue)

Vue.config.productionTip = false

// handle page reload
let app
firebase.auth.onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app")
  }
})
