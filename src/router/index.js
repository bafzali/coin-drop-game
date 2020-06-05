import Vue from "vue"
import VueRouter from "vue-router"
import firebase from "firebase"

import Dashboard from "@/views/Dashboard"
import Login from "@/views/Login"
import Settings from "@/views/Settings"
import Game from "@/views/Game"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/game",
    name: "Game",
    component: Game,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "*",
    redirect: "/"
  }
]

const router = new VueRouter({
  mode: "history",
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = firebase.auth().currentUser

  if (requiresAuth && !currentUser) {
    next("/login")
  } else if (requiresAuth && currentUser) {
    next()
  } else {
    next()
  }
})

export default router
