import Vue from "vue"
import { BootstrapVue } from "bootstrap-vue"

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import "./assets/sass/index.sass"

import App from "./App.vue"
import router from "./router"
import { store } from "./store/index"

const fbase = require("./firebaseConfig")

Vue.use(BootstrapVue)

Vue.config.productionTip = false

// handle page reload
let app
fbase.auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      el: "#app",
      router,
      store,
      render: h => h(App)
    })
  }
})
